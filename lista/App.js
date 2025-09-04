import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  const [typedString, setTypedString] = useState("");
  
  let values = [];

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Universal React with Expo</Text>
          <TextInput placeholder="Digite uma frase" onChangeText={setTypedString} value={typedString} />
          <Button title="Adicionar frase" onPress={() => values.push(typedString)} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  }
})
