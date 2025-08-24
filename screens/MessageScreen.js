import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function MessageScreen() {
    const navigation = useNavigation();

    // Load fonts. The conditional return is safe because the hooks are at the top.
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });
    
    // Dummy data for chat conversations. In a real app, this would come from a database.
    // The list has been updated to contain only a single seller.
    const [conversations, setConversations] = useState([
        { id: '1', name: 'Vintage Finds', lastMessage: 'Got it, shipping today!', time: '10:30 AM', avatar: require('../assets/chatbot-avatar.png') },
        { id: '2', name: 'Client Seller', lastMessage: 'Hello, how can I help you with your order?', time: '11:45 AM', avatar: require('../assets/profileavatar.png') },
    ]);

    // Helper function to render each conversation item in the FlatList.
    const renderConversation = ({ item }) => (
        <TouchableOpacity style={styles.conversationItem} onPress={() => navigation.navigate('ChatbotScreen')}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.conversationDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
        </TouchableOpacity>
    );

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
                <Text style={styles.headerTitle}>Messages</Text>
                <TouchableOpacity onPress={() => navigation.navigate('WishlistScreen')}>
                    <Icon name="heart-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Conversation List */}
            <FlatList
                data={conversations}
                keyExtractor={item => item.id}
                renderItem={renderConversation}
                contentContainerStyle={styles.conversationList}
            />
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
    conversationList: {
        paddingTop: 10,
        paddingHorizontal: 20,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    conversationDetails: {
        flex: 1,
    },
    name: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#000',
    },
    lastMessage: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    time: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#999',
    },
});
