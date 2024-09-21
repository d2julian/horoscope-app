import { create, StateCreator } from "zustand";

import { ZodiacDailyResponse, HttpActionKind, ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import { mapZodiacMainResponseToHoroscopes } from "@/selectors/mapZodiacMainResponse";
import { mapZodiacDailyResponseToHoroscopes } from "@/selectors/mapZodiacDailyResponse";

type GeneralInfoStoreType = {
  setMainZodiac: (zodiac: string) => void;
  setUserName: (name: string) => void;
  userName: string | null;
  mainZodiac: string | null;
};

type MainHoroscopeStoreType = {
  sendMainRequest: (requestFunction: () => Promise<ZodiacMainResponse>) => Promise<void>;
  errorMessage?: string;
  generalHoroscopeData: ZodiacMainResponse | null;
  zodiacs: ZodiacCarouselType[];
  error: string | null;
  status: HttpActionKind | null;
};

type DailyHoroscopeStoreType = {
  sendDailyRequest: (requestFunction: () => Promise<ZodiacDailyResponse>) => Promise<void>;
  errorMessage?: string;
  dailyHoroscopeData: ZodiacDailyResponse | null;
  error: string | null;
  status: HttpActionKind | null;
};

const createGeneralHoroscopeSlice: StateCreator<MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType, [], [], GeneralInfoStoreType> = (set) => ({
  userName: null,
  mainZodiac: null,
  setUserName: (name: string) => {
    set({ userName: name });
  },
  setMainZodiac: (zodiac: string) => {
    set({ mainZodiac: zodiac });
  },
});

const createMainHoroscopeSlice: StateCreator<MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType, [], [], MainHoroscopeStoreType> = (set) => ({
  generalHoroscopeData: null,
  error: null,
  status: null,
  zodiacs: [],

  sendMainRequest: async (requestFunction: () => Promise<ZodiacMainResponse>) => {
    set({ status: HttpActionKind.PENDING, error: null, generalHoroscopeData: null });

    try {
      const responseData = await requestFunction();
      set({
        generalHoroscopeData: Object.values(responseData),
        zodiacs: mapZodiacMainResponseToHoroscopes(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },
});

const createDailyHoroscopeSlice: StateCreator<MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType, [], [], DailyHoroscopeStoreType> = (set) => ({
  dailyHoroscopeData: null,
  error: null,
  status: null,

  sendDailyRequest: async (requestFunction: () => Promise<ZodiacDailyResponse>) => {
    set({ status: HttpActionKind.PENDING, error: null, dailyHoroscopeData: null });

    try {
      const responseData = await requestFunction();
      set({
        dailyHoroscopeData: mapZodiacDailyResponseToHoroscopes(responseData),
        status: HttpActionKind.COMPLETED,
      });
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      set({ error: errorMessage, status: HttpActionKind.COMPLETED });
    }
  },
});

export const useHoroscopeStore = create<MainHoroscopeStoreType & GeneralInfoStoreType & DailyHoroscopeStoreType>()((...a) => ({
  ...createGeneralHoroscopeSlice(...a),
  ...createMainHoroscopeSlice(...a),
  ...createDailyHoroscopeSlice(...a),
}));
