import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Add `navigation` as a prop
const BottomNavigationBar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { name: 'home', icon: 'home-outline', activeIcon: 'home', screen: 'Home' },
    { name: 'categories', icon: 'grid-outline', activeIcon: 'grid', screen: 'Categories' },
    { name: 'wishlist', icon: 'heart-outline', activeIcon: 'heart', screen: 'Wishlist' },
    { name: 'cart', icon: 'cart-outline', activeIcon: 'cart', screen: 'Cart' },
    { name: 'account', icon: 'person-outline', activeIcon: 'person', screen: 'Account' },
  ];

  const insets = useSafeAreaInsets();

  // Function to handle the press
  const handlePress = (item) => {
    setActiveTab(item.name);
    // Navigate if a screen name is defined
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
          // Use the new handlePress function
          onPress={() => handlePress(item)}
        >
          <Ionicons
            name={activeTab === item.name ? item.activeIcon : item.icon}
            size={26}
            color={activeTab === item.name ? '#A68B69' : 'gray'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default BottomNavigationBar;