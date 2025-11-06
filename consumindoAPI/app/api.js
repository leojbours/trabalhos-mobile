import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

async function getHolidaysSync() {
    const response = await fetch("https://brasilapi.com.br/api/feriados/v1/2025");
    if ( response.ok ) {
        const payload = await response.json();
        return payload;
    }
}

export default function Api() {

    const [holidays, setHolidays] = useState([]);

    async function loadHolidays() {
        const holidays = await getHolidaysSync();
        console.log(holidays)
        setHolidays( holidays );
    }

    useEffect(() => {
        loadHolidays();
    }, []);

    return (
        <SafeAreaProvider style={styles.defaultContainer}>
            <SafeAreaView style={styles.defaultContainer}>
                <View style={styles.defaultView}>
                    <FlatList 
                    data={holidays} 
                    renderItem={({item}) => (
                        <View style={styles.defaultView}>
                            <Text>Feriado {item.type} no dia {item.date}: {item.name}</Text>
                        </View>
                    )} />
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