// app/landing.tsx
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#d1e4f6', '#f1d4ec']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>
          Sleeping<Text style={styles.ai}>AI</Text>
        </Text>
        <Text style={styles.tagline}>Your Bedtime, Reimagined.</Text>

        <TouchableOpacity style={styles.signInBtn} onPress={() => router.push('/login')}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.createText}>Create account</Text>
        </TouchableOpacity>

        <Text
          style={styles.terms}
          onPress={() => Linking.openURL('https://yourdomain.com/terms')}
        >
          By creating an account or signing in you agree to our Terms and Conditions
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  ai: {
    color: '#C084FC',
  },
  tagline: {
    fontSize: 16,
    marginTop: 10,
    color: '#1e1d1dff',
  },
  signInBtn: {
    backgroundColor: '#4a2f63ff',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 40,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createBtn: {
    borderColor: '#000',
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 8,
    marginTop: 16,
  },
  createText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  terms: {
    marginTop: 30,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    maxWidth: 260,
  },
});
