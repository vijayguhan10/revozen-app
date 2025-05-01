import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const VehicleDetailsCard = ({ vehicle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.modelTitle}>{vehicle.model}</Text>
      {vehicle.image && (
        <Image source={vehicle.image} style={styles.vehicleImage} />
      )}
      <View style={styles.detailsContainer}>
        <View style={styles.labelsColumn}>
          <Text style={styles.label}>Vehicle Model</Text>
          <Text style={styles.label}>Valid Manufacturer</Text>
          <Text style={styles.label}>Reg. No</Text>
          <Text style={styles.label}>Type Size</Text>
          <Text style={styles.label}>Body Style</Text>
          <Text style={styles.label}>Cargo Volume</Text>
          <Text style={styles.label}>Engine Configuration</Text>
          <Text style={styles.label}>No. Of services</Text>
          <Text style={styles.label}>Last Service</Text>
        </View>

        <View style={styles.valuesColumn}>
          <Text style={styles.value}>{vehicle.model}</Text>
          <Text style={styles.value}>{vehicle.manufacturer}</Text>
          <Text style={styles.value}>{vehicle.regNo}</Text>
          <Text style={styles.value}>{vehicle.typeSize}</Text>
          <Text style={styles.value}>{vehicle.bodyStyle}</Text>
          <Text style={styles.value}>{vehicle.cargoVolume}</Text>
          <Text style={styles.value}>{vehicle.engineConfig}</Text>
          <Text style={styles.value}>{vehicle.servicesCount}</Text>
          <Text style={styles.value}>{vehicle.lastService}</Text>
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
  },
  modelTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    fontFamily: "poppins",
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
    // height: wp("100%"),
  },
  labelsColumn: {
    width: "50%",
  },
  valuesColumn: {
    width: "50%",
    alignItems: "flex-end",
  },
  label: {
    fontSize: wp("3.5%"),
    color: "#666",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  value: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
});

export default VehicleDetailsCard;
