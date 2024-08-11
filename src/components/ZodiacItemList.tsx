import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import React from "react";
import { WINDOW_WIDTH } from "@/UI/constants";

type ZodiacItemListProps = {
  image: ImageSourcePropType;
  name: string;
};

export default function ZodiacItemList({ image, name }: ZodiacItemListProps) {
  return (
    <View style={styles.itemContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: WINDOW_WIDTH / 6,
    margin: 5,
    paddingVertical: 20,
  },
  image: {
    height: WINDOW_WIDTH / 5,
    width: WINDOW_WIDTH / 5,
  },
  text: {
    color: "white",
    fontSize: 13,
    fontFamily: "Cinzel_700Bold",
    textAlign: "center",
  },
});
