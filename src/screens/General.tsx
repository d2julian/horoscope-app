import { View, Text } from "react-native";
import React from "react";

type GeneralProps = {
  zodiac: string;
};

export default function General({ zodiac }: GeneralProps) {
  return (
    <View>
      <Text>WIP {zodiac}</Text>
    </View>
  );
}
