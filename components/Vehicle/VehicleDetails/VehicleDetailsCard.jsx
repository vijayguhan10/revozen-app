import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const VehicleDetailsCard = ({ vehicle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.modelTitle}>{vehicle.vehicleModel}</Text>
      <Image source={require("../../../assets/Vehicle/car.png")} style={styles.vehicleImage} />
      <View style={styles.detailsContainer}>
        <View style={styles.labelsColumn}>
          <Text style={styles.label}>Vehicle Model</Text>
          <Text style={styles.label}>Vehicle Type</Text>
          <Text style={styles.label}>Reg. Number</Text>
          <Text style={styles.label}>Services Done</Text>
        </View>

        <View style={styles.valuesColumn}>
          <Text style={styles.value}>{vehicle.vehicleModel}</Text>
          <Text style={styles.value}>{vehicle.vehicleType}</Text>
          <Text style={styles.value}>{vehicle.registrationNumber}</Text>
          <Text style={styles.value}>{vehicle.servicesDone}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    borderWidth: 1,
    borderColor: "#007bff",
    width: wp("90%"),  // Set a specific width
    alignSelf: "center",
    marginTop: hp("25%"),
    zIndex: 1
  },
  modelTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "poppins",
    marginBottom: hp("2%")
  },
  vehicleImage: {
    width: wp("50%"),
    height: hp("20%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp("2%"),
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  labelsColumn: {
    flex: 1,
    paddingRight: wp("2%")
  },
  valuesColumn: {
    flex: 1,
    alignItems: "flex-end"
  },
  label: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginBottom: hp("2%"),
    fontFamily: "poppins",
  },
  value: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("2%"),
    fontFamily: "poppins",
    textAlign: "right"
  },
});

export default VehicleDetailsCard;
