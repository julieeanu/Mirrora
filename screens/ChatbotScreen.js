import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Platform, TextInput, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Font imports from your existing screens
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const { width, height } = Dimensions.get('window');

const ChatMessage = ({ message, isUser }) => {
    return (
        <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.chatbotMessage]}>
            <Text style={styles.messageText}>{message}</Text>
        </View>
    );
};

export default function ChatbotScreen() {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! Welcome to Mirrora. How can I help you today?", sender: 'chatbot' }
    ]);
    const [inputText, setInputText] = useState('');

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

    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
        setMessages([...messages, { id: messages.length + 1, text: inputText, sender: 'user' }]);
        setInputText('');
    };

    const handleSuggestionClick = (suggestion) => {
        setMessages([...messages, { id: messages.length + 1, text: suggestion, sender: 'user' }]);
    };

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" backgroundColor="#B08E77" />
            
            {/* Header Section */}
            <View style={styles.headerContainer}>
                <View style={styles.headerInner}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Chatbot</Text>
                    <View style={styles.onlineIndicator}>
                        <View style={styles.onlineDot} />
                        <Text style={styles.onlineText}>online</Text>
                    </View>
                    <Image
                        source={require('../assets/chatbot-avatar.png')} // Placeholder for chatbot avatar
                        style={styles.headerAvatar}
                    />
                </View>
            </View>

            {/* Main Chat Content Area */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.contentContainer}>
                    <Text style={styles.greetingTitle}>Hello, Aubrie</Text>
                    <Text style={styles.greetingSubtitle}>How can I help?</Text>
                    
                    {/* Suggested Questions */}
                    <View style={styles.suggestionRow}>
                        <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSuggestionClick('Do you have onsite workshop?')}>
                            <Text style={styles.suggestionText}>Do you have onsite workshop?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSuggestionClick('How much is the delivery fee?')}>
                            <Text style={styles.suggestionText}>How much is the delivery fee?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.suggestionRow}>
                        <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSuggestionClick('Do you offer same-day delivery?')}>
                            <Text style={styles.suggestionText}>Do you offer same-day delivery?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSuggestionClick('What payment methods are accepted?')}>
                            <Text style={styles.suggestionText}>What payment methods are accepted?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.suggestionRow}>
                        <TouchableOpacity style={styles.suggestionButton} onPress={() => handleSuggestionClick('How do I track my order?')}>
                            <Text style={styles.suggestionText}>How do I track my order?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Chat messages */}
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg.text} isUser={msg.sender === 'user'} />
                    ))}
                </View>
            </ScrollView>

            {/* Message Input Field */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Write Message"
                    placeholderTextColor="#999"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Icon name="send-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 22,
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    headerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    onlineIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: -5,
        left: width / 2 - 20,
    },
    onlineDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#52A740', // Green for online
        marginRight: 5,
    },
    onlineText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        paddingTop: 40,
        paddingHorizontal: 15,
    },
    greetingTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 24,
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },
    greetingSubtitle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20,
    },
    suggestionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 10,
    },
    suggestionButton: {
        backgroundColor: '#E0E0E0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        margin: 5,
    },
    suggestionText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#333',
    },
    messageBubble: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        maxWidth: '80%',
    },
    chatbotMessage: {
        backgroundColor: '#EAEAEA',
        alignSelf: 'flex-start',
    },
    userMessage: {
        backgroundColor: '#B08E77',
        alignSelf: 'flex-end',
    },
    messageText: {
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#FFF7EC',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#B08E77',
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
