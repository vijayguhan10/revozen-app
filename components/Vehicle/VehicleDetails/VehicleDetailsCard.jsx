import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const VehicledetailsCard = ({ vehicle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.modelTitle}>{vehicle.model}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.labelsColumn}>
          <Text style={styles.label}>Vehicle Model</Text>
          <Text style={styles.label}>Valide Manufacturer</Text>
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
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  modelTitle: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("2%"),
    textAlign: "center",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  value: {
    fontSize: wp("3.5%"),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1.5%"),
  },
});

export default VehicleDetailsCard;
