import { WINDOW_WIDTH } from "@/UI/constants";
import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";
export const theme = {
  ...DefaultTheme,
  roundness: 2,
  size: {
    largeXXL: WINDOW_WIDTH * 0.7,
    largeXL: WINDOW_WIDTH * 0.6,
    large: WINDOW_WIDTH * 0.5,
    medium: WINDOW_WIDTH * 0.4,
    small: WINDOW_WIDTH * 0.3,
  },
  iconSize: {
    largeXL: 100,
    large: 80,
    medium: 50,
    small: 25,
  },
  gap: {
    large: 30,
    medium: 20,
    small: 10,
  },
  fontSize: {
    large: 15,
    medium: 10,
    small: 8,
  },
  defaultFont: "Cinzel_700Bold",
  defaultRegularFont: "Cinzel_400Regular",
  defaultMediumFont: "Cinzel_600SemiBold",
  colors: {
    ...DefaultTheme.colors,
    primary: "#4c0080",
    mediumPrimary: "#8a00e6",
    lightPrimary: "#c266ff",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
