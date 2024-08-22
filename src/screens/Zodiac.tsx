import { Text } from "react-native";
import React, { useState } from "react";
import { useHoroscopeStore } from "@/store/useHoroscopeStore ";
import { useShallow } from "zustand/react/shallow";
import { TabRoutes, ZodiacData } from "@/types/types";
import { useMainHoroscope } from "@/selectors/mainZodiacSelector";

import { TabView, SceneMap, TabBar, TabBarProps } from "react-native-tab-view";
import { WINDOW_WIDTH } from "@/UI/constants";
import { useAppTheme } from "@/UI/theme";

export default function Zodiac() {
  const theme = useAppTheme();

  const TodayRoute = () => <Text>Hoy</Text>;

  const GeneralRoute = () => <Text>General</Text>;

  const renderScene = SceneMap({
    TodayRoute: TodayRoute,
    GeneralRoute: GeneralRoute,
  });

  const [mainZodiac, userName] = useHoroscopeStore(useShallow((state) => [state.mainZodiac, state.userName]));
  const zodiac: ZodiacData | null = mainZodiac ? useMainHoroscope(mainZodiac) : null;

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "TodayRoute", title: "Hoy" },
    { key: "GeneralRoute", title: "General" },
  ]);

  const renderTabBar = (props: TabBarProps<TabRoutes>) => (
    <TabBar
      {...props}
      tabStyle={{ borderRightWidth: 1, borderColor: theme.colors.mediumPrimary }}
      indicatorStyle={{ backgroundColor: theme.colors.primaryContainer }}
      style={{ backgroundColor: "transparent", padding: 10, borderWidth: 1, borderColor: "transparent" }}
    />
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
