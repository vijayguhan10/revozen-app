import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/LoginPage/login";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Footer from "./components/Navbar/Footer";
import Header from "./components/Navbar/Header";
import ServiceBookingConfirmation from "./components/Home/ServiceBookingConfirmation/ServiceBookingConfirmation";
import MyVehiclesListPage from "./components/Vehicle/VehicleList/MyVehiclesListPage";
import MyVehicleDetailsPage from "./components/Vehicle/VehicleDetails/MyVehicleDetailsPage";
import AddVehiclePage from "./components/Vehicle/AddVehicle/AddVehiclePage";
import ServiceHistoryPage from "./components/Services/ServiceHistory/ServiceHistoryPage";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ServiceHistoryPage />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F9F8",
    flex: 1,

    width: wp("100%"),
  },
});
