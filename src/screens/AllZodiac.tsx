import { StyleSheet, View } from "react-native";
import React from "react";

import ZodiacList from "@/components/ZodiacList";

const AllZodiac = () => {
  return (
    <View style={styles.container}>
      <ZodiacList />
    </View>
  );
};

export default AllZodiac;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
