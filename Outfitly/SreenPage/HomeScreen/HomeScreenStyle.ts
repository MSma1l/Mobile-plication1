import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#F8F8F8',
    paddingBottom: 40,
  },

  /** HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 15,
  },

  title: { 
    fontSize: 28, 
    fontWeight: 'bold',
  },

  logo: { 
    width: 45, 
    height: 45 
  },

  /** CALENDAR CARD */
  calendarCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },

  monthHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10 
  },

  monthText: { 
    fontSize: 22, 
    fontWeight: '700' 
  },

  navButton: { 
    padding: 10,
    borderRadius: 10,
  },

  navText: { 
    fontSize: 22, 
    fontWeight: '600',
    color: '#FF3B30' 
  },

  daysHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 5 
  },

  dayLabel: { 
    width: (width - 80) / 7, 
    textAlign: 'center', 
    fontWeight: '600', 
    color: '#777' 
  },

  dateGrid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between' 
  },

  dateItem: { 
    width: (width - 80) / 7, 
    height: (width - 80) / 7, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 6 
  },

  dateCircle: { 
    width: 36, 
    height: 36, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  todayCircle: { 
    borderColor: '#FF3B30', 
    borderWidth: 2 
  },

  selectedCircle: { 
    backgroundColor: '#FF3B30' 
  },

  dateText: { fontSize: 16 },
  selectedText: { color: '#fff', fontWeight: 'bold' },

  /** TIME CARD */
  timeCard: {
    marginTop: 15,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#fefefe',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  timeLabel: {
    fontSize: 17,
    fontWeight: '500',
    color: '#222'
  },

  timeValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000'
  },

  /** WEATHER CARD */
  weatherCard: {
    marginTop: 15,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 16,

    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  weatherCity: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: '600',
    color: '#000'
  },

  weatherTemp: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: '700',
    color: '#000'
  },

  weatherIcon: {
    width: 45,
    height: 45,
  },

  weatherEvents: {
    marginTop: 10,
    color: '#007bff',
    fontSize: 15,
  },

  weatherDetails: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },

 weatherDesc: {
  fontSize: 16,
  marginTop: 5,
  fontWeight: '500',
},

weatherDetailsRow: {
  marginTop: 10,
  flexDirection: 'column',
  gap: 4,
},

weatherDetail: {
  fontSize: 14,
  color: '#333',
},

weatherUpdated: {
  marginTop: 8,
  fontSize: 12,
  color: '#666',
},


suggestionsCard: {
    marginTop: 15,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

suggestionsTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 10,
  color: "#333",
},

suggestionItem: {
  fontSize: 14,
  color: "#444",
  marginBottom: 6,
  lineHeight: 20,
},

});
