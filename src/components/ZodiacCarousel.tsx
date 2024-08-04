import React, { useEffect } from "react";
import Carousel from "react-native-reanimated-carousel";
import { parallaxLayout } from "@/UI/parallax";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@/UI/constants";
import { getAllMainHoroscopes } from "@/lib/api";
import { HttpActionKind, ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import { mapZodiacMainResponseToHoroscopes } from "@/selectors/mapZodiacMainResponse";
import ZodiacItem from "./ZodiacItem";
import useHttp from "@/hooks/useHttp";

export default function ZodiacCarousel() {
  //TODO Añadir esta informacion en un context / state managment y llamarlo al iniicio de la app
  const { sendRequest, status, data, error } = useHttp<ZodiacMainResponse>(getAllMainHoroscopes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const PAGE_WIDTH = WINDOW_WIDTH;
  const PAGE_HEIGHT = WINDOW_HEIGHT - 100;
  const ITEM_WIDTH = PAGE_WIDTH * 0.75;

  const onPressHandler = (index: number) => {
    console.log("click index", index);
  };

  if (status === HttpActionKind.COMPLETED && data) {
    const mappedZodiacs: ZodiacCarouselType[] = mapZodiacMainResponseToHoroscopes(data);

    return (
      <Carousel
        vertical
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          alignItems: "center",
          marginTop: 20,
        }}
        width={ITEM_WIDTH}
        height={ITEM_WIDTH}
        customAnimation={parallaxLayout({
          size: ITEM_WIDTH,
        })}
        data={mappedZodiacs}
        renderItem={({ index, item }) => (
          <ZodiacItem index={index} image={item.image} name={item.name} onPressHandler={onPressHandler} />
        )}
      />
    );
  }
}
