import NameInserting from "@/components/NameInserting";
import ZodiacCarousel from "@/components/ZodiacCarousel";
import { useFonts, Cinzel_400Regular, Cinzel_700Bold } from "@expo-google-fonts/cinzel";
import images from "assets/images";
import React from "react";
import { ActivityIndicator, ImageBackground, StatusBar } from "react-native";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({ Cinzel_400Regular, Cinzel_700Bold });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <ImageBackground source={images.universe} style={{ flex: 1 }} resizeMode="cover">
          <NameInserting />
          {/* <ZodiacCarousel /> */}
          <StatusBar barStyle={"dark-content"} />
        </ImageBackground>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
