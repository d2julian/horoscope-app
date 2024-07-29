import React from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel from "react-native-reanimated-carousel";
import bgTauro from "./assets/bg-tauro.jpg";
import bgAries from "./assets/bg-aries.jpg";
import bgLeo from "./assets/bg-leo.jpg";
import bgPiscis from "./assets/bg-piscis.jpg";
import bgCapricornio from "./assets/bg-capricornio.jpg";
import bgLibra from "./assets/bg-libra.jpg";

export default function App() {
  const width = Dimensions.get("window").width;
  const baseOptions = {
    width: width,
    style: {
      width: width,
    },
  } as const;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Carousel
          {...baseOptions}
          loop
          autoPlay={false}
          autoPlayInterval={2000}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={[
            { i: 0, bgImage: bgTauro },
            { i: 1, bgImage: bgLibra },
            { i: 2, bgImage: bgAries },
            { i: 2, bgImage: bgPiscis },
          ]}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item }) => (
            <ImageBackground source={item.bgImage} style={{ flex: 1 }} resizeMode="cover">
              <View
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  justifyContent: "center",
                }}
              ></View>
            </ImageBackground>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
