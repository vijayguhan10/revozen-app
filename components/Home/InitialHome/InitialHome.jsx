// InitialHome.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
const tyreexchange = require("../../../assets/tyre-exchange.png");
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitialHome = () => {
  const navigation = useNavigation();
  const [levellogin, setLevellogin] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("levellogin").then((val) => {
      setLevellogin(val);
    });
  }, []);

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

      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={{ paddingBottom: hp("10%") }}
      >
        <Text style={styles.sectionTitle}>Choose service type</Text>
        <View style={styles.serviceTypeContainer}>
          {/* Always show Purchase Tyres */}
          <View style={styles.extendbutton}>
            <LinearGradient
              colors={["#c2daff", "#5297ff"]}
              start={{ x: 1, y: 1 }}
              end={{ x: 0, y: 1 }}
              style={styles.serviceCard}
            >
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => navigation.navigate("BookService")}
              >
                <Image
                  source={tyreexchange}
                  style={{ width: wp("10%"), height: hp("5%") }}
                />
                <Text
                  style={[
                    styles.serviceCardTextWhite,
                    { alignItems: "center", justifyContent: "center" },
                  ]}
                >
                  Purchase Tyres
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          {/* Show Car Washing only if levellogin is "individual" */}
          {levellogin === "individual" && (
            <View style={styles.extendbutton}>
              <LinearGradient
                colors={["#e0ecff", "#ffe3d1"]}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 1 }}
                style={styles.serviceCard}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("carwashomepage")}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <MaterialCommunityIcons
                    name="car-wash"
                    size={30}
                    color="#000"
                  />
                  <Text style={styles.serviceCardTextWhite}>Car Washing</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => navigation.replace("ServiceHistory")}
          style={styles.serviceHistoryBtn}
        >
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
    fontFamily: "poppins",
    zIndex: 1,
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
  searchInput: {
    flex: 1,
    fontFamily: "poppins",
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    marginBottom: hp("1.2%"),
    fontFamily: "poppins",
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
    alignContent: "center",
    textAlign: "center",
    alignSelf: "center",
  },
  serviceCard: {
    flex: 1,
    alignItems: "center",
    padding: wp("4%"),
    marginRight: wp("2.5%"),
    borderRadius: wp("2.5%"),
  },
  serviceCardTextWhite: {
    flexShrink: 1,
    fontFamily: "poppins",
    color: "#00000",
    marginTop: hp("0.8%"),
    width: wp("40%"),
    fontWeight: "600",
    textAlign: "center",
  },
  serviceCardTextBlack: {
    color: "#000",
    marginTop: hp("0.8%"),
    fontWeight: "600",
    fontFamily: "poppins",
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
    fontFamily: "poppins",
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
    fontFamily: "poppins",
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
    fontFamily: "poppins",
  },
  bookingService: {
    color: "#fff",
    fontSize: wp("3.8%"),
    fontWeight: "600",
    marginBottom: hp("2%"),
    fontFamily: "poppins",
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
    fontFamily: "poppins",
  },
  title: {
    color: "#4f80ff",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 12,
    fontFamily: "poppins",
  },
  item: {
    flexDirection: "row",
    marginBottom: 6,
  },
  date: {
    width: 60,
    fontWeight: "700",
    color: "#000",
    fontFamily: "poppins",
  },
  activity: {
    color: "#000",
    fontFamily: "poppins",
  },
  subText: {
    color: "#999",
    marginLeft: 60,
    fontSize: 12,
    fontFamily: "poppins",
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
