import { View, Text } from "react-native";
import React from "react";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { useShallow } from "zustand/react/shallow";
import { ZodiacData } from "@/types/types";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";

export default function Zodiac() {
  const [mainZodiac, userName] = useHoroscopeStore(useShallow((state) => [state.mainZodiac, state.userName]));
  const zodiac: ZodiacData | null = mainZodiac ? useMainHoroscope(mainZodiac) : null;

  return (
    <View>
      <Text>
        {userName} {mainZodiac}
      </Text>
    </View>
  );
}
