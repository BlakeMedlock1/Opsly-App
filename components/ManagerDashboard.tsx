import { getOngoingTasksForToday } from '@/lib/api/tasks'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Card, Progress, Text, YStack } from 'tamagui'

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadTasks = async () => {
    setLoading(true)
    try {
      const data = await getOngoingTasksForToday()
      setTasks(data)
    } catch (err) {
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
    const interval = setInterval(loadTasks, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <YStack flex={1} padding="$4" backgroundColor="#22303D">
      <Text fontSize="$6" fontWeight="700" color="white" marginBottom="$4">
        Ongoing Tasks Today
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {loading ? (
          <Text color="#ccc">Loading...</Text>
        ) : tasks.length === 0 ? (
          <Text color="#ccc">No active tasks for today</Text>
        ) : (
          tasks.map((task, index) => {
            const total = task.subtasks?.length || 0
            const completed = task.subtasks?.filter((s: any) => s.checked).length || 0
            const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

            return (
              <TouchableOpacity
                key={task.id}
                onPress={() => router.push(`../app/modals/approve/${task.id}`)}
              >
                <Card
                  backgroundColor="#1f2937"
                  padding="$4"
                  borderRadius="$6"
                  marginBottom="$3"
                >
                  <YStack space="$2">
                    <Text color="white" fontWeight="700">
                      {task.title}
                    </Text>
                    <Text color="#94a3b8" fontSize="$3">
                      {task.user_id} • {completed}/{total} completed
                    </Text>
                    <Progress value={percent}>
                      <Progress.Indicator
                        animation="bouncy"
                        backgroundColor="#10b981"
                        borderRadius={4}
                      />
                    </Progress>
                  </YStack>
                </Card>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>
    </YStack>
  )
}
