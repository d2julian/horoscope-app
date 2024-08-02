import { WINDOW_WIDTH } from "@/UI/constants";
import images from "assets/images";
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-paper";

function NameInserting() {
  return (
    <View style={{ width: WINDOW_WIDTH, justifyContent: "center", alignItems: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", width: WINDOW_WIDTH / 2 }}>
        <Image
          source={images.carta_de_tarot}
          style={[
            {
              width: 50,
              height: 50,
            },
          ]}
        />
        <Text style={styles.zodiacText}>WELCOME TO THE HOROSCOPE APP</Text>
        <Image
          source={images.carta_de_tarot}
          style={[
            {
              width: 50,
              height: 50,
            },
          ]}
        />
      </View>
      <Image source={images.tauro} style={{ width: 5, height: 5 }} />
      <TextInput
        label="Your Name"
        style={{ width: 250 }}
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
