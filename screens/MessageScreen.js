import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar, Platform, ScrollView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Font imports from your existing screens
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const { width, height } = Dimensions.get('window');

export default function MessageScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('Chatbot');

    // Load fonts
    const [leagueSpartanLoaded] = useLeagueSpartan({
        LeagueSpartan_700Bold,
    });
    const [montserratLoaded] = useMontserrat({
        Montserrat_400Regular,
        Montserrat_600SemiBold
    });

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null; // Wait for fonts to load
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#B08E77" />
            
            {/* Custom Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerInner}>
                    {/* ✅ Back button goes back to HomeScreen */}
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Messages</Text>
                </View>
            </View>

            {/* Main Content Area */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentContainer}>
                    {/* Tab Bar for Chatbot and Seller */}
                    <View style={styles.tabBar}>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'Chatbot' && styles.activeTab]}
                            onPress={() => setActiveTab('Chatbot')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Chatbot' && styles.activeTabText]}>Chatbot</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tabButton, activeTab === 'Seller' && styles.activeTab]}
                            onPress={() => setActiveTab('Seller')}
                        >
                            <Text style={[styles.tabText, activeTab === 'Seller' && styles.activeTabText]}>Seller</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Conditionally render the message content based on the active tab */}
                    {activeTab === 'Chatbot' ? (
                        <TouchableOpacity 
                            style={styles.chatMessage} 
                            onPress={() => navigation.navigate('ChatbotScreen')}
                        >
                            <Image
                                source={require('../assets/chatbot-avatar.png')}
                                style={styles.chatbotAvatar}
                            />
                            <View style={styles.messageContent}>
                                <Text style={styles.senderName}>CHATBOTX00719ZV</Text>
                                <Text style={styles.messageText}>Hi! Welcome to Mirrora. How can I help you today?</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        // Display a message when the Seller tab has no messages.
                        <View style={styles.noMessagesContainer}>
                            <Text style={styles.noMessagesText}>No messages from seller</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EC',
    },
    headerContainer: {
        backgroundColor: '#B08E77',
        paddingTop: Platform.OS === 'ios' ? 70 : 40,
        paddingBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    headerInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: { padding: 5 },
    headerTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 22,
        color: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: -25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        paddingTop: 30,
        paddingHorizontal: 15,
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 10,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#B08E77',
    },
    tabText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#777',
    },
    activeTabText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#B08E77',
    },
    chatMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    chatbotAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        backgroundColor: '#f0f0f0',
    },
    messageContent: {
        flex: 1,
    },
    senderName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#333',
    },
    messageText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#555',
    },
    // Styles for the no messages view
    noMessagesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: height * 0.5, // Ensure the container takes up space for centering
    },
    noMessagesText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#777',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});
