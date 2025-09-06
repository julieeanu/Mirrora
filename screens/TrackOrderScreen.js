import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Image, 
    Platform, 
    SafeAreaView, 
    ActivityIndicator 
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";

const orderDetails = {
    id: 'ORD-001',
    name: 'Floor Standing Mirror',
    size: '60.2" x 51.2"',
    price: '2,250',
    image: require('../assets/mirror.png'),
    status: 'Pending',
    date: 'Aug 04, 2025',
};

const statusSteps = [
    { name: 'Pending', icon: 'file-document-outline', completed: true },
    { name: 'Processing', icon: 'progress-check', completed: false },
    { name: 'Shipped', icon: 'truck-delivery-outline', completed: false },
    { name: 'Delivered', icon: 'package-variant-closed', completed: false },
];

const TrackOrderScreen = () => {
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

    const OrderStatusTracker = () => (
        <View style={styles.statusTrackerContainer}>
            <View style={styles.statusStepsContainer}>
                {statusSteps.map((step, index) => (
                    <View key={step.name} style={styles.statusStepWrapper}>
                        <View style={styles.statusStep}>
                            <View style={[
                                styles.statusIconCircle,
                                step.completed ? styles.completedStatusIconCircle : styles.pendingStatusIconCircle
                            ]}>
                                <Icon 
                                    name={step.icon} 
                                    size={24} 
                                    color={step.completed ? '#fff' : '#A68B69'} 
                                />
                            </View>
                            <Text style={[
                                styles.statusText,
                                step.completed ? styles.completedStatusText : styles.pendingStatusText
                            ]}>
                                {step.name}
                            </Text>
                        </View>
                        {index < statusSteps.length - 1 && (
                            <View style={[
                                styles.statusLine,
                                step.completed ? styles.completedStatusLine : styles.pendingStatusLine
                            ]} />
                        )}
                    </View>
                ))}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="chevron-left" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Track Order</Text>
                    <TouchableOpacity style={styles.chatButton}>
                       <Icon name="chat-processing" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Orders Details Card */}
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.orderCard}>
                        <View style={styles.orderHeader}>
                            <Text style={styles.orderIdText}>Order Id: {orderDetails.id}</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusBadgeText}>{orderDetails.status}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.orderBody}>
                            <Image source={orderDetails.image} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>{orderDetails.name}</Text>
                                <Text style={styles.productSize}>{orderDetails.size}</Text>
                                <Text style={styles.orderDate}>{orderDetails.date}</Text>
                            </View>
                            <View style={styles.priceSection}>
                                <Text style={styles.totalLabel}>Total Item:</Text>
                                <Text style={styles.totalPrice}>₱ {orderDetails.price}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Order Status Tracker */}
                    <OrderStatusTracker />
                </ScrollView>
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
    chatButton: {
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
    scrollViewContent: {
        padding: 15,
        paddingBottom: 100,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
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
    statusBadgeText: {
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
    statusTrackerContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    statusStepsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    statusStepWrapper: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },
    statusStep: {
        alignItems: 'center',
        zIndex: 2,
    },
    statusIconCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
    },
    completedStatusIconCircle: {
        backgroundColor: '#A68B69',
        borderColor: '#A68B69',
    },
    pendingStatusIconCircle: {
        backgroundColor: '#fff',
        borderColor: '#D0D0D0',
    },
    statusText: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 12,
        textAlign: 'center',
    },
    completedStatusText: {
        color: '#A68B69',
        fontFamily: 'Montserrat_600SemiBold',
    },
    pendingStatusText: {
        color: '#999',
    },
    statusLine: {
        position: 'absolute',
        top: 25,
        left: '50%',
        width: '100%',
        height: 2,
        zIndex: 1,
    },
    completedStatusLine: {
        backgroundColor: '#A68B69',
    },
    pendingStatusLine: {
        backgroundColor: '#D0D0D0',
    },
});

export default TrackOrderScreen;