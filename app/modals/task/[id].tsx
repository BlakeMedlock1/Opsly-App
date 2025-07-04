import { getTaskById, submitTask } from '@/lib/api/tasks'; // you need to implement submitTask
import { X } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Spinner, Text, YStack } from 'tamagui';

type Task = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  assigned_date: string;
  status: string;
};

export default function TaskModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error('Failed to fetch task', err);
        Alert.alert('Error', 'Could not load task.');
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async () => {
    if (!id) return;

    try {
      setSubmitting(true);
      await submitTask(id); // assume this changes status to "Submitted"
      Alert.alert('Task submitted!');
      router.back();
    } catch (err) {
      console.error('Error submitting task:', err);
      Alert.alert('Error', 'Failed to submit task.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !task) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#22303D', justifyContent: 'center', alignItems: 'center' }}>
        <Spinner size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#22303D' }}>
      <YStack flex={1} padding="$4">
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <X color="white" size={28} />
          </TouchableOpacity>
        </View>

        <Text color="white" fontSize="$8" fontWeight="700" marginBottom="$3">
          {task.title}
        </Text>

        <Text color="#ffffffcc" fontSize="$4" fontWeight="600" marginBottom="$2">
          Description
        </Text>
        <Text color="#ffffffaa" fontSize="$3" marginBottom="$4">
          {task.description}
        </Text>

        <Text color="#ffffffcc" fontSize="$4" fontWeight="600" marginBottom="$2">
          Instructions
        </Text>
        <Text color="#ffffffaa" fontSize="$3" marginBottom="$4">
          {task.instructions}
        </Text>

        <Text color="#ffffff66" fontSize="$2" marginBottom="$6">
          Assigned on: {new Date(task.assigned_date).toLocaleDateString()}
        </Text>

        {task.status === 'Not Started' || task.status === 'In Progress' ? (
          <Button
            theme="blue"
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Task'}
          </Button>
        ) : (
          <Text color="#22c55e" fontWeight="600">Task already submitted</Text>
        )}
      </YStack>
    </SafeAreaView>
  );
}

