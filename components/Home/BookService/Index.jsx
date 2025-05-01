import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import BookServicePage from "./BookServicePage";
import BookingAddress from "./BookingAddress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Index = () => {
  return (
    <ScrollView
      style={styles.containerview}
      contentContainerStyle={styles.container}
    >
      <BookServicePage />
      <View style={{ padding: wp("0.8%"), marginTop: hp("1.5%") }}>
        <BookingAddress />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  containerview: {
    marginBottom: hp("10%"),
    zIndex: 1,
  },
});

export default Index;
