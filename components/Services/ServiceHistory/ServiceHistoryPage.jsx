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
import { FlatList } from "react-native-gesture-handler";
const ServiceHistoryPage = () => {
  const API_URL = api.API_URL;
  const navigation = useNavigation();

  const [upcomingServices, setUpcoming] = useState([]);
  const [pastServices, setPast] = useState([]);
  const [issues, setIssues] = useState([]);
  const [paymentPending, setPending] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/client/appointment/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setUpcoming(res.data.upcoming || []);
        setPast(res.data.completed || []);
        setIssues(res.data.issues || []);
        setPending(res.data.paymentpending || []);
      }
    } catch (err) {
      console.error("Error fetching service history", err);
    }
  };

  const renderSection = (title, data, variant, isTouchable = false) => {
    if (!data || data.length === 0) return null;

    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) =>
            isTouchable ? (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ServiceHistoryDetails", {
                    service: item,
                  })
                }
                activeOpacity={0.7}
              >
                <ServiceCard data={item} variant={variant} />
              </TouchableOpacity>
            ) : (
              <ServiceCard data={item} variant={variant} />
            )
          }
          style={{ maxHeight: hp("30%") }} // Limit height to show only ~3 cards
          contentContainerStyle={{ gap: hp("1%") }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Service History</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderSection("🧾 Payment Pending", paymentPending, "paymentpending")}
        {renderSection(
          "🕑 Upcoming Services",
          upcomingServices,
          "upcoming",
          true
        )}
        {renderSection("✅ Completed Services", pastServices, "completed")}
        {renderSection("⚠️ Issues Found", issues, "issues")}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("10%"),
    backgroundColor: "#f4f7fb",
    paddingHorizontal: wp("4%"),
    marginTop: hp("5%"),
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
  sectionTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    color: "#1e90ff",
    marginBottom: hp("1.5%"),
    fontFamily: "Poppins",
  },
});

export default ServiceHistoryPage;
