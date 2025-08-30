import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function CheckoutScreen() {
    const navigation = useNavigation();

    const [leagueSpartanLoaded] = useLeagueSpartan({
        LeagueSpartan_700Bold,
    });

    const [montserratLoaded] = useMontserrat({
        Montserrat_400Regular,
        Montserrat_600SemiBold
    });

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bankTransfer');
    const [cartItems, setCartItems] = useState([
        { id: '1', name: 'Floor Standing Mirror', size: "60.2\" x 51.2\"", price: 2000, quantity: 1, image: require('../assets/mirror4.png') },
    ]);

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 0; // Assuming free delivery for this example
    const total = subtotal + deliveryFee;

    // New function to handle the "Place Order" button press
    const handlePlaceOrder = () => {
        // Navigates to the OrderConfirmationScreen
        navigation.navigate('OrderConfirmationScreen');
    };

    const renderCheckoutItem = ({ item }) => (
        <View style={styles.checkoutItemContainer}>
            <Image source={item.image} style={styles.checkoutItemImage} />
            <View style={styles.checkoutItemDetails}>
                <Text style={styles.checkoutItemName}>{item.name}</Text>
                <Text style={styles.checkoutItemSize}>Size: {item.size}</Text>
                <Text style={styles.checkoutItemPrice}>₱ {item.price.toLocaleString()}</Text>
            </View>
            <Text style={styles.checkoutItemQuantity}>x{item.quantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={28} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Check out</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.content}>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id}
                    renderItem={renderCheckoutItem}
                    scrollEnabled={false}
                />

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Address</Text>
                    <View style={styles.addressContainer}>
                        <Text style={styles.addressText}>123 Tonying Street, Mactan Proper, Lapu-Lapu City</Text>
                        <TouchableOpacity>
                            <Icon name="pencil-outline" size={20} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>₱ {subtotal.toLocaleString()}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery Fee:</Text>
                        <Text style={styles.summaryValue}>Free</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Total:</Text>
                        <Text style={styles.summaryValue}>₱ {total.toLocaleString()}</Text>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <View style={styles.paymentMethodOption}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setSelectedPaymentMethod('bankTransfer')}
                        >
                            {selectedPaymentMethod === 'bankTransfer' && <View style={styles.radioButtonInner} />}
                        </TouchableOpacity>
                        <View style={styles.paymentDetails}>
                            <Text style={styles.paymentLabel}>Bank Transfer</Text>
                            <Text style={styles.paymentInfo}>50% down payment is required upon placing the order</Text>
                        </View>
                    </View>

                    <View style={[styles.bankInfoContainer, styles.shadow]}>
                        <Image source={require('../assets/bpi.png')} style={styles.bankLogo} />
                        <View>
                            <Text style={styles.bankName}>Bank of the Philippine Islands</Text>
                            <Text style={styles.accountName}>John Doe</Text>
                            <Text style={styles.accountNumber}>********3721</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addCardButton}>
                        <Icon name="plus" size={20} color="#000" />
                        <Text style={styles.addCardText}>Add new card</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                {/* Updated TouchableOpacity to call the new function */}
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
    },
    checkoutItemContainer: {
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
    checkoutItemImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
        resizeMode: 'contain',
    },
    checkoutItemDetails: {
        flex: 1,
    },
    checkoutItemName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#000',
    },
    checkoutItemSize: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#777',
        marginTop: 5,
    },
    checkoutItemPrice: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#A68B69',
        marginTop: 5,
    },
    checkoutItemQuantity: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#666',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    addressText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#000',
        flex: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
    paymentMethodOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#A68B69',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioButtonInner: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#A68B69',
    },
    paymentDetails: {
        flex: 1,
    },
    paymentLabel: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#000',
    },
    paymentInfo: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    bankInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    bankLogo: {
        width: 40,
        height: 40,
        marginRight: 15,
        resizeMode: 'contain',
    },
    bankName: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#000',
    },
    accountName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
    accountNumber: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        color: '#888',
    },
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    addCardText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    placeOrderButton: {
        backgroundColor: '#A68B69',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeOrderButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#fff',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
});
