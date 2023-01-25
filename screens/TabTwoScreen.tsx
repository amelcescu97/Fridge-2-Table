import { ScrollView, StyleSheet,Image } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SegButton from "../src/mats/segbutton"
import FoodTable from '../src/mats/datatable';
import { SegmentedButtons } from 'react-native-paper';
import React from 'react';
//const [value, setValue] = React.useState('');
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64,
  padding:100
};
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SegButton></SegButton>
      {/*<SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            label: 'Walking',
          },
          {
            value: 'train',
            label: 'Transit',
          },
          { value: 'drive', label: 'Driving' },
        ]}
      />*/}
      <FoodTable></FoodTable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
