import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert, 
  Modal, 
  ActivityIndicator 
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

// --- Firebase Imports ---
import { signInWithEmailAndPassword } from 'firebase/auth';
// CORRECTED PATH: Point to the backend folder
import { auth } from '../Backend/firebaseConfig'; 

// Import Montserrat and League Spartan
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";

export default function SignInScreen() {
  // --- State for inputs ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  // State to track which input is currently focused
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // State to control and customize the custom alert modal
  const [modalMessage, setModalMessage] = useState(null);
  const navigation = useNavigation();

  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_700Bold });
  const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });

  if (!montserratLoaded || !leagueSpartanLoaded) {
    return null; 
  }

  // Custom modal component for all messages (success, warning, error)
  const MessageModal = ({ title, message, icon, iconColor, onClose }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon name={icon} size={70} color={iconColor} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // --- Handle Sign In ---
  const handleSignIn = async () => {
    setIsLoading(true);

    if (!email || !password) {
      setModalMessage({
        title: 'Missing Fields',
        message: 'Please enter both your email and password to sign in.',
        icon: 'alert-circle-outline',
        iconColor: '#FFC107',
      });
      setIsLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On success, the onAuthStateChanged listener in your App.js
      // will handle navigation to the 'Home' screen automatically.
      navigation.navigate('Home');
    } catch (error) {
      setModalMessage({
        title: 'Sign In Failed',
        message: 'The email or password you entered is incorrect. Please try again.',
        icon: 'close-circle',
        iconColor: '#A68B69',
      });
      console.error("Firebase sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/header.png")} style={styles.topImage} />

      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Hi! Welcome back, you’ve been missed</Text>

      <View style={[
        styles.inputContainer,
        focusedInput === 'email' && styles.focusedInputContainer
      ]}>
        <Icon name="email-outline" size={20} color="#A1866F" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
        />
      </View>

      <View style={[
        styles.inputContainer,
        focusedInput === 'password' && styles.focusedInputContainer
      ]}>
        <Icon name="lock-outline" size={20} color="#A1866F" style={styles.icon} />
        <TextInput
          style={styles.inputField}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Icon
            name={passwordVisible ? "eye-outline" : "eye-off-outline"}
            size={22}
            color="#A1866F"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.signInText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <Text style={[styles.signupText, { color: "black" }]}>
        Don’t have an account?{" "}
        <Text
          style={[styles.signupLink, { textDecorationLine: "underline" }]}
          onPress={() => navigation.navigate("CreateAccount")}
        >
          Sign Up
        </Text>
      </Text>

      {modalMessage && (
        <MessageModal
          title={modalMessage.title}
          message={modalMessage.message}
          icon={modalMessage.icon}
          iconColor={modalMessage.iconColor}
          onClose={() => setModalMessage(null)}
        />
      )}
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
    backgroundColor: "#F5F5F5", 
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15, 
    borderWidth: 1.5,
    borderColor: "#F5F5F5",
  },
  focusedInputContainer: {
    borderColor: "#A68B69",
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 22,
    color: '#000',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
  },
  modalButton: {
    backgroundColor: '#A68B69',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 2,
  },
  modalButtonText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
});
