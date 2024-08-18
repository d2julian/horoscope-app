// App.tsx
import React, { useEffect } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Icon, PaperProvider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts, Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold } from "@expo-google-fonts/cinzel";
import StackNavigator from "@/navigation/StackNavigator";
import { theme } from "@/UI/theme";
import images from "assets/images";
import { getAllMainHoroscopes } from "@/lib/api";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { HttpActionKind } from "@/types/types";

export default function App() {
  const [fontsLoaded] = useFonts({ Cinzel_400Regular, Cinzel_700Bold, Cinzel_600SemiBold });
  const sendRequest = useHoroscopeStore((state) => state.sendRequest);
  const error = useHoroscopeStore((state) => state.error);
  const status = useHoroscopeStore((state) => state.status);

  useEffect(() => {
    sendRequest(getAllMainHoroscopes);
  }, [sendRequest]);

  if (HttpActionKind.COMPLETED && error) {
    return (
      <>
        <Text>
          {<Icon source="emoticon-dead-outline" size={20} color="red" />}Ha ocurrido un error {error}
          {<Icon source="emoticon-dead-outline" size={20} color="red" />}
        </Text>
      </>
    );
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
        {status === HttpActionKind.PENDING || !fontsLoaded ? (
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={theme.colors.primaryContainer} />
          </View>
        ) : (
          <NavigationContainer theme={navTheme}>
            <SafeAreaView style={styles.container}>
              <StackNavigator />
              <StatusBar style="light" backgroundColor={theme.colors.primary} />
            </SafeAreaView>
          </NavigationContainer>
        )}
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
