import { Task } from '@/app/types';
import EmployeeNavbar from '@/components/EmployeeNavbar';
import TopHeader from '@/components/Header';
import TaskList from '@/components/TaskList';
import { getTasksByDate } from '@/lib/api/tasks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Button, Card, Text, XStack, YStack } from 'tamagui';
import { getCurrentUserId } from '../auth/authHelpers';

export default function TasksPage() {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formattedDate = date.toISOString().slice(0, 10)

  useEffect(() => {
    async function loadTasks() {
      setLoading(true);
      setError(null);
  
      try {
        const userId = await getCurrentUserId();
        if (!userId) throw new Error('User not authenticated');
        const data = await getTasksByDate(userId, formattedDate);
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    loadTasks();
  }, [date]);
  
  const onTaskPress = (task: Task) => {
    router.push(`/modals/task/${task.id}`)
  }

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4" gap="$4">
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize="$6" color="#fff" fontWeight="700">
            Tasks for {formattedDate}
          </Text>
          <Button
            size="$3"
            icon={Calendar}
            onPress={() => setShowPicker(true)}
            theme="gray"
            variant="outlined"
            color="#fff"
          >
            Pick Date
          </Button>
        </XStack>

        {showPicker && (
          <DateTimePicker
            mode="date"
            value={date}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={(_, selectedDate) => {
              setShowPicker(false)
              if (selectedDate) setDate(selectedDate)
            }}
            maximumDate={new Date()}
          />
        )}

        {loading ? (
          <Text color="#fff" fontSize="$4">Loading tasks...</Text>
        ) : error ? (
          <Text color="red" fontSize="$4">{error}</Text>
        ) : tasks.length > 0 ? (
          <TaskList tasks={tasks} onTaskPress={onTaskPress} />
        ) : (
          <Card
            padded
            backgroundColor="#1e293b"
            borderRadius="$6"
            elevate
            alignItems="center"
            justifyContent="center"
            height={120}
          >
            <Text color="#ffffffaa" fontSize="$4">
              No tasks assigned for this day
            </Text>
          </Card>
        )}
      </YStack>
      <EmployeeNavbar />
    </>
  )
}
