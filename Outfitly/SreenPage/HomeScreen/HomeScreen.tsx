import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles, MONTHS, DAYS_OF_WEEK } from './HomeScreenStyle';

export default function HomeScreen() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getMonthStartDay = (month: number, year: number) => new Date(year, month, 1).getDay();

  const changeMonth = (dir: 'prev' | 'next') => {
    let newMonth = currentMonth + (dir === 'next' ? 1 : -1);
    let newYear = currentYear;
    if (newMonth > 11) { newMonth = 0; newYear += 1; }
    else if (newMonth < 0) { newMonth = 11; newYear -= 1; }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDay(1);
  };

  const generateCalendarCells = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const monthStartDay = getMonthStartDay(currentMonth, currentYear);
    const emptyCells = Array(monthStartDay).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...emptyCells, ...daysArray];
  };

  const cells = generateCalendarCells();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* HEADER CU TEXT ȘI LOGO */}
      <View style={styles.header}>
        <Text style={styles.title}>Home Screen</Text>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* CARD PENTRU CALENDAR */}
      <View style={styles.calendarCard}>

        {/* Header lună + navigare */}
        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => changeMonth('prev')} style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>{MONTHS[currentMonth]} {currentYear}</Text>

          <TouchableOpacity onPress={() => changeMonth('next')} style={styles.navButton}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Numele zilelor */}
        <View style={styles.daysHeader}>
          {DAYS_OF_WEEK.map(day => (
            <Text key={day} style={styles.dayLabel}>{day}</Text>
          ))}
        </View>

        {/* Grila de zile */}
        <View style={styles.dateGrid}>
          {cells.map((date, index) => {
            if (date === null) return <View key={index} style={styles.dateItem} />;
            const isToday = date === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
            const isSelected = date === selectedDay;

            return (
              <TouchableOpacity key={index} style={styles.dateItem} onPress={() => setSelectedDay(date)}>
                <View style={[styles.dateCircle, isToday && styles.todayCircle, isSelected && styles.selectedCircle]}>
                  <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

      </View>

    </ScrollView>
  );
}
