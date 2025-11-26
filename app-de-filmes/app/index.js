import { Link, useRouter } from "expo-router";
import { View, Text, Button } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PressableButton from "../components/PressableButton";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaProvider style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <SafeAreaView>
        <View>
          <Link href="/tela1" asChild>
            <PressableButton title="Ir para tela de filmes" color={"#dfdfdfff"} borderRadius={6} />
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
