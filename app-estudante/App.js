import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.headerView}>
        <View style={styles.headerImage}></View>
        <View >
          <Text style={{fontSize: 16, color:'black'}}>Olá, Estudante</Text>
          <Text style={{color:'gray'}}>Bem-vindo ao seu painel</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    justifyContent: 'center',
    alignSelf: 'center'
  },
  
  headerImage: {
    borderRadius: 50,
    backgroundColor: 'white'
  }
})
