import { useMemo } from "react";
import { View, Text } from "react-native";
import {useParams} from "react-router-dom"
import Recipe from "../components/Recipe";

export default function ViewRecipe({favorites, onUpdateStep}) {
    const {id} = useParams()

    const recipe = useMemo(() => {
        return favorites.find((favorite) => {
            return favorite._id === id
        })
    }, [id, favorites])

    return <View>
        <Text>
            Recipe Details
        </Text>
        {recipe && <Recipe {...recipe} onUpdateStep={onUpdateStep}/>}
    </View>
}