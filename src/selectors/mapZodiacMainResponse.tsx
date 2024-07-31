import { ZodiacCarouselType, ZodiacMainResponse } from "@/types/types";
import images from "../../assets/images/index";

function mapZodiacMainResponseToHoroscopes(data: ZodiacMainResponse): ZodiacCarouselType[] {
  const zodiacs: ZodiacCarouselType[] = [];
  Object.keys(data).map((key) =>
    zodiacs.push({
      name: data[key].zodiac,
      image: images[data[key].zodiac],
    })
  );
  return zodiacs;
}

export { mapZodiacMainResponseToHoroscopes };
