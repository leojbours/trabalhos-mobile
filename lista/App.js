import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  
  const [typedString, setTypedString] = useState("");
  
  const [values, setValues] = useState([]);

  function handleAdditem() {
    setValues([...values, typedString]);
    setTypedString("");
  }

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
          <Button title="Adicionar frase" onPress={handleAdditem} />
          <FlatList data={values} renderItem={({item}) =><Text>{item}</Text> } />
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
