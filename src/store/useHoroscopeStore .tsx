import { create, StateCreator } from "zustand";

import { HttpActionKind, ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import { mapZodiacMainResponseToHoroscopes } from "@/selectors/mapZodiacMainResponse";

type GeneralInfoStoreType = {
  setMainZodiac: (zodiac: string) => void;
  setUserName: (name: string) => void;
  userName: string | null;
  mainZodiac: string | null;
};

type MainHoroscopeStoreType = {
  sendRequest: (requestFunction: () => Promise<ZodiacMainResponse>) => Promise<void>;
  errorMessage?: string;
  data: ZodiacMainResponse | null;
  zodiacs: ZodiacCarouselType[];
  error: string | null;
  status: HttpActionKind | null;
};

const createGeneralHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType,
  [],
  [],
  GeneralInfoStoreType
> = (set) => ({
  userName: null,
  mainZodiac: null,
  setUserName: (name: string) => {
    set({ userName: name });
  },
  setMainZodiac: (zodiac: string) => {
    set({ mainZodiac: zodiac });
  },
});

const createMainHoroscopeSlice: StateCreator<
  MainHoroscopeStoreType & GeneralInfoStoreType,
  [],
  [],
  MainHoroscopeStoreType
> = (set) => ({
  data: null,
  error: null,
  status: null,
  zodiacs: [],

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
});

export const useHoroscopeStore = create<GeneralInfoStoreType & MainHoroscopeStoreType>()((...a) => ({
  ...createGeneralHoroscopeSlice(...a),
  ...createMainHoroscopeSlice(...a),
}));
