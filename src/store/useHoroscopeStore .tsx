import { create } from "zustand";

import { HttpActionKind, ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import { mapZodiacMainResponseToHoroscopes } from "@/selectors/mapZodiacMainResponse";

type HoroscopeStoreType = {
  sendRequest: (requestFunction: () => Promise<ZodiacMainResponse>) => Promise<void>;
  resetState: () => void;
  setMainZodiac: (zodiac: string) => void;
  setUserName: (name: string) => void;
  responseData?: ZodiacMainResponse;
  errorMessage?: string;
  data: ZodiacMainResponse | null;
  zodiacs: ZodiacCarouselType[];
  error: string | null;
  status: HttpActionKind | null;
  userName: string | null;
  mainZodiac: string | null;
};

export const useHoroscopeStore = create<HoroscopeStoreType>((set) => ({
  data: null,
  error: null,
  status: null,
  zodiacs: [],
  userName: null,
  mainZodiac: null,

  sendRequest: async (requestFunction: () => Promise<ZodiacMainResponse>) => {
    set({ status: HttpActionKind.PENDING, error: null, data: null });

    try {
      const responseData = await requestFunction();
      set({
        data: responseData,
        zodiacs: mapZodiacMainResponseToHoroscopes(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },

  setUserName: (name: string) => {
    set({ userName: name });
  },
  setMainZodiac: (zodiac: string) => {
    set({ mainZodiac: zodiac });
  },

  resetState: () => {
    set({ data: null, error: null, status: null });
  },
}));
