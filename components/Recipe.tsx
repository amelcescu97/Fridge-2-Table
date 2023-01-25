import { useEffect, useMemo, useState,} from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { SimpleRecipe } from "./RecipeList";

export default function Recipe({ title, image, raw, userSteps = {}, _id, onUpdateStep }) {
    const [editingInstructions, setEditingInstructions] = useState([])

    const ingredients = useMemo(() => {
        return raw.extendedIngredients
            .filter((ingredient) => {
                return ingredient.nameClean
            })
            .map((ingredient) => {
                return `${ingredient.amount} ${ingredient.unit} ${ingredient.nameClean}`
            })
    }, [raw])

    const instructions = useMemo(() => {
        const steps = raw.analyzedInstructions.flatMap((instruction) => {
            return instruction.steps.map((step) => {
                return step.step
            })
        })
        for (const i in userSteps) {
            steps[i] = userSteps[i]
        }
        return steps
    }, [raw, userSteps])

    useEffect(() => {
        setEditingInstructions(instructions.map(() => {
            return false
        }))
    }, [instructions])

    const updateEditingInstruction = (instruction, index) => {
        setEditingInstructions((previousEditingInstructions) => {
            return previousEditingInstructions.map((editingInstruction, i) => {
                if (i === index) {
                    return instruction
                }
                return editingInstruction
            })
        })
    }

    const submitEditedInstructions = async(index) => {
        const response = await fetch(`http://192.168.1.6:3001/api/favorites/${_id}/steps`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                number: index,
                text: editingInstructions[index]
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.error(errorData)
            console.error("Error adding step to recipe") 
            return
        }

        onUpdateStep(_id, index, editingInstructions[index])
        updateEditingInstruction(false, index)
    }

    return <View>
        <SimpleRecipe title={title} image={image} hideFavorite />
        <Text style={styles.biggerText}>Ingredients{"\n"}</Text>
        <View>
            {ingredients.map((ingredient, i) => {
                return <View key={i}><Text>{ingredient}</Text></View>
            })}
        </View>
        <Text>{"\n"}Instructions{"\n"} </Text>
        <View>
            {instructions.map((instruction, i) => {
                return <View key={i}>
                    {editingInstructions[i] ?
                        <View style={{width:"100%", display:"flex"}}>
                            <TextInput style={{flexGrow: 1}} onChange={(e) => updateEditingInstruction(e.target.value, i)} value={editingInstructions[i]}/></View> :
                        <View><Text>{i+1}. {instruction}{"\n"}</Text></View>}
                </View>
            })}
        </View>
    </View>
}

const styles = StyleSheet.create({
  biggerText: {
    fontSize: 15
  }
});