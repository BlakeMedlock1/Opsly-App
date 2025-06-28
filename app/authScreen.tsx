import { ActivityIndicator, Image } from 'react-native'
import {
    Button,
    Input,
    Text,
    XStack,
    YStack
} from 'tamagui'
import { useAuthViewModel } from './view_models/authViewModel'

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
  } = useAuthViewModel()

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" paddingHorizontal={16} backgroundColor="#2c3e50">
      <YStack marginBottom={32} alignItems="center">
        <Image
          source={require('../assets/images/opsly.png')}
          style={{ width: 100, height: 100, marginBottom: 10 }}
          resizeMode="contain"
        />
      </YStack>

      <XStack gap={24} marginBottom={24}>
        <Text
          fontSize={18}
          fontWeight="600"
          color={mode === 'login' ? 'white' : '#9CA3AF'}
          onPress={() => setMode('login')}
        >
          Login
        </Text>
        <Text
          fontSize={18}
          fontWeight="600"
          color={mode === 'signup' ? 'white' : '#9CA3AF'}
          onPress={() => setMode('signup')}
        >
          Signup
        </Text>
      </XStack>

      <YStack width="100%" maxWidth={320} space={12}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#6B7280"
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#6B7280"
        />

        {mode === 'login' && (
          <Text
            color="white"
            fontSize={12}
            textAlign="right"
            style={{ textDecorationLine: 'underline' }}
          >
            Forgot Password?
          </Text>
        )}

        <Button
          theme="active"
          onPress={handleAuth}
          disabled={loading}
          backgroundColor="#2dd4bf"
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text color="white" fontWeight="600">
              Sign In
            </Text>
          )}
        </Button>

        {error ? (
          <Text color="#f87171" textAlign="center" marginTop={16}>
            {error}
          </Text>
        ) : null}
      </YStack>
    </YStack>
  )
}
