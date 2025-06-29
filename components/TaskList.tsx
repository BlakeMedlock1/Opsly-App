import { Task, TaskStatus } from '@/app/types';
import { ChevronRight } from '@tamagui/lucide-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, Text, View, XStack, YStack, styled } from 'tamagui';

interface TaskListProps {
  tasks: Task[];
  onTaskPress: (task: Task) => void;
}

const getStatusStyle = (status: TaskStatus) => {
  switch (status) {
    case 'Not Started':
      return { bg: '#fef08a', color: '#92400e' }; 
    case 'Submitted':
      return { bg: '#bae6fd', color: '#0369a1' }; 
    case 'Approved':
      return { bg: '#bbf7d0', color: '#15803d' }; 
    case 'Rejected':
      return { bg: '#fecaca', color: '#991b1b' }; 
    default:
      return { bg: '#2c3e50', color: '#fff' }; 
  }
};

const StatusPill: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const { bg, color } = getStatusStyle(status);
  return (
    <View
      paddingHorizontal="$2.5"
      paddingVertical="$1"
      borderRadius={100}
      backgroundColor={bg}
      alignSelf="flex-start"
    >
      <Text fontSize={12} fontWeight="600" color={color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

const StyledCard = styled(Card, {
  borderRadius: 16,
  backgroundColor: '#2c3e50',
  padding: '$3',
  gap: '$2',
  shadowColor: '#000',
  shadowOpacity: 0.04,
  shadowRadius: 4,
  elevation: 2,
});

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskPress }) => {
  return (
    <YStack space="$3" padding="$4">
      {tasks.map((task) => (
        <TouchableOpacity
          key={task.id}
          onPress={() => onTaskPress(task)}
          activeOpacity={0.85}
        >
          <StyledCard>
            <XStack justifyContent="space-between" alignItems="center">
              <YStack flex={1} space="$1">
                <Text fontWeight="700" fontSize="$5" color="#fff">
                  {task.title}
                </Text>
                <Text fontSize="$2" color="#FAF9F6">
                  {task.description}
                </Text>
                <StatusPill status={task.status} />
              </YStack>
              <ChevronRight size={20} color="#FAF9F6" />
            </XStack>
          </StyledCard>
        </TouchableOpacity>
      ))}
    </YStack>
  );
};

export default TaskList;

