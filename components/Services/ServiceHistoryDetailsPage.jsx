import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ServiceHistoryDetailsPage = () => {
  const route = useRoute();
  const { service } = route.params || {};

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Extract relevant data from the service object
  const serviceDetails = {
    serviceType: "Tyre Service",
    vehicle: getVehicleInfo(service),
    status: service?.orderstatus || "Pending",
    paymentStatus: service?.paymentStatus || "Not specified",
    date: formatDate(service?.date),
    time: service?.time || "Not specified",
    customerInfo: getCustomerInfo(service),
    addressDetails: getAddressDetails(service),
    orderDetails: getOrderDetails(service),
    createdAt: formatDate(service?.createdAt),
  };

  // Function to extract vehicle information
  function getVehicleInfo(service) {
    if (!service?.orderinfo?.orderItems) return { name: "No Vehicle", details: [] };
    
    const vehicles = service.orderinfo.orderItems
      .filter(item => item.vehicleId)
      .map(item => ({
        regNumber: item.vehicleId.registrationNumber,
        model: item.vehicleId.vehicleModel,
        type: item.vehicleId.vehicleType,
        services: item.vehicleId.servicesDone || []
      }));
    
    return {
      name: vehicles.length > 0 ? 
        vehicles.map(v => v.regNumber).join(", ") : 
        "No Vehicle Selected",
      details: vehicles
    };
  }
  
  // Function to extract customer information
  function getCustomerInfo(service) {
    if (!service?.userId) return null;
    
    return {
      name: service.userId.name,
      email: service.userId.email
      // Removed phone field as requested
    };
  }
  
  // Function to extract address details
  function getAddressDetails(service) {
    if (!service?.addressId) return null;
    
    return {
      address: service.addressId.street || "", // Changed from address to street
      city: service.addressId.city || "",
      postcode: service.addressId.postalCode || "", // Changed from postcode to postalCode
      country: service.addressId.country || ""
    };
  }
  
  // Function to extract order details
  function getOrderDetails(service) {
    if (!service?.orderinfo?.orderItems) return [];
    
    return service.orderinfo.orderItems.map(item => {
      // Access tyre data correctly based on the API structure
      const tyre = item.tyre || {};
      // Find the correct price based on the selected size
      const sizeData = tyre.stock?.find(s => s.size === item.size);
      const price = sizeData?.price || 0;
      
      return {
        tyreName: tyre.model || "Not specified",
        tyreBrand: tyre.brand || "Not specified",
        // Use the price from the matching size in the stock array
        tyrePrice: parseFloat(price),
        size: item.size || "Not specified",
        quantity: parseInt(item.quantity || 0),
        vehicle: item.vehicleId?.registrationNumber || "No Vehicle",
        // Calculate total price correctly
        totalPrice: parseFloat(price) * parseInt(item.quantity || 0)
      };
    });
  }

  // Determine status colors
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'completed': return "#4CAF50";
      case 'pending': return "#FF9800";
      case 'cancelled': return "#F44336";
      case 'paid': return "#4CAF50";
      case 'unpaid': return "#F44336";
      default: return "#FF9800";
    }
  };

  const statusColor = getStatusColor(serviceDetails.status);
  const paymentStatusColor = getStatusColor(serviceDetails.paymentStatus);

  // Choose icon based on status
  const statusIcon = serviceDetails.status.toLowerCase() === "completed"
    ? require("../../assets/ServiceHistory/finished.png")
    : require("../../assets/ServiceHistory/upcoming.png");

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Header Section with Title and Status */}
        <View style={styles.headerSection}>
          <Text style={styles.pageTitle}>Service Details</Text>
          <View style={styles.statusBadgeContainer}>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusBadgeText}>{serviceDetails.status}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: paymentStatusColor, marginLeft: wp("2%") }]}>
              <Text style={styles.statusBadgeText}>{serviceDetails.paymentStatus}</Text>
            </View>
          </View>
        </View>

        {/* Service Type Header */}
        <View style={styles.serviceHeaderRow}>
          <Text style={styles.serviceTypeText}>
            {serviceDetails.serviceType}
          </Text>
          <Image source={statusIcon} style={styles.statusIcon} />
        </View>

        {/* Appointment Details Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={wp("5%")} color="#007bff" />
            <Text style={styles.sectionTitle}>Appointment Details</Text>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.labelsColumn}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.label}>Booked On:</Text>
            </View>
            <View style={styles.valuesColumn}>
              <Text style={[styles.value, { flexShrink: 1 }]}>{serviceDetails.date}</Text>
              <Text style={styles.value}>{serviceDetails.time}</Text>
              <Text style={styles.value}>{serviceDetails.createdAt}</Text>
            </View>
          </View>
        </View>

        {/* Vehicle Information Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Ionicons name="car-outline" size={wp("5%")} color="#007bff" />
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
          </View>
          {serviceDetails.vehicle.details.map((vehicle, index) => (
            <View key={index} style={styles.vehicleCard}>
              <Image 
                source={require("../../assets/Vehicle/car.png")} 
                style={styles.vehicleImage} 
              />
              <View style={styles.detailsContainer}>
                <View style={styles.labelsColumn}>
                  <Text style={styles.label}>Registration:</Text>
                  <Text style={styles.label}>Model:</Text>
                  <Text style={styles.label}>Type:</Text>
                </View>
                <View style={[styles.valuesColumn, { alignItems: 'flex-end' }]}>
                  <Text style={styles.value}>{vehicle.regNumber}</Text>
                  <Text style={styles.value}>{vehicle.model}</Text>
                  <Text style={styles.value}>{vehicle.type}</Text>
                </View>
              </View>
              {vehicle.services.length > 0 && (
                <View style={styles.servicesList}>
                  <Text style={styles.servicesTitle}>Previous Services:</Text>
                  {vehicle.services.map((service, idx) => (
                    <Text key={idx} style={styles.serviceItem}>
                      • {service}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Service Location Section */}
        {serviceDetails.addressDetails && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location-outline" size={wp("5%")} color="#007bff" />
              <Text style={styles.sectionTitle}>Service Location</Text>
            </View>
            <View style={styles.addressCard}>
              <Text style={styles.addressText}>{serviceDetails.addressDetails.address}</Text>
              <Text style={styles.addressText}>{serviceDetails.addressDetails.city}</Text>
              <Text style={styles.addressText}>{serviceDetails.addressDetails.postcode}</Text>
              <Text style={styles.addressText}>{serviceDetails.addressDetails.country}</Text>
            </View>
          </View>
        )}

        {/* Order Details Section */}
        {serviceDetails.orderDetails.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="cart-outline" size={wp("5%")} color="#007bff" />
              <Text style={styles.sectionTitle}>Order Details</Text>
            </View>
            {serviceDetails.orderDetails.map((order, index) => (
              <View key={index} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderTitle}>{order.tyreName}</Text>
                  <Text style={styles.orderBrand}>{order.tyreBrand}</Text>
                </View>
                <View style={styles.orderDetails}>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Size:</Text>
                    <Text style={styles.orderValue}>{order.size}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Quantity:</Text>
                    <Text style={styles.orderValue}>{order.quantity}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Price per unit:</Text>
                    <Text style={styles.orderValue}>₹{order.tyrePrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Vehicle:</Text>
                    <Text style={styles.orderValue}>{order.vehicle}</Text>
                  </View>
                </View>
                <View style={styles.orderTotal}>
                  <Text style={styles.orderTotalLabel}>Total:</Text>
                  <Text style={styles.orderTotalValue}>₹{order.totalPrice.toFixed(2)}</Text>
                </View>
              </View>
            ))}
            <View style={styles.grandTotal}>
              <Text style={styles.grandTotalLabel}>Grand Total:</Text>
              <Text style={styles.grandTotalValue}>
                ₹{serviceDetails.orderDetails.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
              </Text>
            </View>
          </View>
        )}

        {/* Customer Information Section */}
        {serviceDetails.customerInfo && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="person-outline" size={wp("5%")} color="#007bff" />
              <Text style={styles.sectionTitle}>Customer Information</Text>
            </View>
            <View style={styles.detailsContainer}>
              <View style={styles.labelsColumn}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.label}>Email:</Text>
              </View>
              <View style={[styles.valuesColumn, { alignItems: 'flex-end' }]}>
                <Text style={styles.value}>{serviceDetails.customerInfo.name}</Text>
                <Text style={[styles.value, { textAlign: 'right' }]} numberOfLines={1}>{serviceDetails.customerInfo.email}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="document-text-outline" size={wp("5%")} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.primaryButtonText}>View Invoice</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="help-circle-outline" size={wp("5%")} color="#007bff" style={styles.buttonIcon} />
            <Text style={styles.secondaryButtonText}>Get Support</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#F4F9F8",
    marginTop: hp("13%"),
    zIndex: 10,
  },
  container: {
    width: "100%",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("5%"),
    backgroundColor: "white",
    borderRadius: wp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.3%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("1%"),
    elevation: 3,
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.5%"),
  },
  pageTitle: {
    fontSize: wp("6%"), // Increased from 5% to 6%
    fontWeight: "bold",
    color: "#007bff",
    fontFamily: "poppins",
  },
  statusBadgeContainer: {
    flexDirection: "row",
  },
  statusBadge: {
    paddingHorizontal: wp("2%"),
    paddingVertical: hp("0.5%"),
    borderRadius: wp("1%"),
  },
  statusBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("3.5%"), // Increased from 3% to 3.5%
    fontFamily: "poppins",
  },
  serviceTypeCard: {
    backgroundColor: "#F8FBFF",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    borderWidth: 1,
    borderColor: "#D0E1F9",
  },
  serviceHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#D0E1F9",
    paddingBottom: hp("1%"),
    paddingHorizontal: wp("2%"),
    backgroundColor: "#F8FBFF",
    borderRadius: wp("2%"),
  },
  sectionContainer: {
    marginBottom: hp("2%"),
    backgroundColor: "white",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  serviceTypeText: {
    fontSize: wp("5%"), // Increased from 4.5% to 5%
    fontWeight: "bold",
    color: "#333",
    fontFamily: "poppins",
  },
  statusIcon: {
    width: wp("8%"),
    height: wp("8%"),
    resizeMode: "contain",
  },
  sectionContainer: {
    marginBottom: hp("2%"),
    backgroundColor: "white",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: hp("1%"),
  },
  sectionTitle: {
    fontSize: wp("4.5%"), // Increased from 4% to 4.5%
    fontWeight: "600",
    color: "#007bff",
    marginLeft: wp("2%"),
    fontFamily: "poppins",
  },
  detailsContainer: {
    flexDirection: "row",
    marginBottom: hp("1%"),
  },
  labelsColumn: {
    width: "40%",
  },
  valuesColumn: {
    width: "60%",
    alignItems: "flex-end", // Changed back to flex-end for right alignment
  },
  label: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    color: "#666",
    marginBottom: hp("1%"),
    fontFamily: "poppins",
  },
  value: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    fontWeight: "600",
    color: "#333",
    marginBottom: hp("1%"),
    fontFamily: "poppins",
  },
  vehicleCard: {
    backgroundColor: "#F0F8FF",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    marginBottom: hp("1%"),
  },
  vehicleImage: {
    width: wp("25%"),
    height: hp("10%"),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: hp("1%"),
  },
  servicesList: {
    marginTop: hp("1%"),
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: hp("1%"),
  },
  servicesTitle: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp("0.5%"),
    fontFamily: "poppins",
  },
  serviceItem: {
    fontSize: wp("3.7%"), // Increased from 3.2% to 3.7%
    color: "#666",
    marginLeft: wp("2%"),
    fontFamily: "poppins",
  },
  addressCard: {
    backgroundColor: "#F0F8FF",
    borderRadius: wp("2%"),
    padding: wp("3%"),
  },
  addressText: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    color: "#333",
    marginBottom: hp("0.5%"),
    fontFamily: "poppins",
  },
  orderCard: {
    backgroundColor: "#F0F8FF",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    marginBottom: hp("1%"),
  },
  orderHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: hp("1%"),
    marginBottom: hp("1%"),
  },
  orderTitle: {
    fontSize: wp("4.3%"), // Increased from 3.8% to 4.3%
    fontWeight: "bold",
    color: "#333",
    fontFamily: "poppins",
  },
  orderBrand: {
    fontSize: wp("3.7%"), // Increased from 3.2% to 3.7%
    color: "#666",
    fontFamily: "poppins",
  },
  orderDetails: {
    marginBottom: hp("1%"),
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("0.5%"),
  },
  orderLabel: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    color: "#666",
    fontFamily: "poppins",
  },
  orderValue: {
    fontSize: wp("4%"), // Increased from 3.5% to 4%
    fontWeight: "500",
    color: "#333",
    fontFamily: "poppins",
  },
  orderTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: hp("1%"),
  },
  orderTotalLabel: {
    fontSize: wp("4.3%"), // Increased from 3.8% to 4.3%
    fontWeight: "bold",
    color: "#333",
    fontFamily: "poppins",
  },
  orderTotalValue: {
    fontSize: wp("4.3%"), // Increased from 3.8% to 4.3%
    fontWeight: "bold",
    color: "#007bff",
    fontFamily: "poppins",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#007bff",
    borderRadius: wp("2%"),
    padding: wp("3%"),
    marginTop: hp("1%"),
  },
  grandTotalLabel: {
    fontSize: wp("4.5%"), // Increased from 4% to 4.5%
    fontWeight: "bold",
    color: "white",
    fontFamily: "poppins",
  },
  grandTotalValue: {
    fontSize: wp("4.5%"), // Increased from 4% to 4.5%
    fontWeight: "bold",
    color: "white",
    fontFamily: "poppins",
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: hp("2%"),
  },
  buttonIcon: {
    marginRight: wp("2%"),
  },
  primaryButton: {
    backgroundColor: "#007bff",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    marginBottom: hp("1.2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("70%"),
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: wp("4.5%"), // Increased from 4% to 4.5%
    fontFamily: "poppins",
  },
  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("6%"),
    borderRadius: wp("2%"),
    borderWidth: 1,
    borderColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("70%"),
  },
  secondaryButtonText: {
    color: "#007bff",
    fontWeight: "bold",
    fontSize: wp("4.5%"), // Increased from 4% to 4.5%
    fontFamily: "poppins",
  },
});

export default ServiceHistoryDetailsPage;
