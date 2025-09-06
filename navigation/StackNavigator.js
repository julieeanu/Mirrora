import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignInScreen from "../screens/SignInScreen";
import CreateAccountScreen from '../screens/CreateAccountScreen';
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductListScreen from "../screens/ProductListScreen";
import WishlistScreen from "../screens/WishlistScreen";
import MessageScreen from '../screens/MessageScreen';
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen"; 
import ChatbotScreen from "../screens/ChatbotScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import MyOrderScreen from "../screens/MyOrderScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MyAddressScreen from "../screens/MyAddressScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
      <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
      <Stack.Screen name="Wishlist" component={WishlistScreen} />
      <Stack.Screen name="MessageScreen" component={MessageScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} /> 
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <Stack.Screen name="TrackOrderScreen" component={TrackOrderScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="MyAddressScreen" component={MyAddressScreen} />
    </Stack.Navigator>
  );
}
