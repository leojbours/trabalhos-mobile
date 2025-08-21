import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <View style={styles.headerImage}></View>
          <View>
            <Text style={{fontSize: 16, color:'black', fontWeight:'700'}}>Olá, Estudante</Text>
            <Text style={{color:'gray'}}>Bem-vindo ao seu painel</Text>
          </View>
        </View>
        <View style={{gap: 8}}>
          <Text style={{ fontWeight: '700' }}>Menu</Text>
          <View style={styles.horizontalButtons}>
            <PressableButton title={"NOTAS"} backgroundColor={'rgba(102, 102, 240, 0.87)'} customStyle={styles.horizontalButton}></PressableButton>
            <PressableButton title={"AULAS"} backgroundColor={'rgba(127, 238, 223, 0.87)'} customStyle={styles.horizontalButton}></PressableButton>
            <PressableButton title={"AVISOS"} backgroundColor={'rgba(231, 238, 127, 0.87)'} customStyle={styles.horizontalButton}></PressableButton>
          </View>
        </View>

        <View style={{gap: 8}}>
          <Text style={{ fontWeight: '700' }}>Próximas atividades</Text>
          <View style={styles.verticalButtons}>
            <PressableButton title={"Trabalho de Matemática"} backgroundColor={'rgba(212, 212, 212, 0.87)'} customStyle={styles.verticalButton} subtitle={"Entrega: 20/08"} subtitleStyle={styles.subtitle}></PressableButton>
            <PressableButton title={"Prova de Física (Importante)"} backgroundColor={'rgba(212, 212, 212, 0.87)'} customStyle={styles.verticalButton} subtitle={"Data: 22/08"} subtitleStyle={styles.subtitle}></PressableButton>
            <PressableButton title={"Leitura de História"} backgroundColor={'rgba(212, 212, 212, 0.87)'} customStyle={styles.verticalButton} subtitle={"Cap. 3 e 4"} subtitleStyle={styles.subtitle}></PressableButton>
          </View>
        </View>
        <View style={{gap: 8}}>
            <Text style={{fontWeight: '700'}} >Chamada para ação</Text>
            <View style={styles.actionContainer}>
              <Text>Adquira um novo curso e continue aprendendo!</Text>
              <PressableButton title={"COMPRAR CURSO"} backgroundColor={'#c46cdaff'} customStyle={styles.courseButton}></PressableButton>
            </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


function PressableButton({ title, onPress, backgroundColor, customStyle, subtitle, subtitleStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={[customStyle, {backgroundColor: backgroundColor}]}
    >
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>{title}</Text>
      {subtitle !== null && subtitle !== undefined ? <Text style={subtitleStyle}>{subtitle}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    gap: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
  },

  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 8
  },
  
  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 360,
    backgroundColor: 'black',
  },

  horizontalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 4,
    paddingRight: 4
  },

  verticalButtons: {
    justifyContent: 'space-around',
    paddingLeft: 4,
    paddingRight: 4,
    gap: 8
  },

  horizontalButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'#ffffff',
    width: 110,
    height: 40
  },

  verticalButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#919191ff',
    color:'#ffffff',
    padding: 10,
    width: '100%',
    height: 70
  },

  subtitle: {
    marginTop: 4,
    opacity: 0.8
  },
  
  actionContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#919191ff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8
  },

  courseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    color:'#ffffff',
    width: 150,
    height: 40
  }
})
