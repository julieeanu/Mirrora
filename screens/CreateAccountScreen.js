// CreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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
          <Icon name="person-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput placeholder="Full Name" style={styles.textInput} />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Icon name="mail-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput placeholder="Email" style={styles.textInput} keyboardType="email-address" />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="#A1866F" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={20} color="#A1866F" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Icon name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#A1866F" />
          </TouchableOpacity>
        </View>

        {/* Terms & Conditions */}
        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={isChecked} 
            onValueChange={setChecked} 
            color={isChecked ? '#A1866F' : undefined} 
          />
          <Text style={styles.checkboxText}>Agree with Terms & Condition</Text>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('VerifyCode')}
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
  checkboxText: {
    marginLeft: 8,
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
