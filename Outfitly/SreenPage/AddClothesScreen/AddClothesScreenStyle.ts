// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  photoButton: {
    marginTop: 10,
    backgroundColor: '#a6c3d1ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  photoText: { color: '#fff', fontSize: 16 },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#e6c3d1ff',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  nextText: { color: '#fff', fontSize: 18 },
});

export default styles;
