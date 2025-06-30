import { Task } from '@/app/types'
import TopHeader from '@/components/Header'
import ManagerNavbar from '@/components/ManagerNavbar'
import { getPendingTasks, updateTaskStatus } from '@/lib/api/tasks'
import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Button, Card, Text, YStack } from 'tamagui'

export default function ReviewTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const data = await getPendingTasks()
      setTasks(data)
    } catch (err) {
      console.error('Error loading tasks', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleAction = async (taskId: string, action: 'Approved' | 'Rejected') => {
    await updateTaskStatus(taskId, action)
    fetchTasks();
  }

  return (
    <>
      <TopHeader />
      <YStack flex={1} backgroundColor="#22303D" padding="$4">
        <Text fontSize="$6" color="#fff" fontWeight="700" marginBottom="$4">
          Review Submitted Tasks
        </Text>

        {loading ? (
          <Text color="#ccc">Loading...</Text>
        ) : tasks.length === 0 ? (
          <Text color="#ccc">No submitted tasks to review.</Text>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card backgroundColor="#2c3e50" padding="$4" marginBottom="$3" borderRadius="$6">
                <YStack gap="$2">
                  <Text color="#fff" fontSize="$5" fontWeight="700">{item.title}</Text>
                  <Text color="#ccc">{item.description}</Text>
                  <YStack gap="$2" marginTop="$2" flexDirection="row">
                    <Button
                      size="$2"
                      theme="green"
                      onPress={() => handleAction(item.id, 'Approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="$2"
                      theme="red"
                      onPress={() => handleAction(item.id, 'Rejected')}
                    >
                      Reject
                    </Button>
                  </YStack>
                </YStack>
              </Card>
            )}
          />
        )}
      </YStack>
      <ManagerNavbar />
    </>
  )
}
