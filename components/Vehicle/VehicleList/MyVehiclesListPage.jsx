import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import VehicleListCard from "./VehicleListCard";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../../../env.json"

const MyVehiclesListPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVehicles = async () => {
      const token = await AsyncStorage.getItem("token");
      try {
        const response = await axios.get(
          `${API_URL}/client/vehicle/getallvehicles`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVehicles(response.data); 
      } catch (error) {
        console.log(
          "Error fetching vehicles:",
          error.response?.data || error.message
        );
      }
    };

    fetchVehicles();
  }, []);

  const handleAddVehicle = () => {
    navigation.navigate("AddVehicle");
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleSection}>
        <View style={styles.vehicleSectionContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>My Vehicles</Text>
            <TouchableOpacity onPress={handleAddVehicle}>
              <Ionicons
                name="add-circle-outline"
                size={wp("7%")}
                color="#007bff"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.vehicleSection}>
              {vehicles.map((vehicle, index) => (
                <VehicleListCard
                  key={vehicle._id}
                  model={vehicle.vehicleModel}
                  registrationNumber={vehicle.registrationNumber}
                  vehicleType={vehicle.vehicleType}
                  image={require("../../../assets/Vehicle/car.png")}
                  index={index}
                  onPress={() => navigation.navigate("VehicleDetails", { vehicle })}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    width: "100%",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  sectionTitle: {
    fontSize: wp("5%"),
    fontWeight: "600",
    color: "#007bff",
    fontFamily: "poppins",
  },
  scrollContainer: {
    height: hp("65%"),
  },
  vehicleSection: {
    marginBottom: hp("2%"),
  },
});

export default MyVehiclesListPage;
