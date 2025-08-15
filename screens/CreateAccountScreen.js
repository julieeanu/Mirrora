// CreateAccountScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from 'expo-checkbox';

// ✅ Font imports
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold, LeagueSpartan_400Regular } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function CreateAccountScreen({ navigation }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);

  // ✅ Load fonts
  const [leagueSpartanLoaded] = useLeagueSpartan({
    LeagueSpartan_700Bold,
    LeagueSpartan_400Regular,
  });

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
  });

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null; // Wait for fonts to load
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>
        Fill your information below or register with your social account.
      </Text>

      <TextInput placeholder="Full Name" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon name={passwordVisible ? 'eye' : 'eye-off'} size={20} color="#A1866F" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          style={styles.passwordInput}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Icon name={confirmPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#A1866F" />
        </TouchableOpacity>
      </View>

      {/* Terms & Conditions */}
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked} onValueChange={setChecked} color={isChecked ? '#A1866F' : undefined} />
        <Text style={styles.checkboxText}>Agree with Terms & Condition</Text>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('VerifyCode')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Or sign up with */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign up with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Sign In Link */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text style={styles.link}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontFamily: 'LeagueSpartan_700Bold',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#555',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    fontFamily: 'Montserrat_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#727272',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  passwordInput: {
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    marginBottom: 20,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    color: '#555',
    marginVertical: 15,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  link: {
    fontFamily: 'Montserrat_400Regular',
    color: '#333',
  },
  signInLink: {
    color: '#7a5c3d',
    fontFamily: 'Montserrat_700Bold',
    textDecorationLine: 'underline',
  },
});
