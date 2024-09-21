import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDailyHoroscope } from "@/selectors/dailyZodiacSelector";
import { HoroscopeData } from "@/types/types";
import ProgressBarElement from "@/components/ProgressBarElement";
import { useAppTheme } from "@/UI/theme";

type RootStackParamList = {
  Zodiac: { zodiacProp: string };
};

type ZodiacRouteProp = RouteProp<RootStackParamList, "Zodiac">;

export default function Today() {
  const theme = useAppTheme();
  const route = useRoute<ZodiacRouteProp>();
  const { zodiacProp } = route.params;
  const zodiacData: HoroscopeData | null = zodiacProp ? useDailyHoroscope(zodiacProp) : null;
  return (
    <View style={{ marginTop: 20 }}>
      <View style={{ justifyContent: "center", alignItems: "center", gap: theme.gap.small, marginBottom: 10 }}>
        <Image source={zodiacData?.image} style={{ height: theme.iconSize.large, width: theme.iconSize.large }} />
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onPrimary,
            fontFamily: theme.defaultFont,
            textAlign: "center",
          }}
        >
          {zodiacData?.zodiac}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          flexWrap: "wrap",
          backgroundColor: `rgba(${theme.colors.rgbaPrimary}, 0.6)`,
          borderRadius: 10,
          marginHorizontal: 10,
          padding: 15,
        }}
      >
        {zodiacData?.lucky_elements.map((element) => {
          return <ProgressBarElement key={element.lucky_element} element={element.lucky_element} stars={element.total_stars_filled} />;
        })}
      </View>
    </View>
  );
}
