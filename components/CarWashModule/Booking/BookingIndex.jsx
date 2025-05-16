import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Booking from "./Booking";
import ShopCardDetails from "./ShopCardDetails";
import ShopBgImage from "./ShopBgImage";

const BookingIndex = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [bookingVisible, setBookingVisible] = useState(false);
  const [date, setDate] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [washType, setWashType] = useState("doorstep");
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [address, setAddress] = useState("");

  // Date picker handlers
  const onDismissDate = () => setShowDatePicker(false);
  const onConfirmDate = (params) => {
    setShowDatePicker(false);
    setDate(params.date);
  };

  // Time picker handlers
  const onDismissTime = () => setShowTimePicker(false);
  const onConfirmTime = ({ hours, minutes }) => {
    setShowTimePicker(false);
    setSelectedTime({ hours, minutes });
  };

  const onConfirmBooking = () => {
    setBookingVisible(false);
    // handle booking logic here
  };

  return (
    <View style={styles.container}>
      <View >
        <ShopBgImage styles={styles} />
      </View>
      <View style={styles.shopDetailsContainer}>
        <ShopCardDetails
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBookNow={() => setBookingVisible(true)}
        />
      </View>
      <Booking
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
        date={date}
        setDate={setDate}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        onDismissDate={onDismissDate}
        onConfirmDate={onConfirmDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        onDismissTime={onDismissTime}
        onConfirmTime={onConfirmTime}
        washType={washType}
        setWashType={setWashType}
        address={address}
        setAddress={setAddress}
        onConfirmBooking={onConfirmBooking}
        styles={styles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F8",
    marginTop: wp("30%"),
  },
  shopDetailsContainer: {
    marginTop: hp("4%"),
    padding: wp("1%"),
  },
});

export default BookingIndex;
