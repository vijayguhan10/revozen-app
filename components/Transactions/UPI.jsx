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
// import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RazorpayCheckout from "react-native-razorpay";
export default function PaymentScreen() {
  // const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [payLater, setPayLater] = useState(true);

  const handlePayment = () => {
    const options = {
      description: "Payment for Service",
      image: "https://your_logo_url.png", 
      currency: "INR",
      key: "rzp_live_UlRZDlkCIm89E8",
      amount: "350000", 
      name: "Tyre Management",
      prefill: {
        email: "vijayguhan10@gmail.com", 
        contact: "++918438434868", 
        name: "Vijay Guhan", 
      },
      theme: { color: "#0046ff" },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Handle success
        console.log("Payment successful: ", data);
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{ name: "Login" }, { name: "Home" }],
        //   })
        // );
      })
      .catch((error) => {
        // Handle failure
        console.error("Payment failed: ", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Payment Details</Text>
        <View style={styles.row}>
          <Text style={styles.regularText}>Service Total</Text>
          <Text style={styles.regularText}>Rs. 3200</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.regularText}>Convenience Fee</Text>
          <Text style={styles.regularText}>Rs. 300</Text>
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
        onPress={handlePayment} 
        style={styles.confirmButton}
      >
        <Text style={styles.confirmText}>Confirm Payment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
console
const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    padding: wp("4%"),
    marginTop: hp("11.5%"),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    marginBottom: hp("2%"),
  },
  heading: {
    fontWeight: "bold",
    fontSize: wp("4%"),
    color: "#0046ff",
    marginBottom: hp("1.2%"),
    fontFamily: "poppins",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hp("0.5%"),
  },
  bold: {
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  couponRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("2%"),
  },
  cardBackground: {
    borderRadius: wp("2.5%"),
    marginVertical: hp("1.2%"),
    padding: wp("0.5%"),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: wp("2.5%"),
    borderRadius: wp("2%"),
    backgroundColor: "#fff",
    fontFamily: "poppins",
  },
  applyButton: {
    paddingVertical: hp("1.2%"),
    paddingHorizontal: wp("4%"),
    borderWidth: 1,
    borderColor: "#0046ff",
    borderRadius: wp("2%"),
  },
  applyText: {
    color: "#0046ff",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp("3%"),
    borderRadius: wp("3%"),
    gap: wp("3%"),
  },
  methodTitle: {
    fontWeight: "bold",
    fontSize: wp("3.8%"),
    fontFamily: "poppins",
  },
  methodDesc: {
    fontSize: wp("3%"),
    color: "#555",
    fontFamily: "poppins",
  },
  iconWrapper: {
    width: wp("9%"),
    height: wp("9%"),
    borderRadius: wp("2%"),
    justifyContent: "center",
    alignItems: "center",
  },
  radio: {
    width: wp("5%"),
    height: wp("5%"),
    borderRadius: wp("2.5%"),
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: wp("2.5%"),
    height: wp("2.5%"),
    borderRadius: wp("1.25%"),
    backgroundColor: "#555",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1.2%"),
    gap: wp("2.5%"),
  },
  checkbox: {
    width: wp("4.5%"),
    height: wp("4.5%"),
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
    fontSize: wp("3%"),
    fontFamily: "poppins",
  },
  payLater: {
    fontSize: wp("3.5%"),
    color: "#333",
    fontFamily: "poppins",
  },
  confirmButton: {
    backgroundColor: "#0046ff",
    padding: wp("3.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginTop: hp("1.2%"),
    marginBottom: hp("16%"),
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
  regularText: {
    fontFamily: "poppins",
    fontSize: wp("3.5%"),
    color: "#333",
  },
});
