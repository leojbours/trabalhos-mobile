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
          <Link href="/api" asChild>
            <PressableButton title="Ir para o consumo da api"  color={"#dfdfdfff"} borderRadius={6} />
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
