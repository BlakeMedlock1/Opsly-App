import {
  deleteProofImage,
  listProofImages,
  uploadProofImage
} from '@/lib/api/proofs'
import { getTaskById, submitTask, updateSubtaskStatus } from '@/lib/api/tasks'
import { Check, X } from '@tamagui/lucide-icons'
import * as ImagePicker from 'expo-image-picker'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
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
  Checkbox,
  Spinner,
  Text,
  XStack,
  YStack
} from 'tamagui'


export default function TaskModal() {
  const router = useRouter()
  const { id } = useLocalSearchParams<{ id: string }>()
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [proofs, setProofs] = useState<{ [key: string]: any[] }>({})

  const isSubmitted = task?.status === 'Submitted'
  const isApproved = task?.status === 'Approved'

  useEffect(() => {
    const loadTask = async () => {
      try {
        const data = await getTaskById(id!)
        setTask(data)
        await loadProofs(data)
      } catch (err) {
        console.error('Failed to load task', err)
      } finally {
        setLoading(false)
      }
    }

    loadTask()
  }, [id])

  const loadProofs = async (task: any) => {
    const result: { [key: string]: any[] } = {}
    for (const sub of task.subtasks) {
      if (sub.requiredProof) {
        try {
          const items = await listProofImages(task.id, sub.id)
          result[sub.id] = items ?? []
        } catch (e) {
          console.error(`Failed to load proof for subtask ${sub.id}`, e)
        }
      }
    }
    setProofs(result)
  }

  const handlePickImage = async (subtaskId: string) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 0.7,
    })

    if (!result.canceled && result.assets.length > 0) {
      const fileUri = result.assets[0].uri
      try {
        await uploadProofImage(task.id, subtaskId, fileUri)
        await loadProofs(task)
      } catch (err) {
        console.error('Upload failed', err)
      }
    }
  }

  const handleTakePhoto = async (subtaskId: string) => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Camera access is needed to take photos')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    })

    if (!result.canceled && result.assets.length > 0) {
      const fileUri = result.assets[0].uri
      try {
        await uploadProofImage(task.id, subtaskId, fileUri)
        await loadProofs(task)
      } catch (error) {
        console.error('Upload error', error)
        Alert.alert('Upload Failed', 'Could not upload the photo. Please try again.')
      }
    }
  }

  const handleDeleteImage = async (subtaskId: string, fileName: string) => {
    try {
      await deleteProofImage(task.id, subtaskId, fileName)
      await loadProofs(task)
    } catch (err) {
      console.error('Delete failed', err)
    }
  }

  const toggleSubtask = async (index: number) => {
    if (!task || isSubmitted || isApproved) return

    const sub = task.subtasks[index]
    if (sub.requiredProof && (!proofs[sub.id] || proofs[sub.id].length === 0)) {
      Alert.alert('Proof Required', 'Upload proof before completing this step.')
      return
    }

    const updatedSubtasks = [...task.subtasks]
    updatedSubtasks[index].checked = !updatedSubtasks[index].checked
    setTask({ ...task, subtasks: updatedSubtasks })

    try {
      await updateSubtaskStatus(task.id, updatedSubtasks)
    } catch (err) {
      console.error('Failed to update subtask status', err)
    }
  }

  const handleSubmit = async () => {
    if (!task) return
    setSubmitting(true)
    try {
      await submitTask(task.id)
      Alert.alert('Success', 'Task submitted successfully')
      router.back()
    } catch (err) {
      console.error('Submission failed', err)
      Alert.alert('Error', 'Failed to submit task')
    } finally {
      setSubmitting(false)
    }
  }

  const allCompleted = task?.subtasks?.every((sub: any) => sub.checked)

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

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 100 }}>
          {task.subtasks?.map((sub: any, index: number) => (
            <Card
              key={sub.id || index}
              backgroundColor="#1f2937"
              padding="$4"
              borderRadius="$4"
              marginBottom="$3"
              borderColor={sub.checked ? '#10b981' : '#334155'}
              borderWidth={1}
            >
              <XStack alignItems="center" space="$3">
                <Checkbox
                  size="$3"
                  checked={sub.checked}
                  onCheckedChange={() => toggleSubtask(index)}
                  backgroundColor="#0f172a"
                  borderColor="#94a3b8"
                  circular
                  disabled={isSubmitted || isApproved}
                >
                  {sub.checked && (
                    <Checkbox.Indicator>
                      <Check size={14} color="white" />
                    </Checkbox.Indicator>
                  )}
                </Checkbox>

                <YStack flex={1}>
                  <Text color="white" fontWeight="600" fontSize="$4">
                    Step {index + 1}
                  </Text>
                  <Text color="#e2e8f0" fontSize="$3" marginTop="$1">
                    {sub.text}
                  </Text>

                  {sub.requiredProof && (
                    <YStack marginTop="$2" space="$2">
                      <Button
                        size="$2"
                        backgroundColor="#3b82f6"
                        color="white"
                        borderRadius="$4"
                        onPress={() => handlePickImage(sub.id)}
                        disabled={isSubmitted || isApproved}
                      >
                        Upload Proof
                      </Button>
                      <Button
                        size="$2"
                        backgroundColor="#2563eb"
                        color="white"
                        borderRadius="$4"
                        onPress={() => handleTakePhoto(sub.id)}
                        disabled={isSubmitted || isApproved}
                        style={{ marginTop: 8 }}
                      >
                        Take Photo
                      </Button>

                      {proofs[sub.id]?.length > 0 && (
                        <ScrollView horizontal>
                          {proofs[sub.id].map((img, imgIndex) => (
                            <YStack key={img.url} marginRight="$2">
                              <Image
                                source={{ uri: img.url }}
                                style={{ width: 80, height: 80, borderRadius: 6 }}
                              />
                              <Button
                                size="$1"
                                backgroundColor="#ef4444"
                                onPress={() => handleDeleteImage(sub.id, img.name)}
                                marginTop="$1"
                              >
                                <Text color="white" fontSize={10}>Delete</Text>
                              </Button>
                            </YStack>
                          ))}
                        </ScrollView>
                      )}
                    </YStack>
                  )}
                </YStack>
              </XStack>
            </Card>
          ))}
        </ScrollView>

        {!(isSubmitted || isApproved) && (
          <Button
            size="$4"
            borderRadius="$6"
            backgroundColor={allCompleted ? '#10b981' : '#64748b'}
            color="white"
            fontWeight="700"
            onPress={handleSubmit}
            disabled={!allCompleted || submitting}
          >
            {submitting ? <Spinner color="white" /> : 'Submit Task'}
          </Button>
        )}
      </YStack>
    </SafeAreaView>
  )
}
