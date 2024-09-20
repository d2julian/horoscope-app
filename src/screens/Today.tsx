import { View, Text } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";
import { ZodiacData } from "@/types/types";

type RootStackParamList = {
  Zodiac: { zodiacProp: string };
};

type ZodiacRouteProp = RouteProp<RootStackParamList, "Zodiac">;

export default function Today() {
  const route = useRoute<ZodiacRouteProp>();
  const { zodiacProp } = route.params;
  const zodiacData: ZodiacData | null = zodiacProp ? useMainHoroscope(zodiacProp) : null;
  console.log("zodiacData", zodiacData);
  return (
    <View>
      <Text>Hola {zodiacProp}</Text>
    </View>
  );
}
