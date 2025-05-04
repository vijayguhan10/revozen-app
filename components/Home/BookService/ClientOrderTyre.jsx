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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import api from "../../../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const ClientOrderTyre = () => {
  const API_URL = api.API_URL;

  const route = useRoute();
  const navigation = useNavigation();

  const { selectedVehicles, isBulkOrder, selectedAddress } = route.params || {};

  console.log("\nClient Order Tyre Selected vehicles:", selectedVehicles);
  console.log("\nClient Order Tyre Is Bulk Order:", isBulkOrder);
  console.log("\nClient Order Tyre Selected Address:", selectedAddress);
  const initialTyreDetails = {
    numberOfTyres: "",
    tyreBrand: "",
    tyreModel: "",
    tyreSize: "",
    tyrePrice: "",
    tyreId: "",
  };

  const [tyreOrders, setTyreOrders] = useState([initialTyreDetails]);
  const [tyreData, setTyreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");

  const brands = [...new Set(tyreData.map((tyre) => tyre.brand))];

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

  const handleInputChange = (index, field, value) => {
    const updatedOrders = [...tyreOrders];

    if (field === "tyreBrand") {
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
        tyreModel: "",
        tyreSize: "",
        tyreId: "",
      };
    } else if (field === "tyreModel") {
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
        tyreSize: "",
        tyreId: "",
      };
    } else if (field === "tyreSize") {
      const selectedTyre = tyreData.find(
        (tyre) =>
          tyre.brand === updatedOrders[index].tyreBrand &&
          tyre.model === updatedOrders[index].tyreModel &&
          !tyre.deleted
      );

      if (selectedTyre) {
        const sizeData = selectedTyre.stock.find((item) => item.size === value);
        updatedOrders[index] = {
          ...updatedOrders[index],
          [field]: value,
          tyrePrice: sizeData ? sizeData.price : "",
          tyreId: selectedTyre._id || "",
        };
      } else {
        updatedOrders[index] = {
          ...updatedOrders[index],
          [field]: value,
        };
      }
    } else {
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
      };
    }

    setTyreOrders(updatedOrders);
  };

  const addNewOrder = () => {
    setTyreOrders([...tyreOrders, initialTyreDetails]);
  };

  const removeOrder = (index) => {
    if (tyreOrders.length > 1) {
      const updatedOrders = tyreOrders.filter((_, i) => i !== index);
      setTyreOrders(updatedOrders);
    }
  };

  const isFormValid = () => {
    return tyreOrders.every((order) => {
      const numTyres = parseInt(order.numberOfTyres);
      const isValidNumber = !isNaN(numTyres) && numTyres > 0;

      return (
        isValidNumber &&
        order.tyreBrand !== "" &&
        order.tyreModel !== "" &&
        order.tyreSize !== ""
      );
    });
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

  const handleContinue = () => {
    navigation.navigate("Appointment", {
      selectedVehicles,
      isBulkOrder,
      tyreOrders,
      selectedAddress,
    });
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

          {tyreOrders.map((order, index) => (
            <View key={index} style={styles.orderContainer}>
              {index > 0 && (
                <View style={styles.orderHeader}>
                  <Text style={styles.orderTitle}>Order {index + 1}</Text>
                  <TouchableOpacity onPress={() => removeOrder(index)}>
                    <Ionicons name="close-circle" size={24} color="#FF6B00" />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="apps-outline" size={24} color="#FF6B00" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Number of Tyres"
                  value={order.numberOfTyres}
                  onChangeText={(text) =>
                    handleInputChange(index, "numberOfTyres", text)
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Ionicons name="disc-outline" size={24} color="#FF6B00" />
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={order.tyreBrand}
                    onValueChange={(value) =>
                      handleInputChange(index, "tyreBrand", value)
                    }
                    style={styles.picker}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item
                      label="Select Tyre Brand"
                      value=""
                      style={{ fontWeight: "bold", fontSize: wp("4.2%") }}
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
                    selectedValue={order.tyreModel}
                    onValueChange={(value) =>
                      handleInputChange(index, "tyreModel", value)
                    }
                    style={styles.picker}
                    enabled={!!order.tyreBrand}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item
                      label="Select Tyre Model"
                      value=""
                      style={{ fontWeight: "bold", fontSize: wp("4.2%") }}
                    />
                    {tyreData
                      .filter((tyre) => tyre.brand === order.tyreBrand)
                      .map((tyre) => (
                        <Picker.Item
                          key={tyre.model}
                          label={tyre.model}
                          value={tyre.model}
                        />
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
                    selectedValue={order.tyreSize}
                    onValueChange={(value) =>
                      handleInputChange(index, "tyreSize", value)
                    }
                    style={styles.picker}
                    dropdownIconColor="#555"
                  >
                    <Picker.Item
                      label="Select Tyre Size"
                      value=""
                      style={{ fontWeight: "bold", fontSize: wp("4.2%") }}
                    />
                    {tyreData
                      .filter(
                        (tyre) =>
                          tyre.brand === order.tyreBrand &&
                          tyre.model === order.tyreModel
                      )
                      .reduce((acc, tyre) => {
                        tyre.stock.forEach((item) => {
                          if (!acc.includes(item.size)) {
                            acc.push(item.size);
                          }
                        });
                        return acc;
                      }, [])
                      .map((size) => (
                        <Picker.Item key={size} label={size} value={size} />
                      ))}
                  </Picker>
                </View>
              </View>

              {index < tyreOrders.length - 1 && (
                <View style={styles.orderDivider} />
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addOrderButton} onPress={addNewOrder}>
            <Ionicons name="add-circle-outline" size={24} color="white" />
            <Text style={styles.addOrderButtonText}>Add New Order</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !isFormValid() && styles.disabledButton,
            ]}
            onPress={handleContinue}
            disabled={!isFormValid()}
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
    marginBottom: hp("10%"),
    zIndex: 1,
  },
  container: {
    backgroundColor: "#F4F9F8",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("3%"),
    marginTop: hp("12%"),
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
  orderContainer: {
    marginBottom: hp("2%"),
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    paddingBottom: hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderTitle: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    color: "#4169E1",
    fontFamily: "poppins",
  },
  orderDivider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: hp("2%"),
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
  addOrderButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  addOrderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4%"),
    fontFamily: "poppins",
    marginLeft: wp("2%"),
  },
  continueButton: {
    backgroundColor: "#4169E1",
    paddingVertical: hp("2%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginTop: hp("2%"),
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
    opacity: 0.7,
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"),
    fontFamily: "poppins",
  },
});

export default ClientOrderTyre;
