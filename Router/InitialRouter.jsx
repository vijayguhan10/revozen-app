import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../components/LoginPage/login";
import MyVehiclesListPage from "../components/Vehicle/VehicleList/MyVehiclesListPage";
import ServiceBooking from "../components/Home/ServiceBookingConfirmation/ServiceBookingConfirmation";
import Header from "../components/Navbar/Header";
import Footer from "../components/Navbar/Footer";
import InitialHome from "../components/Home/InitialHome/InitialHome";
import { View, StyleSheet } from "react-native";
import SupportScreen from "../Sos/SosPage";
import BookingScreen from "../components/Home/Appointment/SlotBooking";
import PaymentScreen from "../components/Transactions/UPI";
const Stack = createStackNavigator();

const InitialRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SOSscreen">
        <Stack.Screen
          name="SOSscreen"
          component={paymentscreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MyVehicles"
          component={myvehiclerender}
          options={{
            header: () => <Header />,
          }}
        />
        {/* <Stack.Screen
          name="SOSscreen"
          component={sosscreenpage}
          options={{
            header: () => <Header />,
          }}
        /> */}
        {/* <Stack.Screen
          name="InitialHome"
          component={initialhome}
          options={{
            header: () => <Header />,
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ServiceBookingWithFooter = () => {
  return (
    <View style={styles.container}>
      <ServiceBooking />
      <Footer />
    </View>
  );
};

const myvehiclerender = () => {
  return (
    <View style={styles.container}>
      <MyVehiclesListPage />
      <Footer />
    </View>
  );
};
const sosscreenpage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <SupportScreen />
      <Footer />
    </View>
  );
};
const initialhome = () => {
  return (
    <View style={styles.container}>
      <Header />
      <InitialHome />
      <Footer />
    </View>
  );
};
const bookingscreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <BookingScreen />
      <Footer />
    </View>
  );
};
const paymentscreen  = () => {
  return (
    <View style={styles.container}>
      <Header />
      <PaymentScreen />
      <Footer />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F4F9F8",
  },
});

export default InitialRouter;
