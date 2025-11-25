//AddClothesScreenStyle.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    marginTop: 60,
    fontSize: 28, 
    marginBottom: 20,
    fontWeight: 'bold',
  },
  checkboxContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  photoButton: {
    marginTop: 20,
    backgroundColor: '#379bcdff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  photoText: { 
    color: '#fff', 
    fontSize: 20,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#ff2e84',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  nextText: { color: '#fff', fontSize: 18 },
});

export default styles;