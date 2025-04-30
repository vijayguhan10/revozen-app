import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { PaperProvider, Button, TextInput } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { Calendar } from "react-native-calendars";

export default function BookingScreen() {
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState({ hour: 10, minute: 0, period: "AM" });
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  // Blocked Dates
  const unavailableDates = [
    new Date(2025, 4, 10),
    new Date(2025, 4, 11),
    new Date(2025, 4, 13),
    new Date(2025, 4, 14),
    new Date(2025, 4, 17),
    new Date(2025, 4, 18),
    new Date(2025, 4, 23),
    new Date(2025, 4, 24),
  ];

  const isDateDisabled = (d) =>
    unavailableDates.some(
      (ud) =>
        d.getDate() === ud.getDate() &&
        d.getMonth() === ud.getMonth() &&
        d.getFullYear() === ud.getFullYear()
    );

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    if (!isDateDisabled(selectedDate)) {
      setDate(selectedDate);
    } else {
      alert("This date is unavailable.");
    }
  };

  const markedDates = {
    [date?.toISOString().split("T")[0] || ""]: {
      selected: true,
      selectedColor: "#0B3EFF",
    },
    ...unavailableDates.reduce((acc, date) => {
      const dateString = date.toISOString().split("T")[0];
      acc[dateString] = { disabled: true, color: "#FFB1B1" };
      return acc;
    }, {}),
  };

  // Time input change handler
  const handleTimeChange = (value, type) => {
    setTime((prevTime) => ({ ...prevTime, [type]: value }));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search for a car service"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />

        <View style={styles.card}>
          <Text style={styles.header}>Book A Service</Text>
         

          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: "#0B3EFF",
              todayTextColor: "#0B3EFF",
              arrowColor: "#0B3EFF",
              monthTextColor: "#0B3EFF",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          />

          <Text style={styles.selectTime}>Select Time</Text>

          {/* Custom Time Input */}
          <View style={styles.timePickerContainer}>
            <View style={styles.timeInput}>
              <TextInput
                label="Hour"
                value={String(time.hour)}
                keyboardType="numeric"
                onChangeText={(value) => handleTimeChange(value, "hour")}
                style={styles.inputField}
                mode="outlined"
                maxLength={2}
              />
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.timeInput}>
              <TextInput
                label="Minute"
                value={String(time.minute).padStart(2, "0")}
                keyboardType="numeric"
                onChangeText={(value) => handleTimeChange(value, "minute")}
                style={styles.inputField}
                mode="outlined"
                maxLength={2}
              />
            </View>
            <Text style={styles.colon}>:</Text>
            <View style={styles.timeInput}>
              <TextInput
                label="AM/PM"
                value={time.period}
                onChangeText={(value) => handleTimeChange(value, "period")}
                style={styles.inputField}
                mode="outlined"
              />
            </View>
          </View>

          <Button
            mode="contained"
            onPress={() =>
              console.log(
                `Selected Date: ${date}, Time: ${time.hour}:${time.minute} ${time.period}`
              )
            }
          >
            Confirm
          </Button>

          <View style={styles.legend}>
            <View style={styles.unavailableDot} />
            <Text style={styles.legendText}>Dates Unavailable</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9F9F9",
    marginTop: "30%",
  },
  searchbar: {
    borderRadius: 30,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B3EFF",
    marginBottom: 8,
  },
  subheader: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
  },
  selectDate: {
    fontSize: 13,
    marginBottom: 12,
    color: "#333",
  },
  selectTime: {
    fontSize: 13,
    marginBottom: 12,
    color: "#333",
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  timeInput: {
    width: 60,
  },
  inputField: {
    backgroundColor: "white",
  },
  colon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  unavailableDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFB1B1",
    marginRight: 6,
  },
  legendText: {
    fontSize: 13,
    color: "#555",
  },
});
