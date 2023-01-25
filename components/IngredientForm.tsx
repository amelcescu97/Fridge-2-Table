import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"

export default function IngredientForm() {
    const [name, setName] = useState("")
    //const [test, setTest] = useState("testing")

    const handleSubmit = async () => {
        console.log("name is:", name)
        //console.log("test is:", test)
        const response = await fetch("http://192.168.1.6:3001/api/ingredients/add", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name //same as name: name
            })
        })
       .catch(err => {
              console.log('caught it!',err);
        });
        if (!response.ok) {
            console.log(await response.text())
            return
        }

        const responseBody = await response.json()

        console.log(responseBody)
    }

    return <View>
        <View>
            <TextInput value={name} onChangeText={setName} style={styles.textBox} placeholder={"name"}/>
        </View>
        <Button title={"Add Ingredient"} onPress={handleSubmit}></Button>
    </View>
}

const styles = StyleSheet.create({
  textBox: {
    borderColor: "gray",
    borderWidth: 2
  }
});

