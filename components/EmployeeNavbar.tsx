import { styles } from '@/app/styles/navbarStyles';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface Props {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = [
  { key: 'home', icon: require('../assets/icons/home.png') },
  { key: 'star', icon: require('../assets/icons/star.png') },
  { key: 'tasks', icon: require('../assets/icons/checklist.png') },
  { key: 'messages', icon: require('../assets/icons/mail.png') },
  { key: 'menu', icon: require('../assets/icons/menu.png') },
];

const EmployeeNavbar: React.FC<Props> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tabItem,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onTabPress(tab.key)}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              activeTab === tab.key && styles.activeIcon,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmployeeNavbar;
