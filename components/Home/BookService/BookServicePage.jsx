import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BookingAddress from "./BookingAddress";
import VehicleCard from "./VehicleCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../../../env.json";
import Loader from "../../../Loader"; // Use Loader directly

const BookServicePage = () => {
  const API_URL = api.API_URL;
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [isBulkOrder, setIsBulkOrder] = useState(false);
  const [levellogin, setLevellogin] = useState(null);
  const [bulkTirePrice, setBulkTirePrice] = useState("");
  const [localLoading, setLocalLoading] = useState(true); // Local loading state

  const scrollViewRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      setLocalLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const [vehiclesRes, level] = await Promise.all([
          axios.get(`${API_URL}/client/vehicle/getallvehicles`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          AsyncStorage.getItem("levellogin"),
        ]);
        setVehicles(vehiclesRes.data);
        setFilteredVehicles(vehiclesRes.data);
        setLevellogin(level);
      } catch (error) {
        console.log(
          "Error fetching vehicles or levellogin:",
          error.response?.data || error.message
        );
      } finally {
        setLocalLoading(false);
      }
    };
    fetchData();
  }, []);

  if (localLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilteredVehicles(
      vehicles.filter((vehicle) =>
        vehicle.vehicleModel.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const toggleVehicleSelection = (vehicleId) => {
    setSelectedVehicles((prev) => {
      if (prev.find((v) => v._id === vehicleId)) {
        return prev.filter((v) => v._id !== vehicleId);
      } else {
        const vehicleToAdd = vehicles.find((v) => v._id === vehicleId);
        return [...prev, vehicleToAdd];
      }
    });
  };

  const handleBulkOrderToggle = () => {
    setSelectedVehicles([]);
    setIsBulkOrder((prev) => !prev);
    setBulkTirePrice("");
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a car service"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.inputText}
        editable={levellogin === "individual"}
      />

      <View style={styles.card}>
        <Text style={styles.pageTitle}>Book A Service</Text>
        {levellogin === "individual" && (
          <Text style={styles.sectionTitle}>Select Vehicle</Text>
        )}
        {levellogin === "individual" && filteredVehicles.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            style={{ height: hp("38%") }}
          >
            {filteredVehicles.map((vehicle) => (
              <View key={vehicle._id} style={{ marginBottom: hp("2%") }}>
                <TouchableOpacity
                  disabled={false}
                  onPress={() => toggleVehicleSelection(vehicle._id)}
                  style={[
                    styles.vehicleCard,
                    selectedVehicles.find((v) => v._id === vehicle._id) &&
                      styles.selectedVehicle,
                  ]}
                >
                  <VehicleCard
                    model={vehicle.vehicleModel}
                    registrationNumber={vehicle.registrationNumber}
                    vehicleType={vehicle.vehicleType}
                    image={
                      vehicle.image ||
                      require("../../../assets/Vehicle/car.png")
                    }
                    dontNavigate={true}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {levellogin !== "individual" && (
          <>
            <View style={{ marginTop: hp("2%"), marginBottom: hp("2%") }}>
              <Text style={styles.sectionTitle}>Enter Bulk Number of Bulk Tyres</Text>
              <View style={styles.underlineInput}>
                <TextInput
                  style={{
                    marginLeft: wp("0%"),
                    fontSize: wp("4%"),
                    color: "#000",
                    fontFamily: "poppins",
                  }}
                  placeholder="Enter price"
                  keyboardType="numeric"
                  value={bulkTirePrice}
                  onChangeText={setBulkTirePrice}
                />
              </View>
            </View>
          </>
        )}
      </View>

      <View ref={addressRef} style={{ marginTop: hp("1.5%") }}>
        <BookingAddress
          selectedVehicles={
            levellogin === "individual"
              ? selectedVehicles.map((vehicle) => ({
                  id: vehicle._id,
                  registrationNumber: vehicle.registrationNumber,
                  vehicleName: vehicle.vehicleModel,
                }))
              : []
          }
          isBulkOrder={levellogin !== "individual"}
          bulkTirePrice={levellogin !== "individual" ? bulkTirePrice : undefined}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ScrollView: {
    marginBottom: hp("2%"),
    marginTop: hp("4%"),
    zIndex: 1,
  },
  container: {
    backgroundColor: "#F4F9F8",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("5%"),
    marginTop: hp("14%"),
    marginBottom: hp("0.2%"),
    zIndex: 1,
  },
  searchbar: {
    zIndex: 1,
    borderRadius: 30,
    marginBottom: 16,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#DADADA",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputText: {
    fontFamily: "poppins",
    fontSize: wp("4%"),
    color: "#000",
  },
  card: {
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: wp("2%"),
    padding: wp("4%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    // marginBottom: hp("11%"),
    elevation: 3,
  },
  pageTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: hp("2%"),
    fontFamily: "poppins",
  },
  sectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  subSectionTitle: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#007bff",
    marginTop: hp("1.5%"),
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    marginBottom: hp("2%"),
    fontFamily: "poppins",
    color: "#000",
  },
  confirmButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginTop: hp("1%"),
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
  vehicleCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    // height:hp("5%"),
    borderColor: "#ccc",
  },
  selectedVehicle: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  bulkButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginTop: hp("4%"),
    marginBottom: hp("2%"),
  },
  bulkButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
  },
  noVehiclesText: {
    fontSize: wp("4%"),
    color: "#666",
    textAlign: "center",
    marginVertical: hp("2%"),
  },
});

export default BookServicePage;
