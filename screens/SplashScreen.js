// screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, ImageBackground, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('hasLaunched');

      setTimeout(async () => {
        if (isFirstLaunch === null) {
          // First time launch → show onboarding
          await AsyncStorage.setItem('hasLaunched', 'true');
          navigation.replace('OnboardingScreen');
        } else {
          // Not first time → go straight to Welcome
          navigation.replace('OnboardingScreen');
        }
      }, 3000); // splash visible for 3 seconds
    };

    checkFirstLaunch();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Image
          source={require('../assets/logoo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.6,
    height: 100,
  },
});
