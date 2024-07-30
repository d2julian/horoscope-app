import React from "react";
import { ImageBackground } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import images from "../../assets/images";
import { parallaxLayout } from "@/UI/parallax";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "@/UI/constants";
import { fakedata } from "@/fakedata";
import ZodiacItem from "./ZodiacItem";

export default function ZodiacCarousel() {
  const PAGE_WIDTH = WINDOW_WIDTH;
  const PAGE_HEIGHT = WINDOW_HEIGHT - 100;
  const ITEM_WIDTH = PAGE_WIDTH * 0.8;

  const onPressHandler = (index: number) => {
    console.log("click index", index);
  };

  return (
    <ImageBackground
      source={images.universe}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Carousel
        vertical
        style={{
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
          alignItems: "center",
        }}
        width={ITEM_WIDTH}
        height={ITEM_WIDTH}
        customAnimation={parallaxLayout({
          size: ITEM_WIDTH,
        })}
        data={fakedata}
        renderItem={({ index, item }) => (
          <ZodiacItem
            index={index}
            image={item.image}
            name={item.name}
            onPressHandler={onPressHandler}
          />
        )}
      />
    </ImageBackground>
  );
}
