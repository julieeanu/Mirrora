import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckBox from 'expo-checkbox';

// --- Firebase Imports ---
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// Make sure this path is correct for your project
import { auth } from '../Backend/firebaseConfig'; 

// Font imports
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";

export default function CreateAccountScreen({ navigation }) {
    // --- State for inputs ---
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');

    // --- State for UI/Modals ---
    // The password fields are hidden by default because this is set to 'false'
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalIcon, setModalIcon] = useState('information-outline');
    const [modalIconColor, setModalIconColor] = useState('#2196F3');
    const [isLoading, setIsLoading] = useState(false);
    // State to track which input is currently focused
    const [focusedInput, setFocusedInput] = useState(null);

    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold, Montserrat_700Bold });

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }
    
    // Custom modal component for all messages (success, warning, error)
    const MessageModal = () => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Icon name={modalIcon} size={70} color={modalIconColor} />
                    <Text style={styles.modalTitle}>{modalTitle}</Text>
                    <Text style={styles.modalText}>{modalMessage}</Text>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setModalVisible(false);
                            // If it's a success modal, navigate to the SignIn screen
                            if (modalIcon === 'check-circle-outline') {
                                navigation.navigate('SignIn');
                            }
                        }}
                    >
                        <Text style={styles.modalButtonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    // --- Handle Account Creation ---
    const handleCreateAccount = async () => {
        setIsLoading(true);

        // Basic Validation
        if (!fullName || !email || !password || !confirmPassword) {
            setModalTitle('Missing Fields');
            setModalMessage('Please fill out all fields.');
            setModalIcon('alert-circle-outline');
            setModalIconColor('#FFC107');
            setModalVisible(true);
            setIsLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            setModalTitle('Password Mismatch');
            setModalMessage('The passwords do not match.');
            setModalIcon('alert-circle-outline');
            setModalIconColor('#FFC107');
            setModalVisible(true);
            setIsLoading(false);
            return;
        }
        if (password.length < 6) {
            setModalTitle('Weak Password');
            setModalMessage('Password should be at least 6 characters.');
            setModalIcon('alert-circle-outline');
            setModalIconColor('#FFC107');
            setModalVisible(true);
            setIsLoading(false);
            return;
        }
        if (!isChecked) {
            setModalTitle('Terms & Conditions');
            setModalMessage('You must agree to the Terms & Conditions.');
            setModalIcon('alert-circle-outline');
            setModalIconColor('#FFC107');
            setModalVisible(true);
            setIsLoading(false);
            return;
        }

        try {
            // 1. Create user with Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // 2. Update their profile with the full name
            await updateProfile(userCredential.user, {
                displayName: fullName
            });

            setModalTitle('Registration Complete!');
            setModalMessage('Your account has been successfully created.');
            setModalIcon('check-circle-outline');
            setModalIconColor('#66BB6A');
            setModalVisible(true);

        } catch (error) {
            // Handle Firebase errors with user-friendly messages
            if (error.code === 'auth/email-already-in-use') {
                setModalTitle('Account Creation Failed');
                setModalMessage('This email already exists.');
                setModalIcon('close-circle-outline');
                setModalIconColor('#F44336');
                setModalVisible(true);
            } else if (error.code === 'auth/invalid-email') {
                setModalTitle('Invalid Email');
                setModalMessage('Please enter a valid email address.');
                setModalIcon('close-circle-outline');
                setModalIconColor('#F44336');
                setModalVisible(true);
            } else {
                setModalTitle('Signup Failed');
                setModalMessage('An unexpected error occurred. Please try again.');
                setModalIcon('close-circle-outline');
                setModalIconColor('#F44336');
                setModalVisible(true);
            }
            console.error("Firebase signup error:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require("../assets/header-bg.png")}
                style={styles.headerBg}
                resizeMode="cover"
            >
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Fill your information below</Text>
            </ImageBackground>

            <View style={styles.formContainer}>

                <View style={[
                    styles.inputContainer,
                    focusedInput === 'fullName' && styles.focusedInputContainer
                ]}>
                    <Icon name="account-outline" size={20} color="#A1866F" style={styles.icon} />
                    <TextInput 
                        placeholder="Full Name" 
                        style={styles.textInput} 
                        value={fullName} 
                        onChangeText={setFullName} 
                        onFocus={() => setFocusedInput('fullName')}
                        onBlur={() => setFocusedInput(null)}
                    />
                </View>

                <View style={[
                    styles.inputContainer,
                    focusedInput === 'email' && styles.focusedInputContainer
                ]}>
                    <Icon name="email-outline" size={20} color="#A1866F" style={styles.icon} />
                    <TextInput 
                        placeholder="Email" 
                        style={styles.textInput} 
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
                        placeholder="Password"
                        secureTextEntry={!passwordVisible}
                        style={styles.textInput}
                        value={password}
                        onChangeText={setPassword}
                        onFocus={() => setFocusedInput('password')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                        <Icon name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A1866F" />
                    </TouchableOpacity>
                </View>

                <View style={[
                    styles.inputContainer,
                    focusedInput === 'confirmPassword' && styles.focusedInputContainer
                ]}>
                    <Icon name="lock-check-outline" size={20} color="#A1866F" style={styles.icon} />
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry={!confirmPasswordVisible}
                        style={styles.textInput}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        onFocus={() => setFocusedInput('confirmPassword')}
                        onBlur={() => setFocusedInput(null)}
                    />
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <Icon name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'} size={20} color="#A1866F" />
                    </TouchableOpacity>
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#A1866F' : undefined}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.agreeWithText}>Agree with </Text>
                        <Text style={styles.termsAndConditionText}>Terms & Condition</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleCreateAccount}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={styles.link}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MessageModal />
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
        height: 280,
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
        paddingTop: 12,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        // Added a new border property for focus effect
        borderWidth: 1.5, 
        borderColor: "#F5F5F5",
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginTop: 15,
    },
    focusedInputContainer: {
        borderColor: '#A68B69', // Highlight color when focused
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
    agreeWithText: {
        color: '#000',
        fontSize: 14,
        fontFamily: 'Montserrat_400Regular',
        paddingLeft: 10,
    },
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
    // Modal Styles
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
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
    },
});
