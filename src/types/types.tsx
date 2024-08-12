import { ImageSourcePropType } from "react-native";

type Characteristic = {
  [key: string]: string;
};

type ZodiacData = {
  all_characteristics: Characteristic[];
  attribute: string;
  dislikes: string;
  ideal: string;
  likes: string;
  personality: string;
  strengths: string;
  timestamp: string;
  url: string;
  weaknesses: string;
  zodiac: string;
  index: number;
};

export type ZodiacMainResponse = {
  [key: string]: ZodiacData;
};

export type Horoscope = {
  id: string;
} & ZodiacData;

export enum HttpActionKind {
  SEND = "SEND",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export type ZodiacCarouselType = {
  name: string;
  image: ImageSourcePropType;
  index: number;
};
