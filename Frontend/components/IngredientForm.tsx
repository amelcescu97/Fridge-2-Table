import { useState } from "react"
import { View, Text, TextInput, Button } from "react-native"

export default function IngredientForm() {
    const [name, setName] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await fetch("/api/ingredients/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name //same as name: name
            })
        })

        if (!response.ok) {
            console.error("Error making request")
            return
        }

        const responseBody = await response.json()

        console.log(responseBody)
    }

    return <View onSubmit={handleSubmit}>

        <View>
            <Text>name</Text>
            <TextInput value={name} onChange={(event) => setName(event.target.value)} />
        </View>
        <Button>add ingredient</Button>
    </View>
}