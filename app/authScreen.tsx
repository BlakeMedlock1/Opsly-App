import {
    ActivityIndicator,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { styles } from './styles/authStyles';
import { useAuthViewModel } from './view_models/authViewModel';
  
  export default function AuthScreen() {
    const {
      mode,
      setMode,
      email,
      setEmail,
      password,
      setPassword,
      loading,
      error,
      handleAuth,
    } = useAuthViewModel();
  
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/opsly.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        </View>
  
        <View style={styles.toggleContainer}>
          <TouchableOpacity onPress={() => setMode('login')}>
            <Text style={[styles.toggleText, mode === 'login' ? styles.active : styles.inactive]}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode('signup')}>
            <Text style={[styles.toggleText, mode === 'signup' ? styles.active : styles.inactive]}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
  
        <View style={styles.form}>
          <TextInput
            placeholder='Email'
            placeholderTextColor="#6B7280"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#6B7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
  
          {mode === 'login' && <Text style={styles.forgotPassword}>Forgot Password?</Text>}
  
          <TouchableOpacity onPress={handleAuth} disabled={loading} style={styles.button}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In</Text>}
          </TouchableOpacity>
  
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
    );
  }
  