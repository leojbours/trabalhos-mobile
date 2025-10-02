import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { db, initDb } from "./data/db";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";
import PressableButton from "./PressableButton2";

initDb();

function getDespesas() {
  return db.getAllSync('SELECT * FROM despesas');
}

function insert(descricao, valor) {
  return db.runSync('INSERT INTO despesas (descricao, valor) VALUES (?, ?)', [descricao, valor]);
}

function deleteAll() {
  return db.runSync('DELETE FROM despesas');
}

function deleteById(id) {
  return db.runSync('DELETE FROM despesas WHERE id = (?)', [id]);
}

export default function App() {

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [despesas, setDespesas] = useState([]);

  function salvar() {

    if (!descricao.trim()) return;
    if (!valor) return;

    insert(descricao.trim(), valor);
    carregar();
  }

  function carregar() {
    setDespesas(getDespesas());
  }

  function deletarTodas() {
    deleteAll();
    carregar();
  }

  function deletarPorId(id) {
    if (!id) return;
    deleteById(id);
    carregar();
  }

  return (
    <SafeAreaProvider style={styles.defaultContainer}>
      <SafeAreaView style={styles.defaultContainer}>
        <View style={styles.defaultView}>
          <View>
            <Text>Descrição:</Text>
            <TextInput onChangeText={setDescricao} value={descricao} style={styles.defaultInputField}></TextInput>
          </View>
          <View>
            <Text>Valor:</Text>
            <TextInput onChangeText={setValor} value={valor} style={styles.defaultInputField}></TextInput>
          </View>
          <View style={styles.buttonsView}>
            <PressableButton title={"Deletar Todas"} color={'#f16161ff'} handlePress={deletarTodas} borderRadius={6}></PressableButton>
            <PressableButton title={"Carregar"} color={'#bcccffff'} handlePress={carregar} borderRadius={6}></PressableButton>
            <PressableButton title={"Salvar"} color={'#bcccffff'} handlePress={salvar} borderRadius={6}></PressableButton>
          </View>
          <View style={{marginTop: 12}}>
            <FlatList data={despesas} renderItem={({ item }) => (
              <View style={styles.tableRow}>
                <View style={styles.tableItem}>
                  <Text>{item.descricao} R${item.valor}</Text>
                </View>
                <PressableButton title={"X"} color={'#f16161ff'} handlePress={() => deletarPorId(item.id)} width={28}></PressableButton>
              </View>
            
          )} ></FlatList>
          </View>
      </View>
    </SafeAreaView>
    </SafeAreaProvider >
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    padding: 4,
  },

  defaultView: {
    width: "100%",
    flex: 1,
    gap: 8,
  },

  buttonsView: {
    flexDirection: "row",
    gap: 8,
    alignSelf: "flex-end",
  },

  tableRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  tableItem: {
    backgroundColor: '#f3f3f3',
    height: 32,
    justifyContent: "center",
    padding: 8,
    flex: 1,
  },

  defaultInputField: {
    padding: 8,
    borderRadius: 6,
    borderColor: "#d4d4d4ff",
    borderWidth: 1,
    height: 32,
  },
});