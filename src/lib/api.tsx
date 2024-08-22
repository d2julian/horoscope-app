import { ZodiacDailyResponse, ZodiacMainResponse } from "@/types/types";

const FIREBASE_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_URL;

export async function getAllMainHoroscopes(): Promise<ZodiacMainResponse> {
  const response = await fetch(`${FIREBASE_DOMAIN}/horoscope_main.json`);
  const data: ZodiacMainResponse = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}

export async function getAllDailyHoroscopes(): Promise<ZodiacDailyResponse> {
  const date = new Date().toISOString();
  const dateFromString = date.substring(0, date.indexOf("T")) + "T00:00:00";
  const dateToString = date.substring(0, date.indexOf("T")) + "T23:59:59";
  const response = await fetch(
    `${FIREBASE_DOMAIN}/horoscope_daily.json?orderBy="timestamp"&startAt="${dateFromString}"&endAt="${dateToString}"`
  );
  const data: ZodiacDailyResponse = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}
