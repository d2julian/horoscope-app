import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const STORED_USER_NAME = "storedName";
export const STORED_ZODIAC_KEY = "storedZodiac";
export const enum LUCKY_ELEMENTS {
  Amor = "love",
  Finanzas = "money",
  Animo = "mood",
  Profesión = "job",
}
