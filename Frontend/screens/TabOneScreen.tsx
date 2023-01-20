import { Alert, StyleSheet,Button,ImageBackground,Dimensions  } from 'react-native';
import Favorites from "../components/Favorites";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
const image = {uri: 'https://t4.ftcdn.net/jpg/01/37/66/09/360_F_137660941_ngaDlQfM6PWlEm9NTwdVw4VzQJLhHCUu.jpg'};
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
     <Text style={styles.title}>Fridge2Table</Text>
      <Button title="Open" onPress={() => navigation.replace('Hom')} />
    
      {/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />*/} 
      </ImageBackground>
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
    color: 'black',
    position: 'absolute', right: 0,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight,
    width: screenWidth,
  },
});
