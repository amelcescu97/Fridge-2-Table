import { useEffect, useState } from "react"
import { View, Text, Image, Button, ScrollView, StyleSheet } from "react-native"
import { useIsFocused } from '@react-navigation/native';

export default function RecipeList() {
    const [recipes, setRecipes] = useState([])

    const isFocused = useIsFocused();

     async function fetchRecipes() {
        const response = await fetch("http://192.168.1.6:3001/api/recipes")
        if(!response.ok) {
            console.error(response)
            return
        }
        setRecipes(await response.json())
     }

    useEffect(() => {
        fetchRecipes()
    }, [])

   useEffect(() => {
        console.log("Screen should automatically refresh")
        fetchRecipes()
   }, [isFocused])


    return <ScrollView contentContainerStyle={styles.contentContainer}>
        {recipes.map((recipe, i) => <SimpleRecipe {...recipe} key={i}/>)}
    </ScrollView>
}

export function SimpleRecipe({title, image, id, hideFavorite}) {
    const handleFavorite = async() => {
        const response = await fetch("http://192.168.1.6:3001/api/favorites/" + id, {
            method: "POST"
        })

        if(!response.ok) {
            console.error("Error favoriting recipe")
            return
        }
    }

    return <View>
        <Text style={styles.biggerTitle}>{title}</Text>
        <Image source = {{uri: image}} style={styles.imageSize}/>
        {!hideFavorite && <Button title={"favorite"} onPress={handleFavorite}></Button>}
    </View>
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 5
  },
  biggerTitle: {
    fontSize: 23,
    fontWeight: "bold"
  },
  imageSize: {
    height: 100,
    width: "100%"
  }
});