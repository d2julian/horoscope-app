import React from "react";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { useAppTheme } from "@/UI/theme";
import { Text, Button } from "react-native-paper";

type CustomButtonProps = {
  callback: (e: GestureResponderEvent) => void;
  children: React.ReactNode;
  enabled: boolean;
};

export default function CustomButton({ callback, children, enabled }: CustomButtonProps) {
  const theme = useAppTheme();
  return (
    <Button
      mode="contained"
      contentStyle={{ flexDirection: "row-reverse" }}
      icon="arrow-right-bold-circle"
      onPress={callback}
      style={[enabled ? styles.enabled : styles.disabled]}
    >
      <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont }}>
        {children}
      </Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  enabled: {
    opacity: 1,
  },
  disabled: {
    opacity: 0.7,
  },
});
