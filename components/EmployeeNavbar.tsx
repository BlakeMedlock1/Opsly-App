import { styles } from '@/app/styles/navbarStyles';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

interface Props {
    activeTab: string;
    onTabPress: (path: string) => void;
  }  

const tabs = [
  { key: 'employeeHome', path: '/employeeHome', icon: require('../assets/icons/home.png') },
  { key: 'stats', path: '/stats', icon: require('../assets/icons/star.png') },
  { key: 'tasks', path: '/tasks', icon: require('../assets/icons/checklist.png') },
  { key: 'messages', path: '/messages', icon: require('../assets/icons/mail.png') },
  { key: 'menu', path: '/employeeMenu', icon: require('../assets/icons/menu.png') },
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
          onPress={() => onTabPress(tab.path)}
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
