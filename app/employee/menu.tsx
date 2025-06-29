import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import React from 'react';
import { Button, Text, YStack } from 'tamagui';
import { useAuth } from '../auth/authContext'; // adjust path if needed

export default function MenuPage() {
  const { logout } = useAuth();

  return (
    <>
      <TopHeader />
      <YStack
        flex={1}
        backgroundColor="#22303D"
        justifyContent="center"
        alignItems="center"
        padding="$4"
      >
        <Text fontSize="$7" fontWeight="700" color="#fff" marginBottom="$4">
          Menu
        </Text>
        <Button
          onPress={logout}
          backgroundColor="#e74c3c"
          color="#fff"
          size="$5"
          borderRadius="$4"
        >
          Logout
        </Button>
      </YStack>
      <EmployeeNavbar />
    </>
  );
}
