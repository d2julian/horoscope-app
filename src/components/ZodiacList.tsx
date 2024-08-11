import { View, StyleSheet } from "react-native";
import React from "react";

import { fakedata } from "@/fakedata";
import ZodiacItemList from "./ZodiacItemList";

export default function ZodiacList() {
  return (
    <View style={styles.listContainer}>
      {fakedata.map((z) => {
        return (
          <View key={z.name}>
            <ZodiacItemList image={z.image} name={z.name} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
