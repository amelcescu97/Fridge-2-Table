import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, Keyboard, StyleSheet,SafeAreaView, ScrollView,TextInput, Text, View, Button} from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import * as eva from '@eva-design/eva';
import Checkbox from "../src/mats/checkbox";
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ApplicationProvider, Divider, List, ListItem } from '@ui-kitten/components';

export default function ShoppingListScreen() {
  const [item,setItem]=useState("")
  const [items,setItems]=useState([])
  const saveitem=async() =>{
    const value = await AsyncStorage.getItem("ITEMS")
    const n = value? JSON.parse(value):  []
    n.push(item)
    await AsyncStorage.setItem("ITEMS",JSON.stringify(n))
    setItem("");
    Keyboard.dismiss();
  }
  const [text, setText] = useState("");
  const [refresh, setRefresh] = useState(false);
  useFocusEffect(
    React.useCallback(()=>{
      getNotes()
    },[refresh])
  )

  const refreshData = () => {
    setRefresh(!refresh)
    console.log("should refresh list")
  }

  const getNotes= ()=>{
    AsyncStorage.getItem("ITEMS").then((items)=>{
      setItems(JSON.parse(items))
    })
  }
  const renderItem = ({ item, index }) => (
    <ListItem
      title={<Text category='h5'>{item}</Text>}
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
      <View>
      
      <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',}}>
      <Text style={styles.title}>Shopping List</Text>
      </View>
      <TextInput
      mode="outlined"
      label="Product"
      value={item}
      onChangeText={item => setItem(item)}
      style={styles.textBox}
      placeholder={"name"}
      onBlur={refreshData}
      />
      <View style={{flexDirection:'row',alignItems: 'center',justifyContent: 'center',}}>
      <View style={styles.buttonSpace}><Button title={"Add New Product"} onPress={saveitem}>
  </Button></View>
  <View style={styles.buttonSpace}><Button title={"Start New List"}  onPress={deletealllog}>
  </Button></View>
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
      </View>
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
  textBox: {
    borderColor: "gray",
    borderWidth: 2,
    margin: 10
  },
  buttonSpace: {
    marginHorizontal: 10,
    marginVertical: 10,
    marginBottom: 15
  }
});

