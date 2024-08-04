import React, { useEffect, useRef } from "react";
import { ImageBackground, ImageSourcePropType, View, StyleSheet, Text, Pressable, Animated } from "react-native";

type ZodiacItemProps = {
  index: number;
  image: ImageSourcePropType;
  name: string;
  onPressHandler: Function;
};

export default function ZodiacItem({ index, image, name, onPressHandler }: ZodiacItemProps) {
  const onPress = () => {
    onPressHandler(index);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onPress}>
        <ImageBackground source={image} style={{ flex: 1 }} resizeMode="contain">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
            }}
          ></View>
        </ImageBackground>
        <Text style={styles.zodiacText}>{name}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  zodiacText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Cinzel_700Bold",
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 50,
    textTransform: "uppercase",
  },
});
