// InitialHome.js
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const InitialHome = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search for a car service"
          style={styles.searchInput}
        />
      </View>

      <ScrollView scrollEnabled={true}>
        <Text style={styles.sectionTitle}>Choose service type</Text>

        <View style={styles.serviceTypeContainer}>
          <View style={styles.extendbutton}>
            <LinearGradient
              colors={["#c2daff", "#5297ff"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.serviceCard}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="car-tire-alert"
                  size={30}
                  color="#fff"
                />
                <Text style={styles.serviceCardTextWhite}>
                  Tyre Replacement
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          <View style={styles.extendbutton}>
            <LinearGradient
              colors={["#e0ecff", "#ffe3d1"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.serviceCard}
            >
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="car-wash"
                  size={30}
                  color="#000"
                />
                <Text style={styles.serviceCardTextWhite}>Car Washing</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        <TouchableOpacity style={styles.serviceHistoryBtn}>
          <Text style={styles.serviceHistoryText}>Service History</Text>
        </TouchableOpacity>

        <LinearGradient
          colors={["#a6c4f5", "#4287f5"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 1 }}
          style={styles.bookingCard}
        >
          <View>
            <Text style={styles.bookingHeader}>Upcoming Booking</Text>

            <View style={styles.rowgapcontainer}>
              <View style={styles.bookingRow}>
                <Ionicons name="calendar-outline" size={18} color="#fff" />
                <Text style={styles.bookingText}>May 6</Text>
                <Ionicons
                  name="time-outline"
                  size={18}
                  color="#fff"
                  style={{ marginLeft: 10 }}
                />
                <Text style={styles.bookingText}>10:00 AM</Text>
                <Ionicons
                  name="home-outline"
                  size={18}
                  color="#fff"
                  style={{ marginLeft: 10 }}
                />
                <Text style={styles.bookingText}>Home</Text>
              </View>

              <Text style={styles.bookingService}>
                Tyre Replacement – Baleno
              </Text>

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Track Technician</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Reschedule</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Technician Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>

        {Array.from({ length: 5 }).map((_, i) => (
          <View key={i} style={styles.Recentactivities}>
            <Text style={styles.title}>Recent Activity</Text>

            <View style={styles.item}>
              <Text style={styles.date}>Apr 01</Text>
              <Text style={styles.activity}>Car Wash</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.date}>Feb 18</Text>
              <Text style={styles.activity}>Service Completed</Text>
            </View>

            <Text style={styles.subText}>Invoice Downloaded</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp("30%"),
    padding: wp("4%"),
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
    borderRadius: wp("2.5%"),
    marginBottom: hp("2.5%"),
  },
  searchInput: { flex: 1 },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginBottom: hp("1.2%"),
  },
  serviceTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  extendbutton: {
    flex: 1,
    margin: wp("1%"),
    width: wp("5%"),
    borderRadius: wp("2.5%"),
  },
  serviceCard: {
    flex: 1,
    alignItems: "center",
    padding: wp("4%"),
    marginRight: wp("2.5%"),
    borderRadius: wp("2.5%"),
  },
  serviceCardTextWhite: {
    color: "#00000",
    marginTop: hp("0.8%"),
    fontWeight: "600",
  },
  serviceCardTextBlack: {
    color: "#000",
    marginTop: hp("0.8%"),
    fontWeight: "600",
  },
  serviceHistoryBtn: {
    borderColor: "#a6c4f5",
    borderWidth: 2,
    borderRadius: wp("2.5%"),
    padding: wp("3.5%"),
    alignItems: "center",
    marginBottom: hp("2.5%"),
  },
  serviceHistoryText: {
    color: "#FF6B00",
    fontWeight: "600",
  },
  bookingCard: {
    backgroundColor: "#4472FF",
    padding: wp("4%"),
    borderRadius: wp("4%"),
  },
  bookingHeader: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginBottom: hp("1.2%"),
  },
  rowgapcontainer: {
    flexDirection: "column",
    rowGap: hp("2%"),
  },
  bookingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.2%"),
    columnGap: wp("4%"),
  },
  bookingText: {
    color: "#fff",
    marginLeft: wp("1%"),
  },
  bookingService: {
    color: "#fff",
    fontSize: wp("3.8%"),
    fontWeight: "600",
    marginBottom: hp("2%"),
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    flex: 1,
    marginRight: wp("2%"),
  },
  buttonText: {
    color: "#4472FF",
    fontWeight: "600",
    textAlign: "center",
    fontSize: wp("3%"),
  },
  title: {
    color: "#4f80ff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
  },
  item: {
    flexDirection: "row",
    marginBottom: 6,
  },
  date: {
    width: 60,
    fontWeight: "700",
    color: "#000",
  },
  activity: {
    color: "#000",
  },
  subText: {
    color: "#999",
    marginLeft: 60,
    fontSize: 12,
  },
  Recentactivities: {
    borderRadius: hp("2%"),                           
    borderWidth: hp("0.2%"),   
    borderColor: "#eee",
    padding: wp("4%"),
    marginBottom: hp("2%"),
    backgroundColor: "#fff",
  },
});
export default InitialHome;
