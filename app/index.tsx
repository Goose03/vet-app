import { Text, View } from "react-native";
import "../global.css"

import NewAnimal from "./NewAnimal";

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
        <NewAnimal />
      </View>
    </View>
  );
}
