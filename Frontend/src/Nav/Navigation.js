import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from 'react';
import { View, Text } from 'react-native';
import { mainpage } from "./src/mainpage/mainpage";
export default function Navigation() {
	return (
		<NavigationContainer>
			<RootNavigator  />
		</NavigationContainer>
	);
}


const Stack = createNativeStackNavigator();

function RootNavigator() { 
    useEffect(() => {
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
    );
    return () => backHandler.remove();
}, []);
return (
    <>
        <UserProvider >
            <>
                <Stack.Navigator
                    screenOptions={{ headerShown: false, gestureEnabled: false }}
                >
                     <Stack.Screen name="MainPage" component={mainpage} />
                </Stack.Navigator>
            </>
        </UserProvider>
    </>
);
}