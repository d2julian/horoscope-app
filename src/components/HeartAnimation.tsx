import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Animated, StyleProp, ViewStyle } from "react-native";

const ANIMATION_END_Y = Math.ceil(WINDOW_HEIGHT * 0.8);
const NEGATIVE_END_Y = ANIMATION_END_Y * -1;

function getRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const Heart = () => {
  return (
    <View style={styles.heart}>
      <View style={[styles.leftHeart, styles.heartShape]} />
      <View style={[styles.rightHeart, styles.heartShape]} />
    </View>
  );
};

type AnimatedHeartProps = {
  onComplete: () => void;
  visible: boolean;
  style?: StyleProp<ViewStyle>;
  onFinish: Function;
};

const AnimatedHeart = ({ onComplete, visible, style, onFinish }: AnimatedHeartProps) => {
  const position = useRef(new Animated.Value(0)).current;

  const yAnimation = position.interpolate({
    inputRange: [NEGATIVE_END_Y, 0],
    outputRange: [ANIMATION_END_Y, 0],
  });

  const opacityAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y],
    outputRange: [1, 0],
  });

  const scaleAnimation = yAnimation.interpolate({
    inputRange: [0, 15, 30],
    outputRange: [0, 1.2, 1],
    extrapolate: "clamp",
  });

  const xAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y / 2, ANIMATION_END_Y],
    outputRange: [0, 15, 0],
  });

  const rotateAnimation = yAnimation.interpolate({
    inputRange: [0, ANIMATION_END_Y / 4, ANIMATION_END_Y / 3, ANIMATION_END_Y / 2, ANIMATION_END_Y],
    outputRange: ["0deg", "-2deg", "0deg", "2deg", "0deg"],
  });

  const getHeartAnimationStyle = (): StyleProp<ViewStyle> => {
    return {
      transform: [{ translateY: position }, { translateX: xAnimation }, { scale: scaleAnimation }, { rotate: rotateAnimation }],
      opacity: opacityAnimation,
    };
  };

  const startAnimation = () => {
    Animated.timing(position, {
      duration: 2000,
      toValue: NEGATIVE_END_Y,
      useNativeDriver: true,
    }).start(onComplete);
  };

  useEffect(() => {
    if (visible) {
      startAnimation();
      onFinish();
    } else {
      position.setValue(0);
    }
  }, [visible]);

  return (
    <Animated.View style={[styles.heartWrap, getHeartAnimationStyle(), style]}>
      <Heart />
    </Animated.View>
  );
};

type HeartState = {
  id: number;
  right?: number;
  bottom: number;
};

type CompatibilityProps = {
  visible: boolean;
  onFinishAnimation: Function;
};

const HeartAnimation = ({ visible, onFinishAnimation }: CompatibilityProps) => {
  const [hearts, setHearts] = useState<HeartState[]>([]);

  const addHearts = () => {
    const numberOfHearts = 7;
    const newHearts: HeartState[] = Array.from({ length: numberOfHearts }, () => ({
      id: Math.random(),
      right: getRandomNumber(WINDOW_WIDTH / 2 + 75, WINDOW_WIDTH / 2 - 75),
      bottom: getRandomNumber(1, WINDOW_HEIGHT * 0.3),
    }));
    setHearts(newHearts);
  };

  const removeHeart = (id: number) => {
    setHearts((prevHearts) => prevHearts.filter((heart) => heart.id !== id));
  };

  useEffect(() => {
    if (visible) {
      addHearts();
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      <View>
        {hearts.map((heart) => (
          <AnimatedHeart key={heart.id} visible={true} onComplete={() => removeHeart(heart.id)} style={{ right: heart.right, bottom: heart.bottom }} onFinish={onFinishAnimation} />
        ))}
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
  },
  button: {
    backgroundColor: "#6427d1",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  heartWrap: {
    position: "absolute",
    backgroundColor: "transparent",
  },
  heart: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  heartShape: {
    width: 30,
    height: 45,
    position: "absolute",
    top: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "red",
  },
  leftHeart: {
    transform: [{ rotate: "-45deg" }],
    left: 5,
  },
  rightHeart: {
    transform: [{ rotate: "45deg" }],
    right: 5,
  },
});

export default HeartAnimation;
