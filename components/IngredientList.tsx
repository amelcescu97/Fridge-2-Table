import { useEffect, useState, useCallback } from "react"
import { View, Text, ScrollView } from "react-native"
//import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

export default function IngredientList() {
   const [ingredients, setIngredients] = useState([])

   // This hook returns `true` if the screen is focused, `false` otherwise
   const isFocused = useIsFocused();

   async function fetchIngredients() {
      const response = await fetch("http://192.168.1.6:3001/api/ingredients")
      if(!response.ok) {
          console.error("Error fetching ingredients")
          return
      }
      setIngredients(await response.json())
   }

   useEffect(() => {
           fetchIngredients()
       }, [])

   useEffect(() => {
        console.log("Screen should automatically refresh")
        fetchIngredients()
   }, [isFocused])

   return <ScrollView>
        {ingredients.map((ingredient, i) => <Ingredient key={i} {...ingredient}/>)}
    </ScrollView>
}

function Ingredient({name, quantity, _id}) {

    return <View>
        <Text>{name} x{quantity}</Text>
        {/* <button onClick={handleConsume}>consume</button> */}
    </View>
}