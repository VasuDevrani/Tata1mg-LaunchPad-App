import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/auth';
import { getUserProfile } from '@/src/services/userService';

export default function Index() {
  const { user, loading } = useAuth();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      checkUserProfile();
    } else if (!loading) {
      setCheckingProfile(false);
    }
  }, [user, loading]);

  const checkUserProfile = async () => {
    try {
      const profile = await getUserProfile(user!.id);
      if (profile) {
        console.log('User profile found:', profile.id);
        setHasProfile(true);
        setOnboardingCompleted(profile.onboarding_completed);
      }
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setCheckingProfile(false);
    }
  };

  if (loading || checkingProfile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5443" />
      </View>
    );
  }

  // If user is not authenticated, show landing page
  if (!user) {
    return <Redirect href="/landing" />;
  }

  // // If user is authenticated and onboarding is completed, go to dashboard
  // if (hasProfile && onboardingCompleted) {
  //   return <Redirect href="/(tabs)" />;
  // }


  // If user is authenticated but onboarding not completed, go to onboarding
  if (hasProfile && !onboardingCompleted) {
    return <Redirect href="/onboarding/steps" />;
  }

  // Default fallback - user is authenticated but no profile, go to landing
  return <Redirect href="/landing" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
