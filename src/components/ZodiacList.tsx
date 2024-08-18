import React, { useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { AppTheme, useAppTheme } from "@/UI/theme";
import { fakedata } from "@/fakedata";
import ZodiacItemList from "./ZodiacItemList";

export default function ZodiacList() {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  return (
    <View>
      <Text variant="titleLarge" style={styles.title}>
        Zodiacos
      </Text>

      <View style={styles.listContainer}>
        {fakedata.map((z) => {
          return (
            <View key={z.name}>
              <ZodiacItemList image={z.image} name={z.name} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const makeStyles = ({ spacing, colors, defaultFont }: AppTheme) =>
  StyleSheet.create({
    listContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      padding: spacing.small,
    },
    title: {
      color: colors.onPrimary,
      fontFamily: defaultFont,
      textAlign: "center",
      marginTop: spacing.medium,
      marginBottom: spacing.medium,
    },
  });
