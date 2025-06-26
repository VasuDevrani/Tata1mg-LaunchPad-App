import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/auth';
import { getUserProfile } from '@/src/services/userService';

export const useAuthNavigation = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

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
      setUserProfile(profile);
    } catch (error) {
      console.error('Error checking profile:', error);
    } finally {
      setCheckingProfile(false);
    }
  };

  const navigateBasedOnAuthState = () => {
    if (loading || checkingProfile) {
      return 'loading';
    }

    if (!user) {
      return 'landing';
    }

    if (userProfile && userProfile.onboarding_completed) {
      return 'dashboard';
    }

    if (userProfile && !userProfile.onboarding_completed) {
      return 'onboarding';
    }

    return 'landing';
  };

  return {
    navigationState: navigateBasedOnAuthState(),
    userProfile,
    loading: loading || checkingProfile
  };
};
