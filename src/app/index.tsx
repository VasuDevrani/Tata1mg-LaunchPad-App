import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthNavigation } from '@/src/hooks/useAuthNavigation';

export default function Index() {
  const { navigationState, loading } = useAuthNavigation();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF5443" />
      </View>
    );
  }

  switch (navigationState) {
    case 'dashboard':
      return <Redirect href="/dashboard" />;
    case 'onboarding':
      return <Redirect href="/onboarding/steps" />;
    case 'landing':
    default:
      return <Redirect href="/landing" />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
