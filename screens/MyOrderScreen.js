import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Image 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import BottomNavigationBar from '../components/BottomNavigationBar';

export default function MyOrderScreen() {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState('completed');

    // Load fonts
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold, });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });

    // Dummy data for different order statuses
    const completedOrders = [
        {
            id: '1',
            name: 'Floor Standing Mirror',
            size: '60.2" x 51.2"',
            price: '2,000',
            total: '2,250',
            image: require('../assets/WelcomeScreen/mirror1.png'),
            status: 'completed',
        },
        {
            id: '2',
            name: 'Capsule Mirror',
            size: '20.2" x 30.2"',
            price: '2,000',
            total: '2,250',
            image: require('../assets/WelcomeScreen/mirror2.png'),
            status: 'completed',
        },
    ];

    const processingOrders = [
        {
            id: '3',
            name: 'Irregular Mirror',
            size: '60.2" x 51.2"',
            price: '2,000',
            total: '2,250',
            image: require('../assets/WelcomeScreen/mirror3.png'),
            status: 'processing',
        },
    ];
    
    const cancelledOrders = [
        {
            id: '4',
            name: 'Grid Mirror',
            size: '60.2" x 51.2"',
            price: '2,000',
            total: '2,250',
            image: require('../assets/home/mirror1.png'),
            status: 'cancelled',
        },
    ];

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    const OrderItem = ({ order }) => {
        let tagColor;
        let tagText;
        let buttonText = 'Buy Again';
        let buttonColor = '#A68B69';
        
        // Conditional styling based on the order status
        switch (order.status) {
            case 'completed':
                tagColor = '#66BB6A';
                tagText = 'Completed';
                break;
            case 'processing':
                tagColor = '#FFA500';
                tagText = 'Processing';
                buttonText = 'Track Order';
                buttonColor = '#A68B69';
                break;
            case 'cancelled':
                tagColor = '#F44336';
                tagText = 'Cancelled';
                buttonText = 'Order Again';
                buttonColor = '#F44336';
                break;
        }

        return (
            <View style={styles.orderItemContainer}>
                <Image source={order.image} style={styles.orderImage} />
                <View style={styles.orderTextContainer}>
                    <Text style={styles.orderTitle}>{order.name}</Text>
                    <Text style={styles.orderSize}>Size: {order.size}</Text>
                    <Text style={styles.orderPrice}>₱ {order.price}</Text>
                    <Text style={styles.orderTotal}>Total 1 item: ₱ {order.total}</Text>
                </View>
                <View style={styles.tagAndButtonContainer}>
                    <View style={[styles.statusTag, { backgroundColor: tagColor }]}>
                        <Text style={styles.statusTagText}>{tagText}</Text>
                    </View>
                    <TouchableOpacity style={[styles.buyAgainButton, { backgroundColor: buttonColor }]}>
                        <Text style={styles.buyAgainButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    
    const getOrdersForTab = () => {
        switch (activeTab) {
            case 'completed':
                return completedOrders;
            case 'processing':
                return processingOrders;
            case 'cancelled':
                return cancelledOrders;
            default:
                return [];
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Orders</Text>
                <TouchableOpacity onPress={() => { /* Navigate to chat screen */ }}>
                    <Icon name="comment-processing-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'processing' && styles.activeTab]}
                    onPress={() => setActiveTab('processing')}
                >
                    <Text style={[styles.tabText, activeTab === 'processing' && styles.activeTabText]}>Processing</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
                    onPress={() => setActiveTab('completed')}
                >
                    <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, activeTab === 'cancelled' && styles.activeTab]}
                    onPress={() => setActiveTab('cancelled')}
                >
                    <Text style={[styles.tabText, activeTab === 'cancelled' && styles.activeTabText]}>Cancelled</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {getOrdersForTab().map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))}
            </ScrollView>

            {/* Bottom Navigation Bar */}
            <BottomNavigationBar navigation={navigation} currentScreen="account" />
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
        backgroundColor: '#A68B69',
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 22,
        color: '#fff',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#A68B69',
    },
    tab: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
    tabText: {
        fontFamily: 'Montserrat_400Regular',
        color: '#D4C7B8',
    },
    activeTabText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#fff',
    },
    contentContainer: {
        padding: 20,
    },
    orderItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    orderImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    orderTextContainer: {
        flex: 1,
    },
    orderTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#000',
    },
    orderSize: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
    orderPrice: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
        marginTop: 5,
    },
    orderTotal: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#777',
        marginTop: 2,
    },
    tagAndButtonContainer: {
        alignItems: 'flex-end',
    },
    statusTag: {
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 10,
    },
    statusTagText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 10,
        color: '#fff',
        textTransform: 'uppercase',
    },
    buyAgainButton: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    buyAgainButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 12,
        color: '#fff',
    },
});
