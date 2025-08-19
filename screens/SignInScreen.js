import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

// ✅ Import Montserrat and League Spartan
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useLeagueSpartan,
  LeagueSpartan_700Bold,
} from "@expo-google-fonts/league-spartan";

export default function SignInScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  // ✅ Load fonts
  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });
  const [leagueSpartanLoaded] = useLeagueSpartan({
    LeagueSpartan_700Bold,
  });

  if (!montserratLoaded || !leagueSpartanLoaded) {
    return null; // Avoid rendering before fonts are loaded
  }

  return (
    <View style={styles.container}>
      {/* Top background PNG */}
      <Image source={require("../assets/header.png")} style={styles.topImage} />

      {/* Title */}
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Hi! Welcome back, you’ve been missed</Text>

      {/* Email with Icon */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="example@gmail.com"
          keyboardType="email-address"
        />
      </View>

      {/* Password with Icon + Eye toggle */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye" : "eye-off"}
            size={22}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => navigation.navigate("NewPassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity
        style={styles.signInButton}
        onPress={() => navigation.navigate("Home")} // ✅ Navigates to Home
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <Text style={[styles.signupText, { color: "black" }]}>
        Don’t have an account?{" "}
        <Text
          style={[styles.signupLink, { textDecorationLine: "underline" }]}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontSize: 30,
    fontFamily: "LeagueSpartan_700Bold",
    marginTop: -80,
  },
  subtitle: {
    fontSize: 15,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 30,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 50,
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    flex: 1,
    fontFamily: "Montserrat_400Regular",
  },
  forgotText: {
    alignSelf: "flex-end",
    marginLeft: 200,
    color: "#7a5c3d",
    marginBottom: 20,
    textDecorationLine: "underline",
    fontFamily: "Montserrat_400Regular",
  },
  signInButton: {
    width: "85%",
    height: 50,
    backgroundColor: "#A68B69",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  signupText: {
    fontFamily: "Montserrat_400Regular",
  },
  signupLink: {
    color: "#7a5c3d",
    fontFamily: "Montserrat_700Bold",
  },
});
