import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      {/* Circles in the background */}
      <View style={styles.circlesWrapper}>
        <View style={[styles.circle, styles.circleLarge]} />
        <View style={[styles.circle, styles.circleMedium]} />
        <View style={[styles.circle, styles.circleSmall]} />
      </View>
      <View style={styles.headerRow}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome Raj</Text>
          <Text style={styles.locationText}>Coimbatore, Tamil Nadu</Text>
        </View>
        <View style={styles.notificationProfileWrapper}>
          <Ionicons
            name="notifications"
            color="black"
            size={wp("5%")}
            style={styles.notificationIcon}
          />
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8fDA%3D",
            }}
            style={styles.profileImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: hp("11%"),
    backgroundColor: "#F4F9F8",
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  textContainer: {
    paddingTop: hp("3%"),
    flexDirection: "column",
    rowGap: hp("1%"),
  },
  welcomeText: {
    fontSize: wp("5%"),
    fontWeight: "600",
    fontFamily: "poppins",
  },
  locationText: {
    fontSize: wp("3.5%"),
    color: "#555",
    fontFamily: "poppins",
  },
  notificationProfileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp("3%"),
  },
  notificationIcon: {
    marginRight: wp("2.3%"),
  },
  profileImage: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("5.5%"),
    marginLeft: wp("2%"),
  },
  circlesWrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    left:wp("84%"),
    zIndex: 0,
  },
  circle: {
    position: "absolute",
    borderColor: "#D3D3D3",
    borderWidth: 1,
    backgroundColor: "transparent",
    borderRadius: 999,
  },
  circleLarge: {
    width: wp("64%"),
    height: wp("64%"),
  },
  circleMedium: {
    width: wp("43%"),
    height: wp("43%"),
  },
  circleSmall: {
    width: wp("27%"),
    height: wp("27%"),
  },
});

export default Header;
