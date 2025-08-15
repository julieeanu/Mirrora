import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native"; // ✅ Added

// ✅ Import Montserrat and League Spartan like Create Account screen
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
  Montserrat_700Bold
} from "@expo-google-fonts/montserrat";
import {
  useFonts as useLeagueSpartan,
  LeagueSpartan_700Bold
} from "@expo-google-fonts/league-spartan";

export default function SignInScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); // ✅ Added

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
      <Text style={styles.subtitle}>
        Hi! Welcome back, you’ve been missed
      </Text>

      {/* Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="example@gmail.com" />

      {/* Password with Eye-off */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
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
      <TouchableOpacity onPress={() => console.log("Forgot password pressed")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Or sign in with */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign in with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity>
          <Image source={require("../assets/google.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../assets/facebook.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signupText}>
        Don’t have an account?{" "}
        <Text
          style={[styles.signupLink, { textDecorationLine: "underline" }]} // ✅ underline
          onPress={() => navigation.navigate("CreateAccount")} // ✅ navigate
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
    height: 250,
    resizeMode: "cover",
  },
  title: {
    fontSize: 32,
    fontFamily: "LeagueSpartan_700Bold",
    marginTop: -30,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    fontFamily: "Montserrat_400Regular",
    marginBottom: 30,
    marginTop: 25,
  },
  label: {
    width: "85%",
    fontSize: 14,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    width: "85%",
    height: 50,
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontFamily: "Montserrat_400Regular",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 50,
    borderWidth: 1,
    borderColor: "#727272",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: "space-between",
  },
  passwordInput: {
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
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  orText: {
    color: "gray",
    marginBottom: -2,
    marginHorizontal: 15,
    fontFamily: "Montserrat_400Regular",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  socialContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  signupText: {
    color: "gray",
    fontFamily: "Montserrat_400Regular",
  },
  signupLink: {
    color: "#7a5c3d",
    fontFamily: "Montserrat_700Bold",
  },
});
