import { useMemo, useState, useEffect} from "react";
import { View, ScrollView } from "react-native";
import Recipe from "../components/Recipe";

export default function ViewRecipe({navigation, route}) {
    const {favorite} = route.params
    const recipe = favorite;

    return <ScrollView>
        {recipe?._id && <Recipe {...recipe}/>}
    </ScrollView>
}