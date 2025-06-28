import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

export default function Messages() {
  const [activeTab, setActiveTab] = useState('messages');
  const router = useRouter();

  const handleTabPress = (path: string) => {
    setActiveTab(path.replace('/messages', '')); 
    router.push(path as any);
  };

  return (
    <>
    <TopHeader />
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Messages Page</Text>
    </View>
    <EmployeeNavbar activeTab={activeTab} onTabPress={handleTabPress}/>
    </>
  );
}