import { useEffect, useState } from "react"
import { View, Text, Image, Button } from "react-native"

export default function RecipeList() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        async function fetchRecipes() {
            const response = await fetch("/api/recipes")
            if(!response.ok) {
                console.error("Error fetching recipes")
                return
            }
            setRecipes(await response.json())
        }
        fetchRecipes()
    }, [])

    return <View>
        {recipes.map((recipe) => <SimpleRecipe {...recipe}/>)}
    </View>
}

export function SimpleRecipe({title, image, id, hideFavorite}) {
    const handleFavorite = async() => {
        const response = await fetch("/api/favorites/" + id, {
            method: "POST"
        })

        if(!response.ok) {
            console.error("Error favoriting recipe")
            return
        }
        console.log(await response.json())
    }

    return <View>
        <Text>{title}</Text>
        <Image src = {image} alt = {title}/>
        {!hideFavorite && <Button onClick={handleFavorite}>favorite</Button>}
    </View>
}