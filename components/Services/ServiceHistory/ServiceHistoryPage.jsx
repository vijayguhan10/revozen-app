import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../env.json";
import axios from "axios";

const ServiceHistoryPage = () => {
  const API_URL = api.API_URL;
  const navigation = useNavigation();

  const [upcomingServices, setUpcoming] = useState([]);
  const [pastServices, setPast] = useState([]);
  const [issues, setIssues] = useState([]);
  const [paymentPending, setPending] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.get(`${API_URL}/client/appointment/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.success) {
        console.log(res.data.completed);
        setUpcoming(res.data.upcoming || []);
        setPast(res.data.completed || []);
        setIssues(res.data.issues || []);
        setPending(res.data.paymentpending || []);
      }
    } catch (err) {
      console.error(
        "Error fetching service history:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const renderSection = (title, data, variant) => {
    if (!data || data.length === 0) return null;

    const limitedData = data.slice(0, 3);
    const hasMoreItems = data.length > 3;

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {hasMoreItems && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ServiceList", {
                  title,
                  services: data,
                  variant,
                })
              }
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          )}
        </View>

        {limitedData.map((item) => (
          <View key={item._id} style={styles.cardContainer}>
            <ServiceCard item={item} variant={variant} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Service History</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {renderSection("Payment Pending", paymentPending, "paymentpending")}
        {renderSection("Upcoming Services", upcomingServices, "upcoming")}
        {renderSection("Completed Services", pastServices, "completed")}
        {renderSection("Issues Found", issues, "issues")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("%"),
    backgroundColor: "#f4f7fb",
    paddingHorizontal: wp("4%"),
    marginTop: hp("15%"),
    zIndex: 1,
  },
  header: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#003366",
    marginBottom: hp("3%"),
    fontFamily: "Poppins",
  },
  scrollContent: {
    paddingBottom: hp("8%"),
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("2.5%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  cardContainer: {
    marginBottom: hp("1%"),
  },
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "700",
    color: "#1e90ff",
    fontFamily: "Poppins",
  },
  viewAllButton: {
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
  },
  viewAllText: {
    color: "#1e90ff",
    fontSize: wp("3.5%"),
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp("90%"),
    maxHeight: hp("80%"),
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: hp("1%"),
  },
  modalTitle: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#1e90ff",
    fontFamily: "Poppins",
  },
  closeButton: {
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("3%"),
    backgroundColor: "#1e90ff",
    borderRadius: wp("1.5%"),
  },
  closeButtonText: {
    color: "#fff",
    fontSize: wp("3.5%"),
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  modalScrollView: {
    maxHeight: hp("60%"),
  },
  modalCardContainer: {
    marginBottom: hp("1%"),
  },
});

export default ServiceHistoryPage;
