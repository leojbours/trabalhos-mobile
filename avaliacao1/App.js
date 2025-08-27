import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.mainView}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>React Native</Text>
            <Text style={styles.subtitleText}>Avaliação dia 27/08</Text>
          </View>
          <View style={styles.centeredViews}>
            <View style={styles.potatosView}>
            <Text>Batatas são macias.</Text>
            </View>
            <View style={styles.submitButton}>
              <Text style={{color: 'white', fontWeight: '500'}}>ENVIAR</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  
  titleView: {
    alignSelf: 'flex-start',
    alignContent: 'center',
    marginLeft: 16,
    gap: 4
  },

  centeredViews: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 16
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 24
  },

  subtitleText: {
    color: '#4d4d4dff',
    fontSize: 15,
  },

  potatosView: {
    backgroundColor: '#e4ecfdff',
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#a4b7e2ff',
    borderWidth: 1
  },

  submitButton: {
    alignSelf: 'center',
    backgroundColor: '#5d97e2ff',
    width: 70,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  }
})