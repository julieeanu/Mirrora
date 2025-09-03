import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, TextInput, Modal, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const { width } = Dimensions.get('window');

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
        { id: '1', name: 'Floor Standing Mirror', size: "60.2\" x 51.2\"", price: 2000, quantity: 1, image: require('../assets/home/mirror1.png') },
    ]);

    // State to control the visibility of the new card form
    const [showNewCardForm, setShowNewCardForm] = useState(false);
    
    // State to control order confirmation modal
    const [orderConfirmationVisible, setOrderConfirmationVisible] = useState(false);

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 0;
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = () => {
        setOrderConfirmationVisible(true);
    };

    const handleContinue = () => {
        setOrderConfirmationVisible(false);
        // Navigate to home or orders screen
        navigation.navigate('Home'); // Adjust navigation as needed
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
    
    // Function to render the new card form
    const renderNewCardForm = () => {
        if (!showNewCardForm) {
            return null;
        }

        return (
            <View style={[styles.newCardFormContainer, styles.shadow]}>
                <Text style={styles.formTitle}>Add New Card</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Card Number"
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cardholder Name"
                />
                <View style={styles.inputRow}>
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={[styles.input, styles.inputHalf]}
                        placeholder="CVV"
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.saveCardButton}>
                    <Text style={styles.saveCardText}>Save Card</Text>
                </TouchableOpacity>
            </View>
        );
    };

    // Order Confirmation Modal Component
    const OrderConfirmationModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={orderConfirmationVisible}
            onRequestClose={() => setOrderConfirmationVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.successIconContainer}>
                        <Icon name="check-circle" size={80} color="#4CAF50" />
                    </View>
                    
                    <Text style={styles.confirmationTitle}>Order Confirmed!</Text>
                    <Text style={styles.confirmationMessage}>
                        Thank you for your purchase. Your order has been successfully placed.
                    </Text>

                    <View style={styles.orderDetailsContainer}>
                        <Text style={styles.orderDetailsTitle}>Order Summary</Text>
                        
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Item Ordered:</Text>
                            <Text style={styles.orderDetailValue}>Floor Standing Mirror x1</Text>
                        </View>
                        
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Total:</Text>
                            <Text style={styles.orderDetailValue}>₱ {total.toLocaleString()}</Text>
                        </View>
                        
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Delivery Address:</Text>
                            <Text style={styles.orderDetailValue}>123 Tonying Street, Mactan Proper</Text>
                        </View>
                        
                        <View style={styles.orderDetailRow}>
                            <Text style={styles.orderDetailLabel}>Payment Method:</Text>
                            <Text style={styles.orderDetailValue}>Bank Transfer</Text>
                        </View>
                    </View>

                    <View style={styles.paymentNotice}>
                        <Icon name="information-outline" size={20} color="#FF9800" />
                        <Text style={styles.paymentNoticeText}>
                            Please complete your 50% down payment within 24 hours to confirm your order.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
                    
                    {renderNewCardForm()}

                    <TouchableOpacity
                        style={styles.addCardButton}
                        onPress={() => setShowNewCardForm(!showNewCardForm)}
                    >
                        <Icon name="plus-circle-outline" size={24} color="#A68B69" />
                        <Text style={styles.addCardText}>
                            {showNewCardForm ? "Hide card form" : "Add new card"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
                </TouchableOpacity>
            </View>

            <OrderConfirmationModal />
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
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 22,
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 100,
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
        padding: 10,
        marginBottom: 15,
        marginTop: -7,
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
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: -8,
        borderColor: '#A68B69',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    addCardText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#A68B69',
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
    // New styles for the card form
    newCardFormContainer: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
    },
    formTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15,
        fontSize: 14,
        color: '#000',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputHalf: {
        width: '48%',
    },
    saveCardButton: {
        backgroundColor: '#A68B69',
        borderRadius: 25,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    saveCardText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#fff',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 32,
        width: width - 40,
        maxWidth: 400,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.3,
        shadowRadius: 32,
        elevation: 16,
    },
    successIconContainer: {
        marginBottom: 24,
        backgroundColor: '#E8F5E8',
        borderRadius: 50,
        padding: 20,
    },
    confirmationTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 28,
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    confirmationMessage: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    orderDetailsContainer: {
        width: '100%',
        backgroundColor: '#F8F8F8',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
    },
    orderDetailsTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    orderDetailLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    orderDetailValue: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#333',
        flex: 1,
        textAlign: 'right',
    },
    paymentNotice: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFF3E0',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        width: '100%',
    },
    paymentNoticeText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#E65100',
        marginLeft: 12,
        flex: 1,
        lineHeight: 20,
    },
    continueButton: {
        backgroundColor: '#A68B69',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 48,
        shadowColor: '#A68B69',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});