import { View, Text, TextInput, StyleSheet, FlatList } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";
import { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";

initDb();

function deleteAll() {
  db.runSync( "DELETE FROM exercises" );
}

function deleteById(id) {
  db.runSync( "DELETE FROM exercises WHERE id = (?)", [id] );
}

function loadAllExercises()
{
  return db.getAllSync( "SELECT * FROM exercises" );
}

function getExerciseById(id) {
  const [exercise] = db.getAllSync( "SELECT * FROM exercises WHERE id = (?)", [id] );
  return exercise;
}

function insertExercise(activity, minDuration, category) {
  db.runSync( "INSERT INTO exercises ( activity, minDuration, category ) VALUES (?, ?, ?)", [activity, minDuration, category] );
}

function editExercise(id, activity, minDuration, category) {
  db.runSync( "UPDATE exercises SET activity = (?), minDuration = (?), category = (?) WHERE id = (?)", [activity, minDuration, category, id] );
}

export default function Index() {

  const [activity, setActivity] = useState("");
  const [minDuration, setDuration] = useState(0);
  const [category, setCategory] = useState("");
  const [exercises, setExercises] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function loadExercises() {
    setExercises(loadAllExercises());
  }

  function getExercise(id) {
    const exercise = getExerciseById(id);

    if (!exercise) return;

    setActivity(exercise.activity);
    setDuration(parseInt(exercise.minDuration));
    setCategory(exercise.category);
    setEditingId(exercise.id);
  }

  function deleteAllExercises() {
    deleteAll();
    loadExercises();
  }

  function deleteExercise(id) {
    deleteById(id);
    loadExercises();
  }

  function addExercise() {
    insertExercise( activity, minDuration, category );
    loadExercises();
  }

  function saveEdit() {
    if ( !editingId || !activity || !minDuration || !category ) return;

    editExercise(editingId, activity, minDuration, category);

    setActivity("");
    setDuration(0);
    setCategory("");
    setEditingId(null);

    loadExercises();
  }

  useEffect(() => {
    loadExercises();
  }, []);

  return (
      <SafeAreaProvider style={styles.defaultContainer}>
          <SafeAreaView style={styles.defaultContainer}>
              <View style={styles.defaultView}>
                  <View>
                      <Text>Atividade:</Text>
                      <TextInput onChangeText={setActivity} value={activity} style={styles.defaultInputField} />
                  </View>
                  <View>
                      <Text>Duração minima:</Text>
                      <TextInput onChangeText={setDuration} value={minDuration} style={styles.defaultInputField} />
                  </View>
                  <View>
                      <Text>Categoria:</Text>
                      <TextInput onChangeText={setCategory} value={category} style={styles.defaultInputField}/>
                  </View>
                  <View style={styles.buttonsView}>
                      <PressableButton title={"Deletar Todas"} color={'#f16161ff'} handlePress={deleteAllExercises} borderRadius={6}></PressableButton>
                      <PressableButton title={"Salvar Edição"} color={'#bcccffff'} handlePress={saveEdit} borderRadius={6}></PressableButton>
                      <PressableButton title={"Salvar"} color={'#bcccffff'} handlePress={addExercise} borderRadius={6}></PressableButton>
                  </View>
                      <View style={{marginTop: 12}}>
                      <FlatList 
                      data={exercises} 
                      renderItem={({ item }) => (
                          <View style={styles.tableRow}>
                              <View style={styles.tableItem}>
                                  <Text>Atividade: {item.activity} Duração: {item.minDuration} Categoria: {item.category}</Text>
                              </View>
                              <PressableButton title={"E"} color={'#f1cf61ff'} handlePress={() => getExercise(item.id)} width={28}></PressableButton>
                              <PressableButton title={"X"} color={'#f16161ff'} handlePress={() => deleteExercise(item.id)} width={28}></PressableButton>
                          </View>
                      
                      )} >
                      </FlatList>
                  </View>
            </View>   
          </SafeAreaView>
      </SafeAreaProvider>
  )
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