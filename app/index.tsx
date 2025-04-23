import React from "react";
import { View } from "react-native";
import "../global.css"
import Login from "./Login";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Login />
      </View>
    </View>
  );
}
