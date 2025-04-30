import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import VehicleCard from "../../Vehicle/VehicleList/VehicleListCard";
import { useNavigation } from "@react-navigation/native";
const vehicleList = [
  {
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
  },
  {
    id: 2,
    model: "Creta",
    manufacturer: "Hyundai",
    regNo: "TN 10 AB 1234",
    typeSize: "205/65",
    bodyStyle: "SUV",
    cargoVolume: "433 L",
    engineConfig: "V-Type Engine",
    servicesCount: "2",
    lastService: "2024-12-20",
    image: require("../../../assets/Vehicle/car.png"),
  },
  {
    id: 3,
    model: "Swift",
    manufacturer: "Suzuki",
    regNo: "MH 12 CD 5678",
    typeSize: "165/70",
    bodyStyle: "Hatchback",
    cargoVolume: "268 L",
    engineConfig: "Inline Engine",
    servicesCount: "1",
    lastService: "2025-01-10",
    image: require("../../../assets/Vehicle/car.png"),
  },
];

const BookServicePage = () => {
  const navigation = useNavigation();
  const [tyresCount, setTyresCount] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Searchbar
        placeholder="Search for a car service"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.card}>
        <Text style={styles.pageTitle}>Book A Service</Text>

        <Text style={styles.sectionTitle}>Select Vehicle</Text>
        {vehicleList.map((vehicle, index) => (
          <View key={vehicle.id} style={{ marginBottom: hp("2%") }}>
            <VehicleCard
              key={vehicle.id}
              model={vehicle.model}
              image={vehicle.image}
              index={index}
            />
          </View>
        ))}

        <Text style={styles.subSectionTitle}>Additional Data</Text>
        <TextInput
          style={styles.underlineInput}
          keyboardType="numeric"
          value={tyresCount}
          onChangeText={setTyresCount}
          placeholder="Enter number of Tyres"
          placeholderTextColor="#999"
        />

        <Text style={styles.subSectionTitle}>Choose Service Location</Text>

        <View style={styles.locationRow}>
          <TouchableOpacity
            style={[styles.locationOption, { flex: 1 }]}
            onPress={() => setSelectedLocation("home")}
          >
            <View style={styles.radioButton}>
              {selectedLocation === "home" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Ionicons
              name="home-outline"
              size={20}
              color="#666"
              style={styles.locationIcon}
            />
            <View style={styles.locationDetails}>
              <Text style={styles.locationName}>Home Address</Text>
              <Text style={styles.locationAddress}>Address123</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.changeButton}>
            <Text style={styles.changeButtonText}>CHANGE</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.locationOption}
          onPress={() => setSelectedLocation("manual")}
        >
          <View style={styles.radioButton}>
            {selectedLocation === "manual" && (
              <View style={styles.radioSelected} />
            )}
          </View>
          <Ionicons
            name="location-outline"
            size={20}
            color="#666"
            style={styles.locationIcon}
          />
          <Text style={styles.locationName}>Enter Manually</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Appointment")}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F9F8",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("5%"),
    paddingBottom: hp("10%"),
    marginTop: hp("5%"),
  },
  searchbar: {
    borderRadius: 30,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: wp("2%"),
    padding: wp("4%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    marginBottom: hp("11%"),
    elevation: 3,
  },
  pageTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("2%"),
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1.5%"),
  },
  subSectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#007bff",
    marginTop: hp("1.5%"),
    marginBottom: hp("1.5%"),
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    marginBottom: hp("2%"),
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp("2%"),
  },
  locationOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  radioButton: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
    borderWidth: 1,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("2%"),
  },
  radioSelected: {
    width: wp("3%"),
    height: wp("3%"),
    borderRadius: wp("1.5%"),
    backgroundColor: "#007bff",
  },
  locationIcon: {
    marginRight: wp("2%"),
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: wp("4%"),
    color: "#333",
  },
  locationAddress: {
    fontSize: wp("3.8%"),
    color: "#666",
  },
  changeButton: {
    marginLeft: wp("2%"),
  },
  changeButtonText: {
    fontSize: wp("3.8%"),
    color: "#007bff",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginTop: hp("3%"),
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
});

export default BookServicePage;
