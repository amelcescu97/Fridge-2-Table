import React, { useState } from "react";
import { StyleSheet,View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const mainpage = ()=>{
    <View style={styles.container}>
        <Text>testing main page!</Text>
        <StatusBar style="auto" />
     </View>
     return (
		<>
			<LinearGradient
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

