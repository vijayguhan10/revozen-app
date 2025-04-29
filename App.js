import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './components/LoginPage/login';
import ServiceBookingConfirmation from './components/Home/ServiceBookingConfirmation/ServiceBookingConfirmation';
import MyVehiclesPage from './components/Vehicle/MyVehiclesListPage';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" /> */}
      <MyVehiclesPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
