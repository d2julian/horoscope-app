// navigation/StackNavigator.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NameInserting from "@/components/NameInserting";
import ZodiacCarousel from "@/components/ZodiacCarousel";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="NameInserting">
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="NameInserting"
        component={NameInserting}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name="ZodiacCarousel"
        component={ZodiacCarousel}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;
