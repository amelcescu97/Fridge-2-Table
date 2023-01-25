import { View, Text } from "react-native";
import FavoriteList from "../components/FavoriteList";

export default function Favorites({navigation}) {
    return <View>
        <FavoriteList navigation={navigation}/>
    </View>
}