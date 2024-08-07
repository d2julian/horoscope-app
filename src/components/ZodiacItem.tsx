import React from "react";
import { ImageBackground, ImageSourcePropType, View, StyleSheet, Text, Pressable } from "react-native";
import { AppTheme, useAppTheme } from "@/UI/theme";

type ZodiacItemProps = {
  index: number;
  image: ImageSourcePropType;
  name: string;
  isSelected: boolean;
  onPressHandler: Function;
};

export default function ZodiacItem({ index, image, name, isSelected, onPressHandler }: ZodiacItemProps) {
  const onPress = () => {
    onPressHandler(index);
  };

  const theme = useAppTheme();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Pressable style={[styles.pressable, isSelected ? styles.stylePressableSelected : null]} onPress={onPress}>
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
    </View>
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
  pressable: {
    flex: 1,
    opacity: 0.5,
  },
  stylePressableSelected: {
    opacity: 1,
  },
});
