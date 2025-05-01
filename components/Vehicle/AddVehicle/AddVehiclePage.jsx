import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import api from "../../../env.json";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AddVehiclePage = () => {
  const API_URL = api.API_URL;
  const [regNo, setRegNo] = useState("");
  const [autofill, setAutofill] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [servicesDone, setServicesDone] = useState("");
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token : ", token);
    const data = {
      registrationNumber: regNo,
      vehicleType,
      vehicleModel: model,
    };

    try {
      console.log("token : ", token);
      const response = await axios.post(`${API_URL}/client/vehicle/addvehicle`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Vehicle added:", response.data);
    } catch (error) {
      console.log(
        "Error adding vehicle:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.middleSection}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Add Vehicle</Text>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp("4%") }}
          >
            <Text style={styles.blueLabel}>Registration Number</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Enter Registration Number"
              value={regNo}
              onChangeText={setRegNo}
              placeholderTextColor="#aaa"
            />

            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxLabel}>
                Autofill from Registration Number
              </Text>
            </View>

            <Text style={styles.blueLabel}>Vehicle Details</Text>
            <View style={styles.radioGroup}>
              {["Bike", "Car", "Commercial"].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.radioButton,
                    vehicleType === type && styles.radioButtonSelected,
                  ]}
                  onPress={() => setVehicleType(type)}
                >
                  <Text
                    style={[
                      styles.radioLabel,
                      vehicleType === type && styles.radioLabelSelected,
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Vehicle Model</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Enter Vehicle Model"
              value={model}
              onChangeText={setModel}
              placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>No. of Services Done</Text>
            <TextInput
              style={styles.underlineInput}
              placeholder="Ex: 2, if 2 services are completed"
              value={servicesDone}
              onChangeText={setServicesDone}
              keyboardType="numeric"
              placeholderTextColor="#aaa"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    flex: 1,
    width: wp("100%"),
  },
  middleSection: {
    zindex: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: wp("5%"),
    padding: wp("5%"),
    height: hp("75%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
    marginTop: hp("2%"),
  },
  sectionTitle: {
    fontSize: wp("6%"),
    fontWeight: "700",
    color: "#007bff",
    marginBottom: hp("2%"),
    textAlign: "center",
    fontFamily: "poppins",
  },
  label: {
    fontSize: wp("4%"),
    color: "#666",
    marginTop: hp("2%"),
    marginBottom: hp("0.5%"),
    fontFamily: "poppins",
  },
  blueLabel: {
    fontSize: wp("4%"),
    color: "#007bff",
    marginTop: hp("2%"),
    marginBottom: hp("0.5%"),
    fontFamily: "poppins",
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    marginBottom: hp("1%"),
    fontFamily: "poppins",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  checkboxLabel: {
    fontSize: wp("3.8%"),
    color: "#666",
    fontFamily: "poppins",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },
  radioButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("2%"),
    paddingVertical: hp("1%"),
    paddingHorizontal: wp("4%"),
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  radioLabel: {
    fontSize: wp("4%"),
    color: "#333",
    fontFamily: "poppins",
  },
  radioLabelSelected: {
    color: "#fff",
    fontFamily: "poppins",
  },
  saveButton: {
    backgroundColor: "#007bff",
    width: wp("25%"),
    padding: hp("1%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    marginTop: hp("2%"),
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: wp("6%"),
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default AddVehiclePage;
