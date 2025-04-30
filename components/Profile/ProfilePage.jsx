import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const profileData = {
  name: "A B Raja Rahman",
  phone: "1234567890",
  email: "abrajarahman@gmail.com",
  avatar: "https://cdn-icons-png.flaticon.com/512/706/706830.png",
};

const ProfilePage = () => {
  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.headerRow}>
            <Text style={styles.headerText}>My Profile</Text>
            <TouchableOpacity>
              <Ionicons name="create-outline" size={wp("6%")} color="#f58634" />
            </TouchableOpacity>
          </View>

          <Image source={{ uri: profileData.avatar }} style={styles.avatar} />
          <Text style={styles.name}>{profileData.name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={wp("5%")} color="#3366ff" />
            <Text style={styles.infoText}>{profileData.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={wp("5%")} color="#3366ff" />
            <Text style={styles.infoText}>{profileData.email}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <MenuItem icon="car" label="My Vehicles" />
          <MenuItem icon="time-outline" label="Service History" />
          <MenuItem icon="cash-outline" label="Payment Methods" />
          <MenuItem icon="gift-outline" label="Rewards" />
        </View>

        <View style={styles.sectionCard}>
          <MenuItem icon="document-text-outline" label="Terms & Conditions" />
          <MenuItem icon="lock-closed-outline" label="Privacy Policy" />
          <MenuItem icon="help-circle-outline" label="Help & Support" />
        </View>

        <TouchableOpacity>
          <LinearGradient
            colors={["#FFF4E6", "#FAC898"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.loginButton}
          >
            <Text style={styles.loginText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: hp("4%") }} />
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={wp("5.5%")} color="#3366ff" />
    <Text style={styles.menuText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    zIndex: 10,
  },
  scrollContainer: {
    paddingHorizontal: wp("4%"),
    paddingBottom: hp("5%"),
  },
  profileCard: {
    backgroundColor: "#fff",
    padding: wp("5%"),
    borderRadius: wp("3%"),
    marginBottom: hp("2%"),
    marginTop: hp("14%"),
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
  },
  loginButton: {
    paddingVertical: hp("1.8%"),
    paddingHorizontal: wp("5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp("4%"),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 10,
    transform: [{ scale: 1.02 }],
  },
  loginText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#1f1f1f",
  },
});

export default ProfilePage;
