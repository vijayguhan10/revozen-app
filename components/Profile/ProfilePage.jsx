import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch user data from AsyncStorage or an API
      const name = await AsyncStorage.getItem("userName");
      const email = await AsyncStorage.getItem("userEmail");
      setUserData({ name, email });
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    // Clear user data and navigate to login
    await AsyncStorage.removeItem("userName");
    await AsyncStorage.removeItem("userEmail");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.profileCard}>
            <View style={styles.headerRow}>
              <Text style={styles.headerText}>My Profile</Text>
              <TouchableOpacity>
                <Ionicons
                  name="create-outline"
                  size={wp("6%")}
                  color="#f58634"
                />
              </TouchableOpacity>
            </View>

            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/706/706830.png" }} style={styles.avatar} />
            <Text style={styles.name}>{userData.name}</Text>

            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={wp("5%")}
                color="#3366ff" />
              <Text style={styles.infoText}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <MenuItem icon="car" label="My Vehicles" onPress={() => navigation.navigate('MyVehicles')} />
            <MenuItem icon="time-outline" label="Service History" onPress={() => navigation.navigate('ServiceHistory')} />
            <MenuItem icon="cash-outline" label="Payment Methods" />
            <MenuItem icon="gift-outline" label="Rewards" />
          </View>

          <View style={styles.sectionCard}>
            <MenuItem icon="document-text-outline" label="Terms & Conditions" />
            <MenuItem icon="lock-closed-outline" label="Privacy Policy" />
            <MenuItem icon="help-circle-outline" label="Help & Support" />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && { transform: [{ scale: 0.98 }], opacity: 0.95 },
            ]}
            onPress={handleLogout}
          >
            <LinearGradient
              colors={["#FFF4E6", "#FAC898"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Text style={styles.loginText}>Log Out</Text>
          </Pressable>

          <View style={{ height: hp("5%") }} />
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={wp("5.5%")}
      color="#3366ff" />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    backgroundColor: "#F4F9F8",
    marginTop: hp("15%"),
  },
  content: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("5%"),
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: wp("5%"),
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp("1.5%"),
  },
  headerText: {
    fontSize: wp("5.5%"),
    color: "#3366ff",
    fontWeight: "bold",
    fontFamily: "poppins",
  },
  avatar: {
    width: wp("25%"),
    height: wp("25%"),
    borderRadius: wp("12.5%"),
    alignSelf: "center",
    borderColor: "#f58634",
    borderWidth: 3,
    marginBottom: hp("1%"),
  },
  name: {
    fontSize: wp("4.5%"),
    fontWeight: "600",
    textAlign: "center",
    marginBottom: hp("1.5%"),
    fontFamily: "poppins",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: hp("0.8%"),
    marginBottom: hp("1%"),
  },
  infoText: {
    fontSize: wp("4%"),
    marginLeft: wp("3%"),
    color: "#333",
    fontFamily: "poppins",
  },
  sectionCard: {
    backgroundColor: "#fff",
    paddingVertical: hp("1%"),
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("4%"),
  },
  menuText: {
    fontSize: wp("4%"),
    marginLeft: wp("3%"),
    color: "#111",
    fontFamily: "poppins",
  },
  loginButton: {
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("5%"),
    marginHorizontal: wp("4%"),
    borderRadius: wp("5%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("4%"),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 10,
    overflow: "hidden",
    position: "relative",
  },
  loginText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#1f1f1f",
    fontFamily: "poppins",
  },
});

export default ProfilePage;
