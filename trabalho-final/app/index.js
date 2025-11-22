import { View, Text } from "react-native";
import { Link } from "expo-router";
import PressableButton from "../components/PressableButton";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Link href={"/register-screen"} asChild>
            <PressableButton title={"Ir para tela de cadastro"} color={"#8ae3f6ff"} borderRadius={6}/>
        </Link>
    </View>
  );
}