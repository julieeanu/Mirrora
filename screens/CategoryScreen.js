import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFonts as useLeagueSpartan, LeagueSpartan_700Bold } from "@expo-google-fonts/league-spartan";
import { useFonts as useMontserrat, Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

/**
 * The BottomNavigationBar component.
 */
const BottomNavigationBar = ({ navigation }) => {
  const route = useRoute();
  const navItems = [
    { name: 'home', icon: 'home-outline', activeIcon: 'home', screen: 'Home' },
    { name: 'categories', icon: 'contrast-outline', activeIcon: 'contrast', screen: 'CategoryScreen' },
    { name: 'wishlist', icon: 'heart-outline', activeIcon: 'heart', screen: 'Wishlist' },
    { name: 'cart', icon: 'cart-outline', activeIcon: 'cart', screen: 'CartScreen' },
    { name: 'account', icon: 'person-outline', activeIcon: 'person', screen: 'ProfileScreen' },
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
 * The Category screen component.
 */
export default function CategoryScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets(); // Import and use safe area insets

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [leagueSpartanLoaded] = useLeagueSpartan({
    LeagueSpartan_700Bold,
  });

  const [montserratLoaded] = useMontserrat({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  });

  const categories = [
    { id: '1', name: 'Irregular Mirror', image: require('../assets/Category/irregular.png') },
    { id: '2', name: 'Capsule Mirror', image: require('../assets/Category/capsule_3.png') },
    { id: '3', name: 'Grid Mirror', image: require('../assets/Category/grid.png') },
    { id: '4', name: 'Arch Mirror', image: require('../assets/Category/arch.png') },
    { id: '5', name: 'Round Mirror', image: require('../assets/Category/round.png') },
  ];

  if (!leagueSpartanLoaded || !montserratLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Category</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Grid of category items */}
      <FlatList
        data={categories.slice(0, 4)}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selectedCategory === item.id;
          return (
            <TouchableOpacity
              style={[
                styles.itemContainer,
                isSelected && styles.selectedItemContainer,
              ]}
              onPress={() => {
                setSelectedCategory(item.id);
                navigation.navigate('ProductListScreen', { categoryName: item.name });
              }}
            >
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemOverlay}>
                <View style={styles.itemCircle}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </View>
              </View>
              {isSelected && <View style={styles.darkOverlay} />}
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.centeredItemContainer}>
            <TouchableOpacity
              style={[
                styles.itemContainer,
                selectedCategory === '5' && styles.selectedItemContainer,
              ]}
              onPress={() => {
                setSelectedCategory('5');
                navigation.navigate('ProductListScreen', { categoryName: categories[4].name });
              }}
            >
              <Image source={categories[4].image} style={styles.itemImage} />
              <View style={styles.itemOverlay}>
                <View style={styles.itemCircle}>
                  <Text style={styles.itemText}>{categories[4].name}</Text>
                </View>
              </View>
              {selectedCategory === '5' && <View style={styles.darkOverlay} />}
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontFamily: 'LeagueSpartan_700Bold',
    fontSize: 24,
    color: '#000',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  itemContainer: {
    width: (width - 45) / 2,
    height: 250,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  selectedItemContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
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
  centeredItemContainer: {
    alignItems: 'center',
  },
});