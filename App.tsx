// App.tsx
import React from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts, Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold } from "@expo-google-fonts/cinzel";
import StackNavigator from "@/navigation/StackNavigator";
import { theme } from "@/UI/theme";
import images from "assets/images";

export default function App() {
  const [fontsLoaded] = useFonts({ Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };

  return (
    <PaperProvider theme={theme}>
      <ImageBackground source={images.universe} style={{ flex: 1 }} resizeMode="cover">
        <NavigationContainer theme={navTheme}>
          <SafeAreaView style={styles.container}>
            <StackNavigator />
            <StatusBar style="light" backgroundColor={theme.colors.primary} />
          </SafeAreaView>
        </NavigationContainer>
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
