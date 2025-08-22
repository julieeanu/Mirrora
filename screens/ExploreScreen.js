import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, Platform } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * The new BottomNavigationBar component
 */
const BottomNavigationBar = ({ navigation }) => {
  // Use useRoute() hook to get the name of the current screen
  const route = useRoute();
  
  const navItems = [
    // This item already handles navigation to the 'Home' screen
    { name: 'home', icon: 'home-outline', activeIcon: 'home', screen: 'Home' },
    { name: 'categories', icon: 'grid-outline', activeIcon: 'grid', screen: 'ExploreScreen' },
    { name: 'wishlist', icon: 'heart-outline', activeIcon: 'heart', screen: 'Wishlist' },
    { name: 'cart', icon: 'cart-outline', activeIcon: 'cart', screen: 'CartScreen' },
    { name: 'account', icon: 'person-outline', activeIcon: 'person', screen: 'AccountScreen' },
  ];

  const insets = useSafeAreaInsets();

  const handlePress = (item) => {
    if (item.screen && navigation) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View style={[styles.bottomNav, { paddingBottom: insets.bottom }]}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.navItem}
          // The active tab is now determined by the current route name
          onPress={() => handlePress(item)}
        >
          <Ionicons
            name={route.name === item.screen ? item.activeIcon : item.icon}
            size={26}
            color={route.name === item.screen ? '#A68B69' : 'gray'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

/**
 * A screen component that displays a product catalog with categories and a search bar.
 */
export default function ExploreScreen() {
  const navigation = useNavigation();

  // State for active category filter
  const [activeCategory, setActiveCategory] = useState('All');
  // State for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Ref for the category FlatList
  const categoryFlatListRef = useRef(null);
  
  // Load fonts
  const [leagueSpartanLoaded] = useLeagueSpartan({
    LeagueSpartan_700Bold,
  });

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  });

  // Dummy data for categories based on the image
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'most-popular', name: 'Most Popular' },
    { id: 'round', name: 'Round' },
    { id: 'capsule', name: 'Capsule' },
    { id: 'arch', name: 'Arch' },
    { id: 'irregular', name: 'Irregular' },
    { id: 'grid', name: 'Grid' },
  ];

  // Dummy data for products with a new 'isMostPopular' and 'type' property
  const products = [
    { id: '1', name: 'Aluminum Frame', price: '₱ 2,000', image: require('../assets/round_1.png'), isMostPopular: false, type: 'Round' },
    { id: '2', name: 'LED Mirror with Aluminum Frame', price: '₱ 2,000', image: require('../assets/round_2.png'), isMostPopular: true, type: 'Round' },
    { id: '3', name: 'Rafflesia Accent Mirror', price: '₱ 2,000', image: require('../assets/round_3.png'), isMostPopular: false, type: 'Round' },
    { id: '4', name: 'Wood Frame', price: '₱ 2,000', image: require('../assets/round_4.png'), isMostPopular: true, type: 'Round' },
    { id: '5', name: 'Frameless with LED', price: '₱ 2,000', image: require('../assets/capsule_1.png'), isMostPopular: false, type: 'Capsule' },
    { id: '6', name: 'Rattan in Sunrays', price: '₱ 2,000', image: require('../assets/capsule_2.png'), isMostPopular: true, type: 'Capsule' },
    { id: '7', name: 'Crescent Wood Frame', price: '₱ 2,000', image: require('../assets/arch_1.png'), isMostPopular: false, type: 'Arch' },
    { id: '8', name: 'Backlighted', price: '₱ 2,000', image: require('../assets/arch_2.png'), isMostPopular: false, type: 'Arch' },
    { id: '9', name: 'Irregular Mirror', price: '₱ 2,000', image: require('../assets/irregular_1.png'), isMostPopular: false, type: 'Irregular' },
    { id: '10', name: 'Grid Mirror', price: '₱ 2,000', image: require('../assets/grid_1.png'), isMostPopular: false, type: 'Grid' },
  ];

  // Use useEffect to filter products whenever the activeCategory changes
  useEffect(() => {
    if (!leagueSpartanLoaded || !montserratLoaded) {
      return;
    }
    
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else if (activeCategory === 'Most Popular') {
      setFilteredProducts(products.filter(p => p.isMostPopular));
    } else {
      // Filter based on the product type for other categories
      setFilteredProducts(products.filter(p => p.type === activeCategory));
    }
  }, [activeCategory, leagueSpartanLoaded, montserratLoaded]);

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null; // Wait for fonts to load before rendering
  }
  
  // This function handles category selection without auto-scrolling
  const handleCategoryPress = (category) => {
    setActiveCategory(category.name);
  };

  const renderHeader = () => (
    <>
      {/* Header section with title and favorite icon */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Mirrors</Text>
        <Icon name="heart-outline" size={24} color="#000" />
      </View>

      {/* Categories filter using FlatList */}
      <FlatList
        ref={categoryFlatListRef}
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.categoryButton, activeCategory === item.name && styles.activeCategoryButton]}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={[styles.categoryText, activeCategory === item.name && styles.activeCategoryText]}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  );

  return (
    <View style={styles.container}>
      {/* Product grid using FlatList */}
      <FlatList
        data={filteredProducts} // Now using filteredProducts state
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
          >
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <View style={styles.productActions}>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name="heart-outline" size={20} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}>
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation Bar */}
      <BottomNavigationBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: '#000',
  },
  categoryList: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#A68B69',
  },
  categoryText: {
    fontFamily: 'Montserrat_400Regular',
    color: '#000',
  },
  activeCategoryText: {
    color: '#fff',
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  productCard: {
    width: (width - 45) / 2,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
  },
  productPrice: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 14,
    color: '#A68B69',
    marginTop: 5,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  favoriteButton: {},
  addToCartButton: {
    backgroundColor: '#A68B69',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  addToCartText: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});