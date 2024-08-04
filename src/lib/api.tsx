import { ZodiacMainResponse } from "@/types/types";

const FIREBASE_DOMAIN = process.env.EXPO_PUBLIC_FIREBASE_URL;

export async function getAllMainHoroscopes(): Promise<ZodiacMainResponse> {
  const response = await fetch(`${FIREBASE_DOMAIN}/horoscope_main.json`);
  const data: ZodiacMainResponse = await response.json();

  if (!response.ok) {
    throw new Error("Could not fetch horoscopes.");
  }

  return data;
}
