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

const AddVehiclePage = () => {
  const [regNo, setRegNo] = useState("");
  const [autofill, setAutofill] = useState(false);
  const [vehicleType, setVehicleType] = useState("");
  const [model, setModel] = useState("");
  const [servicesDone, setServicesDone] = useState("");

  const handleSave = () => {
    console.log({
      regNo,
      autofill,
      vehicleType,
      model,
      servicesDone,
    });
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
    flex: 1,
    width: wp("100%"),
  },
  middleSection: {
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
  },
  label: {
    fontSize: wp("4%"),
    color: "#666",
    marginTop: hp("2%"),
    marginBottom: hp("0.5%"),
  },
  blueLabel: {
    fontSize: wp("4%"),
    color: "#007bff",
    marginTop: hp("2%"),
    marginBottom: hp("0.5%"),
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    fontSize: wp("4%"),
    paddingVertical: hp("1%"),
    marginBottom: hp("1%"),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  checkboxLabel: {
    fontSize: wp("3.8%"),
    color: "#666",
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
  },
  radioLabelSelected: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    width: wp("25%"),
    padding: hp("1%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    marginTop: hp("4.5%"),
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: wp("6"),
    fontWeight: "bold",
  },
  scrollContainer: {
    flexGrow: 1,
  },
});

export default AddVehiclePage;
