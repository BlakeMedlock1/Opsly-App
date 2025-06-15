import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    backgroundColor: '#2c3e50',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    marginBottom: 30,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#2dd4bf',
    borderRadius: 6,
  },
  icon: {
    width: 36,
    height: 36,
    tintColor: '#ffffff',
  },
  activeIcon: {
    tintColor: '#ffffff',
  },
});