import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function SellerScreen() {
    const navigation = useNavigation();

    // Load fonts. The conditional return is safe because the hooks are at the top.
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });
    
    // Dummy data for a seller profile.
    const seller = {
        name: 'Vintage Finds',
        avatar: require('../assets/profileavatar.png'), // Using a dummy avatar
        bio: 'Your go-to shop for unique and hand-picked vintage items from around the world. We specialize in clothing, accessories, and home decor.',
        rating: 4.8,
        totalSales: 250,
        followers: 1200,
        location: 'New York, USA',
    };

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
                <Text style={styles.headerTitle}>Seller Profile</Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Seller Profile Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.profileSection}>
                    <Image source={seller.avatar} style={styles.avatar} />
                    <Text style={styles.sellerName}>{seller.name}</Text>
                    <Text style={styles.sellerBio}>{seller.bio}</Text>
                </View>

                {/* Seller Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{seller.rating}</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{seller.totalSales}</Text>
                        <Text style={styles.statLabel}>Sales</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{seller.followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                    </View>
                </View>
                
                {/* Additional Info */}
                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <Icon name="map-marker-outline" size={20} color="#777" />
                        <Text style={styles.infoText}>{seller.location}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Icon name="calendar-month-outline" size={20} color="#777" />
                        <Text style={styles.infoText}>Joined October 2023</Text>
                    </View>
                </View>

                {/* Contact Seller Button */}
                <TouchableOpacity 
                    style={styles.contactButton} 
                    onPress={() => navigation.navigate('ChatbotScreen')}
                >
                    <Text style={styles.contactButtonText}>Contact Seller</Text>
                </TouchableOpacity>

                {/* Empty message placeholder */}
                <Text style={styles.emptyMessage}>No messages from the seller yet.</Text>
            </ScrollView>
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
    contentContainer: {
        alignItems: 'center',
        padding: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    sellerName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 24,
        color: '#000',
    },
    sellerBio: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 15,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 18,
        color: '#A68B69',
    },
    statLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    separator: {
        width: 1,
        backgroundColor: '#eee',
        height: '100%',
    },
    infoSection: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
    },
    contactButton: {
        backgroundColor: '#A68B69',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    contactButtonText: {
        color: '#fff',
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
    },
      emptyMessage: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#777',
        marginTop: 15,
        textAlign: 'center',
    },
});
