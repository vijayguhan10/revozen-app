import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

const ClientOrderTyre = () => {
  const [tyreDetails, setTyreDetails] = useState({
    numberOfTyres: "",
    tyreBrand: "",
    tyreModel: "",
    tyreSize: "",
  });

  const handleInputChange = (field, value) => {
    setTyreDetails({
      ...tyreDetails,
      [field]: value,
    });
  };

  const handleContinue = () => {
    // Navigate to next page or process the tyre order
    console.log("Tyre details:", tyreDetails);
    // You can add navigation logic here
    // navigation.navigate("NextScreen", { tyreDetails });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: hp("2%") }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.pageTitle}>Tyre Details</Text>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="apps-outline" size={24} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Number of Tyres"
              value={tyreDetails.numberOfTyres}
              onChangeText={(text) => handleInputChange("numberOfTyres", text)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="disc-outline" size={24} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Tyre Brand (if Preferred)"
              value={tyreDetails.tyreBrand}
              onChangeText={(text) => handleInputChange("tyreBrand", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="cube-outline" size={24} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Tyre Model"
              value={tyreDetails.tyreModel}
              onChangeText={(text) => handleInputChange("tyreModel", text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="resize-outline" size={24} color="#FF6B00" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter Tyre Size"
              value={tyreDetails.tyreSize}
              onChangeText={(text) => handleInputChange("tyreSize", text)}
            />
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: hp("2%"),
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
  card: {
    zIndex: 1,
    backgroundColor: "white",
    borderRadius: wp("4%"),
    padding: wp("6%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  pageTitle: {
    fontSize: wp("6%"),
    fontWeight: "bold",
    color: "#4169E1",
    marginBottom: hp("4%"),
    fontFamily: "poppins",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("3%"),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: hp("1%"),
  },
  iconContainer: {
    marginRight: wp("3%"),
  },
  input: {
    flex: 1,
    fontSize: wp("4%"),
    fontFamily: "poppins",
    color: "#555",
  },
  continueButton: {
    backgroundColor: "#4169E1",
    paddingVertical: hp("2%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginTop: hp("4%"),
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
    fontFamily: "poppins",
  },
});

export default ClientOrderTyre;
