import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import BottomNavigationBar from '../components/BottomNavigationBar';

export default function ProfileScreen() {
    const navigation = useNavigation();

    // Load fonts. The conditional return is safe because the hooks are at the top.
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });

    // Dummy user data
    const user = {
        name: 'Aubrie Marie Dual',
        username: '@aubriemariedual',
        avatar: require('../assets/profile.png'), // Placeholder image for user avatar
    };

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    const ProfileMenuItem = ({ icon, title, onPress }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                {/* Re-added the iconCircle View as per the design */}
                <View style={styles.iconCircle}>
                    <Icon name={icon} size={24} color="#A68B69" />
                </View>
                <Text style={styles.menuItemText}>{title}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#777" />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {/* User Info Section with relative positioning for edit icon */}
                <View style={[styles.userInfoSection, { position: 'relative' }]}>
                    <Image source={user.avatar} style={styles.avatar} />
                    {/* New edit icon on top of the avatar */}
                    <TouchableOpacity style={styles.editIconContainer} onPress={() => navigation.navigate('CompleteProfile')}>
                        <Icon name="pencil" size={18} color="#A68B69" />
                    </TouchableOpacity>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userHandle}>{user.username}</Text>
                </View>

                {/* Menu Items Section */}
                <View style={styles.menuSection}>
                    <ProfileMenuItem icon="account-outline" title="Edit Profile" onPress={() => navigation.navigate('CompleteProfile')} />
                    <ProfileMenuItem icon="archive-outline" title="My Order" onPress={() => {}} />
                    <ProfileMenuItem icon="help-circle-outline" title="Help & Support" onPress={() => navigation.navigate('HelpAndSupportScreen')} />
                    <ProfileMenuItem icon="cog-outline" title="Setting" onPress={() => {}} />
                </View>
                
                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavigationBar navigation={navigation} currentScreen="account" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EC',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
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
    },
    // User Info styles
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
    // Styles for the new edit icon container on the avatar
    editIconContainer: {
        position: 'absolute',
        right: 20,
        bottom: 50,
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
    // Menu styles
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
    // Logout button styles
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
});
