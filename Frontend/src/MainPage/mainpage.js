import React, { useState } from "react";
import { StyleSheet,View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export const mainpage = ()=>{
    <View style={styles.container}>
        <Text>testing main page!</Text>
        <StatusBar style="auto" />
     </View>
     return (
		<>
			<LinearGradient
			// Background Linear Gradient
				colors={["#D54324", "#1D54C9"]}
				start={{x:0, y:0}}
				end={{x:0, y:1}}
				style={styles.container}
			>
				<Text style={styles.logoText}> Fridge2Table </Text>
                </LinearGradient>
		</>
                )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });