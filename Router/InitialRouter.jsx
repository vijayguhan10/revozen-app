import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";

import LoginScreen from "../components/LoginPage/login";
import MyVehiclesListPage from "../components/Vehicle/VehicleList/MyVehiclesListPage";
import ServiceBooking from "../components/Home/ServiceBookingConfirmation/ServiceBookingConfirmation";
import Header from "../components/Navbar/Header";
import Footer from "../components/Navbar/Footer";
import InitialHome from "../components/Home/InitialHome/InitialHome";
import SupportScreen from "../Sos/SosPage";
import BookingScreen from "../components/Home/Appointment/SlotBooking";
import ProfilePage from "../components/Profile/ProfilePage";
import ServiceHistoryPage from "../components/Services/ServiceHistory/ServiceHistoryPage";
// import ServiceHistoryDetails from "../components/ServiceHistory/ServiceHistoryDetails"; // Uncomment if needed
import ServieceHistoryDetailPage from "../components/Services/ServiceHistoryDetailsPage";
import AddVehiclePage from "../components/Vehicle/AddVehicle/AddVehiclePage";

const Stack = createStackNavigator();
const InitialRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animationEnabled: false,
          
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyVehicles"
          component={MyVehiclesRender}
          options={{ header: () => <Header />,animation:"none"}}
        />
        <Stack.Screen
          name="SOS"
          component={SosScreenPage}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="InitialHome"
          component={InitialHomeScreen}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="ServiceBooking"
          component={ServiceBookingWithFooter}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="serviecehistorypage"
          component={serviecehistorypage}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="Booking"
          component={BookingScreenComponent}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfilePageComponent}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="servieceprofile"
          component={servieceprofile}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="myvehicles"
          component={myvehicles}
          options={{ header: () => <Header />,animation:"none" }}
        />
        <Stack.Screen
          name="addvehicle"
          component={addvehicledetails}
          options={{ header: () => <Header />,animation:"none" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyVehiclesRender = () => (
  <View style={styles.container}>
    <MyVehiclesListPage />
    <Footer />
  </View>
);

const SosScreenPage = () => (
  <View style={styles.container}>
    <SupportScreen />
    <Footer />
  </View>
);

const InitialHomeScreen = () => (
  <View style={styles.container}>
    <InitialHome />
    <Footer />
  </View>
);

const ServiceBookingWithFooter = () => (
  <View style={styles.container}>
    <ServiceBooking />
    <Footer />
  </View>
);

const BookingScreenComponent = () => (
  <View style={styles.container}>
    <BookingScreen />
    <Footer />
  </View>
);

const ProfilePageComponent = () => (
  <View style={styles.container}>
    <ProfilePage />
    <Footer />
  </View>
);
const serviecehistorypage = () => (
  <View style={styles.container}>
    <ServiceHistoryPage />
    <Footer />
  </View>
);
const servieceprofile = () => (
  <View style={styles.container}>
    <ServieceHistoryDetailPage />
    <Footer />
  </View>
);
const myvehicles = () => (
  <View style={styles.container}>
    <MyVehiclesListPage />
    <Footer />
  </View>
);
const addvehicledetails = () => (
  <View style={styles.container}>
    <AddVehiclePage />
    <Footer />
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F4F9F8",
  },
});

export default InitialRouter;
