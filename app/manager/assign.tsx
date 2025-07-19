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
  Text,
  TextArea,
  YStack
} from 'tamagui'

export default function AssignPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [subtasks, setSubtasks] = useState([{ text: '', requiredProof: false }])
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

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { text: '', requiredProof: false }])
  }

  const handleSubtaskChange = (
    index: number,
    key: 'text' | 'requiredProof',
    value: string | boolean
  ) => {
    const updated = [...subtasks]
    updated[index] = {
      ...updated[index],
      [key]: value,
    } as typeof updated[number]
    setSubtasks(updated)
  }
  

  const handleSubmit = async () => {
    if (!title || !description || !userId || !dueDate || subtasks.some(s => !s.text)) {
      Alert.alert('Please fill in all fields including subtasks')
      return
    }

    try {
      await assignTask({
        title,
        description,
        assigned_date: dueDate,
        user_id: userId,
        subtasks,
      })
      Alert.alert('Success', 'Task assigned!')
      setTitle('')
      setDescription('')
      setDueDate('')
      setUserId('')
      setSubtasks([{ text: '', requiredProof: false }])
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

          <Card backgroundColor="#2c3e50" padding="$4" borderRadius="$6" elevate shadowColor="black">
            <YStack gap="$3">

              <YStack>
                <Label color="#ffffffcc">Assign To</Label>
                <Select value={userId} onValueChange={setUserId}>
                  <Select.Trigger backgroundColor="#1f2937" color="#fff" borderColor="#4ade80" />
                  <Select.Content>
                    <Select.ScrollUpButton />
                    <Select.Viewport>
                    {employees.map((emp, index) => (
                      <Select.Item key={emp.id} value={emp.id} index={index}>
                          <Select.ItemText>{emp.name}</Select.ItemText>
                      </Select.Item>
                    ))}

                    </Select.Viewport>
                    <Select.ScrollDownButton />
                  </Select.Content>
                </Select>
              </YStack>

              <YStack>
                <Label color="#ffffffcc">Title</Label>
                <Input value={title} onChangeText={setTitle} placeholder="Task Title" backgroundColor="#1f2937" color="#fff" />
              </YStack>

              <YStack>
                <Label color="#ffffffcc">Description</Label>
                <TextArea value={description} onChangeText={setDescription} placeholder="Task Description" backgroundColor="#1f2937" color="#fff" />
              </YStack>

              <YStack>
                <Label color="#ffffffcc">Due Date</Label>
                <Input value={dueDate} onChangeText={setDueDate} placeholder="YYYY-MM-DD" backgroundColor="#1f2937" color="#fff" />
              </YStack>

              <YStack gap="$2">
                <Label color="#ffffffcc">Subtasks / Checklist</Label>
                {subtasks.map((subtask, i) => (
                  <YStack key={i} gap="$1">
                    <Input
                      value={subtask.text}
                      onChangeText={(text) => handleSubtaskChange(i, 'text', text)}
                      placeholder={`Step ${i + 1}`}
                      backgroundColor="#1f2937"
                      color="#fff"
                    />
                    <Label color="#ffffffcc">
                      <input
                        type="checkbox"
                        checked={subtask.requiredProof}
                        onChange={(e) => handleSubtaskChange(i, 'requiredProof', e.target.checked)}
                      />{' '}
                      Requires Proof
                    </Label>
                  </YStack>
                ))}
                <Button onPress={handleAddSubtask} theme="blue">+ Add Subtask</Button>
              </YStack>

              <Button onPress={handleSubmit} theme="green" marginTop="$4">Assign Task</Button>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
      <ManagerNavbar />
    </>
  )
}

