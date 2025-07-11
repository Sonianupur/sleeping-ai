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
import { loginUser } from '../firebase/authHelpers';
import { AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      alert('✅ Logged in!');
      // Add redirect here if needed, e.g., router.replace('/dashboard');
    } catch (err: any) {
      alert(err.message);
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
            <Text style={styles.heading}>Log In</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="Your email"
              placeholderTextColor="#777"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#777"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => router.push('/forgot-password')}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or Login with</Text>

            <TouchableOpacity style={styles.googleBtn} onPress={() => alert('Google login')}>
              <AntDesign name="google" size={20} color="#444" />
            </TouchableOpacity>
          </View>

          <View style={styles.rightColumn}>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>

            <Text style={styles.policyText}>I accept the terms and privacy policy</Text>

            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.signUpText}>
                Don’t have an account? <Text style={{ fontWeight: 'bold' }}>Sign up</Text>
              </Text>
            </TouchableOpacity>
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
    padding: 24,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 6,
    maxWidth: 750,
    width: '95%',
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
    fontSize: 22,
    fontWeight: '700',
    color: '#4a2f63',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 4,
    color: '#444',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  forgotText: {
    marginTop: 6,
    fontSize: 13,
    color: '#6e4d8a',
    textAlign: 'right',
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
