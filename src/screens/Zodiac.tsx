import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { getData } from "@/store/phoneStorage";

export default function Zodiac() {
  const mainZodiac = useHoroscopeStore((state) => state.mainZodiac);
  const userName = useHoroscopeStore((state) => state.userName);
  return (
    <View>
      <Text>
        {userName} {mainZodiac}
      </Text>
    </View>
  );
}
