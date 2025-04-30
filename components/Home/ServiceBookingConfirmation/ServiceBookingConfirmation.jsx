import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
const ServiceBookingConfirmation = () => {
  const navigation= useNavigation();
  const ServiceBookingConfirmationData = {
    service: "Type Replacement",
    vehicle: "Baleno",
    location: "Address123",
    locationNote: "*Home Location",
    date: "6 May 2025",
    day: "Monday",
    time: "10:00 AM",
    serviceTotal: "Rs. 3200",
    convenienceFee: "Rs. 300",
    totalPrice: "Rs. 3500",
  };

  return (
    <View style={styles.container}>
      <View style={styles.confirmationCard}>
        <Text style={styles.header}>Service Booking Confirmation</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Service</Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.service}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Vehicle</Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.vehicle}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Location</Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.value}>
                {ServiceBookingConfirmationData.location}
              </Text>
              <Text style={styles.label}>
                <Text style={styles.red}>*</Text>
                {ServiceBookingConfirmationData.locationNote.replace("*", "")}
              </Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Date</Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Text style={styles.value}>
                {ServiceBookingConfirmationData.date}
              </Text>
              <Text
                style={styles.label}
              >{`(${ServiceBookingConfirmationData.day})`}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Time</Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.time}
            </Text>
          </View>
        </View>

        <View style={{ height: 30 }} />

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Service Total</Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.serviceTotal}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>
              Convenience Fee
            </Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.convenienceFee}
            </Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.label]}>Total Price</Text>
            <Text style={styles.value}>
              {ServiceBookingConfirmationData.totalPrice}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("PaymentScreen")}
        style={styles.payButton}
      >
        <Text style={styles.payButtonText}>Proceed to Pay</Text>
      </TouchableOpacity>
      <View style={styles.footer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    zIndex:1,
    backgroundColor: "#F4F9F8",
    width: "100%",
    paddingHorizontal: wp("5%"),
    marginTop: hp("16%"),
    // paddingTop: hp("28%"),
    paddingBottom: hp("2%"),
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("3%"),
    textAlign: "center",
  },
  confirmationCard: {
    backgroundColor: "white",
    borderRadius: wp("2.5%"),
    padding: wp("5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
    marginBottom: hp("3%"), // Add spacing between card and button
  },
  table: {
    flexDirection: "column",
    rowGap: hp("1.7%"),
    marginBottom: hp("1%"),
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
    // rowGap:55,
  },
  tableCell: {
    fontSize: wp("4%"),
  },
  label: {
    color: "#888",
    fontWeight: "400",
    fontSize: wp("4%"),
  },
  value: {
    fontWeight: "600",
    fontSize: wp("4%"),
    color: "#000",
    textAlign: "right",
  },
  red: {
    color: "red",
  },
  payButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("3%"),
    minWidth: wp("70%"),
    alignSelf: "center",
    marginBottom: hp("2%"),
  },
  payButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4%"),
    textAlign: "center",
    paddingVertical: hp("0.5%"),
  },
});

export default ServiceBookingConfirmation;
