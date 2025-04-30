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
import VehicleListCard from "./VehicleListCard";
import { Ionicons } from "@expo/vector-icons"; // You can also use MaterialCommunityIcons or FontAwesome
import { useNavigation } from "@react-navigation/native";
const vehicleData = [
  { id: 1, model: "Baleno", image: require("../../../assets/Vehicle/car.png") },
  { id: 2, model: "Swift", image: require("../../../assets/Vehicle/car.png") },
  { id: 3, model: "XUV700", image: require("../../../assets/Vehicle/car.png") },
  { id: 4, model: "Creta", image: require("../../../assets/Vehicle/car.png") },
];

const MyVehiclesListPage = () => {
  const navigation = useNavigation();
  const handleAddVehicle = () => {
    navigation.navigate("AddVehicle"); // Replace with your actual route name
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
              {vehicleData.map((vehicle, index) => (
                <VehicleListCard
                  key={vehicle.id}
                  model={vehicle.model}
                  image={vehicle.image}
                  index={index}
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
  },
  scrollContainer: {
    height: hp("65%"),
  },
  vehicleSection: {
    marginBottom: hp("2%"),
  },
});

export default MyVehiclesListPage;
