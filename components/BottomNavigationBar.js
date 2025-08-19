import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute

// NavItem Component
const NavItem = ({ icon, label, routeName }) => {
  const navigation = useNavigation();
  const route = useRoute(); // Get the current route to determine active state

  // Determine if this nav item is active based on the current route name
  const isActive = route.name === routeName;

  const handlePress = () => {
    // Navigate to the specified route
    navigation.navigate(routeName);
  };

  return (
    <TouchableOpacity style={styles.navItem} onPress={handlePress}>
      {/* Change icon color based on active state */}
      {React.cloneElement(icon, { color: isActive ? '#a67c52' : '#4B5563' })}
      <Text style={[styles.navItemText, isActive && styles.navItemTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
};

// Bottom Navigation Bar Component
const BottomNavigationBar = () => {
  return (
    <View style={styles.bottomNavContainer}>
      {/* Pass routeName for navigation */}
      <NavItem icon={<Feather name="home" size={22} />} label="Home" routeName="Home" />
      <NavItem icon={<Feather name="grid" size={22} />} label="Category" routeName="Category" />
      <NavItem icon={<Feather name="heart" size={22} />} label="Wishlist" routeName="Wishlist" />
      <NavItem icon={<Feather name="shopping-cart" size={22} />} label="Cart" routeName="Cart" />
      <NavItem icon={<Feather name="help-circle" size={22} />} label="FAQs" routeName="FAQs" />
    </View>
  );
};

// Stylesheet for BottomNavigationBar and NavItem
const styles = StyleSheet.create({
  bottomNavContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes items evenly
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 10,
    position: 'absolute', // Fixed position at bottom
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10, // Adjust for iPhone notch/Android
    shadowColor: '#000', // Subtle shadow for bottom nav
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5, // Android shadow
  },
  navItem: {
    alignItems: 'center',
    paddingHorizontal: 5, // Small horizontal padding for touch area
    flex: 1, // Allows items to share space, contributing to responsiveness
  },
  navItemText: {
    fontSize: 10,
    marginTop: 3,
    color: '#4B5563', // Default color
  },
  navItemTextActive: {
    color: '#a67c52', // Active color
  },
});

export default BottomNavigationBar;
