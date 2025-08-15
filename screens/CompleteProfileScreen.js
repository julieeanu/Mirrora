import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CompleteProfileScreen() {
  const [gender, setGender] = useState("");

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={{ fontSize: 20 }}>←</Text>
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
      <TextInput style={styles.input} placeholder="John Doe" />

      {/* Phone Number */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
      />

      {/* Gender */}
      <Text style={styles.label}>Gender</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
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
    paddingTop: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 20,
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
    width: "100%",
    height: 50,
    backgroundColor: "#a67c52",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
