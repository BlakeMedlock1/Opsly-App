import config from '@/tamagui.config';
import { Slot } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import { AuthProvider } from './auth/authContext';

export default function Layout() {
  return (
    <TamaguiProvider config={config}>
    <AuthProvider>
      <Slot />
    </AuthProvider>
    </TamaguiProvider>
  );
}
