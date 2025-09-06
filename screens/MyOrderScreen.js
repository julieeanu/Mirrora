import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Modal, 
    Platform, 
    SafeAreaView, 
    ActivityIndicator 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import BottomNavigationBar from '../components/BottomNavigationBar';

const orderData = [
    {
        id: 'ORD-001',
        name: 'Floor Standing Mirror',
        size: '60.2" x 51.2"',
        price: '2,250',
        image: require('../assets/mirror.png'),
        status: 'Shipped',
        date: 'Aug 04, 2025',
    },
    {
        id: 'ORD-002',
        name: 'Capsule Mirror',
        size: '20.2" x 30.2"',
        price: '2,250',
        image: require('../assets/capsule/capsule7.png'),
        status: 'Shipped',
        date: 'Aug 04, 2025',
    },
];

const MyOrdersScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });

    useEffect(() => {
        if (montserratLoaded && leagueSpartanLoaded) {
            setIsLoading(false);
        }
    }, [montserratLoaded, leagueSpartanLoaded]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A68B69" />
            </View>
        );
    }

    const OrderItem = ({ order }) => (
        <TouchableOpacity style={styles.orderCard} onPress={() => navigation.navigate('TrackOrderScreen', { order })}>
            <View style={styles.orderHeader}>
                <Text style={styles.orderIdText}>Order Id: {order.id}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order.status}</Text>
                </View>
            </View>
            
            <View style={styles.orderBody}>
                <Image source={order.image} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{order.name}</Text>
                    <Text style={styles.productSize}>{order.size}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.priceSection}>
                    <Text style={styles.totalLabel}>Total Item:</Text>
                    <Text style={styles.totalPrice}>₱ {order.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <TouchableOpacity style={styles.messageButton}>
                        <Icon name="chat-processing" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Orders List */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
                    {orderData.map(order => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </ScrollView>

                {/* Bottom Navigation Bar */}
                <BottomNavigationBar navigation={navigation} currentScreen="account" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 50 : 0,
        paddingBottom: 18,
        backgroundColor: '#A68B69',
    },
    backButton: {
        width: 40,
        alignItems: 'flex-start',
    },
    messageButton: {
        width: 40,
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    contentContainer: {
        padding: 15,
        paddingBottom: 100,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    orderIdText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 13,
        color: '#666',
    },
    statusBadge: {
        backgroundColor: '#A68B69',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    statusText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 11,
        color: '#fff',
    },
    orderBody: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    productImage: {
        width: 70,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    productName: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 16,
        color: '#000',
        marginBottom: 2,
    },
    productSize: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    orderDate: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#999',
    },
    priceSection: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    totalLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    totalPrice: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
});

export default MyOrdersScreen;
