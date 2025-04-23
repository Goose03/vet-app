import { Text, View } from "react-native";
import "../global.css"

import NewAnimal from "./NewAnimal";
import AnimalDetail from "./AnimalDetail";
import MainMenu from "./(tabs)/MainMenu";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="">
        <MainMenu />
      </View>
    </View>
  );
}
