import {
  Cinzel_400Regular,
  Cinzel_700Bold,
  useFonts,
} from "@expo-google-fonts/cinzel";
import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
} from "react-native";

type ZodiacItemProps = {
  index: number;
  image: ImageSourcePropType;
  name: string;
  onPressHandler: Function;
};

export default function ZodiacItem({
  index,
  image,
  name,
  onPressHandler,
}: ZodiacItemProps) {
  const [fontsLoaded] = useFonts({
    Cinzel_400Regular,
    Cinzel_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  const onPress = () => {
    onPressHandler(index);
  };
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <ImageBackground source={image} style={{ flex: 1 }} resizeMode="contain">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        ></View>
      </ImageBackground>
      <Text style={styles.zodiacText}>{name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  zodiacText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Cinzel_700Bold",
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 50,
    textTransform: "uppercase",
  },
});
