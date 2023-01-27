import { View , Text, Image, Button, ScrollView, StyleSheet} from "react-native"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { useIsFocused } from '@react-navigation/native';
import { SimpleRecipe } from "./RecipeList";

export default function FavoriteList({navigation}) {
    const [favorites, setFavorites] = useState([])

    const isFocused = useIsFocused();

    const viewRecipe =  async(favorite) => {
        navigation.navigate("Recipe Details", {favorite: favorite})
     }

    const handleUnfavorite = async() => {
        const response = await fetch("http://192.168.1.6:3001/api/favorites/" + spoonid, {
            method: "DELETE"
        })
    }

    async function fetchFavorites() {
        const response = await fetch("http://192.168.1.6:3001/api/favorites")
        if(!response.ok) {
            console.error("Error fetching favorites")
            return
        }
        setFavorites(await response.json())
    }

    useEffect(() => {
        fetchFavorites()
    }, [])

    useEffect(() => {
        fetchFavorites()
    }, [isFocused])

    return <ScrollView  contentContainerStyle={styles.contentContainer}>
        {favorites.map((favorite, i) => 
            <Favorite 
                key={i} 
                favorite={favorite} 
                onUnfavorite={handleUnfavorite}
                viewRecipe={viewRecipe}
            />
        )}
    </ScrollView>
}

function Favorite({favorite, onUnfavorite, viewRecipe}) {    
    return <View >
        <Text style={styles.biggerTitle}>{favorite.title}</Text>
        <Image source={{ uri: favorite.image }}  style={styles.imageSize}/>
        <View>
            <Button title={"View Recipe"} onPress={() => viewRecipe(favorite)}></Button>
        </View> 
    </View>
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 5
  },
  biggerTitle: {
      fontSize: 20,
      fontWeight: "bold"
  },
  imageSize: {
    height: 100,
    width: "100%"
  }
});