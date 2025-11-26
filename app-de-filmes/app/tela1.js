import { View, Text, TextInput, StyleSheet, FlatList } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { db, initDb } from "../data/db";
import { useEffect, useState } from "react";
import PressableButton from "../components/PressableButton";

initDb();

function deleteAll() {
  db.runSync( "DELETE FROM movies" );
}

function deleteById(id) {
  db.runSync( "DELETE FROM movies WHERE id = (?)", [id] );
}

function loadAllMovies()
{
  return db.getAllSync( "SELECT * FROM movies" );
}

function getMovieById(id) {
  const [movie] = db.getAllSync( "SELECT * FROM movies WHERE id = (?)", [id] );
  return movie;
}

function insertMovie(title, genre, year) {
  db.runSync( "INSERT INTO movies ( title, genre, year ) VALUES (?, ?, ?)", [title, genre, year] );
}

function editExercise(id, title, genre, year) {
  db.runSync( "UPDATE movies SET title = (?), genre = (?), year = (?) WHERE id = (?)", [title, genre, year, id] );
}

export default function Index() {

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState(0);
  const [movies, setMovies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function loadMovies() {
    setMovies(loadAllMovies());
  }

  function getMovies(id) {
    const movie = getMovieById(id);

    if (!movie) return;

    setTitle(movie.title);
    setGenre(movie.genre);
    setYear(Number(movie.year));
    setEditingId(movie.id);
  }

  function deleteAllMovies() {
    deleteAll();
    loadMovies();
  }

  function deleteMovie(id) {
    deleteById(id);
    loadMovies();
  }

  function addMovie() {
    if ( !title || !genre || !year ) return;
    insertMovie( title, genre, Number(year) );
    loadMovies();
  }

  function saveEdit() {
    if ( !editingId || !title || !genre || !year ) return;

    editExercise(editingId, title, genre, Number(year));

    setTitle("");
    setGenre("");
    setYear("");
    setEditingId(null);

    loadMovies();
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
      <SafeAreaProvider style={styles.defaultContainer}>
          <SafeAreaView style={styles.defaultContainer}>
              <View style={styles.defaultView}>
                  <View>
                      <Text>Titulo do filme:</Text>
                      <TextInput onChangeText={setTitle} value={title} style={styles.defaultInputField} />
                  </View>
                  <View>
                      <Text>Genero do filme:</Text>
                      <TextInput onChangeText={setGenre} value={genre} style={styles.defaultInputField} />
                  </View>
                  <View>
                      <Text>Ano de lançamento:</Text>
                      <TextInput onChangeText={setYear} value={String(year)} style={styles.defaultInputField}/>
                  </View>
                  <View style={styles.buttonsView}>
                      <PressableButton title={"Deletar Todas"} color={'#f16161ff'} handlePress={deleteAllMovies} borderRadius={6}></PressableButton>
                      <PressableButton title={"Salvar Edição"} color={'#bcccffff'} handlePress={saveEdit} borderRadius={6}></PressableButton>
                      <PressableButton title={"Salvar"} color={'#bcccffff'} handlePress={addMovie}></PressableButton>
                  </View>
                      <View style={{marginTop: 12}}>
                      <FlatList 
                      data={movies} 
                      renderItem={({ item }) => (
                          <View style={styles.tableRow}>
                              <View style={styles.tableItem}>
                                  <Text>Titulo: {item.title} Genero: {item.genre} Ano de lançamento: {item.year}</Text>
                              </View>
                              <PressableButton title={"E"} color={'#f1cf61ff'} handlePress={() => getMovies(item.id)} width={28}></PressableButton>
                              <PressableButton title={"X"} color={'#f16161ff'} handlePress={() => deleteMovie(item.id)} width={28}></PressableButton>
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