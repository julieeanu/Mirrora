import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";

// ✅ Font imports (same as VerifyCodeScreen)
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function CompleteProfileScreen({ navigation }) {
  const [gender, setGender] = useState("");

  // Load fonts
  const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_700Bold });

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null; // Could use a loading screen here
  }

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={[styles.backBtn, styles.backBtnTapArea]}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        onPress={() => {
          if (navigation?.canGoBack()) navigation.goBack();
          else navigation.navigate("VerifyCode"); // fallback
        }}
      >
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Complete Your Profile</Text>
      <Text style={styles.subtitle}>
        Don’t worry, only you can see your personal data. No one else will be able to see it.
      </Text>

      {/* Profile icon */}
      <View style={styles.profilePicContainer}>
        <Image
          source={require("../assets/profile-placeholder.png")}
          style={styles.profilePic}
        />
        <TouchableOpacity style={styles.editIcon}>
          <Image source={require("../assets/edit.png")} style={{ width: 18, height: 18 }} />
        </TouchableOpacity>
      </View>

      {/* Name */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Montserrat_400Regular" }]}
        placeholder="John Doe"
        placeholderTextColor="#888"
      />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[styles.input, { fontFamily: "Montserrat_400Regular" }]}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        placeholderTextColor="#888"
      />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={{ fontFamily: "Montserrat_400Regular" }}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Complete Profile</Text>
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
  backBtn: {
    position: "absolute",
    top: 80,
    left: 30,
  },
  title: {
    fontFamily: "LeagueSpartan_700Bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 15,
    marginTop: -5,
    marginLeft: 20,
  },
  subtitle: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 120,
    backgroundColor: "#a67c52",
    borderRadius: 12,
    padding: 3,
  },
  label: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
    color: "#000",
  },
  picker: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: "#A67B5B",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontFamily: "Montserrat_700Bold",
    color: "#fff",
    fontSize: 18,
  },
});
