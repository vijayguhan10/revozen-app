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
      <View style={styles.headerRow}>
        <View style={styles.textAndIconWrapper}>
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

        <View style={styles.circlesWrapper}>
          <View style={[styles.circle, styles.circleLarge]} />
          <View style={[styles.circle, styles.circleMedium]} />
          <View style={[styles.circle, styles.circleSmall]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",

    zIndex: 999,
    width: "100%",
    height: hp("9%"),
    backgroundColor: "#F4F9F8",
    justifyContent: "center",
    paddingHorizontal: wp("4%"),
    paddingTop: hp("2%"),
  },
  headerRow: {
    flexDirection: "row",
  },
  textAndIconWrapper: {
    flexDirection: "row",
  },
  textContainer: {
    paddingTop: hp("3%"),
    flexDirection: "column",
  },
  welcomeText: {
    fontSize: wp("5%"),
    fontWeight: "600",
  },
  locationText: {
    fontSize: wp("3.5%"),
    color: "#555",
  },
  notificationProfileWrapper: {
    flexDirection: "row",
    marginTop: hp("2%"),
    marginLeft: wp("45%"),
    position: "absolute",
    alignItems: "center",
    gap: wp("3%"),
  },
  notificationIcon: {
    marginRight: wp("2%"),
  },
  profileImage: {
    width: wp("15%"),
    height: wp("15%"),
    borderRadius: wp("10%"),
    marginLeft: wp("10%"),
  },
  circlesWrapper: {
    marginLeft: wp("35%"),
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    borderColor: "#DCE5E3",
    borderWidth: 1,
    backgroundColor: "transparent",
    borderRadius: 999,
  },
  circleLarge: {
    width: wp("55%"),
    height: wp("55%"),
  },
  circleMedium: {
    width: wp("46%"),
    height: wp("46%"),
  },
  circleSmall: {
    width: wp("37%"),
    height: wp("37%"),
  },
});

export default Header;
