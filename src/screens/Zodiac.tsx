import { View, Text } from "react-native";
import React, { useState } from "react";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { useShallow } from "zustand/react/shallow";
import { ZodiacData } from "@/types/types";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { WINDOW_WIDTH } from "@/UI/constants";

const TodayRoute = () => <Text>Hoy</Text>;

const GeneralRoute = () => <Text>General</Text>;

const renderScene = SceneMap({
  TodayRoute: TodayRoute,
  GeneralRoute: GeneralRoute,
});

export default function Zodiac() {
  const [mainZodiac, userName] = useHoroscopeStore(useShallow((state) => [state.mainZodiac, state.userName]));
  const zodiac: ZodiacData | null = mainZodiac ? useMainHoroscope(mainZodiac) : null;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TodayRoute", title: "Hoy" },
    { key: "GeneralRoute", title: "General" },
  ]);

  const renderTabBar = (props) => (
    <TabBar {...props} indicatorStyle={{ backgroundColor: "white" }} style={{ backgroundColor: "transparent" }} />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WINDOW_WIDTH }}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
}
