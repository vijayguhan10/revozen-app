import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const orangeColor = "#ff6600";

const VehicleCard = ({ model, registrationNumber, image, index, vehicleType, onPress }) => {
  const isOrangeBackground = index % 2 !== 0;

  return (

        <View
          style={[
            styles.card,
            isOrangeBackground
              ? { backgroundColor: orangeColor, borderColor: orangeColor }
              : { borderColor: orangeColor, backgroundColor: "#fff" },
          ]}
        >
          <View style={styles.cardContent}>
            <Text
              style={[styles.model, isOrangeBackground && { color: "#fff" }]}
            >
              {model}
            </Text>
            <Text
              style={[styles.registrationNumber, 
                isOrangeBackground 
                  ? { color: "#FFEB3B" } 
                  : { color: "#007bff" }]}
            >
              {registrationNumber}
            </Text>
          </View>
          <Image source={image} style={styles.image} />
        </View>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: wp("5%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
    borderWidth: 2,
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-start",
    height: hp("12%"),
  },
  model: {
    fontSize: wp("5%"),
    fontWeight: "700",
    color: "#333",
    paddingTop: hp("1%"),
    paddingLeft: wp("1%"),
    fontFamily: "poppins",
  },
  registrationNumber: {
    fontSize: wp("3.5%"),
    fontWeight: "500",
    color: "#333333",
    paddingLeft: wp("1%"),
    fontFamily: "poppins",
    marginTop: hp("0.5%"),
  },
  image: {
    width: wp("40%"),
    height: hp("12%"),
    borderRadius: wp("2%"),
    resizeMode: "contain",
  },
});

export default VehicleCard;
