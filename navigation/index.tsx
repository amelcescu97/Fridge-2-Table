/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AddIngredient from '../screens/AddIngredientScreen';
import Favorites from '../screens/FavoritesScreen';
import IngredientsScreen from '../screens/IngredientsScreen';
import Recipes from '../screens/RecipeScreen';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import TabFourScreen from '../screens/TabFourScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ViewRecipe from '../screens/ViewRecipe';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={TabOneScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Recipe Details" component={ViewRecipe}/>
      <Stack.Screen name="Hom" component={BottomTabNavigator} options={{title:'Fridge2Table'}}/>
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="TabTwo"
        component={IngredientsScreen}
        options={({navigation}: RootTabScreenProps<'TabTwo'>) =>({
          title: 'Fridge',
          tabBarIcon: ({ color }) =>
          <MaterialCommunityIcons
          name="fridge"
          size={25}
          color={color}
          style={{ marginRight: 0 }}
          />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
      name="Shopping List"
      component={ShoppingListScreen}
      options={{
        headerShown: false,
        tabBarIcon: ({ color }) => <
        MaterialCommunityIcons
          name="playlist-edit"
          size={25}
          color={color}
          style={{ marginRight: 0 }}
        />,
      }}
      />
       <BottomTab.Screen
      name="AddIngredient"
      component={AddIngredient}
      options={{
        title:'Add Ingredient',
        tabBarIcon: ({ color }) => <
            Ionicons
              name="add"
              size={25}
              color={color}
              style={{ marginRight: 0 }}
            />,
      }}
      />
      {/*<BottomTab.Screen
      name="Ingredient"
      component={Ingredients}
      options={{
        title:'ingredients',
        tabBarIcon: ({ color }) => <
        MaterialCommunityIcons
                      name="bottle-tonic-outline"
                      size={25}
                      color={color}
                      style={{ marginRight: 0 }}
                    />,
      }}
      />
      */}
       <BottomTab.Screen
      name="RecScreen"
      component={Recipes}
      options={{
        title:'Recipes',
        tabBarIcon: ({ color }) => <
        MaterialCommunityIcons
                              name="book-open-page-variant"
                              size={25}
                              color={color}
                              style={{ marginRight: 0 }}
                            />,
      }}
      />
      <BottomTab.Screen
        name="TabSeven"
        component={FavoritesScreen}
        options={{
          title:'Favorite Recipes',
          tabBarIcon: ({ color }) => <
          MaterialIcons
            name="favorite"
            size={25}
            color={color}
            style={{ marginRight: 0 }}
          />,
        }}
        />
    </BottomTab.Navigator>

  );
}


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
