import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// Changing import from Ionicons to MaterialCommunityIcons for consistency
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// ✅ Fonts (matching your other screens)
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_700Bold });

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>New Password</Text>
      <Text style={styles.subtitle}>
        Your new password must be different from previously used passwords.
      </Text>

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputContainer}>
        {/* Changed icon and color to match other screens */}
        <Icon name="lock-outline" size={20} color="#A1866F" style={styles.icon} />
        <TextInput
          style={[styles.input, { fontFamily: "Montserrat_400Regular" }]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          placeholder="•••••••"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#A1866F"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.inputContainer}>
        {/* Changed icon and color to match other screens */}
        <Icon name="lock-check-outline" size={20} color="#A1866F" style={styles.icon} />
        <TextInput
          style={[styles.input, { fontFamily: "Montserrat_400Regular" }]}
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="•••••••"
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon
            name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#A1866F"
          />
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create New Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingTop: 80,
  },
  title: {
    fontFamily: "LeagueSpartan_700Bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
    marginTop: -5,
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",   // ✅ white background
    borderWidth: 1,               // ✅ border stroke
    borderColor: "#727272",       // ✅ stroke color
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    // optional: keep shadow or remove (I left it here, you can delete if not needed)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: "#000",
    // Added padding to match other screens
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: "#A67B5B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
    // Added drop shadow to the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
    fontSize: 18,
  },
});
