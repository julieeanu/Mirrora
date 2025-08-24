import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function ChatbotScreen() {
    const navigation = useNavigation();

    // Load fonts. The conditional return is safe because the hooks are at the top.
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });
    
    // State to hold the chat messages.
    const [messages, setMessages] = useState([]);
    // State to hold the text input value.
    const [inputText, setInputText] = useState("");
    
    const flatListRef = useRef(null);

    // Use an effect to simulate a welcome message from the bot on first load.
    useEffect(() => {
        setMessages([
            {
                id: '1',
                text: "Hello! I'm your AI shopping assistant. How can I help you today?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
            },
        ]);
    }, []);

    // Function to handle sending a message.
    const handleSend = () => {
        if (inputText.trim() === '') {
            return;
        }

        const newMessage = {
            id: String(messages.length + 1),
            text: inputText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };

        // Add the new message to the end of the array
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText("");

        // Simulate a bot response after a short delay.
        setTimeout(() => {
            const botResponse = {
                id: String(messages.length + 2),
                text: "Thanks for your message! How can I help you further?",
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString(),
            };
            // Add the bot response to the end of the array
            setMessages((prevMessages) => [...prevMessages, botResponse]);
        }, 1000);
    };

    // Helper function to render each message in the FlatList.
    const renderMessage = ({ item }) => {
        const isUserMessage = item.sender === 'user';
        return (
            <View style={[styles.messageContainer, isUserMessage ? styles.userMessage : styles.botMessage]}>
                {!isUserMessage && (
                    <Image 
                        source={require('../assets/chatbot-avatar.png')} 
                        style={styles.avatar} 
                    />
                )}
                <View style={[styles.messageBubble, isUserMessage ? styles.userBubble : styles.botBubble]}>
                    <Text style={[styles.messageText, isUserMessage ? styles.userText : styles.botText]}>{item.text}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
                </View>
            </View>
        );
    };

    // Scroll to the end of the FlatList when new messages are added
     useEffect(() => {
    if (messages.length > 0 && flatListRef.current) {
        flatListRef.current.scrollToIndex({
            index: messages.length - 1,
            animated: true,
        });
    }
}, [messages]);

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>AI Assistant</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Chat Messages and Input Area */}
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={item => item.id}
                    renderItem={renderMessage}
                    contentContainerStyle={styles.messageList}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Type a message..."
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSend}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                        <Icon name="send-circle" size={40} color="#A68B69" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
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
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 22,
        color: '#000',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    messageList: {
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    botMessage: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
    },
    messageBubble: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        maxWidth: '75%',
    },
    userBubble: {
        backgroundColor: '#A68B69',
        borderBottomRightRadius: 5,
    },
    botBubble: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    userText: {
        color: '#fff',
    },
    botText: {
        color: '#000',
    },
    timestamp: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 10,
        color: '#999',
        textAlign: 'right',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 10,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
