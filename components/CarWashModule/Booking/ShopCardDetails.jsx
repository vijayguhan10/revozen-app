import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TABS = ["About", "Services", "Gallery", "History"];

const ShopCardDetails = ({ activeTab, setActiveTab, onBookNow }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View>
        <Text style={styles.category}>Car Washing</Text>
        <Text style={styles.title}>William's station</Text>
        <Text style={styles.address}>1012 Ocean avenue, New york, USA</Text>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="star" color="#FFC107" size={20} />
          <Text style={styles.rating}>4.8</Text>
          <Text style={styles.reviewCount}>(365 reviews)</Text>
        </View>
        <Ionicons
          name="paper-plane-outline"
          size={24}
          color="#6C63FF"
          style={{ marginTop: 4 }}
        />
      </View>
    </View>

    {/* Tabs */}
    <View style={styles.tabsRow}>
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          style={styles.tabBtn}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.activeTabBar} />}
        </TouchableOpacity>
      ))}
    </View>

    {/* Tab Content */}
    <View style={{ minHeight: 60 }}>
      {activeTab === "About" && (
        <View>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.sectionText}>
            We pride ourselves on top-quality services. If you're not satisfied,
            we'll make it right! Easily schedule a wash at your preferred time
            and location. Just a few taps, and you're ready to go!
          </Text>
        </View>
      )}
      {activeTab === "Services" && (
        <View>
          <Text style={styles.sectionTitle}>Services</Text>
          <Text style={styles.sectionText}>
            • Exterior Wash{"\n"}• Interior Cleaning{"\n"}• Detailing
          </Text>
        </View>
      )}
      {activeTab === "Gallery" && (
        <ScrollView horizontal>
          {[1, 2, 3].map((i) => (
            <Image
              key={i}
              source={{
                uri: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
              }}
              style={styles.galleryImage}
            />
          ))}
        </ScrollView>
      )}
      {activeTab === "History" && (
        <View>
          <Text style={styles.sectionTitle}>History</Text>
          <Text style={styles.sectionText}>No previous bookings found.</Text>
        </View>
      )}
    </View>

    {/* Book Now Button */}
    <TouchableOpacity
      style={styles.bookBtn}
      onPress={onBookNow}
      activeOpacity={0.85}
    >
      <Text style={styles.bookBtnText}>Book Now</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderTopLeftRadius: wp("7%"),
    borderTopRightRadius: wp("7%"),
    marginTop: -hp("4%"),
    padding: wp("5%"),
    minHeight: hp("60%"),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: hp("2%"),
  },
  category: {
    color: "#6C63FF",
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("3.5%"),
    marginBottom: 2,
  },
  title: {
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("5.2%"),
    marginBottom: 2,
    color: "#222",
  },
  address: {
    color: "#888",
    fontSize: wp("3.5%"),
  },
  rating: {
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("4%"),
    marginLeft: 4,
    color: "#222",
  },
  reviewCount: {
    color: "#888",
    fontSize: wp("3.2%"),
    marginLeft: 3,
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: hp("2%"),
    marginBottom: hp("1%"),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabBtn: {
    marginRight: wp("7%"),
    alignItems: "center",
    paddingBottom: 6,
  },
  tabText: {
    fontSize: wp("4%"),
    color: "#888",
    // fontWeight: "500",

fontFamily: "poppins",  },
  activeTabText: {
    color: "#6C63FF",
    // fontWeight: "bold",
    fontFamily: "poppins",
  },
  activeTabBar: {
    height: 3,
    width: "100%",
    backgroundColor: "#6C63FF",
    borderRadius: 2,
    marginTop: 2,
  },
  sectionTitle: {
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("3.5%"),
    marginBottom: 4,
    color: "#222",
  },
  sectionText: {
    color: "#555",
    fontSize: wp("3%"),
    lineHeight: 20,
  },
  galleryImage: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("3%"),
    marginRight: wp("3%"),
    marginTop: 8,
  },
  bookBtn: {
    marginTop: hp("2.5%"),
    backgroundColor: "#6C63FF",
    borderRadius: wp("3%"),
    paddingVertical: 10,
    alignItems: "center",
  },
  bookBtnText: {
    color: "#fff",
    // fontWeight: "bold",
    fontFamily: "poppins",
    fontSize: wp("4.2%"),
  },
});

export default ShopCardDetails;
