import { View, Pressable, StyleSheet, ImageBackground } from "react-native";
import { Text } from "react-native-paper";
import React, { useState } from "react";
import HeartAnimation from "@/components/HeartAnimation";
import { AppTheme, useAppTheme } from "@/UI/theme";
import images from "assets/images";

export default function Compatibility() {
  const [heartIsVisible, setHeartIsVisible] = useState(false);
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const onPressHandler = () => {
    setHeartIsVisible(true);
  };
  const onFinishAnimation = () => {
    setHeartIsVisible(false);
  };
  return (
    <>
      <ImageBackground source={images.constelacion_general} style={styles.secondaryBackground} resizeMode="cover" />
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Compatibilidad de Amor
        </Text>
        <Pressable style={{ backgroundColor: "red", width: 200, height: 200 }} onPress={onPressHandler}>
          <Text>Click</Text>
        </Pressable>
      </View>
      <HeartAnimation visible={heartIsVisible} onFinishAnimation={onFinishAnimation} />
    </>
  );
}

const makeStyles = ({ gap, spacing, colors, defaultFont }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      gap: gap.medium,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
    title: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "center",
      marginTop: spacing.medium,
      marginBottom: spacing.medium,
    },
  });
