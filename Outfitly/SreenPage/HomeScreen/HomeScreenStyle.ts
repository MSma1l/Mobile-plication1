import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },

  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  logo: { width: 50, height: 50 },

  // CARD CALENDAR
  calendarCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3, // pentru Android
    marginBottom: 20,
  },

  monthHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  monthText: { fontSize: 20, fontWeight: '600' },
  navButton: { padding: 10 },
  navText: { fontSize: 20, color: '#FF3B30' },

  daysHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  dayLabel: { width: (width - 70) / 7, textAlign: 'center', fontWeight: '600', color: '#555' },

  dateGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  dateItem: { width: (width - 70) / 7, height: (width - 70) / 7, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  dateCircle: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  todayCircle: { borderColor: '#FF3B30', borderWidth: 2 },
  selectedCircle: { backgroundColor: '#FF3B30' },
  dateText: { fontSize: 16 },
  selectedText: { color: '#fff', fontWeight: 'bold' },
});
