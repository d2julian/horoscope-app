import { View, Image, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { Icon, Text } from "react-native-paper";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDailyHoroscope } from "@/selectors/dailyZodiacSelector";
import { HoroscopeData, ZodiacData } from "@/types/types";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";
import images from "assets/images";
import { ZODIAC_ICONS } from "@/UI/constants";
import PurpleContainer from "@/components/PurpleContainer";
import ZodiacHeader from "@/components/ZodiacHeader";

type RootStackParamList = {
  Zodiac: { zodiacProp: string };
};

type ZodiacRouteProp = RouteProp<RootStackParamList, "Zodiac">;

export default function Today() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const route = useRoute<ZodiacRouteProp>();
  const { zodiacProp } = route.params;
  const zodiacDailyData: HoroscopeData | null = zodiacProp ? useDailyHoroscope(zodiacProp) : null;
  const zodiacGeneralData: ZodiacData | null = zodiacProp ? useMainHoroscope(zodiacProp) : null;

  return (
    <>
      <ImageBackground source={images.constelacion_general} style={styles.secondaryBackground} resizeMode="cover" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: theme.spacing.small }}>
        <View style={styles.container}>
          <ZodiacHeader
            zodiac={zodiacProp}
            zoodiacName={zodiacDailyData?.zodiac}
            image={zodiacDailyData?.image}
            dateFrom={zodiacGeneralData?.date_from}
            dateTo={zodiacGeneralData?.date_to}
          />
          <PurpleContainer iconName="emoticon-happy-outline" title="Personalidad" body={zodiacGeneralData?.personality} />
          <PurpleContainer iconName="arm-flex-outline" title="Fortalezas" body={zodiacGeneralData?.strengths} />
          <PurpleContainer iconName="cancel" title="Debilidades" body={zodiacGeneralData?.weaknesses} />
        </View>
      </ScrollView>
    </>
  );
}

const makeStyles = ({ colors, defaultFont, gap, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      gap: gap.medium,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
  });
