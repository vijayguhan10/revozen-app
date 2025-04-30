import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ServiceHistoryDetailsPage = () => {
  const serviceDetails = {
    serviceType: "Full Service",
    vehicle: "BALENO",
    status: "Complete",
    date: "18th Feb 2025",
    time: "4:00 am",
    technician: "John Doe",
    image: require("../../assets/Vehicle/car.png"),
  };

  const isComplete = serviceDetails.status.toLowerCase() === "complete";
  const statusIcon = isComplete
    ? require("../../assets/ServiceHistory/finished.png")
    : require("../../assets/ServiceHistory/upcoming.png");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Service History</Text>
          <Text style={styles.sectionTitle}>History</Text>
        </View>

        <View style={styles.serviceTypeCard}>
          <View style={styles.serviceHeaderRow}>
            <Text style={styles.serviceTypeText}>
              {serviceDetails.serviceType}
            </Text>
            <Image source={statusIcon} style={styles.statusIcon} />
          </View>

          {serviceDetails.image && (
            <Image source={serviceDetails.image} style={styles.vehicleImage} />
          )}

          <View style={styles.detailsContainer}>
            <View style={styles.labelsColumn}>
              <Text style={styles.label}>Vehicle</Text>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.label}>Technician</Text>
            </View>

            <View style={styles.valuesColumn}>
              <Text style={styles.value}>{serviceDetails.vehicle}</Text>
              <Text
                style={[styles.value, { color: isComplete ? "green" : "red" }]}
              >
                {serviceDetails.status}
              </Text>
              <Text style={styles.value}>{serviceDetails.date}</Text>
              <Text style={styles.value}>{serviceDetails.time}</Text>
              <Text style={styles.value}>{serviceDetails.technician}</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Technician Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Invoice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F9F8",
    width: "100%",
    paddingHorizontal: wp("4%"),
    marginTop: hp("15%"),
    zIndex: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: wp("2%"),
    padding: wp("4%"),
    paddingBottom: wp("7%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
    marginBottom: hp("5%"),
  },
  headerSection: {
    marginBottom: hp("1.5%"),
  },
  pageTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("0.5%"),
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#ff8800",
  },
  serviceTypeCard: {
    backgroundColor: "#E6F0FA",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    borderWidth: 1,
    borderColor: "#007bff",
  },
  serviceHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  serviceTypeText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#333",
  },
  statusIcon: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
  },
  vehicleImage: {
    width: wp("50%"),
    height: hp("20%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp("1.5%"),
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: hp("1.5%"),
  },
  labelsColumn: {
    width: "40%",
  },
  valuesColumn: {
    width: "60%",
    alignItems: "flex-end",
  },
  label: {
    fontSize: wp("3.8%"),
    color: "#666",
    marginBottom: hp("1%"),
  },
  value: {
    fontSize: wp("3.8%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1%"),
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    marginBottom: hp("1.2%"),
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "#007bff",
  },
  secondaryButtonText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
});

export default ServiceHistoryDetailsPage;
