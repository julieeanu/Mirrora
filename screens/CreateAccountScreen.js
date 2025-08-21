// CreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
// Replaced Ionicons with MaterialCommunityIcons to access the lock-check icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'expo-checkbox';

// ✅ Font imports
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function CreateAccountScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  // ✅ Load fonts
  const [leagueSpartanLoaded] = useLeagueSpartan({
    LeagueSpartan_700Bold,
  });

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_700Bold
  });

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* ✅ Background top section */}
      <ImageBackground 
        source={require("../assets/header-bg.png")}
        style={styles.headerBg}
        resizeMode="cover"
      >
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Fill your information below</Text>
      </ImageBackground>

      {/* ✅ Inputs */}
      <View style={styles.formContainer}>
        
        {/* Full Name */}
        <View style={styles.inputContainer}>
          <Icon name="account-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput placeholder="Full Name" style={styles.textInput} />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A1866F" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          {/* Using lock-check-outline from MaterialCommunityIcons */}
          <Icon name="lock-check-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A1866F" />
          </TouchableOpacity>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={isChecked} 
            onValueChange={setChecked} 
            color={isChecked ? '#A1866F' : undefined} 
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.agreeWithText}>Agree with </Text>
            <Text style={styles.termsAndConditionText}>Terms & Condition</Text>
          </View>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('HomeScreen')} // Changed navigation destination here
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Sign In Link */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <Text style={styles.link}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  headerBg: {
    width: "100%",
    height: 280, // lowered header
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 25,
  },
  title: {
    fontSize: 28,
    fontFamily: 'LeagueSpartan_700Bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Montserrat_400Regular',
    color: "gray",
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,              
    borderColor: "#727272",      
    backgroundColor: "#FFFFFF",  
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  icon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: 'Montserrat_400Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  // Adjusted font size for "Agree with"
  agreeWithText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    paddingLeft: 10,
  },
  // Updated style for "Terms & Condition"
  termsAndConditionText: {
    color: '#A68B69',
    fontFamily: 'Montserrat_400Regular',
    textDecorationLine: "underline"
  },
  button: {
    backgroundColor: '#A68B69',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat_600SemiBold',
  },
  link: {
    fontFamily: 'Montserrat_400Regular',
    color: 'black',
  },
  signInLink: {
    color: '#7a5c3d',
    fontFamily: 'Montserrat_700Bold',
    textDecorationLine: 'underline',
  },
});
