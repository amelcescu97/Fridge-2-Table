import { View , Text, Image, Button} from "react-native"
import {Link} from "react-router-dom"

export default function FavoriteList({favorites, onUnfavorite}) {
    return <View>
        {favorites.map((favorite) => <Favorite {...favorite} onUnfavorite={onUnfavorite}/>)}
    </View>
}

function Favorite({title, image, spoonid, onUnfavorite, _id}) {
    const handleUnfavorite = async() => {
        const response = await fetch("/api/favorites/" + spoonid, {
            method: "DELETE"
        })

        if(!response.ok) {
            console.error("Error unfavoriting recipe")
            return
        }
        console.log(await response.json())
        onUnfavorite(_id)
    }

    return <View>
        <Text>{title}</Text>
        <Image src = {image} alt = {title}/>
        <Button onClick={handleUnfavorite}>unfavorite</Button>
        <Link to={`/recipes/${_id}`}>
            View Recipe
        </Link>
    </View>
}