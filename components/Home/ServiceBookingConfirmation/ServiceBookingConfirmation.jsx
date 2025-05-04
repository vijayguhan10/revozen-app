import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../env.json";

const ServiceBookingConfirmation = () => {
  const API_URL = api.API_URL;
  const navigation = useNavigation();
  const route = useRoute();

  const [optedPayment, setOptedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedVehicles,
    isBulkOrder,
    tyreOrders,
    appointmentDateTime,
    selectedAddress,
  } = route.params || {};

  const addressInfo = selectedAddress
    ? {
        fullAddress: `${selectedAddress.street}, ${selectedAddress.city}`,
        locationNote: selectedAddress.state
          ? `${selectedAddress.state}, ${selectedAddress.postalCode}`
          : "Home Location",
      }
    : {
        fullAddress: "Address not provided",
        locationNote: "Location not specified",
      };

  const calculateTotalPrice = () => {
    if (!tyreOrders || tyreOrders.length === 0) return 0;

    return tyreOrders.reduce((total, order) => {
      const numTyres = parseInt(order.numberOfTyres) || 0;
      const price = parseInt(order.tyrePrice) || 0;
      return total + numTyres * price;
    }, 0);
  };

  const tyreTotal = calculateTotalPrice();
  const convenienceFee = 300; // Example fee
  const finalTotal = tyreTotal + convenienceFee;

  const ServiceBookingConfirmationData = {
    service: "Tyre Replacement",
    vehicle: isBulkOrder
      ? "Bulk Order"
      : selectedVehicles
      ? selectedVehicles.join(", ")
      : "Vehicle not specified",
    location: addressInfo.fullAddress,
    locationNote: addressInfo.locationNote,
    date: appointmentDateTime?.date
      ? `${appointmentDateTime.date.day}/${appointmentDateTime.date.month}/${appointmentDateTime.date.year}`
      : "Date not specified",
    day: appointmentDateTime?.date?.weekday || "Day not specified",
    time: appointmentDateTime?.time?.formatted || "Time not specified",
    serviceTotal: `Rs. ${tyreTotal}`,
    convenienceFee: `Rs. ${convenienceFee}`,
    totalPrice: `Rs. ${finalTotal}`,
  };

  const handlePaymentSubmit = async () => {
    var token = await AsyncStorage.getItem("token");
    if (!optedPayment) {
      Alert.alert(
        "Payment Option Required",
        "Please select a payment option to continue."
      );
      return;
    }

    if (!selectedAddress || !selectedAddress._id) {
      Alert.alert("Address Required", "Please select a delivery address.");
      return;
    }

    if (
      !appointmentDateTime ||
      !appointmentDateTime.date ||
      !appointmentDateTime.time
    ) {
      Alert.alert(
        "Appointment Time Required",
        "Please select a valid appointment date and time."
      );
      return;
    }

    if (!tyreOrders || tyreOrders.length === 0) {
      Alert.alert("Order Details Required", "Please add tyre order details.");
      return;
    }

    setIsLoading(true);

    try {
      if (!token) {
        Alert.alert("Authentication Error", "Please login again.");
        setIsLoading(false);
        return;
      }

      let paymentStatus;
      switch (optedPayment) {
        case "Pay Now":
          paymentStatus = "Unpaid";
          break;
        case "Pay on Delivery":
          paymentStatus = "cod";
          break;
        case "Pay Later":
          paymentStatus = "Unpaid";
          break;
        default:
          paymentStatus = "Unpaid";
      }

      const orderItems = tyreOrders.map((order) => ({
        tyre: order.tyreId,
        size: order.tyreSize,
        quantity: parseInt(order.numberOfTyres) || 1,
      }));

      const hasInvalidIds = orderItems.some(
        (item) =>
          !item.tyre || typeof item.tyre !== "string" || item.tyre.trim() === ""
      );

      if (hasInvalidIds) {
        throw new Error("One or more tyre IDs are missing or invalid");
      }

      console.log("Sending order items:", JSON.stringify(orderItems));

      const tyreOrderResponse = await axios.post(
        `${API_URL}/client/order-client/ordertyre`,
        { orderItems },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const orderId =
        tyreOrderResponse.data._id || tyreOrderResponse.data.orderId;

      const appointmentData = {
        addressId: selectedAddress._id,
        time: appointmentDateTime.time.formatted,
        date: `${appointmentDateTime.date.year}-${String(
          appointmentDateTime.date.month
        ).padStart(2, "0")}-${String(appointmentDateTime.date.day).padStart(
          2,
          "0"
        )}`,
        orderinfo: orderId,
        paymentStatus: paymentStatus,
      };

      const appointmentResponse = await axios.post(
        `${API_URL}/client/appointment/bookappointment`,
        { appointmentData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsLoading(false);

      Alert.alert(
        "Success",
        "Your order has been placed and appointment has been booked successfully!",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Home"),
          },
        ]
      );
    } catch (error) {
      setIsLoading(false);
      console.error(
        "Error submitting order:",
        error.response?.data || error.message
      );
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          error.message ||
          "Failed to process your order. Please try again."
      );
    }
  };

  const handlePaymentOptionSelect = (option) => {
    setOptedPayment(option);
    console.log(`Selected payment option: ${option}`);
  };

  const renderTyreOrderItem = ({ item }) => (
    <View style={styles.tyreOrderItem}>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Quantity:</Text>
        <Text style={styles.tyreOrderValue}>{item.numberOfTyres}</Text>
      </View>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Brand:</Text>
        <Text style={styles.tyreOrderValue}>{item.tyreBrand}</Text>
      </View>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Model:</Text>
        <Text style={styles.tyreOrderValue}>{item.tyreModel}</Text>
      </View>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Size:</Text>
        <Text style={styles.tyreOrderValue}>{item.tyreSize}</Text>
      </View>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Price per Tyre:</Text>
        <Text style={styles.tyreOrderValue}>Rs. {item.tyrePrice}</Text>
      </View>
      <View style={styles.tyreOrderRow}>
        <Text style={styles.tyreOrderLabel}>Total:</Text>
        <Text style={styles.tyreOrderValue}>
          Rs. {parseInt(item.numberOfTyres) * parseInt(item.tyrePrice)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: hp("10%") }}>
        <View style={styles.confirmationCard}>
          <Text style={styles.header}>Service Booking Confirmation</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.label]}>Service</Text>
              <Text style={styles.value}>
                {ServiceBookingConfirmationData.service}
              </Text>
            </View>

            {/* For any row where the content might be too long */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.label]}>Vehicle</Text>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Text style={styles.value}>
                  {ServiceBookingConfirmationData.vehicle}
                </Text>
              </View>
            </View>

            {/* Address Section - Improved Layout */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.label]}>Location</Text>
              <View style={styles.addressContainer}>
                <Text style={styles.value}>
                  {ServiceBookingConfirmationData.location}
                </Text>
                <Text style={styles.value}>
                  {" "}
                  {ServiceBookingConfirmationData.locationNote}
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

          {/* Tyre Details Section */}
          {tyreOrders && tyreOrders.length > 0 && (
            <View style={styles.tyreDetailsSection}>
              <Text style={styles.sectionTitle}>Tyre Details</Text>
              <FlatList
                data={tyreOrders}
                renderItem={renderTyreOrderItem}
                keyExtractor={(item, index) => `tyre-${index}`}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </View>
          )}

          <View style={{ height: 30 }} />

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.label]}>
                Service Total
              </Text>
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

        {/* Payment Option Buttons*/}
        <View style={styles.paymentOptionsContainer}>
          <Text style={styles.paymentOptionsTitle}>Select Payment Option</Text>

          <View style={styles.paymentButtonsRow}>
            <TouchableOpacity
              onPress={() => handlePaymentOptionSelect("Pay on Delivery")}
              style={[
                styles.paymentButton,
                optedPayment === "Pay on Delivery" &&
                  styles.selectedPaymentButton,
              ]}
              disabled={isLoading}
            >
              <Ionicons
                name="home-outline"
                size={24}
                color={optedPayment === "Pay on Delivery" ? "white" : "#4CAF50"}
              />
              <Text
                style={[
                  styles.paymentButtonText,
                  {
                    color:
                      optedPayment === "Pay on Delivery" ? "white" : "#4CAF50",
                  },
                ]}
              >
                Pay on Delivery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePaymentOptionSelect("Pay Now")}
              style={[
                styles.paymentButton,
                optedPayment === "Pay Now" && styles.selectedPaymentButton,
              ]}
              disabled={isLoading}
            >
              <Ionicons
                name="card-outline"
                size={24}
                color={optedPayment === "Pay Now" ? "white" : "#9C27B0"}
              />
              <Text
                style={[
                  styles.paymentButtonText,
                  { color: optedPayment === "Pay Now" ? "white" : "#9C27B0" },
                ]}
              >
                Pay Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePaymentOptionSelect("Pay Later")}
              style={[
                styles.paymentButton,
                optedPayment === "Pay Later" && styles.selectedPaymentButton,
              ]}
              disabled={isLoading}
            >
              <Ionicons
                name="time-outline"
                size={24}
                color={optedPayment === "Pay Later" ? "white" : "#673AB7"}
              />
              <Text
                style={[
                  styles.paymentButtonText,
                  { color: optedPayment === "Pay Later" ? "white" : "#673AB7" },
                ]}
              >
                Pay Later
              </Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              !optedPayment && styles.disabledButton,
            ]}
            onPress={handlePaymentSubmit}
            disabled={!optedPayment || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Confirm Order</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1,
    backgroundColor: "#F4F9F8",
    width: "100%",
    paddingHorizontal: wp("5%"),
    marginTop: hp("16%"),
  },
  header: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("3%"),
    textAlign: "center",
    fontFamily: "poppins",
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
    marginBottom: hp("3%"),
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
  },
  tableCell: {
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
  label: {
    color: "#888",
    fontWeight: "400",
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
  value: {
    fontWeight: "600",
    fontSize: wp("4%"),
    color: "#000",
    textAlign: "right",
    fontFamily: "poppins",
  },
  red: {
    color: "red",
    fontFamily: "poppins",
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
    fontFamily: "poppins",
  },

  tyreDetailsSection: {
    marginTop: hp("2%"),
    backgroundColor: "#f8f9fa",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#007bff",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  tyreOrderItem: {
    backgroundColor: "white",
    borderRadius: wp("1.5%"),
    padding: wp("3%"),
    marginBottom: hp("1%"),
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  tyreOrderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("0.8%"),
  },
  tyreOrderLabel: {
    fontSize: wp("3.8%"),
    color: "#666",
    fontFamily: "poppins",
  },
  tyreOrderValue: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
    color: "#333",
    fontFamily: "poppins",
  },
  separator: {
    height: 1,
    backgroundColor: "#e9ecef",
    marginVertical: hp("1%"),
  },
  addressContainer: {
    flex: 1,
    alignItems: "flex-end",
    maxWidth: wp("50%"),
  },
  locationNote: {
    fontFamily: "poppins",
    fontSize: wp("3%"),
    color: "#555",
    marginTop: 2,
  },
  paymentOptionsContainer: {
    marginTop: hp("2%"),
    backgroundColor: "white",
    borderRadius: wp("2.5%"),
    padding: wp("5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  paymentOptionsTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#6200EA",
    marginBottom: hp("2%"),
    textAlign: "center",
    fontFamily: "poppins",
  },
  paymentButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: "#f8f9fa",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("2%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "#e9ecef",
    flex: 1,
    marginHorizontal: wp("1%"),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: hp("8%"),
    height: hp("10%"),
  },
  paymentButtonText: {
    fontWeight: "600",
    fontSize: wp("3%"),
    textAlign: "center",
    fontFamily: "poppins",
    marginTop: hp("0.5%"),
  },
  selectedPaymentButton: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  selectedPaymentText: {
    color: "white",
  },
  submitButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("8%"),
    borderRadius: wp("3%"),
    minWidth: wp("70%"),
    alignSelf: "center",
    marginTop: hp("3%"),
    elevation: 3,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4%"),
    textAlign: "center",
    fontFamily: "poppins",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
});

export default ServiceBookingConfirmation;
