import { Alert, StyleSheet, Button, ImageBackground, Dimensions } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const image = { uri: 'https://t3.ftcdn.net/jpg/01/66/90/76/360_F_166907647_yVSdeRRgx6kB75Uiyx90LeLiX0d8N00B.webp' };

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.image} >
          <View style={{ alignItems: 'center', backgroundColor: 'transparent' }}>
            <Text style={styles.title}>Fridge2Table</Text>
            <Button title="Open" onPress={() => navigation.replace('Hom')} />
          </View>
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
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    height: screenHeight * 1.1,
    width: screenWidth * 1.1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover'
  },
});
