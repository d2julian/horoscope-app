import { View, Text } from "react-native";
import React from "react";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";
import { ZodiacData } from "@/types/types";

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
