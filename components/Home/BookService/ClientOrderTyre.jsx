import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import api from "../../../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClientOrderTyre = () => {
  const API_URL = api.API_URL;
  const [tyreDetails, setTyreDetails] = useState({
    numberOfTyres: "",
    tyreBrand: "",
    tyreModel: "",
    tyreSize: "",
  });
  const [tyreData, setTyreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const brands = [...new Set(tyreData.map((tyre) => tyre.brand))];

  const models = tyreData
    .filter((tyre) => tyre.brand === tyreDetails.tyreBrand)
    .map((tyre) => tyre.model);

  const sizes = tyreData.reduce((acc, tyre) => {
    tyre.stock.forEach((item) => {
      if (!acc.includes(item.size)) {
        acc.push(item.size);
      }
    });
    return acc;
  }, []);

  useEffect(() => {
    const initialize = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (token) fetchTyreData();
  }, [token]);

  const fetchTyreData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/admin/addtyre/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTyreData(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tyre data:", err);
      setError("Failed to load tyre data. Please try again.");
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "tyreBrand") {
      setTyreDetails({
        ...tyreDetails,
        [field]: value,
        tyreModel: "",
        tyreSize: "",
      });
    } 
    else if (field === "tyreModel") {
      setTyreDetails({
        ...tyreDetails,
        [field]: value,
        tyreSize: "",
      });
    } 
    else {
      setTyreDetails({
        ...tyreDetails,
        [field]: value,
      });
    }
  };

  const handleContinue = () => {
    console.log("Tyre details:", tyreDetails);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4169E1" />
        <Text style={styles.loadingText}>Loading tyre data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchTyreData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tyreDetails.tyreBrand}
                onValueChange={(value) => handleInputChange("tyreBrand", value)}
                style={styles.picker}
                dropdownIconColor="#555"
              >
                <Picker.Item 
                  label="Select Tyre Brand" 
                  value="" 
                  style={{fontWeight: 'bold', fontSize: wp("4.2%")}} 
                />
                {brands.map((brand) => (
                  <Picker.Item key={brand} label={brand} value={brand} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="cube-outline" size={24} color="#FF6B00" />
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tyreDetails.tyreModel}
                onValueChange={(value) => handleInputChange("tyreModel", value)}
                style={styles.picker}
                enabled={!!tyreDetails.tyreBrand}
                dropdownIconColor="#555"
              >
                <Picker.Item 
                  label="Select Tyre Model" 
                  value="" 
                  style={{fontWeight: 'bold', fontSize: wp("4.2%")}} 
                />
                {models.map((model) => (
                  <Picker.Item key={model} label={model} value={model} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="resize-outline" size={24} color="#FF6B00" />
            </View>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tyreDetails.tyreSize}
                onValueChange={(value) => handleInputChange("tyreSize", value)}
                style={styles.picker}
                dropdownIconColor="#555"
              >
                <Picker.Item 
                  label="Select Tyre Size" 
                  value="" 
                  style={{fontWeight: 'bold', fontSize: wp("4.2%")}} 
                />
                {sizes.map((size) => (
                  <Picker.Item key={size} label={size} value={size} />
                ))}
              </Picker>
            </View>
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
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("50%"),
  },
  loadingText: {
    marginTop: hp("2%"),
    fontSize: wp("4%"),
    color: "#555",
    fontFamily: "poppins",
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: hp("50%"),
  },
  errorText: {
    fontSize: wp("4%"),
    color: "#ff0000",
    marginBottom: hp("2%"),
    fontFamily: "poppins",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#4169E1",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4%"),
    fontFamily: "poppins",
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
  pickerContainer: {
    flex: 1,
  },
  picker: {
    color: "#555",
    fontFamily: "poppins",
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
