import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screen/Home";
import Favorit from "../screen/Favorit";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Test from "../screen/Test";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={Test} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favorit" component={Favorit} />
    </Tab.Navigator>
  );
}
