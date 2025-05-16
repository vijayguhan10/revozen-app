import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  ScrollView,
  Vibration,
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
const { width } = Dimensions.get("window");
import { Audio } from "expo-av";
import { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const SupportScreen = () => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const soundRef = useRef(null);

  const handleSOS = async () => {
    console.log("SOS Pressed: Trigger roadside assistance");

    const vibrationPattern = [0, 1000, 500, 1000, 500, 1000];
    Vibration.vibrate(vibrationPattern);

    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/google-pixel-emergency-sos-sound.mp3"),
      { shouldPlay: true }
    );

    soundRef.current = sound;
    setTimeout(async () => {
      await sound.stopAsync();
      await sound.unloadAsync();
    }, 10000);

    Alert.alert("SOS Sent", "We've received your request. Help is on the way!");
  };

  const handleSubmit = () => {
    if (!subject || !description) {
      Alert.alert("Error", "Please fill out both fields");
      return;
    }
    // Handle form submission logic
    Alert.alert("Success", "Ticket submitted successfully!");
    setSubject("");
    setDescription("");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {/* SOS Button */}
          <View style={styles.card}>
            <Text style={styles.header}>Support</Text>
            <Text style={styles.subheader}>
              👋 Need Help? We're here for you!
            </Text>
            <TouchableOpacity
              onPress={handleSOS}
              style={styles.buttonContainer}
            >
              <LottieView
                source={{
                  uri: "https://lottie.host/f60bea47-c956-4d58-b263-5959ff9bbaa4/aV1L8hNxqf.lottie",
                }}
                autoPlay
                loop
                style={styles.lottie}
              />
            </TouchableOpacity>
            <Text style={styles.tapText}>
              Tap once to request instant roadside help!
            </Text>
            <Text style={styles.footerText}>
              We'll locate you and send help right away
            </Text>
          </View>

          {/* Live Chat Support */}
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>Live Chat Support</Text>
                <Text style={styles.subtitle}>Avg. reply in 2–5 mins</Text>
              </View>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={["#f96816", "#fd7c22"]}
                  style={styles.chatIconBackground}
                >
                  <Ionicons
                    name="chatbox-ellipses-outline"
                    size={24}
                    color="#fff"
                  />
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Raise a Ticket */}
          <View style={styles.Raiseticker}>
            <Text style={styles.title}>Raise a Ticket</Text>

            <Text style={styles.label}>Subject:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter subject"
              value={subject}
              onChangeText={setSubject}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter description"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              onPress={handleSubmit}
              style={styles.buttonWrapper}
            >
              <LinearGradient
                colors={["#f96816", "#fd7c22"]}
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 2,
    marginTop: hp("14%"),
    padding: wp("4%"),
    backgroundColor: "#F4F9F8",
  },
  header: {
    fontSize: wp("5%"),
    color: "#4169e1",
    fontWeight: "bold",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  subheader: {
    fontSize: wp("4%"),
    marginBottom: hp("2%"),
    textAlign: "center",
    fontFamily: "poppins",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("2.5%"),
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  Raiseticker: {
    backgroundColor: "#ffffff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("11%"),
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonContainer: {
    width: wp("60%"),
    height: wp("60%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("30%"),
    overflow: "hidden",
    alignSelf: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  tapText: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    textAlign: "center",
    fontFamily: "poppins",
  },
  footerText: {
    marginTop: hp("1.2%"),
    fontSize: wp("3.5%"),
    textAlign: "center",
    color: "#666",
    fontFamily: "poppins",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginLeft: wp("2.5%"),
  },
  chatIconBackground: {
    padding: wp("2.5%"),
    borderRadius: wp("3%"),
  },
  title: {
    fontWeight: "bold",
    fontSize: wp("4.5%"),
    color: "#4169e1",
    fontFamily: "poppins",
  },
  subtitle: {
    fontSize: wp("3.3%"),
    color: "#555",
    marginTop: hp("0.8%"),
    fontFamily: "poppins",
  },
  label: {
    marginTop: hp("1.5%"),
    fontSize: wp("3.5%"),
    color: "#333",
    fontFamily: "poppins",
  },
  input: {
    backgroundColor: "#ececec",
    borderRadius: wp("2%"),
    padding: wp("2.5%"),
    marginTop: hp("0.8%"),
    fontFamily: "poppins",
  },
  textArea: {
    height: hp("13%"),
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: hp("2%"),
  },
  submitButton: {
    borderRadius: wp("2.5%"),
    paddingVertical: hp("1.5%"),
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
});
