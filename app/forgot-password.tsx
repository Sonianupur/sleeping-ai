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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // adjust this path as needed

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('✅ Reset link sent! Please check your email.');
    } catch (error: any) {
      setMessage(error.message);
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
          <Text style={styles.heading}>Forgot Password?</Text>
          <Text style={styles.subText}>
            Don’t worry! It happens. Please enter the email associated with your account.
          </Text>

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

          {message !== '' && <Text style={styles.message}>{message}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginTop: 20,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  subText: {
    color: '#555',
    fontSize: 14,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4a2f63',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  backText: {
    fontSize: 14,
    color: '#6e4d8a',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: 10,
  },
});
