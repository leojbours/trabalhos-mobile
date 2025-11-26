import { View, Text, TextInput, StyleSheet, FlatList, Pressable } from "react-native";
import PressableButton from "../components/PressableButton";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";

export default function App() {
    const { title, slug, descripton, developer, publisher, genre, platform, releaseDate, price } = useLocalSearchParams();

    return (
        <SafeAreaProvider style={styles.defaultContainer}>
            <SafeAreaView style={styles.defaultContainer}>
                <View style={{alignItems: "flex-start"}}>
                    <PressableButton title={'<-'} handlePress={() => router.back()} style={{height: 24}}/>
                </View>
                <View style={styles.pageContainer}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text>{developer}</Text>
                    </View>
                    <View>
                        <Text>Preço: {price}</Text>
                        <Text>Publisher: {publisher}</Text>
                        <Text>Genero: {genre}</Text>
                        <Text>Data de lançamento: {releaseDate}</Text>
                        <Text>Slug: {slug}</Text>
                        <Text>Plataforma: {platform}</Text>
                        <View>
                            <Text>Descrição:</Text>
                            <Text>{descripton}</Text>
                        </View>
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

    pageContainer: {
        gap: 16
    },

    title: {
        fontSize: 24
    },
})