import Header from '@/src/components/navbar';
import RulerPicker from '@/src/components/StepRulerPicker';
import { useAuth } from '@/src/context/auth';
import { saveGoal } from '@/src/services/userService';
import { Href, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function StepsOnboardingScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [targetSteps, setTargetSteps] = useState(10000);

  const handleNext = async () => {
    if (!user) return;

    try {
      await saveGoal(user.id, 'steps', targetSteps, 'steps');
      // Navigate to next onboarding step
      router.push('onboarding/water' as Href);
    } catch (error) {
      console.error('Error saving steps goal:', error);
      Alert.alert('Error', 'Failed to save your goal. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Header */}
      <Header headerText='Steps' skip skipRoute='/onboarding/water'/>

      {/* Content */}
      <View style={styles.content}>
        {/* Description */}
        <Text style={styles.description}>
          Set a daily step goal. Taking 10,000 steps a day is linked to improved heart health and reduced risk of chronic diseases.
        </Text>

        <View style={styles.goalSection}>
          <RulerPicker
            onChange={setTargetSteps}
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 18,
    color: '#181A1F',
    fontWeight: '600',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181A1F',
  },
  skipButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#868E9E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: '#414752',
    lineHeight: 20,
    marginBottom: 40,
  },
  goalSection: {
    alignItems: 'center',
    marginTop: 150,
  },
  goalDisplay: {
    alignItems: 'center',
    width: 312,
  },
  goalNumber: {
    fontSize: 54,
    fontWeight: '500',
    color: '#181A1F',
    textAlign: 'center',
    lineHeight: 65,
  },
  goalUnit: {
    fontSize: 16,
    fontWeight: '500',
    color: '#181A1F',
    textAlign: 'center',
    lineHeight: 24,
  },
  chartContainer: {
    width: 328,
    height: 108,
    position: 'relative',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 9,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 24,
    left: -33,
  },
  barItem: {
    width: 3,
    backgroundColor: '#D9D9D9',
  },
  targetLine: {
    position: 'absolute',
    top: 123,
    left: 163,
    width: 0,
    height: 160,
    borderLeftWidth: 5,
    borderLeftColor: '#FF5443',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 34,
  },
  nextButton: {
    backgroundColor: '#FF5443',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: 328,
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
