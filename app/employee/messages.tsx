import { Message } from '@/app/types';
import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import { Mail } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, XStack, YStack } from 'tamagui';

const mockMessages: Message[] = [
  {
    id: '1',
    title: 'Shift Update',
    content: 'Tomorrow’s shift will start at 9 AM instead of 8 AM.',
    date: '2025-06-28T15:30:00Z',
    read: false,
  },
  {
    id: '2',
    title: 'Policy Reminder',
    content: 'Please remember to wear your safety gear at all times.',
    date: '2025-06-27T12:00:00Z',
    read: true,
  },
];

const MessageCard = ({ message }: { message: Message }) => {
  return (
    <Card
      backgroundColor={message.read ? '#34495e' : '#1abc9c'}
      borderRadius={16}
      padding="$4"
      marginBottom="$3"
    >
      <TouchableOpacity activeOpacity={0.8}>
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$5" color="#fff" fontWeight="700">
              {message.title}
            </Text>
            {!message.read && <Mail size={18} color="white" />}
          </XStack>
          <Text color="#ecf0f1" numberOfLines={2}>
            {message.content}
          </Text>
          <Text fontSize="$2" color="#bdc3c7">
            {new Date(message.date).toLocaleString()}
          </Text>
        </YStack>
      </TouchableOpacity>
    </Card>
  );
};

export default function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4">
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MessageCard message={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </YStack>
      <EmployeeNavbar />
    </>
  );
}
