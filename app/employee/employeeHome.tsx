import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import TaskList from '@/components/TaskList';
import { getTasksByDate } from '@/lib/api/tasks';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text, YStack } from 'tamagui';
import { getCurrentUserId } from '../auth/authHelpers';
import { Task } from '../types';

export default function EmployeeHome() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const date = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const userId = await getCurrentUserId();
        if (!userId) {
          setLoading(false);
          return;
        }
        const data = await getTasksByDate(userId, date);
        setTasks(data);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskPress = (task: Task) => {
    router.push(`/modals/task/${task.id}`);
  };

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4">
        <View style={{ flex: 1, padding: 16 }}>
          {loading ? (
            <Text color="#fff">Loading tasks...</Text>
          ) : tasks.length > 0 ? (
            <TaskList tasks={tasks} onTaskPress={handleTaskPress} />
          ) : (
            <Text color="#ccc">No tasks assigned for today.</Text>
          )}
        </View>
      </YStack>
      <EmployeeNavbar />
    </>
  );
}