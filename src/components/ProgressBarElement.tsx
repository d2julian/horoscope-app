import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { WINDOW_WIDTH, LUCKY_ELEMENTS } from "@/UI/constants";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { ProgressBar } from "react-native-paper";

type ProgressBarElementProps = {
  element: string;
  stars: number;
};

const ProgressBarElement = ({ element, stars }: ProgressBarElementProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <View style={{ width: WINDOW_WIDTH / 3, marginHorizontal: 10, marginVertical: 10 }}>
      <Text style={styles.textElement}>{element}</Text>
      <ProgressBar progress={stars / 5} color={theme.colors[LUCKY_ELEMENTS[element]]} style={styles.bar} />
    </View>
  );
};

export default ProgressBarElement;

const makeStyles = ({ colors, defaultFont, height }: AppTheme) =>
  StyleSheet.create({
    textElement: {
      color: colors.primaryContainer,
      fontFamily: defaultFont,
    },
    bar: {
      borderRadius: 50,
      height: height.small,
      borderWidth: 1,
      borderColor: colors.black,
      backgroundColor: colors.lightGray,
    },
  });
