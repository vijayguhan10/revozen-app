import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// const upcomingIcon = require("../../../assets/ServiceHistory/upcoming.png");
// const historyIcon = require("../../../assets/ServiceHistory/finished.png");
const ServiceCard = ({ data, variant }) => {
  let backgroundColor = "#e6f0ff"; // default to upcoming (blue)
  let icon = require("../../../assets/ServiceHistory/upcoming.png");

  switch (variant) {
    case "paymentpending":
      backgroundColor = "#fff3e0"; // light orange
      icon = require("../../../assets/ServiceHistory/upcoming.png");
      break;
    case "completed":
      backgroundColor = "#e0f7e9"; // light green
      icon = require("../../../assets/ServiceHistory/upcoming.png");
      break;
    case "issues":
      backgroundColor = "#ffebee"; // light red
      icon = require("../../../assets/ServiceHistory/upcoming.png");
      break;
    case "upcoming":
    default:
      backgroundColor = "#e6f0ff"; // light blue
      icon = require("../../../assets/ServiceHistory/upcoming.png");
      break;
  }

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <Image source={icon} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.serviceType}>{data.type || "General Service"}</Text>
        <Text style={styles.serviceDetail}>{data.date}</Text>
        <Text style={styles.vehicleName}>{data.vehicle || "Vehicle Name"}</Text>
      </View>
      <Text style={styles.time}>{data.time}</Text>
    </View>
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
