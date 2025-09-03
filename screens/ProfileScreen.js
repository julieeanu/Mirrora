import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, ActivityIndicator, Platform, TextInput } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import BottomNavigationBar from '../components/BottomNavigationBar';

// --- Firebase Imports ---
import { auth, db } from '../Backend/firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ProfileScreen() {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [showSettings, setShowSettings] = useState(false); // New state for toggling the settings view
    const [showHelpModal, setShowHelpModal] = useState(false); // New state for the Help & Support modal

    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });

    // This useEffect hook fetches user data from Firebase every time the screen is focused.
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    setEmail(currentUser.email);

                    const userDocRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setName(userData.name || currentUser.displayName || 'No name set');
                    } else {
                        setName(currentUser.displayName || 'No name set');
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user data for profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isFocused && !showSettings && !showHelpModal) {
            fetchUserData();
        }
    }, [isFocused, showSettings, showHelpModal]);

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setShowLogoutModal(false);
            navigation.navigate('SignIn');
        } catch (error) {
            console.error('Sign out error', error);
        }
    };

    const handleSettingsPress = () => {
        setShowSettings(true);
    };

    const handleHelpPress = () => {
        setShowHelpModal(true);
    };

    const handleGoBack = () => {
        if (showSettings) {
            setShowSettings(false);
        } else {
            navigation.goBack();
        }
    };

    // Reusable component for menu items
    const MenuItem = ({ icon, title, onPress, isLast = false }) => (
        <TouchableOpacity style={[styles.menuItem, isLast && styles.lastMenuItem]} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={styles.iconCircle}>
                    <Icon name={icon} size={24} color="#A68B69" />
                </View>
                <Text style={styles.menuItemText}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#777" />
        </TouchableOpacity>
    );

    const renderProfileContent = () => (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            {/* User Info Section */}
            <View style={[styles.userInfoSection, { position: 'relative' }]}>
                <Image source={require('../assets/profile.png')} style={styles.avatar} />
                <TouchableOpacity style={styles.editIconContainer} onPress={() => navigation.navigate('CompleteProfile')}>
                    <Icon name="pencil" size={18} color="#A68B69" />
                </TouchableOpacity>
                <Text style={[styles.userName, loading && styles.skeletonName]}>
                    {loading ? ' ' : name}
                </Text>
                <Text style={[styles.userHandle, loading && styles.skeletonEmail]}>
                    {loading ? ' ' : email}
                </Text>
            </View>

            {/* Menu Items Section */}
            <View style={styles.menuSection}>
                <MenuItem icon="account-outline" title="Edit Profile" onPress={() => navigation.navigate('CompleteProfile')} />
                <MenuItem icon="archive-outline" title="My Orders" onPress={() => navigation.navigate('MyOrderScreen')} />
                <MenuItem icon="heart-outline" title="Wishlist" onPress={() => navigation.navigate('Wishlist')} />
                <MenuItem icon="help-circle-outline" title="Help & Support" onPress={handleHelpPress} />
                <MenuItem icon="cog-outline" title="Setting" onPress={handleSettingsPress} isLast={true} />
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );

    const renderSettingsContent = () => (
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.sectionHeader}>General</Text>
            <View style={styles.menuSection}>
                <MenuItem icon="account-circle-outline" title="Account Information" onPress={() => { /* Add action */ }} />
                <MenuItem icon="credit-card-outline" title="Payment Methods" onPress={() => { /* Add action */ }} />
                <MenuItem icon="cog-outline" title="Appearance" onPress={() => { /* Add action */ }} />
                <MenuItem icon="bell-outline" title="Notification" onPress={() => { /* Add action */ }} isLast={true} />
            </View>
        </ScrollView>
    );

    const HelpAndSupportModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showHelpModal}
            onRequestClose={() => setShowHelpModal(false)}
        >
            <View style={styles.modalFullView}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setShowHelpModal(false)}>
                        <Icon name="chevron-left" size={28} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Help and Support</Text>
                    <View style={{ width: 28 }} />
                </View>
                <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalContentContainer}>
                    {/* Contact Us Section */}
                    <View style={styles.contactFormSection}>
                        <Text style={styles.sectionHeader}>Contact Us</Text>
                        <TextInput style={styles.input} placeholder="Name" />
                        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
                        <TextInput style={[styles.input, styles.messageInput]} placeholder="Message" multiline />
                        <TouchableOpacity style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                    {/* FAQs Section */}
                    <View style={styles.faqSection}>
                        <Text style={styles.sectionHeader}>FAQs</Text>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>What is your return policy?</Text>
                            <Icon name="chevron-down" size={24} color="#777" />
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>What are your delivery options and charges?</Text>
                            <Icon name="chevron-down" size={24} color="#777" />
                        </View>
                        <View style={styles.faqItem}>
                            <Text style={styles.faqQuestion}>How long does delivery take?</Text>
                            <Icon name="chevron-down" size={24} color="#777" />
                        </View>
                        <View style={[styles.faqItem, styles.lastFaqItem]}>
                            <Text style={styles.faqQuestion}>Do you offer returns or exchanges?</Text>
                            <Icon name="chevron-down" size={24} color="#777" />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{showSettings ? "Settings" : "Profile"}</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Conditionally render content */}
            {showSettings ? renderSettingsContent() : renderProfileContent()}

            {/* Logout Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Logout</Text>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.logoutModalButton]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.logoutModalButtonText}>LOGOUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Help & Support Modal */}
            <HelpAndSupportModal />

            {/* Bottom Navigation Bar */}
            <BottomNavigationBar navigation={navigation} currentScreen="account" />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
    },
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 22,
        color: '#000',
    },
    contentContainer: {
        padding: 20,
        alignItems: 'center',
        paddingBottom: 80,
    },
    userInfoSection: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    editIconContainer: {
        position: 'absolute',
        right: 25,
        bottom: 55,
        backgroundColor: '#F3EFE9',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#fff',
    },
    userName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        color: '#000',
    },
    userHandle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
    },
    skeletonName: {
        backgroundColor: '#E0E0E0',
        height: 24,
        width: 150,
        borderRadius: 4,
    },
    skeletonEmail: {
        backgroundColor: '#E0E0E0',
        height: 16,
        width: 200,
        borderRadius: 4,
        marginTop: 4,
    },
    menuSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F3EFE9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#000',
        marginLeft: 15,
    },
    sectionHeader: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
        width: '100%',
    },
    logoutButton: {
        width: "100%",
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
    logoutButtonText: {
        color: '#fff',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 20,
        marginBottom: 10,
        color: '#000',
    },
    modalText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#E5E5E5',
    },
    cancelButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#777',
        textAlign: 'center',
    },
    logoutModalButton: {
        backgroundColor: '#A68B69',
    },
    logoutModalButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: 'white',
        textAlign: 'center',
    },
    modalFullView: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    modalScrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    modalContentContainer: {
        paddingBottom: 80,
    },
    contactFormSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    input: {
        width: '100%',
        backgroundColor: '#F3EFE9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontFamily: 'Montserrat_400Regular',
    },
    messageInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    submitButton: {
        width: "100%",
        height: 50,
        backgroundColor: "#A68B69",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    submitButtonText: {
        color: '#fff',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
    },
    faqSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    faqItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    lastFaqItem: {
        borderBottomWidth: 0,
    },
    faqQuestion: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#000',
        flex: 1,
        paddingRight: 10,
    },
});