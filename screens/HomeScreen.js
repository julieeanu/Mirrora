import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, StatusBar, Platform } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed

// Import the separated BottomNavigationBar component
import BottomNavigationBar from '../components/BottomNavigationBar'; // Adjust path if you put it elsewhere

// Main HomeScreen Component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Ensures content is below status bar on iOS/Android */}
      <StatusBar barStyle="dark-content" backgroundColor="#F3F4F6" />

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mirrora Philippines</Text>
        <TouchableOpacity style={styles.cartIconContainer}>
          <Feather name="shopping-cart" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <View style={styles.searchInputWrapper}>
          <Feather name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Feather name="filter" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      {/* Categories Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {/* Category Items */}
          <TouchableOpacity style={styles.categoryItem}><View style={styles.categoryIconCircle}><Feather name="circle" size={30} color="#4B5563" /></View><Text style={styles.categoryText}>Round</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}><View style={styles.categoryIconCircle}><FontAwesome5 name="prescription-bottle-alt" size={30} color="#4B5563" /></View><Text style={styles.categoryText}>Capsule</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}><View style={styles.categoryIconCircle}><Feather name="maximize" size={30} color="#4B5563" /></View><Text style={styles.categoryText}>Arch</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}><View style={styles.categoryIconCircle}><Feather name="hexagon" size={30} color="#4B5563" /></View><Text style={styles.categoryText}>Irregular</Text></TouchableOpacity>
          <TouchableOpacity style={styles.categoryItem}><View style={styles.categoryIconCircle}><Feather name="grid" size={30} color="#4B5563" /></View><Text style={styles.categoryText}>Grid</Text></TouchableOpacity>
        </ScrollView>
      </View>

      {/* "For You" Filter */}
      <View style={styles.forYouFilterContainer}>
        <TouchableOpacity style={styles.forYouFilterButton}>
          <Text style={styles.forYouFilterText}>For You</Text>
          <Feather name="chevron-down" size={16} color="#4B5563" style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGridContent} showsVerticalScrollIndicator={false}>
        {[...Array(6)].map((_, index) => ( // Render multiple product cards
          <View key={index} style={styles.productCard}>
            <Image
              source={require('../assets/mirror1.png')} // Changed to local asset
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>Floor Standing Mirror</Text>
              <Text style={styles.productPrice}>₱ 2,000</Text>
              <View style={styles.productActions}>
                <TouchableOpacity><Feather name="heart" size={20} color="#9CA3AF" /></TouchableOpacity>
                <TouchableOpacity style={styles.addToCartButton}><Text style={styles.addToCartButtonText}>Add to Cart</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Component */}
      <BottomNavigationBar />
    </View>
  );
};

// React Native StyleSheet (HomeScreen specific styles only)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cartIconContainer: {
    padding: 5,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingLeft: 40,
    height: 45,
  },
  searchIcon: {
    position: 'absolute',
    left: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#4B5563',
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginLeft: 10,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  categoriesScroll: {
    paddingLeft: 20,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 3,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    color: '#374151',
  },
  forYouFilterContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  forYouFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  forYouFilterText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 5,
  },
  dropdownIcon: {
    // No specific styles needed
  },
  productGridContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 90, // Increased padding to accommodate the bottom navigation bar
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  productImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 10,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#a67c52',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
