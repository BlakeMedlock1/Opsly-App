import { Task } from '@/app/types'
import EmployeeNavbar from '@/components/EmployeeNavbar'
import TopHeader from '@/components/Header'
import TaskList from '@/components/TaskList'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Calendar } from '@tamagui/lucide-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { Button, Card, Text, XStack, YStack } from 'tamagui'

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Safety Inspection',
    description: 'Inspect all exits & fire extinguishers',
    instructions: 'Follow protocol sheet and record findings',
    assignedDate: '2025-06-29',
    status: 'Not Started',
  },
  {
    id: '2',
    title: 'Daily Log Update',
    description: 'Update machine usage logs',
    instructions: 'Use tablet to submit digital log',
    assignedDate: '2025-06-29',
    status: 'Submitted',
  },
  {
    id: '3',
    title: 'Inventory Restock',
    description: 'Refill shelves A1–A5',
    instructions: 'Notify supervisor when done',
    assignedDate: '2025-06-28',
    status: 'Approved',
  },
]

export default function TasksPage() {
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const formattedDate = date.toISOString().slice(0, 10)
  const filteredTasks = mockTasks.filter(t => t.assignedDate === formattedDate)

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

        {filteredTasks.length > 0 ? (
          <TaskList tasks={filteredTasks} onTaskPress={onTaskPress} />
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
