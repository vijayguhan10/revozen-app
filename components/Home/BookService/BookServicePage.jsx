import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BookingAddress from "./BookingAddress";
import VehicleCard from "../../Vehicle/VehicleList/VehicleListCard";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import api from "../../../env.json";

const BookServicePage = () => {
  const API_URL = api.API_URL;
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);
  const [isBulkOrder, setIsBulkOrder] = useState(false);

  const scrollViewRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_URL}/client/vehicle/getallvehicles`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVehicles(response.data);
        setFilteredVehicles(response.data);
      } catch (error) {
        console.log(
          "Error fetching vehicles:",
          error.response?.data || error.message
        );
      }
    };
    fetchVehicles();
  }, []);

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
    console.log("Bulk order  : ", isBulkOrder);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search for a car service"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.inputText}
      />

      <View style={styles.card}>
        <Text style={styles.pageTitle}>Book A Service</Text>
        <Text style={styles.sectionTitle}>Select Vehicle</Text>

        {filteredVehicles.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={true}
            nestedScrollEnabled={true}
            style={{ height: hp("38%") }}
          >
            {filteredVehicles.map((vehicle) => (
              <View key={vehicle._id} style={{ marginBottom: hp("2%") }}>
                <TouchableOpacity
                  disabled={isBulkOrder}
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
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <TouchableOpacity
          onPress={handleBulkOrderToggle}
          style={styles.bulkButton}
        >
          <Text style={styles.bulkButtonText}>
            {isBulkOrder ? "Cancel Bulk Tire Order" : "Bulk Tire Order"}
          </Text>
        </TouchableOpacity>
      </View>

      <View ref={addressRef} style={{ marginTop: hp("1.5%") }}>
        <BookingAddress
          selectedVehicles={isBulkOrder ? [] : selectedVehicles}
          isBulkOrder={isBulkOrder}
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
