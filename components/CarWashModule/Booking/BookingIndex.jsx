import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Booking from "./Booking";
import ShopCardDetails from "./ShopCardDetails";
import ShopBgImage from "./ShopBgImage";
import { useRoute } from "@react-navigation/native";

const BookingIndex = () => {
  const [activeTab, setActiveTab] = useState("About");
  const [bookingVisible, setBookingVisible] = useState(false);

  const route = useRoute();
  const { shop } = route.params || {};

  return (
    <View style={styles.container}>
      <View>
        <ShopBgImage styles={styles} shop={shop} />
      </View>
      <View style={styles.shopDetailsContainer}>
        <ShopCardDetails
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBookNow={() => setBookingVisible(true)}
          shop={shop}
        />
      </View>
      <Booking
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
        shop={shop}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F8",
    marginTop: wp("30%"),
  },
  shopDetailsContainer: {
    marginTop: hp("4%"),
    padding: wp("1%"),
  },
});

export default BookingIndex;
