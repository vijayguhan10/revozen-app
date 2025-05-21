import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import api from "../../../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Booking = ({
  visible,
  onClose,
  shop,
}) => {
  const [date, setDate] = useState(undefined);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [washType, setWashType] = useState("doorstep");
  const [selectedTime, setSelectedTime] = useState(undefined);
  const [address, setAddress] = useState("");

  const onDismissDate = () => setShowDatePicker(false);
  const onConfirmDate = (params) => {
    setShowDatePicker(false);
    setDate(params.date);
  };

  const onDismissTime = () => setShowTimePicker(false);
  const onConfirmTime = ({ hours, minutes }) => {
    setShowTimePicker(false);
    setSelectedTime({ hours, minutes });
  };
const onConfirmBooking = async () => {
  if (!date || !selectedTime || (washType === "doorstep" && !address)) {
    Alert.alert("Missing Info", "Please select date, time, and address (if doorstep).");
    return;
  }
  try {
    const appointmentTime = `${selectedTime.hours.toString().padStart(2, "0")}:${selectedTime.minutes.toString().padStart(2, "0")}`;
    const appointmentDate = date.toISOString();

    const payload = {
      appointmentDate,
      appointmentTime, 
      washType,
      address: washType === "doorstep" ? address : undefined,
    };
    
    const shopId = shop?._id;
    const url = `${api.API_URL}/carwash/postorders/${shopId}`;
    const token = await AsyncStorage.getItem("token");
    
    // First API call to post the order
    const orderResponse = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Order Response:", JSON.stringify(orderResponse.data,null,2));
    // Get the order ID from the response
    const orderId = orderResponse.data.orderid;

    // Second API call to update client car wash data
    const clientDataUrl = `${api.API_URL}/client/clientcarwashdata`;
    const clientDataPayload = {
      orderid: orderId,
      shopid: shopId
    };

    await axios.post(clientDataUrl, clientDataPayload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Order Response:", orderResponse.data);
    Alert.alert(
      "Success",
      "Your booking has been confirmed successfully!",
      [{ text: "OK", onPress: onClose }]
    );

  } catch (error) {
    console.error("Error booking:", error.message);
    Alert.alert("Error", "Failed to confirm booking. Please try again.");
  }
};
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalGradientBorder}>
          <LinearGradient
            colors={["#a1c0ff", "#ffd6b0"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Book a Wash</Text>
              <Text style={styles.modalLabel}>Select Date</Text>
              <TouchableOpacity
                style={styles.datePickerBtn}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="calendar-outline" size={wp("5%")} color="#6C63FF" />
                <Text style={styles.datePickerText}>
                  {date ? date.toDateString() : "Pick a date"}
                </Text>
              </TouchableOpacity>
              <DatePickerModal
                locale="en"
                mode="single"
                visible={showDatePicker}
                onDismiss={onDismissDate}
                date={date}
                onConfirm={onConfirmDate}
              />

              <Text style={styles.modalLabel}>Select Time</Text>
              <TouchableOpacity
                style={styles.datePickerBtn}
                onPress={() => setShowTimePicker(true)}
                activeOpacity={0.8}
              >
                <Ionicons name="time-outline" size={wp("5%")} color="#6C63FF" />
                <Text style={styles.datePickerText}>
                  {selectedTime
                    ? `${selectedTime.hours.toString().padStart(2, "0")}:${selectedTime.minutes
                        .toString()
                        .padStart(2, "0")}`
                    : "Pick a time"}
                </Text>
              </TouchableOpacity>
              <TimePickerModal
                visible={showTimePicker}
                onDismiss={onDismissTime}
                onConfirm={onConfirmTime}
                hours={selectedTime ? selectedTime.hours : 12}
                minutes={selectedTime ? selectedTime.minutes : 0}
                label="Select time"
              />

              <Text style={styles.modalLabel}>Wash Type</Text>
              <View style={styles.radioRow}>
                <Pressable
                  style={styles.radioBtn}
                  onPress={() => setWashType("doorstep")}
                >
                  <LinearGradient
                    colors={
                      washType === "doorstep"
                        ? ["#a1c0ff", "#ffd6b0"]
                        : ["#fff", "#fff"]
                    }
                    style={styles.radioCircle}
                  >
                    {washType === "doorstep" && <View style={styles.radioDot} />}
                  </LinearGradient>
                  <Text style={styles.radioText}>Doorstep</Text>
                </Pressable>
                <Pressable
                  style={[styles.radioBtn, { marginLeft: wp("8%") }]}
                  onPress={() => setWashType("shop")}
                >
                  <LinearGradient
                    colors={
                      washType === "shop"
                        ? ["#a1c0ff", "#ffd6b0"]
                        : ["#fff", "#fff"]
                    }
                    style={styles.radioCircle}
                  >
                    {washType === "shop" && <View style={styles.radioDot} />}
                  </LinearGradient>
                  <Text style={styles.radioText}>Shop</Text>
                </Pressable>
              </View>

              {washType === "doorstep" && (
                <TextInput
                  placeholder="Your Address"
                  value={address}
                  onChangeText={setAddress}
                  style={styles.nativeInput}
                  placeholderTextColor="#888"
                />
              )}

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={onConfirmBooking}
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["#6C63FF", "#ffd6b0"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.confirmBtnGradient}
                >
                  <Text style={styles.confirmBtnText}>Confirm Booking</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.closeBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalGradientBorder: {
    borderRadius: wp("5%"),
    padding: 2,
    width: wp("88%"),
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 10,
    backgroundColor: "transparent",
  },
  gradientBackground: {
    borderRadius: wp("5%"),
    width: "100%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    padding: wp("6%"),
    width: "100%",
    alignSelf: "center",
  },
  modalTitle: {
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("5.2%"),
    marginBottom: hp("1.5%"),
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  modalLabel: {
    // fontWeight: "600",

fontFamily: "poppins",    fontSize: wp("4.2%"),
    marginTop: hp("1.2%"),
    marginBottom: hp("0.5%"),
    color: "#555",
    letterSpacing: 0.1,
  },
  datePickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F9F8",
    borderRadius: wp("2%"),
    padding: wp("2.5%"),
    marginBottom: hp("1%"),
    borderWidth: 1,
    borderColor: "#e3e3e3",
  },
  datePickerText: {
    marginLeft: wp("2%"),
    fontSize: wp("4.2%"),
    color: "#333",
    // fontWeight: "500",

fontFamily: "poppins",  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
    marginTop: hp("0.5%"),
  },
  radioBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: wp("6%"),
    height: wp("6%"),
    borderRadius: wp("3%"),
    borderWidth: 2,
    borderColor: "#a1c0ff",
    marginRight: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  radioDot: {
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("1.5%"),
    backgroundColor: "#6C63FF",
  },
  radioText: {
    fontSize: wp("4.2%"),
    color: "#222",
    // fontWeight: "500",

fontFamily: "poppins",  },
  nativeInput: {
    borderWidth: 1,
    borderColor: "#a1c0ff",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    marginBottom: hp("1.5%"),
    fontSize: wp("4.2%"),
    color: "#222",
    backgroundColor: "#f8faff",
  },
  confirmBtn: {
    marginTop: hp("1%"),
    borderRadius: wp("2%"),
    overflow: "hidden",
  },
  confirmBtnGradient: {
    paddingVertical: hp("1.2%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnText: {
    color: "#fff",
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("4.5%"),
    letterSpacing: 0.2,
  },
  closeBtn: {
    alignItems: "center",
    marginTop: hp("1.2%"),
  },
  closeBtnText: {
    color: "#6C63FF",
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("4.2%"),
    letterSpacing: 0.1,
  },
});

export default Booking;
