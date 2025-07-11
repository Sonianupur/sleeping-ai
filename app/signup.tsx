import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { registerUser } from '../firebase/authHelpers';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async () => {
    try {
      await registerUser(email, password);
      alert('✅ Account created successfully! Please log in.');

      // Fix: navigate after short delay so alert doesn't block redirect
      setTimeout(() => {
        router.replace('/signup-success');
      }, 300);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please log in instead.');
      } else if (err.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters.');
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <LinearGradient colors={['#d1e4f6', '#f1d4ec']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.logo}>
          Sleeping<Text style={styles.ai}>AI</Text>
        </Text>

        <View style={styles.card}>
          <View style={styles.leftColumn}>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholderTextColor="#777"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholderTextColor="#777"
            />
            <Text style={styles.orText}>Or Sign up with</Text>
            <TouchableOpacity style={styles.googleBtn} onPress={() => alert('Google signup')}>
              <Text style={styles.googleText}>G</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rightColumn}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleSignup}>
              <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.policyText}>I accept the terms and privacy policy</Text>
            <Text style={styles.signUpText} onPress={() => router.push('/login')}>
              Already have an account? <Text style={{ fontWeight: 'bold' }}>Log in</Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  ai: { color: '#C084FC' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 700,
    width: '100%',
  },
  leftColumn: {
    flex: 1,
    paddingRight: 20,
  },
  rightColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 6,
    color: '#555',
    fontSize: 13,
  },
  googleBtn: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  googleText: {
    fontSize: 16,
    color: '#444',
  },
  loginBtn: {
    backgroundColor: '#4a2f63',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  policyText: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 13,
    color: '#6e4d8a',
    textAlign: 'center',
  },
});
