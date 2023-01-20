import { useEffect, useState } from "react"
import { View } from "react-native"

export default function IngredientList() {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        async function fetchIngredients() {
            const response = await fetch("/api/ingredients")
            if(!response.ok) {
                console.error("Error fetching ingredients")
                return
            }
            setIngredients(await response.json())
        }
        fetchIngredients()
    }, [])

    return <View>
        {ingredients.map((ingredient) => <Ingredient {...ingredient}/>)}
    </View>
}

function Ingredient({name, quantity, _id}) {
    // const handleUningredient = async() => {
    //     const response = await fetch("/api/ingredients/" + spoonid, {
    //         method: "DELETE"
    //     })

    //     if(!response.ok) {
    //         console.error("Error unfavoriting recipe")
    //         return
    //     }
    //     console.log(await response.json())
    // }

    return <View>
        {name} x{quantity}
        {/* <button onClick={handleConsume}>consume</button> */}
    </View>
}