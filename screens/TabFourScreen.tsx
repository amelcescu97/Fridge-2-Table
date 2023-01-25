import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import Cards from "../src/mats/cards";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native';

export default function TabThreeScreen() {
  return (
    <ScrollView>
      <Text style={styles.title}>Recipes</Text>
      <View style={styles.container}>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      <Cards></Cards>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row'
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
