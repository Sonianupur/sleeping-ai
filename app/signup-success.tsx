// app/signup-success.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Account Created!</Text>
      <Text style={styles.subtitle}>You're all set. Please log in to continue.</Text>
      <TouchableOpacity onPress={() => router.push('/login')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  button: {
    backgroundColor: '#4a2f63',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16 },
});
