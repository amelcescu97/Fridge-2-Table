import { View , Text, Image, Button, ScrollView, StyleSheet} from "react-native"
import {Link} from "react-router-dom"
import {useState, useEffect} from "react"
import { useIsFocused } from '@react-navigation/native';

export default function FavoriteList({navigation}) {
    const [favorites, setFavorites] = useState([])

    const isFocused = useIsFocused();

    const viewRecipe =  async(_id, favorites) => {
       navigation.navigate("Recipe Details", {_id: _id, favorites: favorites})
    }

    const handleUnfavorite = async() => {
        const response = await fetch("http://192.168.1.6:3001/api/favorites/" + spoonid, {
            method: "DELETE"
        })

        console.log(await response.json())
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
        console.log("Screen should automatically refresh")
        fetchFavorites()
    }, [isFocused])

    return <ScrollView  contentContainerStyle={styles.contentContainer}>
        {favorites.map((favorite, i) => <Favorite {...favorite} onUnfavorite={handleUnfavorite}
        favorites={favorites}
        viewRecipe={viewRecipe}
        key={i}/>)}
    </ScrollView>
}

function Favorite({title, image, spoonid, onUnfavorite, _id, viewRecipe, favorites}) {
    return <View >
        <Text style={styles.biggerTitle}>{title}</Text>
        <Image source = {image} alt = {title}/>
        <View style={styles.buttonInfo}><Button title={"View Recipe"} onPress={() => viewRecipe(_id, favorites)}></Button></View>
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
  buttonInfo: {
//     width: "50%",
//     alignItems: "center"
  }
});