import TopHeader from '@/components/Header'
import ManagerNavbar from '@/components/ManagerNavbar'
import { assignTask } from '@/lib/api/tasks'
import { getAllEmployees } from '@/lib/api/users'
import React, { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import {
    Button,
    Card,
    Input,
    Label,
    ScrollView,
    Select,
    Separator,
    Text,
    TextArea,
    YStack
} from 'tamagui'

export default function AssignPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [instructions, setInstructions] = useState('')
  const [assigned_date] = useState(new Date().toISOString().slice(0, 10))
  const [userId, setUserId] = useState('')
  const [employees, setEmployees] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees()
        setEmployees(data)
      } catch (err) {
        console.error('Failed to fetch employees:', err)
        Alert.alert('Error', 'Could not load employee list.')
      } finally {
        setLoading(false)
      }
    }

    fetchEmployees()
  }, [])

  const handleSubmit = async () => {
    if (!title || !description || !instructions || !userId) {
      Alert.alert('Please fill in all fields')
      return
    }

    try {
      await assignTask({
        title,
        description,
        instructions,
        assigned_date,
        user_id: userId,
      })

      Alert.alert('Success', 'Task assigned!')
      setTitle('')
      setDescription('')
      setInstructions('')
      setUserId('')
    } catch {
      Alert.alert('Error', 'Failed to assign task')
    }
  }

  return (
    <>
      <TopHeader />
      <ScrollView backgroundColor="#1e293b" flex={1}>
        <YStack padding="$4" gap="$4">
          <Text fontSize="$8" color="#fff" fontWeight="800" textAlign="center">
            Assign a Task
          </Text>

          <Card
            backgroundColor="#2c3e50"
            padding="$4"
            borderRadius="$6"
            elevate
            shadowColor="black"
          >
            <YStack gap="$3">

              <YStack>
                <Label color="#ffffffcc" fontWeight="600">Assign To</Label>
                <Select
                  value={userId}
                  onValueChange={setUserId}
                >
                  <Select.Trigger backgroundColor="#1f2937" color="#fff" borderColor="#4ade80" />
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                      {employees.map((emp, index) => (
                        <Select.Item key={emp.id} index={index} value={emp.id}>
                          <Select.ItemText>{emp.name}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>

              <Separator borderColor="#4b5563" />

             
              <YStack>
                <Label color="#ffffffcc" fontWeight="600">Title</Label>
                <Input
                  value={title}
                  onChangeText={setTitle}
                  placeholder="Enter task title"
                  backgroundColor="#1f2937"
                  color="#fff"
                  borderColor="#38bdf8"
                />
              </YStack>

              
              <YStack>
                <Label color="#ffffffcc" fontWeight="600">Description</Label>
                <TextArea
                  value={description}
                  onChangeText={setDescription}
                  placeholder="Enter description"
                  backgroundColor="#1f2937"
                  color="#fff"
                  borderColor="#facc15"
                />
              </YStack>

              
              <YStack>
                <Label color="#ffffffcc" fontWeight="600">Instructions</Label>
                <TextArea
                  value={instructions}
                  onChangeText={setInstructions}
                  placeholder="Enter instructions"
                  backgroundColor="#1f2937"
                  color="#fff"
                  borderColor="#a78bfa"
                />
              </YStack>

              <Button
                size="$4"
                theme="green"
                onPress={handleSubmit}
                marginTop="$4"
                borderRadius="$10"
              >
                Assign Task
              </Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
      <ManagerNavbar />
    </>
  )
}
