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
import ServiceHistoryDetailPage from "../components/Services/ServiceHistoryDetailsPage";
import AddVehiclePage from "../components/Vehicle/AddVehicle/AddVehiclePage";
import BookServicePage from "../components/Home/BookService/BookServicePage";
import PaymentScreen from "../components/Transactions/UPI";

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
          component={MyVehiclesWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreenWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="BookService"
          component={BookServiceWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="ServiceHistory"
          component={ServiceHistoryPageWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="ServiceHistoryDetails"
          component={ServiceHistoryDetailWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="AddVehicle"
          component={AddVehicleWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="Support"
          component={SupportWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="Home"
          component={InitialHomeWithFooter}
          options={{ header: () => <Header /> }}
        />
        <Stack.Screen
          name="ServiceBooking"
          component={ServiceBookingWithFooter}
          options={{ header: () => <Header /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Screens with Footer wrapper
const MyVehiclesWithFooter = () => (
  <View style={styles.container}>
    <MyVehiclesListPage />
    <Footer />
  </View>
);

const PaymentScreenWithFooter = () => (
  <View style={styles.container}>
    <PaymentScreen />
    <Footer />
  </View>
);

const AppointmentWithFooter = () => (
  <View style={styles.container}>
    <BookingScreen />
    <Footer />
  </View>
);

const BookServiceWithFooter = () => (
  <View style={styles.container}>
    <BookServicePage />
    <Footer />
  </View>
);

const ServiceHistoryPageWithFooter = () => (
  <View style={styles.container}>
    <ServiceHistoryPage />
    <Footer />
  </View>
);

const ServiceHistoryDetailWithFooter = () => (
  <View style={styles.container}>
    <ServiceHistoryDetailPage />
    <Footer />
  </View>
);

const AddVehicleWithFooter = () => (
  <View style={styles.container}>
    <AddVehiclePage />
    <Footer />
  </View>
);

const ProfileWithFooter = () => (
  <View style={styles.container}>
    <ProfilePage />
    <Footer />
  </View>
);

const SupportWithFooter = () => (
  <View style={styles.container}>
    <SupportScreen />
    <Footer />
  </View>
);

const InitialHomeWithFooter = () => (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#F4F9F8",
  },
});

export default InitialRouter;
