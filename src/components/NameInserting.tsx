import React from "react";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "@/UI/constants";
import { useAppTheme } from "@/UI/theme";
import images from "assets/images";
import { View, StyleSheet, Image } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";

function NameInserting() {
  const theme = useAppTheme();
  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
        gap: theme.gap.large,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: theme.size.largeXXL,
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            color: theme.colors.onPrimary,
            fontFamily: theme.defaultFont,
            textShadowColor: "white",
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 50,
            textAlign: "center",
          }}
        >
          WELCOME TO THE HOROSCOPE APP
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Image
          source={images.carta_de_tarot}
          style={[
            {
              width: theme.iconSize.medium,
              height: theme.iconSize.medium,
            },
          ]}
        />
      </View>
      <View style={{ flex: 3, justifyContent: "flex-start", alignItems: "center", gap: theme.gap.medium }}>
        <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont }}>
          Please, type your name
        </Text>
        <TextInput
          label="Your name"
          style={{ width: theme.size.largeXXL }}
          right={
            <TextInput.Icon
              icon={({ size }) => (
                <Image
                  source={images.bola_de_cristal}
                  style={[
                    {
                      width: size,
                      height: size,
                    },
                  ]}
                />
              )}
            />
          }
        />
      </View>
      <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
        <Button
          mode="contained"
          contentStyle={{ flexDirection: "row-reverse" }}
          icon="arrow-right-bold-circle"
          onPress={() => console.log("Pressed")}
        >
          <Text variant="titleMedium" style={{ color: theme.colors.onPrimary, fontFamily: theme.defaultFont }}>
            Next
          </Text>
        </Button>
      </View>
    </View>
  );
}

export default NameInserting;

const styles = StyleSheet.create({
  zodiacText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Cinzel_700Bold",
    textAlign: "center",
    textShadowColor: "white",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 50,
    textTransform: "uppercase",
  },
});
