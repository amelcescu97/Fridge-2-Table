import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet,SafeAreaView, ScrollView,TextInput, } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import * as eva from '@eva-design/eva';
import { Text, View } from '../components/Themed';
import Checkbox from "../src/mats/checkbox";
import { Button } from 'react-native-paper';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { ApplicationProvider, Divider, List, ListItem } from '@ui-kitten/components';
import {Text as KitText} from '@ui-kitten/components';
export default function TabThreeScreen() {
  const [item,setItem]=useState("")
  const [items,setItems]=useState([])
  const saveitem=async() =>{
    const value = await AsyncStorage.getItem("ITEMS")
    const n = value? JSON.parse(value):  []
    n.push(item)
    await AsyncStorage.setItem("ITEMS",JSON.stringify(n))
    //console.log(item)
    setItem("")
  }
  const [text, setText] = useState("");
  useFocusEffect(
    React.useCallback(()=>{
      getNotes()
    },[])
  ) 
  const getNotes= ()=>{
    AsyncStorage.getItem("ITEMS").then((items)=>{
      setItems(JSON.parse(items))
    })
  }
  const renderItem = ({ item, index }) => (
    <ListItem
      title={<KitText category='h5'>{item}</KitText>}
      onPress={() => console.log('Pressed')}
    />
  );
  const deletealllog=()=>{
    console.log('Pressed')
     AsyncStorage.removeItem("ITEMS")
  }
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
    <View style={styles.container}>
      <ScrollView>
      
      <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',}}>
      <Text style={styles.title}>Shopping list</Text>
      </View>
      <TextInput
      mode="outlined"
      label="Product"
      value={item}
      onChangeText={item => setItem(item)}
    />
      <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',}}>
      <Button icon="camera" mode="contained" style={{justifyContent:'flex-start',display:'flex'}} onPress={saveitem}>
    Add New Product
  </Button>
  <Button icon="camera" mode="contained" onPress={deletealllog}>
    Start New List
  </Button>
  </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
      <List
      style={styles.container2}
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />

  </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </ScrollView>
    </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    maxHeight:200000,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

