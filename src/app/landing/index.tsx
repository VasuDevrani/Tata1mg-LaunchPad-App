import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import { router } from 'expo-router';

export default function LandingScreen() {
  const handleSetGoals = () => {
    router.push('/auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/logo-landing-page.png')}
            style={styles.logo}
            resizeMode="center"
          />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
        <Image
            source={require('@/assets/images/landing-page.png')}
            style={styles.landingImage}
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.title}>Know yourself better!</Text>
          <Text style={styles.subtitle}>
            Set up your goals quickly to help you achieve your health objectives, step by step
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity style={styles.setGoalsButton} onPress={handleSetGoals}>
          <Text style={styles.buttonText}>Set Goals</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 16 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  logoContainer: { flex: 1, alignItems: 'center' },
  logo: {},
  content: { flex: 1, alignItems: 'center', paddingHorizontal: 16 },
  illustrationContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  landingImage: {
    width: '100%',
    height: '100%',
  },
  textContent: { alignItems: 'center', gap: 8, marginTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#181A1F', textAlign: 'center' },
  subtitle: { 
    fontSize: 12, 
    color: '#181A1F', 
    textAlign: 'center', 
    lineHeight: 16,
    maxWidth: 286 
  },
  setGoalsButton: {
    backgroundColor: '#FF5443',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: 328,
    alignItems: 'center',
    marginTop: 100,
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '700',
    textAlign: 'center'
  },
});
