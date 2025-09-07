import React, { useState, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    ImageBackground, 
    FlatList, 
    Dimensions
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import BottomNavigationBar from '../components/BottomNavigationBar';

import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const navigation = useNavigation();
    const bannerRef = useRef(null);

    const [activeBanner, setActiveBanner] = useState(0);
    
    const [leagueSpartanLoaded] = useLeagueSpartan({
        LeagueSpartan_700Bold,
    });

    const [montserratLoaded] = useMontserrat({
        Montserrat_400Regular,
        Montserrat_600SemiBold
    });

    if (!leagueSpartanLoaded || !montserratLoaded) {
        return null;
    }

    // Updated banner data to include all three banners
    const banners = [
        {
            id: '1',
            image: require('../assets/home/banner2.png'), 
            title: 'Discover new arrivals and',
            subtitle: 'find the perfect piece for your home',
            buttonText: 'Shop Now',
            titleColor: '#444',
            subtitleColor: '#666',
            buttonBg: 'rgba(255, 255, 255, 0.7)',
            buttonTextColor: '#a17c55',
        },
        {
            id: '2',
            image: require('../assets/home/banner3.png'), 
            title: 'A perfect round mirror',
            subtitle: 'suitable for any living space.',
            buttonText: 'Add to cart',
            titleColor: '#fff',
            subtitleColor: '#fff',
            buttonBg: 'rgba(255, 255, 255, 0.7)',
            buttonTextColor: '#A68B69',
        },
        {
            id: '3',
            image: require('../assets/home/banner1.png'),
            title: 'Design Your Perfect',
            subtitle: 'Mirror Today',
            buttonText: 'Customize Now',
            titleColor: '#fff',
            subtitleColor: '#fff',
            buttonBg: 'rgba(255, 255, 255, 0.7)',
            buttonTextColor: '#A68B69',
        },
    ];
    
    const popularProducts = [
        { id: '1', name: 'Floor Standing Mirror', price: '₱ 2,000', image: require('../assets/home/mirror1.png')},
        { id: '2', name: 'Floor Standing Mirror', price: '₱ 2,000', image: require('../assets/home/mirror2.png')},
        { id: '3', name: 'Floor Standing Mirror', price: '₱ 2,000', image: require('../assets/home/mirror3.png')},
        { id: '4', name: 'Floor Standing Mirror', price: '₱ 2,000', image: require('../assets/home/mirror4.png')},
    ];

    // Handle banner scroll with improved logic
    const handleBannerScroll = (event) => {
        const slideSize = width - 40; // Same as banner width
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveBanner(index);
    };

    // Handle dot press to scroll to specific banner
    const handleDotPress = (index) => {
        setActiveBanner(index);
        bannerRef.current?.scrollToIndex({
            index,
            animated: true,
        });
    };
    
    const renderHeader = () => (
        <>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mirrora Philippines</Text>
            </View>

            {/* Search Bar Section */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputWrapper}>
                    <Icon name="magnify" size={20} color="#777" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search here..."
                        placeholderTextColor="#777"
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
                    <Icon name="chat-processing" size={25} color="#A68B69" />
                </TouchableOpacity>
            </View>

            {/* Scrollable Banners Container */}
            <View style={styles.bannerContainer}>
                <FlatList
                    ref={bannerRef}
                    data={banners}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    decelerationRate="fast"
                    snapToInterval={width}
                    snapToAlignment="center"
                    onViewableItemsChanged={({ viewableItems }) => {
                        if (viewableItems.length > 0) {
                            setActiveBanner(viewableItems[0].index);
                        }
                    }}
                    contentContainerStyle={styles.bannerList}
                    getItemLayout={(data, index) => ({
                        length: width - 40,
                        offset: (width - 40) * index,
                        index,
                    })}
                    renderItem={({ item }) => (
                        <ImageBackground
                            source={item.image}
                            style={styles.banner}
                            imageStyle={styles.bannerImageStyle}
                        >
                            <View style={styles.bannerContent}>
                                <Text style={[styles.bannerTitle, { color: item.titleColor }]}>{item.title}</Text>
                                <Text style={[styles.bannerSubtitle, { color: item.subtitleColor }]}>{item.subtitle}</Text>
                                <TouchableOpacity style={[styles.bannerButton, { backgroundColor: item.buttonBg }]}>
                                    <Text style={[styles.bannerButtonText, { color: item.buttonTextColor }]}>{item.buttonText}</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    )}
                />
            </View>

            {/* Banner Dots - Now clickable */}
            <View style={styles.bannerDotsContainer}>
                {banners.map((_, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.dot, activeBanner === index && styles.activeDot]}
                        onPress={() => handleDotPress(index)}
                    />
                ))}
            </View>

            {/* Most Popular Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Most Popular</Text>
            </View>
        </>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={popularProducts}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.productRow}
                ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.productCard} 
                        onPress={() => navigation.navigate('ProductScreen', { product: item })}
                    >
                        <View style={styles.productImageContainer}>
                            <Image source={item.image} style={styles.productImage} />
                            <TouchableOpacity style={styles.heartIcon}>
                                <Icon name="heart-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{item.name}</Text>
                            <View style={styles.priceAndButton}>
                                <Text style={styles.productPrice}>{item.price}</Text>
                                <TouchableOpacity style={styles.addToCartButton}>
                                    <Icon name="plus" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
            <BottomNavigationBar navigation={navigation} />
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
    },
    headerTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 22,
        color: '#000',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    searchInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginRight: 10, // Added to create space between the search bar and the icon
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontFamily: 'Montserrat_400Regular',
    },
    bannerContainer: {
        marginTop: 20,
    },
    bannerList: {
        paddingHorizontal: 20,
    },
    banner: {
        width: width - 40,
        height: 180,
        marginRight: 15,
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    bannerImageStyle: {
        borderRadius: 15,
    },
    bannerContent: {
        width: '60%',
    },
    bannerTitle: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        lineHeight: 24,
    },
    bannerSubtitle: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
        marginTop: 5,
    },
    bannerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
    },
    bannerDotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        paddingVertical: 5,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 4,
    },
    activeDot: {
        width: 16,
        backgroundColor: '#A68B69',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 10,
    },
    sectionTitle: {
        fontFamily: 'LeagueSpartan_700Bold',
        fontSize: 20,
        color: '#000',
    },
    productRow: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    productCard: {
        width: '47%',
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    productImageContainer: {
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    heartIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 15,
        padding: 5,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
    },
    priceAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    productPrice: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#A68B69',
    },
    addToCartButton: {
        backgroundColor: '#A68B69',
        padding: 8,
        borderRadius: 20,
    },
});