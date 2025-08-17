import React, {useState} from 'react';
import { View, Text, Button, Switch, Alert, TextInput, StyleSheet, ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView, SafeAreaProvider, SafeAreaInsetsContext, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [text, onChangeText] = React.useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}> 
          <Text>Universal React with Expo</Text>
          <Button onPress={() => Alert.alert("Button pressed") } title="Botão" color={"#000000ff"}></Button>
          <Switch style={{marginTop: 8}} onValueChange={toggleSwitch} value={isEnabled}></Switch>
          <TextInput style={[styles.textInput, {marginTop: 8}]} onChangeText={onChangeText} value={text} placeholder='Digite aqui!' placeholderTextColor={'#f3f3f3c6'}/>
          <View style={{flexDirection: 'row', marginTop: 8}}>
            <ActivityIndicator size={'small'} color={'#0000ff'} style={{marginRight: 8}}></ActivityIndicator>
            <ActivityIndicator size={'large'} color={'#0000ff'}></ActivityIndicator>
          </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  textInput: {
    width: 200,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'gray',
    borderWidth: 0,
    color: '#ffffffff',
    padding: 8
  }
})