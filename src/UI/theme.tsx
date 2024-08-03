import { WINDOW_WIDTH } from "@/UI/constants";
import { MD3LightTheme as DefaultTheme, useTheme } from "react-native-paper";
export const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  roundness: 2,
  size: {
    largeXXL: WINDOW_WIDTH * 0.7,
    largeXL: WINDOW_WIDTH * 0.6,
    large: WINDOW_WIDTH * 0.5,
    medium: WINDOW_WIDTH * 0.4,
    small: WINDOW_WIDTH * 0.3,
  },
  iconSize: {
    large: 80,
    medium: 50,
    small: 25,
  },
  gap: {
    large: 30,
    medium: 20,
    small: 10,
  },
  defaultFont: "Cinzel_700Bold",
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: "#BADA55",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();
