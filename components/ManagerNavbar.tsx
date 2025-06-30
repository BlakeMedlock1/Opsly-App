import { CheckCircle, Home, Mail, PlusCircle, Users } from '@tamagui/lucide-icons'
import { usePathname, useRouter } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { styled } from 'tamagui'

type ManagerTabPath =
  | '/manager/home'
  | '/manager/assign'
  | '/manager/review'
  | '/manager/messages'
  | '/manager/team'

const tabs: {
  key: string
  path: ManagerTabPath
  Icon: React.FC<{ size: number; color: string }>
}[] = [
  { key: 'home', path: '/manager/home', Icon: Home },
  { key: 'assign', path: '/manager/assign', Icon: PlusCircle },
  { key: 'review', path: '/manager/review', Icon: CheckCircle },
  { key: 'messages', path: '/manager/messages', Icon: Mail },
  { key: 'team', path: '/manager/team', Icon: Users },
]

const Container = styled(View, {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 20,
  backgroundColor: '#2c3e50',
})

const ACTIVE_COLOR = '#2dd4bf'
const INACTIVE_COLOR = '#fff'

const ManagerNavbar = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Container paddingBottom={50}>
      {tabs.map(({ key, path, Icon }) => {
        const isActive = pathname === path
        return (
          <TouchableOpacity
            key={key}
            onPress={() => {
              if (!isActive) {
                router.push(path as any)
              }
            }}
          >
            <Icon size={30} color={isActive ? ACTIVE_COLOR : INACTIVE_COLOR} />
          </TouchableOpacity>
        )
      })}
    </Container>
  )
}

export default ManagerNavbar
