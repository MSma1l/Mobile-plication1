import { StyleSheet } from 'react-native';

export const tabBarStyles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    elevation: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export const addButtonStyles = StyleSheet.create({
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ff2e84',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 5,
  },
});
