import EmployeeNavbar from '@/components/EmployeeNavBar';
import TopHeader from '@/components/Header';
import React from 'react';
import { Text, View } from 'react-native';

export default function Stats() {

  return (
    <>
    <TopHeader />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Stats Page</Text>
    </View>
    <EmployeeNavbar/>
    </>
  );
}