import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        console.log('User is signed in:', user.uid);
      } else {
        console.log('User is signed out');
      }
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await signInAnonymously(auth);
      Alert.alert('Success', `Signed in as: ${result.user.uid}`);
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Error', 'Failed to sign in');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      Alert.alert('Success', 'Signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Firebase Connected!</Text>
      <Text style={styles.projectId}>Project: {auth.app.options.projectId}</Text>
      
      {user ? (
        <>
          <Text style={styles.userInfo}>Signed in as:</Text>
          <Text style={styles.userId}>{user.uid}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Sign Out" onPress={handleSignOut} />
          </View>
        </>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Sign In Anonymously" onPress={handleSignIn} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  projectId: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
  userId: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    maxWidth: 200,
  },
});