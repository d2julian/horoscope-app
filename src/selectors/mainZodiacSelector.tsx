import { useHoroscopeStore } from "@/store/useHoroscopeStore ";

export const useMainHoroscope = (zodiac: string) => {
  return useHoroscopeStore((state) =>
    state.data ? (Object.values(state.data).find((item) => item.zodiac === zodiac) ?? null) : null
  );
};
