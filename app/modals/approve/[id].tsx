import { getTaskById, updateTaskStatus } from '@/lib/api/tasks'
import { Check, X } from '@tamagui/lucide-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Button,
  Card,
  Spinner,
  Text,
  TextArea,
  XStack,
  YStack
} from 'tamagui'

export default function TaskApprovalModal() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [managerNotes, setManagerNotes] = useState('')

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id!)
        setTask(data)
      } catch (err) {
        console.error('Error fetching task:', err)
        Alert.alert('Error', 'Failed to load task')
      } finally {
        setLoading(false)
      }
    }

    fetchTask()
  }, [id])

  const handleDecision = async (status: 'Approved' | 'Rejected') => {
    if (!task) return
    setSubmitting(true)
    try {
      await updateTaskStatus(task.id, status)
      Alert.alert('Success', `Task ${status.toLowerCase()}`)
      router.back()
    } catch (err) {
      console.error('Failed to update task', err)
      Alert.alert('Error', 'Could not update task')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !task) return null
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#22303D' }}>
      <YStack flex={1} padding="$4" space="$4">
        <View style={{ position: 'absolute', top: 10, right: 20, zIndex: 10 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <X color="white" size={28} />
          </TouchableOpacity>
        </View>

        <Text color="white" fontSize="$8" fontWeight="700">
          {task.title}
        </Text>

        <Text color="#cbd5e1" fontSize="$4">
          {task.description}
        </Text>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 120 }}>
          <YStack space="$3">
            {task.subtasks?.map((sub: any, index: number) => (
              <Card
                key={sub.id}
                backgroundColor="#1f2937"
                padding="$4"
                borderRadius="$4"
                borderColor={sub.checked ? '#10b981' : '#334155'}
                borderWidth={1}
              >
                <XStack alignItems="center" space="$3">
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: sub.checked ? '#10b981' : '#94a3b8',
                      backgroundColor: sub.checked ? '#10b981' : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {sub.checked && <Check size={14} color="white" />}
                  </View>
                  <YStack>
                    <Text color="white" fontWeight="600">
                      Step {index + 1}
                    </Text>
                    <Text color="#e2e8f0" fontSize="$3">
                      {sub.text}
                    </Text>
                  </YStack>
                </XStack>

                {sub.requiredProof && (
                <YStack marginTop="$2">
                <Text color="#94a3b8" fontSize="$2">Proof</Text>
                  {(sub.proofUrl ?? []).map((proofUrl: string, i: number) =>(
                <Image
                  key={i}
                  source={{ uri: proofUrl }}
                  style={{ width: '100%', height: 180, borderRadius: 10, marginTop: 8 }}
                  resizeMode="cover"
                />
                
              ))}
            </YStack>
          )}

            </Card>
              
            ))}

            {task.notes && (
              <Card backgroundColor="#1f2937" padding="$4" borderRadius="$4">
                <Text color="#94a3b8" marginBottom="$2">Employee Notes</Text>
                <Text color="white">{task.notes}</Text>
              </Card>
            )}

            {task.proof_url && (
              <Card backgroundColor="#1f2937" padding="$4" borderRadius="$4">
                <Text color="#94a3b8" marginBottom="$2">Proof</Text>
                <Image
                  source={{ uri: task.proof_url }}
                  style={{ width: '100%', height: 200, borderRadius: 12 }}
                  resizeMode="contain"
                />
              </Card>
            )}

            <YStack>
              <Text color="#94a3b8" marginBottom="$2">
                Manager Comments (optional)
              </Text>
              <TextArea
                value={managerNotes}
                onChangeText={setManagerNotes}
                placeholder="e.g. Excellent work"
                backgroundColor="#334155"
                color="white"
                borderRadius="$4"
                padding="$3"
              />
            </YStack>
          </YStack>
        </ScrollView>

        <XStack space="$3">
          <Button
            backgroundColor="#ef4444"
            color="white"
            flex={1}
            onPress={() => handleDecision('Rejected')}
            disabled={submitting}
          >
            {submitting ? <Spinner color="white" /> : 'Reject'}
          </Button>
          <Button
            backgroundColor="#10b981"
            color="white"
            flex={1}
            onPress={() => handleDecision('Approved')}
            disabled={submitting}
          >
            {submitting ? <Spinner color="white" /> : 'Approve'}
          </Button>
        </XStack>
      </YStack>
    </SafeAreaView>
  )
}
