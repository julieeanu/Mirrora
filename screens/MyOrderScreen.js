import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    SafeAreaView,
    ActivityIndicator,
    Image
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const MyOrdersScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('pending');

    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold });

    useEffect(() => {
        if (montserratLoaded) {
            setIsLoading(false);
        }
    }, [montserratLoaded]);

    // Sample order data - replace with actual data
    const orders = {
        pending: [
            {
                id: 'ORD-001',
                seller: 'John',
                productName: 'Floor Standing Mirror',
                productDetails: 'Size: 60.2" x 51.2"',
                price: 2220,
                date: 'Sep 3, 2025',
                image: require('../assets/mirror.png'), // Replace with actual image
                paymentStatus: 'Total Payment:',
                quantity: 1, // Added quantity
            }
        ],
        shipped: [],
        toReceive: [],
        completed: [],
        cancelled: []
    };

    // Helper functions for dynamic empty state content
    const getEmptyStateIcon = (tab) => {
        switch (tab) {
            case 'pending': return 'clock-outline';
            case 'shipped': return 'truck-outline';
            case 'toReceive': return 'package-variant';
            case 'completed': return 'check-circle-outline';
            case 'cancelled': return 'close-circle-outline';
            default: return 'package-variant';
        }
    };

    const getEmptyStateTitle = (tab) => {
        switch (tab) {
            case 'pending': return 'No Pending Orders';
            case 'shipped': return 'No Shipped Orders';
            case 'toReceive': return 'Nothing to Receive';
            case 'completed': return 'No Completed Orders';
            case 'cancelled': return 'No Cancelled Orders';
            default: return 'No Orders Yet';
        }
    };

    const getEmptyStateDescription = (tab) => {
        switch (tab) {
            case 'pending': return 'You don\'t have any pending orders.\nStart shopping to see your orders here.';
            case 'shipped': return 'No orders have been shipped yet.\nOnce sellers ship your orders, they\'ll appear here.';
            case 'toReceive': return 'You don\'t have any packages to receive.\nShipped orders will appear here.';
            case 'completed': return 'You haven\'t completed any orders yet.\nFinished orders will be shown here.';
            case 'cancelled': return 'You don\'t have any cancelled orders.\nCancelled orders will appear here.';
            default: return 'Your orders will appear here once you start shopping.';
        }
    };

    const handleMessagePress = (order) => {
        // Navigate to chat/message screen with the seller
        // navigation.navigate('Chat', { sellerId: order.sellerId, sellerName: order.seller });
        console.log('Message pressed for order:', order.id);
    };

    // This is the new function to handle navigation to the track order screen
    const handleTrackOrder = (order) => {
        navigation.navigate('TrackOrderScreen', { orderDetails: order });
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#A68B69" />
            </View>
        );
    }

    const TabButton = ({ title, tabKey }) => (
        <TouchableOpacity
            style={[styles.tabButton, activeTab === tabKey && styles.activeTabButton]}
            onPress={() => setActiveTab(tabKey)}
        >
            <Text style={[styles.tabText, activeTab === tabKey && styles.activeTabText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    // Updated OrderCard component to be a TouchableOpacity and receive an onPress prop
    const OrderCard = ({ order, onPress }) => (
        <TouchableOpacity onPress={() => onPress(order)} style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <View style={styles.sellerSection}>
                    {/* Placeholder for seller profile pic, if any */}
                    <View style={styles.sellerAvatar} />
                    <Text style={styles.sellerName}>{order.seller}</Text>
                </View>
                <Text style={styles.orderStatus}>Pending</Text>
            </View>

            <View style={styles.orderContent}>
                <Image
                    source={order.image}
                    style={styles.productImage}
                    defaultSource={require('../assets/mirror.png')}
                />

                <View style={styles.productInfo}>
                    <View style={styles.productNameRow}>
                        <Text style={styles.productName}>{order.productName}</Text>
                        <Text style={styles.productQuantity}>x{order.quantity}</Text>
                    </View>
                    <Text style={styles.productDetails}>{order.productDetails}</Text>

                    <View style={styles.priceDateRow}>
                        <Text style={styles.orderDate}>{order.date}</Text>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>{order.paymentStatus}</Text>
                            <Text style={styles.price}>₱ {order.price.toLocaleString()}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.orderActions}>
                <Text style={styles.orderId}>Order ID: {order.id}</Text>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderContent = () => {
        const currentOrders = orders[activeTab];

        if (!currentOrders || currentOrders.length === 0) {
            return (
                <View style={styles.emptyState}>
                    <View style={styles.emptyStateContent}>
                        {/* Icon Container with Background */}
                        <View style={styles.emptyIconContainer}>
                            <Icon name={getEmptyStateIcon(activeTab)} size={48} color="#A68B69" />
                        </View>
                        
                        {/* Title and Description */}
                        <Text style={styles.emptyStateTitle}>
                            {getEmptyStateTitle(activeTab)}
                        </Text>
                        <Text style={styles.emptyStateDescription}>
                            {getEmptyStateDescription(activeTab)}
                        </Text>
                        
                        {/* Action Button (optional - only show for certain tabs) */}
                        {activeTab === 'pending' && (
                            <TouchableOpacity 
                                style={styles.emptyStateButton}
                                onPress={() => {
                                    // Navigate to shop or home screen
                                    // navigation.navigate('Shop');
                                    console.log('Navigate to shop');
                                }}
                            >
                                <Text style={styles.emptyStateButtonText}>Start Shopping</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            );
        }

        return (
            <ScrollView style={styles.ordersScrollView} showsVerticalScrollIndicator={false}>
                {currentOrders.map((order) => (
                    <OrderCard key={order.id} order={order} onPress={handleTrackOrder} />
                ))}
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={28} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>My Orders</Text>
                    <TouchableOpacity style={styles.messageIcon}>
                        <Icon name="chat-processing" size={25} color="#A68B69" />
                    </TouchableOpacity>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.tabsScrollContent}
                    >
                        <TabButton title="Pending" tabKey="pending" />
                        <TabButton title="Shipped" tabKey="shipped" />
                        <TabButton title="To Receive" tabKey="toReceive" />
                        <TabButton title="Completed" tabKey="completed" />
                        <TabButton title="Cancelled" tabKey="cancelled" />
                    </ScrollView>
                </View>

                {/* Content */}
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        paddingRight: 10,
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    messageIcon: {
        paddingLeft: 10,
    },
    tabsContainer: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    tabsScrollContent: {
        paddingHorizontal: 16,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 4,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    activeTabButton: {
        backgroundColor: '#A68B69',
    },
    tabText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#000',
    },
    activeTabText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: '#fff',
    },
    ordersScrollView: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sellerSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        marginRight: 8,
    },
    sellerName: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 13,
        color: '#000',
    },
    orderStatus: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#999',
    },
    orderContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    productImage: {
        width: 60,
        height: 70,
        borderRadius: 8,
        marginRight: 12,
        backgroundColor: '#F5F5F5',
        resizeMode: 'cover',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    productNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    productName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
    productQuantity: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#666',
    },
    productDetails: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    priceDateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 8,
    },
    orderDate: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 11,
        color: '#999',
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    paymentLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 11,
        color: '#666',
        marginRight: 4,
    },
    price: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
    orderActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        marginTop: 12,
    },
    orderId: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 11,
        color: '#999',
    },
    cancelButton: {
        backgroundColor: '#A68B69',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    cancelButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 12,
        color: '#fff',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        paddingTop: 60,
    },
    emptyStateContent: {
        alignItems: 'center',
        maxWidth: 280,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F8F6F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#E8E0D6',
    },
    emptyStateTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#2C2C2C',
        textAlign: 'center',
        marginBottom: 12,
    },
    emptyStateDescription: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 32,
    },
    emptyStateButton: {
        backgroundColor: '#A68B69',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        shadowColor: '#A68B69',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    emptyStateButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#fff',
        textAlign: 'center',
    },
});

export default MyOrdersScreen;