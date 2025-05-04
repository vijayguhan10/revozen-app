import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../env.json";
import { useNavigation } from "@react-navigation/native";
const BookingAddress = ({ selectedVehicles, isBulkOrder }) => {
  const navigation = useNavigation();
  const API_URL = api.API_URL;
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [token, SetToken] = useState("");
  const [modalAnim] = useState(new Animated.Value(0));
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      SetToken(storedToken);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (token) fetchAddresses();
  }, [token]);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`${API_URL}/address/getall`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(res.data || []);
    } catch (err) {
      console.error("Error fetching addresses", err);
    }
  };

  const handleEdit = (address) => {
    setNewAddress({ ...address });
    setEditAddressId(address._id);
    setIsEdit(true);
    openModal();
  };


  const handleConfirm = async () => {
    const selectedAddress = addresses.find((addr) => addr._id === selectedLocation);
    
    const filteredAddress = selectedAddress ? {
      _id: selectedAddress._id, 
      street: selectedAddress.street,
      city: selectedAddress.city,
      state: selectedAddress.state,
      postalCode: selectedAddress.postalCode,
      country: selectedAddress.country
    } : null;
    
    navigation.navigate("clientordertyre", { 
      selectedVehicles, 
      isBulkOrder,
      selectedAddress: filteredAddress 
    });
  };

  const openModal = () => {
    setShowModal(true);
    Animated.timing(modalAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowModal(false));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        <Ionicons name="location" /> Choose Your Delivery Address
      </Text>

      <ScrollView
        nestedScrollEnabled={true}
        style={{ maxHeight: hp("30%") }}
        showsVerticalScrollIndicator
      >
        <View
          style={{
            borderColor: "#rgba(0, 0, 0, 0.48)",
            borderRadius: hp("2%"),
            borderWidth: 1,
          }}
        >
          {addresses.map((addr) => (
            <View key={addr._id} style={styles.cardWrapper}>
              <TouchableOpacity
                style={[
                  styles.addressCard,
                  selectedLocation === addr._id && styles.selectedCard,
                ]}
                onPress={() => setSelectedLocation(addr._id)}
              >
                <View style={styles.radioButton}>
                  {selectedLocation === addr._id && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>
                    <Ionicons name="location-outline" size={18} color="#333" />{" "}
                    {addr.street}
                  </Text>
                  <Text style={styles.cardText}>
                    {addr.city}, {addr.state} - {addr.postalCode}
                  </Text>
                  <Text style={styles.cardText}>{addr.country}</Text>
                </View>
                <TouchableOpacity onPress={() => handleEdit(addr)}>
                  <Ionicons name="create-outline" size={22} color="#007bff" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <Ionicons name="add-circle-outline" size={20} color="#007bff" />
        <Text style={styles.addButtonText}>Add New Address</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmText}>CONFIRM LOCATION</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: modalAnim }] },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEdit ? "Edit Address" : "New Address"}
              </Text>
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
              {[
                { key: "street", icon: "home-outline", label: "Street" },
                { key: "city", icon: "business-outline", label: "City" },
                { key: "state", icon: "flag-outline", label: "State" },
                {
                  key: "postalCode",
                  icon: "mail-outline",
                  label: "Postal Code",
                },
                { key: "country", icon: "globe-outline", label: "Country" },
              ].map(({ key, icon, label }) => (
                <View style={styles.inputGroup} key={key}>
                  <Ionicons name={icon} size={20} color="#444" />
                  <TextInput
                    style={styles.input}
                    placeholder={label}
                    keyboardType={key === "postalCode" ? "numeric" : "default"}
                    placeholderTextColor="#999"
                    value={newAddress[key]}
                    onChangeText={(text) =>
                      setNewAddress((prev) => ({ ...prev, [key]: text }))
                    }
                  />
                </View>
              ))}

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#4CAF50" }]}
                onPress={handleAddOrUpdateAddress}
              >
                <Text style={styles.modalBtnText}>
                  {isEdit ? "Update Address" : "Save Address"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#E53935" }]}
                onPress={closeModal}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: wp("4.7%"),
    fontWeight: "bold",
    marginBottom: hp("3%"),
    fontFamily: "poppins",
  },
  container: {
    padding: wp("4%"),
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: wp("2%"),
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 9,
  },
  cardWrapper: {
    padding: wp("1%"),
    marginBottom: hp("1.5%"),
  },
  addressCard: {
    fontFamily: "poppins",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: wp("4%"),
    borderRadius: 12,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // Elevation for Android
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#007bff",
    backgroundColor: "#e6f0ff",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#007bff",
    backgroundColor: "#e6f0ff",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp("3%"),
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007bff",
  },
  cardTitle: {
    fontSize: wp("4.2%"),
    fontWeight: "bold",
  },
  cardText: {
    fontFamily: "poppins",
    fontSize: wp("3.6%"),
    color: "#555",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  addButtonText: {
    fontSize: wp("4.2%"),
    color: "#007bff",
    marginLeft: wp("1%"),
  },
  confirmBtn: {
    backgroundColor: "#007bff",
    padding: wp("4%"),
    borderRadius: 12,
    marginTop: hp("3%"),
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: wp("4.2%"),
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  modalBtn: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  modalBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default BookingAddress;
