import { View, Image, ImageBackground, StyleSheet } from "react-native";
import { Icon, Text } from "react-native-paper";
import React from "react";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useDailyHoroscope } from "@/selectors/dailyZodiacSelector";
import { HoroscopeData, ZodiacData } from "@/types/types";
import ProgressBarElement from "@/components/ProgressBarElement";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";
import images from "assets/images";
import { ZODIAC_ICONS } from "@/UI/constants";

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

  const date = new Date(zodiacGeneralData?.timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return (
    <>
      <ImageBackground source={images.constelacion_daily} style={styles.secondaryBackground} resizeMode="cover" />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: theme.gap.large }}>
          <Image source={zodiacDailyData?.image} style={{ height: theme.iconSize.large, width: theme.iconSize.large }} />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: theme.gap.small }}>
              <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont, textAlign: "center" }}>
                {zodiacDailyData?.zodiac}
              </Text>
              <Icon source={ZODIAC_ICONS[zodiacProp]} color={theme.colors.onPrimary} size={20} />
            </View>
            <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont, textAlign: "center" }}>
              {zodiacGeneralData?.date_from} - {zodiacGeneralData?.date_to}
            </Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          {zodiacDailyData?.lucky_elements.map((element) => {
            return <ProgressBarElement key={element.lucky_element} element={element.lucky_element} stars={element.total_stars_filled} />;
          })}
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardContainerContent}>
            <Icon source="calendar-month" color={theme.colors.onPrimary} size={20} />
            <Text variant="bodyLarge" style={styles.cardContainerText}>
              {day}/{month}/{year}
            </Text>
          </View>
          <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultMediumFont, textAlign: "justify" }}>
            {zodiacDailyData?.horoscope}
          </Text>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.cardContainerContent}>
            <Icon source="cards-club" color={theme.colors.onPrimary} size={20} />
            <Text variant="bodyLarge" style={styles.cardContainerText}>
              Signos Compatibles
            </Text>
          </View>
          <View>
            <Text variant="bodySmall" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultMediumFont, textAlign: "justify" }}>
              WIP
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const makeStyles = ({ colors, defaultFont, gap, spacing }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      gap: gap.medium,
    },
    cardContainer: {
      backgroundColor: `rgba(${colors.rgbaPrimary}, 0.6)`,
      borderRadius: 10,
      marginHorizontal: spacing.small,
      padding: spacing.smallXL,
      gap: gap.small,
    },
    cardContainerContent: {
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: gap.small,
    },
    cardContainerText: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "justify",
    },
    progressContainer: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      backgroundColor: `rgba(${colors.rgbaPrimary}, 0.6)`,
      borderRadius: 10,
      marginHorizontal: 10,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
  });
