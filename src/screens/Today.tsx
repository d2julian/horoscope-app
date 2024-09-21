import { View, Image } from "react-native";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDailyHoroscope } from "@/selectors/dailyZodiacSelector";
import { HoroscopeData } from "@/types/types";
import ProgressBarElement from "@/components/ProgressBarElement";

type RootStackParamList = {
  Zodiac: { zodiacProp: string };
};

type ZodiacRouteProp = RouteProp<RootStackParamList, "Zodiac">;

export default function Today() {
  const route = useRoute<ZodiacRouteProp>();
  const { zodiacProp } = route.params;
  const zodiacData: HoroscopeData | null = zodiacProp ? useDailyHoroscope(zodiacProp) : null;
  console.log("zodiacData", zodiacData);
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        {zodiacData?.lucky_elements.map((element) => {
          return <ProgressBarElement key={element.lucky_element} element={element.lucky_element} stars={element.total_stars_filled} />;
        })}
      </View>
    </View>
  );
}
