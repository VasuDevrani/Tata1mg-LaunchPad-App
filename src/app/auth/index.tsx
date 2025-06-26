import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/src/context/auth';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '@/src/components/navbar';
import GenderPicker from '@/src/components/genderpicker';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<string>('Select Gender');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const validateInputs = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return false;
    }

    if (isSignUp && !fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return false;
    }

    if (isSignUp && (!gender || gender === '')) {
      Alert.alert('Error', 'Please select your gender');
      return false;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleAuth = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const { error } = isSignUp
        ? await signUp(email, password, fullName, gender || undefined)
        : await signIn(email, password);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        if (isSignUp) {
          Alert.alert(
            'Success',
            'Account created successfully! Please sign in to continue',
          );
          setIsSignUp(!isSignUp);
          setEmail('');
          setPassword('');
        } else {
          Alert.alert(
            'Success',
            'Signed in successfully!',
          );
          router.push('/onboarding/steps');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Header */}
        <Header headerText='Home' backRoute='/landing' />
          {/* Background Elements */}
          <LinearGradient
            colors={['#FF5443', '#3DA56A']}
            style={[styles.gradientCircle, styles.topCircle]}
          />
          <LinearGradient
            colors={['#F6B4CD', '#FACB2D']}
            style={[styles.gradientCircle, styles.bottomCircle]}
          />

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>
                {isSignUp ? 'Create Your Account' : 'Welcome Back'}
              </Text>

              <Text style={styles.subtitle}>
                {isSignUp
                  ? 'Join us to start your wellness journey'
                  : 'Sign in to continue your wellness journey'}
              </Text>

              {isSignUp && (
                <TextInput
                  style={styles.input}
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              )}

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              {isSignUp && (
                <GenderPicker selectedGender={gender} onGenderSelect={setGender} />
              )}

              <TouchableOpacity
                style={[styles.authButton, loading && styles.authButtonDisabled]}
                onPress={handleAuth}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.authButtonText}>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsSignUp(!isSignUp)}
              >
                <Text style={styles.switchText}>
                  {isSignUp
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  keyboardView: { flex: 1 },
  backButton: { alignSelf: 'flex-start' },
  backButtonText: { fontSize: 20, color: '#181A1F', fontWeight: '600' },
  gradientCircle: { position: 'absolute', borderRadius: 50 },
  topCircle: { width: 150, height: 150, top: 100, left: -30 },
  bottomCircle: { width: 200, height: 150, bottom: 50, right: -50 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  formContainer: { alignItems: 'center' },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#181A1F',
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20
  },
  input: {
    width: '100%',
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  authButton: {
    backgroundColor: '#FF5443',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24
  },
  authButtonDisabled: { backgroundColor: '#cccccc' },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700'
  },
  switchButton: { alignItems: 'center' },
  backButtonContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 24, gap: 8 },
  switchText: { color: '#FF5443', fontSize: 14, fontWeight: '600' },
  backIcon: { backgroundColor: "#F0F2F5", padding: 14, borderRadius: 100 }
});
