import { View, StyleSheet, ImageBackground, ScrollView, Animated } from "react-native";
import { Text } from "react-native-paper";
import React, { useRef, useState } from "react";
import HeartAnimation from "@/components/HeartAnimation";
import { AppTheme, useAppTheme } from "@/UI/theme";
import images from "assets/images";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import CustomButton from "@/components/CustomButton";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import PurpleContainer from "@/components/PurpleContainer";
import ZodiacItemCompatibility from "@/components/ZodiacItemCompatibility";
import { useShallow } from "zustand/react/shallow";

export default function Compatibility() {
  const [heartIsVisible, setHeartIsVisible] = useState(false);
  const [firstZodiacIndexSelected, setFirstZodiacIndexSelected] = useState<number>();
  const [secondZodiacIndexSelected, setSecondZodiacIndexSelected] = useState<number>();
  const [showResults, setShowResults] = useState(false);
  const [info, setInfo] = useState<string | undefined>();
  const [zodiacs, compatibilityInfo] = useHoroscopeStore(useShallow((state) => [state.zodiacs, state.compatibilityInfo]));

  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const onPressHandler = () => {
    setHeartIsVisible(true);
    setShowResults(true);
    fadeIn();
    const findCompatibility = compatibilityInfo?.find((info) => info.index_from === firstZodiacIndexSelected && info.index_to === secondZodiacIndexSelected);
    setInfo(findCompatibility?.compatibility_info);
  };
  const onFinishAnimation = () => {
    setHeartIsVisible(false);
  };

  const onPressFirstItemZodiac = (index: number) => {
    if (index === firstZodiacIndexSelected) {
      setFirstZodiacIndexSelected(undefined);
      fadeOut();
    } else {
      setFirstZodiacIndexSelected(index);
    }
  };

  const onPressSecondItemZodiac = (index: number) => {
    if (index === secondZodiacIndexSelected) {
      setSecondZodiacIndexSelected(undefined);
      fadeOut();
    } else {
      setSecondZodiacIndexSelected(index);
    }
  };

  return (
    <>
      <ImageBackground source={images.constelacion_general} style={styles.secondaryBackground} resizeMode="cover" />
      <View style={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          Compatibilidad de Amor
        </Text>
        <View style={{ padding: theme.spacing.medium }}>
          <ScrollView horizontal={true}>
            {zodiacs.map((z) => {
              return (
                <ZodiacItemCompatibility
                  key={z.index}
                  index={z.index}
                  isSelected={firstZodiacIndexSelected === z.index}
                  image={z.image}
                  name={z.name}
                  onPress={onPressFirstItemZodiac}
                />
              );
            })}
          </ScrollView>
          <ScrollView horizontal={true}>
            {zodiacs.map((z) => {
              return (
                <ZodiacItemCompatibility
                  key={z.index}
                  index={z.index}
                  isSelected={secondZodiacIndexSelected === z.index}
                  image={z.image}
                  name={z.name}
                  onPress={onPressSecondItemZodiac}
                />
              );
            })}
          </ScrollView>
        </View>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>{showResults && <PurpleContainer title="Resultado final" iconName="heart" body={info} />}</Animated.View>
        <View style={{ marginBottom: 10 }}>
          <CustomButton callback={onPressHandler} enabled={firstZodiacIndexSelected !== undefined && secondZodiacIndexSelected !== undefined}>
            Click
          </CustomButton>
        </View>
      </View>
      <HeartAnimation visible={heartIsVisible} onFinishAnimation={onFinishAnimation} />
    </>
  );
}

const makeStyles = ({ gap, spacing, colors, defaultFont }: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: spacing.medium,
      width: WINDOW_WIDTH,
      height: WINDOW_HEIGHT,
      elevation: 2,
      zIndex: 2,
      flex: 1,
    },
    secondaryBackground: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.3,
    },
    title: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "center",
      marginTop: spacing.medium,
      marginBottom: spacing.medium,
    },
  });
