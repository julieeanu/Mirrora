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
    Modal,
    TextInput,
    StatusBar,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import BottomNavigationBar from '../components/BottomNavigationBar';

// Temporary data for the account information screen, replace with real data fetching
const TEMP_USER_DATA = {
    email: 'ninongry@email.com',
    name: 'Nina Ongry',
    password: '••••••',
    firstName: 'Julie',
    lastName: 'Utrera',
    phoneNumber: '092248513 giga stories'
};

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [showAccountInfo, setShowAccountInfo] = useState(false);
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [showAddCardModal, setShowAddCardModal] = useState(false);

    const [currentTab, setCurrentTab] = useState('accountData');
    const [accountEmail, setAccountEmail] = useState(TEMP_USER_DATA.email);
    const [accountPassword, setAccountPassword] = useState(TEMP_USER_DATA.password);
    const [accountName, setAccountName] = useState(TEMP_USER_DATA.name);
    const [accountFirstName, setAccountFirstName] = useState(TEMP_USER_DATA.firstName);
    const [accountLastName, setAccountLastName] = useState(TEMP_USER_DATA.lastName);
    const [accountPhoneNumber, setAccountPhoneNumber] = useState(TEMP_USER_DATA.phoneNumber);

    // New states for the add card form
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCVC, setCardCVC] = useState('');

    const [montserratLoaded] = useMontserrat({ Montserrat_400Regular, Montserrat_600SemiBold });
    const [leagueSpartanLoaded] = useLeagueSpartan({ LeagueSpartan_700Bold });

    useEffect(() => {
        if (montserratLoaded && leagueSpartanLoaded) {
            setIsLoading(false);
        }
    }, [montserratLoaded, leagueSpartanLoaded]);

    // Function to get theme-aware styles
    const getStyles = () => {
        const theme = {
            backgroundPrimary: '#F8F8F8',
            backgroundSecondary: '#FFFFFF',
            textPrimary: '#1F2937', // Darker gray for primary text
            textSecondary: '#6B7280', // Medium gray for secondary text
            accent: '#C76A51', // Warm Terracotta
            border: '#E5E7EB', // Lighter gray for borders
            deleteButtonText: '#EF4444',
            deleteButtonBg: '#FEE2E2',
        };

        return StyleSheet.create({
            safeArea: {
                flex: 1,
                backgroundColor: theme.backgroundPrimary,
            },
            container: {
                flex: 1,
            },
            loadingContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.backgroundPrimary,
            },
            header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingTop: Platform.OS === 'android' ? 50 : 0,
                paddingBottom: 15,
                backgroundColor: theme.backgroundPrimary,
                borderBottomColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0,
            },
            backButton: {
                width: 40,
                alignItems: 'flex-start',
            },
            headerSpacer: {
                width: 40,
            },
            headerTitle: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 20,
                color: theme.textPrimary,
                flex: 1,
                textAlign: 'center',
            },
            scrollView: {
                flex: 1,
                backgroundColor: theme.backgroundPrimary,
            },
            scrollViewContent: {
                paddingBottom: 100,
            },
            settingsContainer: {
                paddingHorizontal: 20,
                paddingTop: 20,
            },
            sectionHeader: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                color: theme.textSecondary,
                marginBottom: 15,
                marginTop: 10,
            },
            settingsSection: {
                backgroundColor: theme.backgroundSecondary,
                borderRadius: 20, // Increased corner radius for a softer look
                marginBottom: 25,
                overflow: 'hidden',
                // Added drop shadow for a layered effect
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                    },
                    android: {
                        elevation: 4,
                    },
                }),
            },
            settingsItem: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 18,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
            },
            settingsItemLast: {
                borderBottomWidth: 0,
            },
            settingsItemLeft: {
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
            },
            settingsItemIcon: {
                marginRight: 15,
            },
            settingsItemText: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 16,
                color: theme.textPrimary,
            },
            // Modal specific styles
            modalSafeArea: {
                flex: 1,
                backgroundColor: theme.backgroundPrimary,
            },
            modalContainer: {
                flex: 1,
                backgroundColor: theme.backgroundPrimary,
            },
            modalHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 12,
                backgroundColor: theme.backgroundPrimary,
                borderBottomWidth: 1,
                borderBottomColor: theme.border,
            },
            modalBackButton: {
                padding: 4,
            },
            modalHeaderSpacer: {
                width: 32,
            },
            modalHeaderTitle: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 18,
                color: theme.textPrimary,
                flex: 1,
                textAlign: 'center',
            },
            modalScrollView: {
                flex: 1,
                backgroundColor: theme.backgroundPrimary,
            },
            tabBar: {
                flexDirection: 'row',
                backgroundColor: theme.backgroundSecondary,
                marginHorizontal: 16,
                marginTop: 8,
                borderRadius: 16,
                padding: 6,
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.05,
                        shadowRadius: 4,
                    },
                    android: {
                        elevation: 2,
                    },
                }),
            },
            tab: {
                flex: 1,
                alignItems: 'center',
                paddingVertical: 12,
                borderRadius: 12,
            },
            activeTab: {
                backgroundColor: theme.backgroundPrimary,
            },
            tabText: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 14,
                color: theme.textSecondary,
            },
            activeTabText: {
                fontFamily: 'Montserrat_600SemiBold',
                color: theme.textPrimary,
            },
            tabContent: {
                paddingHorizontal: 20,
                paddingTop: 24,
                backgroundColor: theme.backgroundPrimary,
            },
            inputGroup: {
                marginBottom: 20,
            },
            label: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 13,
                color: theme.textSecondary,
                marginBottom: 8,
            },
            input: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 16,
                color: theme.textPrimary,
                paddingVertical: 16,
                paddingHorizontal: 18,
                backgroundColor: theme.backgroundSecondary,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: theme.border,
            },
            deleteSection: {
                marginTop: 40,
                paddingTop: 20,
            },
            deleteTitle: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                color: theme.textPrimary,
                marginBottom: 8,
            },
            deleteDescription: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 14,
                color: theme.textSecondary,
                marginBottom: 20,
                lineHeight: 20,
            },
            deleteButton: {
                backgroundColor: theme.deleteButtonBg,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
            },
            deleteButtonText: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                color: theme.deleteButtonText,
            },
            saveButtonContainer: {
                paddingHorizontal: 20,
                paddingVertical: 16,
                backgroundColor: theme.backgroundPrimary,
                borderTopWidth: 1,
                borderTopColor: theme.border,
            },
            saveButton: {
                backgroundColor: theme.accent,
                paddingVertical: 16,
                borderRadius: 25, // More rounded, pill-like shape
                alignItems: 'center',
            },
            saveButtonText: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                color: '#fff',
            },
            // Payment Method Modal specific styles
            paymentMethodContent: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                backgroundColor: theme.backgroundPrimary,
            },
            paymentCardIcon: {
                marginBottom: 20,
            },
            noCardTitle: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 20,
                color: theme.textPrimary,
                marginBottom: 10,
                textAlign: 'center',
            },
            noCardDescription: {
                fontFamily: 'Montserrat_400Regular',
                fontSize: 15,
                color: theme.textSecondary,
                textAlign: 'center',
                marginBottom: 30,
                lineHeight: 22,
            },
            addCardButton: {
                backgroundColor: theme.accent,
                paddingVertical: 16,
                paddingHorizontal: 40,
                borderRadius: 25,
                alignItems: 'center',
            },
            addCardButtonText: {
                fontFamily: 'Montserrat_600SemiBold',
                fontSize: 16,
                color: '#fff',
            },
            // New styles for the Add Card screen layout
            cardInfoRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 20,
            },
            cardInfoInputGroup: {
                width: '48%',
            },
        });
    };

    const themedStyles = getStyles();

    if (isLoading) {
        return (
            <View style={themedStyles.loadingContainer}>
                <ActivityIndicator size="large" color={themedStyles.accent} />
            </View>
        );
    }

    const SettingsItem = ({ icon, title, onPress, hasChevron = true, themeStyles, isLast = false }) => (
        <TouchableOpacity style={[themeStyles.settingsItem, isLast && themeStyles.settingsItemLast]} onPress={onPress}>
            <View style={themeStyles.settingsItemLeft}>
                <Icon name={icon} size={24} color={themeStyles.textPrimary} style={themedStyles.settingsItemIcon} />
                <Text style={themeStyles.settingsItemText}>{title}</Text>
            </View>
            {hasChevron && (
                <Icon name="chevron-right" size={20} color={themeStyles.textSecondary} />
            )}
        </TouchableOpacity>
    );

    const SectionHeader = ({ title, themeStyles }) => (
        <Text style={themeStyles.sectionHeader}>{title}</Text>
    );

    const renderAccountInfoContent = () => {
        if (currentTab === 'accountData') {
            return (
                <View style={themedStyles.tabContent}>
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>Email Address</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={accountEmail}
                            onChangeText={setAccountEmail}
                            placeholder="Enter email"
                            placeholderTextColor={themedStyles.textSecondary}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>Password</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={accountPassword}
                            onChangeText={setAccountPassword}
                            placeholder="Enter password"
                            placeholderTextColor={themedStyles.textSecondary}
                            secureTextEntry
                        />
                    </View>

                    <View style={themedStyles.deleteSection}>
                        <Text style={themedStyles.deleteTitle}>Delete account</Text>
                        <Text style={themedStyles.deleteDescription}>
                            Your account will be permanently removed from the application.
                        </Text>
                        <TouchableOpacity style={themedStyles.deleteButton}>
                            <Text style={themedStyles.deleteButtonText}>Delete Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (currentTab === 'personalData') {
            return (
                <View style={themedStyles.tabContent}>
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>First Name</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={accountFirstName}
                            onChangeText={setAccountFirstName}
                            placeholder="Enter your first name"
                            placeholderTextColor={themedStyles.textSecondary}
                            keyboardType="default"
                        />
                    </View>
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>Last Name</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={accountLastName}
                            onChangeText={setAccountLastName}
                            placeholder="Enter your last name"
                            placeholderTextColor={themedStyles.textSecondary}
                            keyboardType="default"
                        />
                    </View>
                    <View style={themedStyles.inputGroup}>
                        <Text style={themedStyles.label}>Phone Number</Text>
                        <TextInput
                            style={themedStyles.input}
                            value={accountPhoneNumber}
                            onChangeText={setAccountPhoneNumber}
                            placeholder="Enter your phone number"
                            placeholderTextColor={themedStyles.textSecondary}
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>
            );
        }
    };

    const renderAddCardModalContent = () => {
        return (
            <View style={themedStyles.modalContainer}>
                <View style={themedStyles.modalHeader}>
                    <TouchableOpacity onPress={() => setShowAddCardModal(false)} style={themedStyles.modalBackButton}>
                        <Icon name="chevron-left" size={24} color={themedStyles.textPrimary} />
                    </TouchableOpacity>
                    <Text style={themedStyles.modalHeaderTitle}>Add new card</Text>
                    <View style={themedStyles.modalHeaderSpacer} />
                </View>
                <ScrollView style={themedStyles.modalScrollView} showsVerticalScrollIndicator={false}>
                    <View style={themedStyles.tabContent}>
                        <View style={themedStyles.inputGroup}>
                            <Text style={themedStyles.label}>Name on card</Text>
                            <TextInput
                                style={themedStyles.input}
                                value={cardName}
                                onChangeText={setCardName}
                                placeholder="Julie Utrera"
                                placeholderTextColor={themedStyles.textSecondary}
                                keyboardType="default"
                            />
                        </View>
                        <View style={themedStyles.inputGroup}>
                            <Text style={themedStyles.label}>Card Number</Text>
                            <TextInput
                                style={themedStyles.input}
                                value={cardNumber}
                                onChangeText={setCardNumber}
                                placeholder="0000 0000 0000 0000"
                                placeholderTextColor={themedStyles.textSecondary}
                                keyboardType="numeric"
                                maxLength={16}
                            />
                        </View>
                        <View style={themedStyles.cardInfoRow}>
                            <View style={themedStyles.cardInfoInputGroup}>
                                <Text style={themedStyles.label}>MM/YY</Text>
                                <TextInput
                                    style={themedStyles.input}
                                    value={cardExpiry}
                                    onChangeText={setCardExpiry}
                                    placeholder="MM/YY"
                                    placeholderTextColor={themedStyles.textSecondary}
                                    keyboardType="numeric"
                                    maxLength={5}
                                />
                            </View>
                            <View style={themedStyles.cardInfoInputGroup}>
                                <Text style={themedStyles.label}>CVC</Text>
                                <TextInput
                                    style={themedStyles.input}
                                    value={cardCVC}
                                    onChangeText={setCardCVC}
                                    placeholder="CVC"
                                    placeholderTextColor={themedStyles.textSecondary}
                                    keyboardType="numeric"
                                    secureTextEntry
                                    maxLength={4}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={themedStyles.saveButtonContainer}>
                    <TouchableOpacity style={themedStyles.saveButton}>
                        <Text style={themedStyles.saveButtonText}>Add new card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={themedStyles.safeArea}>
            <View style={themedStyles.container}>
                <StatusBar barStyle={"dark-content"} backgroundColor={'#F8F8F8'} />

                {/* Header */}
                <View style={themedStyles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={themedStyles.backButton}>
                        <Icon name="chevron-left" size={28} color={themedStyles.textPrimary} />
                    </TouchableOpacity>
                    <Text style={themedStyles.headerTitle}>Settings</Text>
                    <View style={themedStyles.headerSpacer} />
                </View>

                {/* Settings Content */}
                <ScrollView style={themedStyles.scrollView} contentContainerStyle={themedStyles.scrollViewContent}>
                    <View style={themedStyles.settingsContainer}>
                        {/* General Section */}
                        <SectionHeader title="General" themeStyles={themedStyles} />
                        <View style={themedStyles.settingsSection}>
                            <SettingsItem
                                icon="account-outline"
                                title="Account Information"
                                onPress={() => setShowAccountInfo(true)}
                                themeStyles={themedStyles}
                            />
                            <SettingsItem
                                icon="credit-card-outline"
                                title="Payment Methods"
                                onPress={() => setShowPaymentMethodModal(true)}
                                themeStyles={themedStyles}
                            />
                            <SettingsItem
                                icon="bell-outline"
                                title="Notification"
                                onPress={() => navigation.navigate('Notifications')}
                                themeStyles={themedStyles}
                                isLast={true}
                            />
                        </View>

                        {/* Help & Support Section */}
                        <SectionHeader title="Help & Support" themeStyles={themedStyles} />
                        <View style={themedStyles.settingsSection}>
                            <SettingsItem
                                icon="help-circle-outline"
                                title="Help Center"
                                onPress={() => navigation.navigate('HelpCenter')}
                                themeStyles={themedStyles}
                                isLast={true}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Account Information Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showAccountInfo}
                    onRequestClose={() => setShowAccountInfo(false)}
                >
                    <SafeAreaView style={themedStyles.modalSafeArea}>
                        <StatusBar barStyle={"dark-content"} backgroundColor={'#F8F8F8'} />
                        <View style={themedStyles.modalContainer}>
                            {/* Modal Header */}
                            <View style={themedStyles.modalHeader}>
                                <TouchableOpacity onPress={() => setShowAccountInfo(false)} style={themedStyles.modalBackButton}>
                                    <Icon name="chevron-left" size={24} color={themedStyles.textPrimary} />
                                </TouchableOpacity>
                                <Text style={themedStyles.modalHeaderTitle}>Account Information</Text>
                                <View style={themedStyles.modalHeaderSpacer} />
                            </View>

                            <ScrollView style={themedStyles.modalScrollView} showsVerticalScrollIndicator={false}>
                                {/* Tab Bar */}
                                <View style={themedStyles.tabBar}>
                                    <TouchableOpacity
                                        style={[themedStyles.tab, currentTab === 'accountData' && themedStyles.activeTab]}
                                        onPress={() => setCurrentTab('accountData')}
                                    >
                                        <Text style={[themedStyles.tabText, currentTab === 'accountData' && themedStyles.activeTabText]}>
                                            Account Data
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[themedStyles.tab, currentTab === 'personalData' && themedStyles.activeTab]}
                                        onPress={() => setCurrentTab('personalData')}
                                    >
                                        <Text style={[themedStyles.tabText, currentTab === 'personalData' && themedStyles.activeTabText]}>
                                            Personal Data
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {renderAccountInfoContent()}
                            </ScrollView>

                            {/* Save Button */}
                            <View style={themedStyles.saveButtonContainer}>
                                <TouchableOpacity style={themedStyles.saveButton}>
                                    <Text style={themedStyles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Payment Methods Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showPaymentMethodModal}
                    onRequestClose={() => setShowPaymentMethodModal(false)}
                >
                    <SafeAreaView style={themedStyles.modalSafeArea}>
                        <StatusBar barStyle={"dark-content"} backgroundColor={'#F8F8F8'} />
                        <View style={themedStyles.modalContainer}>
                            <View style={themedStyles.modalHeader}>
                                <TouchableOpacity onPress={() => setShowPaymentMethodModal(false)} style={themedStyles.modalBackButton}>
                                    <Icon name="chevron-left" size={24} color={themedStyles.textPrimary} />
                                </TouchableOpacity>
                                <Text style={themedStyles.modalHeaderTitle}>Payment Methods</Text>
                                <View style={themedStyles.modalHeaderSpacer} />
                            </View>
                            <View style={themedStyles.paymentMethodContent}>
                                <Icon name="credit-card-off-outline" size={72} color={themedStyles.textSecondary} style={themedStyles.paymentCardIcon} />
                                <Text style={themedStyles.noCardTitle}>No cards yet!</Text>
                                <Text style={themedStyles.noCardDescription}>
                                    Looks like you haven't added any payment methods yet. Add a card to make purchases.
                                </Text>
                                <TouchableOpacity style={themedStyles.addCardButton} onPress={() => { setShowPaymentMethodModal(false); setShowAddCardModal(true); }}>
                                    <Text style={themedStyles.addCardButtonText}>Add a card</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Add Card Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showAddCardModal}
                    onRequestClose={() => setShowAddCardModal(false)}
                >
                    <SafeAreaView style={themedStyles.modalSafeArea}>
                        <StatusBar barStyle={"dark-content"} backgroundColor={'#F8F8F8'} />
                        {renderAddCardModalContent()}
                    </SafeAreaView>
                </Modal>

                {/* Bottom Navigation Bar */}
                <BottomNavigationBar isDarkTheme={false} />
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;