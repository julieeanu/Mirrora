import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Platform, Modal, Pressable, Alert, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

// --- Firebase Imports ---
import { auth, db } from '../Backend/firebaseConfig';
import { updateProfile, signInWithCustomToken } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function CompleteProfileScreen() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    // --- State for Backend Operations ---
    const [loading, setLoading] = useState(true); // For initial data fetch
    const [saving, setSaving] = useState(false);  // For when the user clicks save

    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });

    // --- Fetch Existing Profile Data ---
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Attempt to sign in with the custom token if it exists
                if (typeof __initial_auth_token !== 'undefined' && !auth.currentUser) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                }

                const currentUser = auth.currentUser;
                if (currentUser) {
                    const userDocRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setName(userData.name || currentUser.displayName || '');
                        setPhoneNumber(userData.phoneNumber || '');
                        setGender(userData.gender || '');
                    } else {
                        setName(currentUser.displayName || '');
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                Alert.alert("Error", "Could not load profile data. Please check your connection or try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // --- Save Profile Data ---
    const handleSaveProfile = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        if (!name.trim()) {
            Alert.alert("Validation Error", "Please enter your full name.");
            return;
        }

        setSaving(true);
        try {
            await updateProfile(currentUser, { displayName: name });
            const userDocRef = doc(db, "users", currentUser.uid);
            await setDoc(userDocRef, {
                name: name,
                phoneNumber: phoneNumber,
                gender: gender,
                email: currentUser.email
            }, { merge: true });

            Alert.alert("Success", "Your profile has been updated.");
            navigation.goBack();
        } catch (error) {
            console.error("Profile update error:", error);
            Alert.alert("Error", "Could not update your profile.");
        } finally {
            setSaving(false);
        }
    };

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A68B69" />
            </View>
        );
    }

    const GenderModal = () => {
        const genders = ['Female', 'Male', 'Other'];
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
            >
                <Pressable style={styles.centeredView} onPress={() => setModalVisible(false)}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Select Gender</Text>
                        {genders.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.genderOption}
                                onPress={() => {
                                    setGender(item);
                                    setModalVisible(false);
                                }}
                            >
                                <Text style={styles.genderOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Complete Your Profile</Text>
                    <Text style={styles.headerSubtitle}>
                        Don't worry, only you can see your personal data. No one else will be able to see it.
                    </Text>
                </View>

                {/* Profile Picture Section */}
                <View style={styles.profileImageContainer}>
                    <Icon name="account-circle" size={120} color="#A68B69" />
                    <TouchableOpacity style={styles.editIcon}>
                        <Icon name="pencil" size={16} color="#000" />
                    </TouchableOpacity>
                </View>

                {/* Form Inputs */}
                <View style={styles.formSection}>
                    {/* Name Input */}
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="John Doe"
                        placeholderTextColor="#777"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Phone Number Input */}
                    <Text style={styles.label}>Phone Number</Text>
                    <View style={styles.phoneInputContainer}>
                        <View style={styles.countryCodeContainer}>
                            <Text style={styles.countryCodeText}>+63</Text>
                            <Icon name="chevron-down" size={16} color="#777" />
                        </View>
                        <TextInput
                            style={styles.phoneInput}
                            placeholder="Enter Phone Number"
                            placeholderTextColor="#777"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                    </View>

                    {/* Gender Dropdown */}
                    <Text style={styles.label}>Gender</Text>
                    <TouchableOpacity style={styles.dropdownContainer} onPress={() => setModalVisible(true)}>
                        <Text style={styles.dropdownValue}>{gender || 'Select'}</Text>
                        <Icon name="chevron-down" size={24} color="#777" />
                    </TouchableOpacity>
                </View>

                {/* Complete Profile Button */}
                <TouchableOpacity style={styles.completeButton} onPress={handleSaveProfile} disabled={saving}>
                    {saving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.completeButtonText}>Complete Profile</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>

            {/* Gender Selection Modal */}
            <GenderModal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EFE9',
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 80,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 28,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    headerSubtitle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    profileImageContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#EBE3D5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        bottom: 30,
        right: 8,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F3EFE9',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    formSection: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#F3EFE9',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        fontFamily: 'Montserrat_400Regular',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EFE9',
        borderRadius: 10,
        marginBottom: 20,
        height: 50,
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRightWidth: 1,
        borderRightColor: '#ccc',
        height: '100%',
    },
    countryCodeText: {
        fontFamily: 'Montserrat_400Regular',
        marginRight: 5,
        color: '#777',
    },
    phoneInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontFamily: 'Montserrat_400Regular',
    },
    dropdownContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3EFE9',
        borderRadius: 10,
        paddingHorizontal: 15,
        height: 50,
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dropdownValue: {
        flex: 1,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
    },
    completeButton: {
        width: '100%',
        backgroundColor: '#A68B69',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    completeButtonText: {
        color: '#fff',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    // Modal styles
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'center',
    },
    genderOption: {
        padding: 10,
        width: '100%',
        alignItems: 'center',
    },
    genderOptionText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
});
