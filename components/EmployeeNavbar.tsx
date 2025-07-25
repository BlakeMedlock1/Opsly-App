import { CheckSquare, Home, Mail, Menu, Star } from '@tamagui/lucide-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { styled } from 'tamagui';

type TabPath = '/employee/employeeHome' | '/employee/stats' | '/employee/tasks' | '/employee/messages' | '/employee/menu';

const tabs: { key: string; path: TabPath; Icon: React.FC<{ size: number; color: string }> }[] = [
  { key: 'employeeHome', path: '/employee/employeeHome', Icon: Home },
  { key: 'stats', path: '/employee/stats', Icon: Star },
  { key: 'tasks', path: '/employee/tasks', Icon: CheckSquare },
  { key: 'messages', path: '/employee/messages', Icon: Mail },
  { key: 'menu', path: '/employee/menu', Icon: Menu },
];

const Container = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 20,
  backgroundColor: '#2c3e50',
});

const ACTIVE_COLOR = '#2dd4bf';
const INACTIVE_COLOR = '#fff'; 

const EmployeeNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Container paddingBottom={50}>
      {tabs.map(({ key, path, Icon }) => {
        const isActive = pathname === path;
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              if (pathname !== path) {
                router.push(path as any);
              }
            }}
          >
            <Icon size={30} color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
          </TouchableOpacity>
        );
      })}
    </Container>
  );
};

export default EmployeeNavbar;
