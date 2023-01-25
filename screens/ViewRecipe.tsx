import { useMemo } from "react";
import { View, ScrollView } from "react-native";
import Recipe from "../components/Recipe";

export default function ViewRecipe({navigation, route}) {
    const {_id, favorites} = route.params

    const recipe = useMemo(() => {
        if (!favorites) {
            return false
        }
        return favorites.find((favorite) => {
            return favorite._id === _id
        })
    }, [_id, favorites])

    return <ScrollView>
        {recipe && <Recipe {...recipe}/>}
    </ScrollView>
}