import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native'; // Import Modal and TextInput
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Font imports from your HomeScreen
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export default function ProductScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { product } = route.params;

    // State to control modal visibility
    const [isCustomizationModalVisible, setCustomizationModalVisible] = useState(false);

    // State for customization inputs (optional, but good practice for form data)
    const [roomType, setRoomType] = useState('');
    const [sizeWidth, setSizeWidth] = useState('');
    const [sizeHeight, setSizeHeight] = useState('');
    const [frameStyle, setFrameStyle] = useState('');
    const [addOns, setAddOns] = useState('');

    // Load fonts
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });
    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null; // Wait for fonts to load
    }

    // Function to handle customization submission (e.g., send to cart or apply changes)
    const handleCustomize = () => {
        // Here you would process the customization data (roomType, sizeWidth, etc.)
        console.log("Customization applied:", { roomType, sizeWidth, sizeHeight, frameStyle, addOns });
        // After processing, close the modal
        setCustomizationModalVisible(false);
        // You might want to update the product details or add a customized item to the cart
    };

    return (
        <View style={styles.container}>
            {/* Product Image container with the back button */}
            <View style={styles.imageContainer}>
                {/* Dynamically display the product image */}
                <Image source={product.image} style={styles.productImage} />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Product Details Section inside a ScrollView */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.detailsScrollView}>
                <View style={styles.detailsContainer}>
                    {/* Dynamically display the product name */}
                    <Text style={styles.productName}>{product.name}</Text>
                    {/* Dynamically display the product price */}
                    <Text style={styles.productPrice}>{product.price}</Text>

                    {/* Customization link - now opens the modal */}
                    <TouchableOpacity style={styles.customizeLink} onPress={() => setCustomizationModalVisible(true)}>
                        <Text style={styles.customizeText}>Customize</Text>
                    </TouchableOpacity>

                    {/* Description */}
                    <Text style={styles.productDescription}>Floor standing mirrors are not only convenient for you to appreciate your whole body, but also can decorate your space</Text>
                    
                    {/* Line after description */}
                    <View style={styles.divider} />

                    {/* Details like Dimensions and Weight */}
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Measures (H/W):</Text>
                        <Text style={styles.infoValue}>60.2” x 51.2”</Text>
                    </View>

                    {/* Line after measures */}
                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Weight</Text>
                        <Text style={styles.infoValue}>20.2 pound</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.favoriteButton}>
                    <Icon name="heart-outline" size={28} color="#A68B69" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>

            {/* Customization Modal */}
            <Modal
                animationType="slide" // Slide up from the bottom
                transparent={true} // Allow background to show through
                visible={isCustomizationModalVisible}
                onRequestClose={() => {
                    setCustomizationModalVisible(false); // Close modal on back button press (Android)
                }}
            >
                <View style={modalStyles.modalOverlay}>
                    <View style={modalStyles.modalContainer}>
                        <View style={modalStyles.header}>
                            <TouchableOpacity onPress={() => setCustomizationModalVisible(false)} style={modalStyles.backButton}>
                                <Icon name="chevron-left" size={30} color="#000" />
                            </TouchableOpacity>
                            <Text style={modalStyles.headerTitle}>Customization</Text>
                        </View>

                        <ScrollView contentContainerStyle={modalStyles.formContainer}>
                            <Text style={modalStyles.label}>Room Type</Text>
                            <TextInput
                                style={modalStyles.input}
                                value={roomType}
                                onChangeText={setRoomType}
                            />

                            <Text style={modalStyles.label}>Size</Text>
                            <View style={modalStyles.sizeInputs}>
                                <TextInput
                                    style={[modalStyles.input, modalStyles.halfInput]}
                                    keyboardType="numeric"
                                    value={sizeWidth}
                                    onChangeText={setSizeWidth}
                                />
                                <Text style={modalStyles.multiplier}>x</Text>
                                <TextInput
                                    style={[modalStyles.input, modalStyles.halfInput]}
                                    keyboardType="numeric"
                                    value={sizeHeight}
                                    onChangeText={setSizeHeight}
                                />
                            </View>

                            <Text style={modalStyles.label}>Frame Style</Text>
                            <TextInput
                                style={modalStyles.input}
                                value={frameStyle}
                                onChangeText={setFrameStyle}
                            />

                            <Text style={modalStyles.label}>Add-ons</Text>
                            <TextInput
                                style={[modalStyles.input, modalStyles.textArea]}
                                multiline
                                value={addOns}
                                onChangeText={setAddOns}
                            />
                        </ScrollView>

                        <TouchableOpacity style={modalStyles.continueButton} onPress={handleCustomize}>
                            <Text style={modalStyles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF7EC',
    },
    imageContainer: {
        position: 'relative',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 50,
    },
    backButton: {
        padding: 5,
    },
    productImage: {
        width: '100%',
        height: 450,
        resizeMode: 'cover',
    },
    detailsScrollView: {
        flex: 1,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    productName: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 24,
    },
    productPrice: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        color: '#000',
        marginTop: 5,
    },
    customizeLink: {
        marginTop: 2,
        marginBottom: 15,
    },
    customizeText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 12,
        color: '#A68B69',
        textDecorationLine: 'underline',
    },
    productDescription: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginTop: 5,
    },
    divider: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 15,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    infoLabel: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        color: '#555',
    },
    infoValue: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#000',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    favoriteButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#A68B69',
        height: 50,
        borderRadius: 25,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#fff',
    },
});

// Styles specifically for the modal content
const modalStyles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
        justifyContent: 'flex-end', // Aligns modal to the bottom
    },
    modalContainer: {
        backgroundColor: '#FFF7EC',
        width: '100%',
        height: '80%', // Adjust height as needed
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        padding: 5,
        marginRight: 10,
    },
    headerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#000',
        flex: 1, // Allows title to take available space
        textAlign: 'center', // Center the title
        marginLeft: -40, // Adjust to visually center due to back button
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    label: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    sizeInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '45%',
    },
    multiplier: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 18,
        color: '#555',
    },
    textArea: {
        minHeight: 100,
        textAlignVertical: 'top',
        paddingTop: 12,
    },
    continueButton: {
        backgroundColor: '#A68B69',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10, // Add some bottom margin
    },
    continueButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 16,
        color: '#fff',
    },
});