import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Footer = ({ activeTab = "Home", onTabChange }) => {
  const tabs = [
    { name: "Home", icon: "home-outline", iconLib: Ionicons },
    { name: "Vehicles", icon: "car", iconLib: FontAwesome },
    { name: "History", icon: "history", iconLib: MaterialCommunityIcons },
    { name: "Support", icon: "headset", iconLib: Ionicons },
    { name: "Profile", icon: "person-outline", iconLib: Ionicons },
  ];

  return (
    <View style={styles.footerabsolute}>
      <View>
        <View style={styles.footerContainer}>
          {tabs.map((tab, index) => {
            const IconComponent = tab.iconLib;
            const isActive = activeTab === tab.name;
            return (
              <TouchableOpacity
                key={index}
                style={styles.tabItem}
                onPress={() => onTabChange && onTabChange(tab.name)}
              >
                <IconComponent
                  name={tab.icon}
                  size={wp("5.5%")}
                  color={isActive ? "#3B82F6" : "#6B7280"}
                />
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerabsolute: {
    position: "absolute",
    zIndex: 15,
    bottom: hp("2%"),
    width: wp("100%"),
    alignItems: "center", 
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: hp("1.5%"),
    width: wp("90%"),
    borderRadius: wp("9%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: wp("2.7%"),
    color: "#6B7280",
    marginTop: hp("0.5%"),
  },
  activeTabText: {
    color: "#3B82F6",
    fontWeight: "600",
  },
});

export default Footer;
