import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import PressableButton from "../components/PressableButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { debounce } from "../util/debounce";

async function getItemsFromAPI() {
  const response = await fetch("http://177.44.248.50:8080/games")
  if (response.ok) {
    const payload = await response.json();
    return payload;
  }
}

async function getItemFromAPI(id) {
  const response = await fetch(`http://177.44.248.50:8080/games/${id}`)
  if (response.ok) {
    const payload = await response.json();
    return payload;
  }
}

async function sendItemToAPI(title, slug, price, developer) {
  const response = await fetch("http://177.44.248.50:8080/games", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, slug, price, developer}),
  });
  return response.ok;
}

async function sendEditToAPI(id, title, slug, price, developer) {
  const response = await fetch(`http://177.44.248.50:8080/games/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, slug, price, developer}),
  });
  return response.ok;
}

async function deleteFromAPI(id) {
  const response = await fetch(`http://177.44.248.50:8080/games/${id}`, {
    method: "DELETE",
    headers: {"Content-Type": "application/json"},
  });
  return response.ok;
}

async function searchAPI(text) {
    const response = await fetch(`http://177.44.248.50:8080/games/search?q=${text}`);
    if (response.ok) {
        const payload = await response.json();
        return payload;
    }
}

export default function App() {

  const [title, setTitle] = useState("");
  const [itemSlug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("")
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [searchText, setSearchText] = useState("");
  const searchDebounce = debounce();

  async function loadItems() {
    const items = await getItemsFromAPI();
    setItems(items);
    return items;
  }

  async function getItem(id) {
    const item = await getItemFromAPI(id);
    if (!item) return;
    setTitle(item.title);
    setSlug(item.slug);
    setPrice(String(item.price));
    setAuthor(item.developer);
    setEditingId(id);
  }

  async function saveItem() {
    const ok = await sendItemToAPI(title, itemSlug, Number(price));
    if (ok) {
      setTitle("");
      setSlug("");
      setPrice("");
      setAuthor("");
      await loadItems();
    }
  }

  async function editItem() {
    if (!editingId) return;
    const ok = await sendEditToAPI(editingId, title, itemSlug, Number(price));
    if (ok) {
      setTitle("");
      setSlug("");
      setPrice("");
      setAuthor("");
      setSearchText("");
      setEditingId(null);
      await loadItems();
    }
  }

  async function deleteItem(id) {
    const ok = await deleteFromAPI(id);
    if (ok) await loadItems();
  }

  async function search(searchText) {
    const items = await searchAPI(searchText);
    setItems(items);
  }

  function onSearchItem(text) {
    setSearchText(text);
    searchDebounce(() => {
        if (!text) {
            loadItems();
        } else {
            search(text);
        } 
    }, 180 );
  }

  useEffect(() => {
    loadItems();
  }, [])

  return (
    <SafeAreaProvider style={styles.defaultContainer}>
      <SafeAreaView style={styles.defaultContainer}>
        <View style={styles.defaultContainer}>
          <View style={styles.fieldsContainer}>
            <View style={{flexDirection: "row", width: "100%", gap: 8}}>
              <TextInput onChangeText={setTitle} value={title} placeholder="Nome" style={[styles.defaultField, styles.sideBySideFields]} placeholderTextColor={"#999"}/>
              <TextInput onChangeText={setPrice} value={price} placeholder="Preço" style={[styles.defaultField, styles.sideBySideFields]} placeholderTextColor={"#999"}/>
            </View>
            <View style={{flexDirection: "row", width: "100%", gap: 8}}>
                <TextInput onChangeText={setSlug} value={itemSlug} placeholder="Slug" style={[styles.defaultField, styles.sideBySideFields]} placeholderTextColor={"#999"}/>
                <TextInput onChangeText={setAuthor} value={author} placeholder="Autor" style={[styles.defaultField, styles.sideBySideFields]} placeholderTextColor={"#999"}/>
            </View>
            <View style={{flexDirection: "row", width: "100%", gap: 8, justifyContent: "flex-end"}}>              
                <PressableButton title="Salvar Edição" color={"#90c8ffff"} handlePress={editItem} width="49%"/>
                <PressableButton title="Salvar" color={"#90c8ffff"} handlePress={saveItem} width="49%"/>
            </View>
          </View>
          <View style={styles.listContainer}>
            <TextInput onChangeText={onSearchItem} placeholder="Pesquise..." style={styles.defaultField} placeholderTextColor={"#999"}/>
            <FlatList 
            data={items}
            renderItem={({item}) => (
              <View style={styles.listRow}>
                <View style={styles.listItem}>
                  <Text>{item.title}</Text>
                  <Text>{item.slug}</Text>
                  <Text>{item.price}</Text>
                </View>
                <View style={{marginLeft: "auto", marginRight: 4}}>
                  <PressableButton title={"E"} color={'#f1cf61ff'} handlePress={() => getItem(item.id)} width={28}/>
                  <PressableButton title={"X"} color={'#f16161ff'} handlePress={() => deleteItem(item.id)} width={28}/>
                </View>
              </View>
            )}/>
          </View>
       </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  defaultContainer: {
    flex: 1,
    padding: 4
  },

  fieldsContainer: {
    gap: 8
  },

  defaultField: {
    padding: 6,
    borderRadius: 8,
    borderColor: "#999",
    borderWidth: 1,
    height: 32
  },

  sideBySideFields: {
    flex: 1
  },

  listItem: {
    gap: 4,
    flexShrink: 1,
    flexGrow: 1
  },

  listRow: {
    flex: 1,
    width: "100%",
    maxWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#999",
    borderWidth: 1,
    padding: 8
  },

  listContainer: {
    gap: 8,
    marginTop: 16
  }
})