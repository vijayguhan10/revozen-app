import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const ServiceCard = ({ item, variant }) => {
  const navigation = useNavigation();
  let backgroundColor = "#e6f0ff";
  let icon;

  switch (variant) {
    case "paymentpending":
      backgroundColor = "#fff3e0";
      icon = require("../../../assets/tyre-exchange.png");
      break;
    case "completed":
      backgroundColor = "#e0f7e7";
      icon = require("../../../assets/ServiceHistory/finished.png");
      break;
    case "issues":
      backgroundColor = "#ffebee";
      icon = require("../../../assets/icon.png");
      break;
    case "upcoming":
    default:
      backgroundColor = "#e6f0ff";
      icon = require("../../../assets/ServiceHistory/upcoming.png");
      break;
  }

  // Process vehicle names directly in the component
  const getVehicleNames = () => {
    let vehicleNames = [];
    if (item.orderinfo?.orderItems) {
      item.orderinfo.orderItems.forEach((orderItem) => {
        if (orderItem.vehicleId?.registrationNumber) {
          vehicleNames.push(orderItem.vehicleId.registrationNumber);
        }
      });
    }
    return vehicleNames.length > 0 ? vehicleNames.join(", ") : "No Vehicle Selected";
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate("ServiceHistoryDetails", { service: item })}
      activeOpacity={0.7}
    >
      <View style={[styles.card, { backgroundColor }]}>
        <Image source={icon} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.serviceType}>Tyre Service</Text>
          <Text style={styles.serviceDetail}>{item.date}</Text>
          <Text style={styles.vehicleName}>{getVehicleNames()}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: wp("12%"),
    height: wp("12%"),
    resizeMode: "contain",
    marginRight: wp("4%"),
  },
  content: {
    flex: 1,
  },
  serviceType: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("0.5%"),
    fontFamily: "poppins",
  },
  serviceDetail: {
    fontSize: wp("3.5%"),
    color: "#666",
    fontFamily: "poppins",
  },
  vehicleName: {
    fontSize: wp("3.5%"),
    color: "#666",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  time: {
    position: "absolute",
    right: wp("4%"),
    fontSize: wp("3.5%"),
    color: "#333",
    fontFamily: "poppins",
  },
});

export default ServiceCard;
