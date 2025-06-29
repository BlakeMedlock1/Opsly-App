import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import TaskList from '@/components/TaskList';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { YStack } from 'tamagui';
import { Task } from '../types';

const today = new Date().toISOString().slice(0, 10);

const mockTasks = [
  {
    id: '1',
    title: 'Daily Safety Check',
    description: 'Check all safety protocols.',
    instructions: 'Detailed instructions here...',
    assignedDate: today,
    status: 'Not Started',
  },
  {
    id: '2',
    title: 'Inventory Count',
    description: 'Count all items in warehouse.',
    instructions: 'Detailed instructions here...',
    assignedDate: today,
    status: 'Submitted',
  },
] as const;

export default function EmployeeHome() {
  const [tasks, setTasks] = useState(mockTasks);

  const handleTaskPress = (task: Task) => {
    router.push(`/modals/task/${task.id}`);
  };
  
  const todaysTasks = tasks.filter(t => t.assignedDate === today);

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4">
        <View style={{ flex: 1, padding: 16 }}>
          <TaskList tasks={todaysTasks} onTaskPress={handleTaskPress} />
        </View>
      </YStack>
      <EmployeeNavbar />
    </>
  );
}