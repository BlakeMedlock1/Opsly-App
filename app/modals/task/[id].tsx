import { X } from '@tamagui/lucide-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';

export default function TaskModal() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#22303D' }}>
      <YStack flex={1} padding="$4">
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
            zIndex: 10,
          }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <X color="white" size={28} />
          </TouchableOpacity>
        </View>

        <Text color="white" fontSize="$8" fontWeight="700" marginBottom="$4">
          Task #{id}
        </Text>

        <Text color="white">This is where task details will go.</Text>
      </YStack>
    </SafeAreaView>
  );
}
