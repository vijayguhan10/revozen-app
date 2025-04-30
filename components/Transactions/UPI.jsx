import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CommonActions } from "@react-navigation/native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function PaymentScreen() {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [payLater, setPayLater] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Payment Details</Text>
        <View style={styles.row}>
          <Text>Service Total</Text>
          <Text>Rs. 3200</Text>
        </View>
        <View style={styles.row}>
          <Text>Convenience Fee</Text>
          <Text>Rs. 300</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Total Price</Text>
          <Text style={styles.bold}>Rs. 3500</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Apply Coupon</Text>
        <View style={styles.couponRow}>
          <TextInput
            placeholder="Coupon Code"
            style={styles.input}
            placeholderTextColor="#888"
            keyboardType="key-pad"
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Pay Using</Text>

        {[
          {
            label: "Cards",
            description: "Visa, Master, Amex",
            icon: (
              <LinearGradient
                colors={["#8E2DE2", "#4A00E0"]}
                style={styles.iconWrapper}
              >
                <FontAwesome name="credit-card" size={20} color="#fff" />
              </LinearGradient>
            ),
            id: "card",
          },
          {
            label: "UPI",
            description: "Google Pay, PhonePe, More",
            icon: (
              <LinearGradient
                colors={["#FC466B", "#3F5EFB"]}
                style={styles.iconWrapper}
              >
                <MaterialCommunityIcons
                  name="transfer"
                  size={20}
                  color="#fff"
                />
              </LinearGradient>
            ),
            id: "upi",
          },
          {
            label: "EMI",
            description: "Credit/Debit Cards, More",
            icon: (
              <LinearGradient
                colors={["#56ab2f", "#a8e063"]}
                style={styles.iconWrapper}
              >
                <Ionicons name="calendar" size={20} color="#fff" />
              </LinearGradient>
            ),
            id: "emi",
          },
        ].map((method) => (
          <LinearGradient
            key={method.id}
            colors={["#a6c4f5", "#4287f5"]}
            start={{ x: 1, y: 1 }}
            end={{ x: 0, y: 1 }}
            style={styles.cardBackground}
          >
            <TouchableOpacity
              style={styles.paymentMethod}
              onPress={() => setSelectedMethod(method.id)}
            >
              {method.icon}
              <View style={{ flex: 1 }}>
                <Text style={styles.methodTitle}>{method.label}</Text>
                <Text style={styles.methodDesc}>{method.description}</Text>
              </View>
              <View style={styles.radio}>
                {selectedMethod === method.id && (
                  <View style={styles.radioDot} />
                )}
              </View>
            </TouchableOpacity>
          </LinearGradient>
        ))}

        <TouchableOpacity
          style={styles.checkboxRow}
          onPress={() => setPayLater(!payLater)}
        >
          <View style={[styles.checkbox, payLater && styles.checkedBox]}>
            {payLater && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.payLater}>Pay Later</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "Login" }, { name: "Home" }],
            })
          );
        }}
        style={styles.confirmButton}
      >
        <Text style={styles.confirmText}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: 16,
    marginTop: "35%",
    // backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0046ff",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardBackground: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 2, // if needed
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  applyButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#0046ff",
    borderRadius: 8,
  },
  applyText: {
    color: "#0046ff",
    fontWeight: "bold",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  methodTitle: {
    fontWeight: "bold",
    fontSize: 15,
  },
  methodDesc: {
    fontSize: 12,
    color: "#555",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#555",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    backgroundColor: "#0046ff",
    borderColor: "#0046ff",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
  },
  payLater: {
    fontSize: 14,
    color: "#333",
  },
  confirmButton: {
    backgroundColor: "#0046ff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 130,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
