import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles, MONTHS, DAYS_OF_WEEK } from './HomeScreenStyle';

export default function HomeScreen() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState<any>(null);
  const fetchWeather = async () => {
    try {

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=47.0056&longitude=28.8575&current_weather=true&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,surface_pressure,visibility,uv_index&daily=sunrise,sunset&timezone=auto`
      );

      const data = await res.json();
      console.log("WEATHER RESPONSE:", data);

      setWeather(data);
    } catch (e) {
      console.log("Eroare meteo:", e);
    }
  };

  // UPDATE TIME + WEATHER ON LOAD
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchWeather();

    return () => clearInterval(interval);
  }, []);

  // Calendar logic
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

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "☀️ Cer senin";
    if (code === 1 || code === 2) return "⛅ Parțial noros";
    if (code === 3) return "☁️ Înnorat";
    if (code >= 51 && code <= 57) return "🌦 Burniță";
    if (code >= 61 && code <= 67) return "🌧 Ploaie";
    if (code >= 71 && code <= 77) return "❄ Ninsoare";
    if (code >= 80 && code <= 82) return "🌧 Averse";
    if (code >= 95) return "⛈ Furtună";
    return "🌡 Vreme necunoscută";
  };

  const extractTime = (isoString: string) => {
    if (!isoString) return "";
    return isoString.split("T")[1]; // ia doar ora
  };

  const getWeatherSuggestions = (weather: any) => {
    const suggestions: string[] = [];

    const temp = weather.current_weather.temperature;
    const feels = weather.hourly?.apparent_temperature?.[0];
    const uv = weather.hourly?.uv_index?.[0];
    const humidity = weather.hourly?.relativehumidity_2m?.[0];
    const wind = weather.current_weather.windspeed;
    const visibility = weather.hourly?.visibility?.[0];
    const pressure = weather.hourly?.surface_pressure?.[0];
    const code = weather.current_weather.weathercode;

    if (temp < -5) suggestions.push("🥶 Este foarte frig - îmbracă-te extrem de gros!");
    else if (temp < 3) suggestions.push("🧤 Foarte rece - ia mănuși și fular.");
    else if (temp < 10) suggestions.push("🧥 E rece - poartă o geacă călduroasă.");
    else if (temp >= 28) suggestions.push("🔥 Caniculă - evită ieșitul la orele de vârf.");
    else if (temp >= 23) suggestions.push("🥵 Cald - bea apă și poartă haine subțiri.");

    if (feels && feels < temp - 3)
      suggestions.push("🌬 Se simte mai rece decât temperatura - ia un strat de haine în plus.");

    if (code >= 61 && code <= 67) 
      suggestions.push("🌧 Ploaie - ia-ți umbrela!");
  
    if (code >= 80 && code <= 82)
      suggestions.push("🌧 Averse - umbrela e obligatorie.");

    if (code >= 71 && code <= 77)
      suggestions.push("❄ Posibilitate de ninsoare - îmbracă-te gros și fii atent pe drum.");

    if (code >= 95)
      suggestions.push("⛈ Furtună - evită locurile deschise și copacii înalți.");

    if (uv >= 11) suggestions.push("🟣 UV extrem – evită total expunerea la soare!");
    else if (uv >= 8) suggestions.push("🔴 UV foarte ridicat - SPF 50 obligatoriu!");
    else if (uv >= 6) suggestions.push("🟠 UV ridicat - aplică SPF și poartă pălărie.");
    else if (uv >= 3) suggestions.push("🟡 UV moderat - recomandată crema SPF.");
    else suggestions.push("🟢 UV scăzut – risc minim.");

    if (wind > 50) suggestions.push("💨 Vânt foarte puternic - atenție la zone deschise.");
    else if (wind > 30) suggestions.push("💨 Vânt puternic - ia o jachetă.");
    else if (wind > 15) suggestions.push("🌬 Adie vântul - s-ar putea să fie mai rece.");

    if (humidity > 90) suggestions.push("💧 Umiditate foarte mare - poate fi apăsător sau rece.");
    else if (humidity < 30) suggestions.push("💨 Aer uscat - hidratează-te.");

    if (visibility < 3000)
      suggestions.push("🌫 Vizibilitate redusă - ai grijă când mergi/ conduci.");

    if (pressure < 990)
      suggestions.push("⚠ Presiune joasă - unii oameni pot simți disconfort.");
    else if (pressure > 1030)
      suggestions.push("📈 Presiune ridicată - vremea e stabilă.");

    if (suggestions.length === 0)
      suggestions.push("🙂 Vreme plăcută - bucură-te de zi!");
    return suggestions;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back 🙂</Text>
        <Image 
          source={require('../../assets/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Calendar */}
      <View style={styles.calendarCard}>

        <View style={styles.monthHeader}>
          <TouchableOpacity onPress={() => changeMonth('prev')} style={styles.navButton}>
            <Text style={styles.navText}>{'<'}</Text>
          </TouchableOpacity>

          <Text style={styles.monthText}>{MONTHS[currentMonth]} {currentYear}</Text>

          <TouchableOpacity onPress={() => changeMonth('next')} style={styles.navButton}>
            <Text style={styles.navText}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.daysHeader}>
          {DAYS_OF_WEEK.map(day => (
            <Text key={day} style={styles.dayLabel}>{day}</Text>
          ))}
        </View>

        <View style={styles.dateGrid}>
          {cells.map((date, index) => {
            if (date === null) return <View key={index} style={styles.dateItem} />;

            const isToday = date === today.getDate() &&
                            currentMonth === today.getMonth() &&
                            currentYear === today.getFullYear();

            const isSelected = date === selectedDay;

            return (
              <TouchableOpacity key={index} style={styles.dateItem} onPress={() => setSelectedDay(date)}>
                <View style={[
                  styles.dateCircle,
                  isToday && styles.todayCircle,
                  isSelected && styles.selectedCircle
                ]}>
                  <Text style={[styles.dateText, isSelected && styles.selectedText]}>{date}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Time Card */}
        <View style={styles.timeCard}>
          <Text style={styles.timeLabel}>Time</Text>
          <Text style={styles.timeValue}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        {weather?.current_weather && (
  <View style={styles.weatherCard}>
    
    {/* ORAȘ + TEMPERATURĂ */}
    <View style={styles.weatherRow}>
      <Text style={styles.weatherCity}>Chișinău</Text>

      <Text style={styles.weatherTemp}>
        {Math.round(weather.current_weather.temperature)}°C
      </Text>
    </View>

    {/* CONDIȚII METEO */}
    <Text style={styles.weatherDesc}>
      {getWeatherDescription(weather.current_weather.weathercode)}
    </Text>

    {/* DETALII SUPLIMENTARE */}
<View style={styles.weatherDetailsRow}>
  <Text style={styles.weatherDetail}>🌡  Senzație: {Math.round(weather.hourly?.apparent_temperature?.[0])}°C</Text>
  <Text style={styles.weatherDetail}>💨 Viteza vântului: {weather.current_weather.windspeed} km/h</Text>
  <Text style={styles.weatherDetail}>💧 Umiditate: {weather.hourly?.relativehumidity_2m?.[0]}%</Text>
  <Text style={styles.weatherDetail}>🔆 UV Index: {weather.hourly?.uv_index?.[0]}</Text>
  <Text style={styles.weatherDetail}>🌅 Răsărit: {extractTime(weather.daily?.sunrise?.[0])}</Text>
  <Text style={styles.weatherDetail}>🌇 Apus: {extractTime(weather.daily?.sunset?.[0])}</Text>
</View>



  </View>
)}

{weather && (
  <View style={styles.suggestionsCard}>
    <Text style={styles.suggestionsTitle}>Recomandări meteo</Text>

    {getWeatherSuggestions(weather).map((item, index) => (
      <Text key={index} style={styles.suggestionItem}>
        {item}
      </Text>
    ))}
  </View>
)}
        
      </View>
    </ScrollView>
  );
}
