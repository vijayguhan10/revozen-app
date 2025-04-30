import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ServiceCard from "./ServiceCard";
import { useNavigation } from "@react-navigation/native";
const ServiceHistoryPage = () => {
  const navigation = useNavigation();
  const upcomingServices = [
    {
      id: 1,
      type: "Tyre Replacement",
      date: "Due on 8th May",
      time: "10:30 am",
      vehicle: "Baleno",
    },
    {
      id: 2,
      type: "Engine Oil Change",
      date: "Due on 12th May",
      time: "9:00 am",
      vehicle: "Swift",
    },
    {
      id: 3,
      type: "AC Service",
      date: "Due on 15th May",
      time: "1:00 pm",
      vehicle: "i20",
    },
  ];

  const pastServices = [
    {
      id: 1,
      type: "Wheel Alignment",
      date: "Done on 1st Apr",
      time: "8:30 am",
      vehicle: "Car_1",
    },
    {
      id: 2,
      type: "Brake Check",
      date: "Done on 24th Mar",
      time: "5:30 pm",
      vehicle: "Car_1",
    },
    {
      id: 3,
      type: "Full Service",
      date: "Done on 18th Feb",
      time: "4:00 pm",
      vehicle: "Baleno",
    },
    {
      id: 4,
      type: "Battery Replacement",
      date: "Done on 10th Feb",
      time: "3:15 pm",
      vehicle: "Swift",
    },
    {
      id: 5,
      type: "Coolant Top-up",
      date: "Done on 28th Jan",
      time: "11:00 am",
      vehicle: "i20",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Service History</Text>

        {/* Outer container with fixed height */}
        <View style={styles.scrollWrapper}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          <ScrollView
            style={styles.subScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {upcomingServices.map((service) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("ServiceHistoryDetails")}
                key={service.id}
              >
                <ServiceCard data={service} variant="upcoming" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={[styles.sectionTitle, { marginTop: hp("2%") }]}>
            History
          </Text>
          <ScrollView
            style={styles.subScroll}
            contentContainerStyle={styles.scrollContent}
          >
            {pastServices.map((service) => (
              <ServiceCard key={service.id} data={service} variant="finished" />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: wp("5%"),
    // paddingTop: hp("16%"),
    paddingBottom: hp("2%"),
    marginTop: hp("15%"),
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: wp("3%"),
    padding: wp("5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  header: {
    fontSize: wp("5.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("3%"),
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#ff8c00",
    marginBottom: hp("1%"),
  },
  scrollWrapper: {
    maxHeight: hp("64%"),
  },
  subScroll: {
    maxHeight: hp("28%"),
    marginBottom: hp("1.5%"),
  },
  scrollContent: {
    paddingBottom: hp("2%"),
  },
});

export default ServiceHistoryPage;
