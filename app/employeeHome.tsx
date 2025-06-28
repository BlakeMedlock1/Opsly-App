import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import React from 'react';
import { Text, View } from 'react-native';

export default function EmployeeHome() {

  return (
    <>
    <TopHeader />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Employee Home</Text>
    </View>
    <EmployeeNavbar/>
    </>
  );
}
