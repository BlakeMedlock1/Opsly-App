import TopHeader from '@/components/Header';
import React from 'react';
import { Text, View } from 'react-native';

export default function ManagerHome() {
  return (
    <>
    <TopHeader />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Manager Home</Text>
    </View>
    </>
  );
}
