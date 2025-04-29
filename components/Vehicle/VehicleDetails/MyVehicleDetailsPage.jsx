import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VehicleCard from "./VehicleDetailsCard";

const vehicleDetails = {
  id: 1,
  model: "Baleno",
  manufacturer: "Suzuki",
  regNo: "AZ 00 BY 0000",
  typeSize: "185/65",
  bodyStyle: "Hatchback",
  cargoVolume: "318 L",
  engineConfig: "Straight Engine",
  servicesCount: "Nil",
  lastService: "Not Available",
  image: require("../../../assets/Vehicle/car.png"),
};

const MyVehicleDetailsPage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.middleSection}>
        <View style={styles.vehicleSectionContainer}>
          <Text style={styles.sectionTitle}>My Vehicles</Text>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.vehicleSection}>
              <VehicleCard vehicle={vehicleDetails} />
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
  },
  header: {
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  headerText: {
    fontSize: wp("5%"),
    fontWeight: "bold",
  },
  middleSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vehicleSectionContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    height: hp("75%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
    marginTop: hp("2%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#007bff",
    marginBottom: hp("2%"),
    textAlign: "left",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  vehicleSection: {
    marginBottom: hp("2%"),
  },
  footer: {
    height: hp("10%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  footerText: {
    fontSize: wp("4%"),
  },
});

export default MyVehicleDetailsPage;
