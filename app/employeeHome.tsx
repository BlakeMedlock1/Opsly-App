import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function EmployeeHome() {
  const [activeTab, setActiveTab] = useState('employeeHome');
  const router = useRouter();

  const handleTabPress = (path: string) => {
    setActiveTab(path.replace('/', '')); 
    router.push(path as any);
  };

  return (
    <>
    <TopHeader />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Employee Home</Text>
    </View>
    <EmployeeNavbar activeTab={activeTab} onTabPress={handleTabPress}/>
    </>
  );
}
