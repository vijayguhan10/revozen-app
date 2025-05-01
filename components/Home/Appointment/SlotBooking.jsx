import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Dimensions } from "react-native";
import {
  PaperProvider,
  Button,
  TextInput,
  Searchbar,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function BookingScreen() {
  const navigation = useNavigation();
  const [date, setDate] = useState(undefined);
  const [time, setTime] = useState({ hour: 10, minute: 0, period: "AM" });
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

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

  const handleTimeChange = (value, type) => {
    setTime((prevTime) => ({ ...prevTime, [type]: value }));
  };

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.container}>
        <Searchbar
          placeholder="Search for a car service"
          onChangeText={onChangeSearch}
          value={searchQuery}
          inputStyle={styles.inputText}
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
              textDayFontSize: 13,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13,
              textDayFontFamily: "poppins",
              textMonthFontFamily: "poppins",
              textDayHeaderFontFamily: "poppins",
            }}
          />

          <Text style={styles.selectTime}>Select Time</Text>

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
            onPress={() => {
              console.log(
                `Selected Date: ${date}, Time: ${time.hour}:${time.minute} ${time.period}`
              );
              navigation.navigate("ServiceBooking");
            }}
          >
            <Text style={styles.textStyle}>Confirm</Text>
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
  ScrollView: {
    marginBottom: hp("2%"),
    marginTop: hp("4%"),
    zIndex: 1,
  },
  inputText: {
    fontFamily: "poppins",
  },
  container: {
    flex: 1,
    padding: wp("4%"),
    backgroundColor: "#F9F9F9",
    marginTop: hp("8%"),
  },
  searchbar: {
    borderRadius: wp("8%"),
    marginBottom: hp("2%"),
    backgroundColor: "#FFFFFF",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  card: {
    backgroundColor: "white",
    borderRadius: wp("5%"),
    padding: wp("4%"),
    elevation: 5,
  },
  header: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    fontFamily: "poppins",
    color: "#0B3EFF",
    marginBottom: hp("1%"),
  },
  selectTime: {
    fontSize: wp("3.5%"),
    marginBottom: hp("1.5%"),
    color: "#333",
    fontFamily: "poppins",
  },
  timePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  timeInput: {
    width: wp("20%"),
  },

  inputField: {
    backgroundColor: "white",
    fontFamily: "poppins",
  },
  textStyle: {
    fontFamily: "poppins",
  },
  colon: {
    fontSize: wp("5%"),
    marginHorizontal: wp("1%"),
    fontFamily: "poppins",
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  unavailableDot: {
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("1.5%"),
    backgroundColor: "#FFB1B1",
    marginRight: wp("1.5%"),
  },
  legendText: {
    fontSize: wp("3.5%"),
    color: "#555",
    fontFamily: "poppins",
  },
});
