import { Message } from '@/app/types';
import TopHeader from '@/components/Header';
import ManagerNavbar from '@/components/ManagerNavbar';
import { getUserMessages, markMessageAsRead } from '@/lib/api/messages';
import { Mail } from '@tamagui/lucide-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, XStack, YStack } from 'tamagui';
import { getCurrentUserId } from '../auth/authHelpers';

const MessageCard = ({ message, onPress }: { message: Message, onPress: () => void; }) => {
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
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      try {
        const userId = await getCurrentUserId();
        if (!userId) {
          setLoading(false);
          return;
        }
        const msgs = await getUserMessages(userId);
        setMessages(msgs);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMessages();
  }, []);

  const handleMarkRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4">
        {loading ? (
          <Text color="#fff" fontSize="$4" textAlign="center" marginTop="$4">
            Loading messages...
          </Text>
        ) : messages.length > 0 ? (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MessageCard
                message={item}
                onPress={() => handleMarkRead(item.id)}
              />
            )}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        ) : (
          <Text color="#ccc" fontSize="$4" textAlign="center" marginTop="$4">
            No messages available.
          </Text>
        )}
      </YStack>
      <ManagerNavbar />
    </>
  );
}
