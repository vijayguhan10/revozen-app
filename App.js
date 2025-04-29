import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./components/LoginPage/login";
import ServiceBookingConfirmation from "./components/Home/ServiceBookingConfirmation/ServiceBookingConfirmation";
import MyVehiclesListPage from "./components/Vehicle/MyVehiclesListPage";
import MyVehicleDetailsPage from "./components/Vehicle/VehicleDetails/MyVehicleDetailsPage";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <MyVehicleDetailsPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
