import { View, Text } from "react-native";
import FavoriteList from "../components/FavoriteList";

export default function Favorites({favorites, onUnfavorite}) {
    return <View>
        <Text>Favorite Recipes</Text>
        <FavoriteList favorites={favorites} onUnfavorite={onUnfavorite}/>
    </View>
}