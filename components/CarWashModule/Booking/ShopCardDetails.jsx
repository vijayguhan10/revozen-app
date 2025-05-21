import React, { useState } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import ReviewPopup from "./ReviewPopup"; // Make sure this path is correct

const TABS = ["About", "Services", "Gallery", "History"];

const ShopCardDetails = ({ activeTab, setActiveTab, onBookNow, shop }) => {
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.category}>Car Washing</Text>
          <Text style={styles.title}>{shop?.name || "N/A"}</Text>
          <Text style={styles.address}>{shop?.businessAddress || "N/A"}</Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="star" color="#FFC107" size={20} />
            <Text style={styles.rating}>{shop?.averageReview || "0.0"}</Text>
            <Text style={styles.reviewCount}>
              ({shop?.userReviews ? shop.userReviews.length : 0} reviews)
            </Text>
          </View>
          <View style={styles.bookBtnWrapper}>
            <LinearGradient
              colors={["#a1c0ff", "#cbbfff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.bookBtnGradient}
            >
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={onBookNow}
                activeOpacity={0.85}
              >
                <Ionicons name="calendar" size={wp("3%")} color="#fff" />
                <Text style={styles.bookBtnText}>Book now</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
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
              {shop?.about ||
                "We pride ourselves on top-quality services. If you're not satisfied,"}
            </Text>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color="#6C63FF"
                  style={styles.detailIcon}
                />
                <Text style={styles.detailLabel}>Region:</Text>
                <Text style={styles.detailValue}>{shop?.region || "N/A"}</Text>
              </View>
              <View style={styles.gridItem}>
                <Ionicons
                  name="pricetag-outline"
                  size={20}
                  color="#6C63FF"
                  style={styles.detailIcon}
                />
                <Text style={styles.detailLabel}>Pincode:</Text>
                <Text style={styles.detailValue}>{shop?.pincode || "N/A"}</Text>
              </View>
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridItem}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#6C63FF"
                  style={styles.detailIcon}
                />
                <Text style={styles.detailLabel}>Opening:</Text>
                <Text style={styles.detailValue}>
                  {shop?.openingTime
                    ? new Date(shop.openingTime).toLocaleTimeString()
                    : "N/A"}
                </Text>
              </View>
              <View style={styles.gridItem}>
                <Ionicons
                  name="moon-outline"
                  size={20}
                  color="#6C63FF"
                  style={styles.detailIcon}
                />
                <Text style={styles.detailLabel}>Closing:</Text>
                <Text style={styles.detailValue}>
                  {shop?.closingTime
                    ? new Date(shop.closingTime).toLocaleTimeString()
                    : "N/A"}
                </Text>
              </View>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#6C63FF"
                style={styles.detailIcon}
              />
              <Text style={styles.detailLabel}>Days Open:</Text>
              <Text style={styles.detailValue}>
                {shop?.daysOfOperation?.join(", ") || "N/A"}
              </Text>
            </View>
          </View>
        )}
        {activeTab === "Services" && (
          <View>
            <Text style={styles.sectionTitle}>Services</Text>
            <Text style={styles.sectionText}>
              {/* You can render dynamic services here if available in shop object */}
              • Exterior Wash{"\n"}• Interior Cleaning{"\n"}• Detailing
            </Text>
          </View>
        )}
        {activeTab === "Gallery" && (
          <ScrollView horizontal>
            {/* If shop has images, render them, else fallback */}
            {(shop?.galleryImages && shop.galleryImages.length > 0
              ? shop.galleryImages
              : [1, 2, 3]
            ).map((img, i) => (
              <Image
                key={i}
                source={{
                  uri:
                    typeof img === "string"
                      ? img
                      : "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
                }}
                style={styles.galleryImage}
              />
            ))}
          </ScrollView>
        )}
        {activeTab === "History" && (
          <View>
            <Text style={styles.sectionTitle}>History</Text>
            <Text style={styles.sectionText}>
              {shop?.userReviews && shop.userReviews.length > 0
                ? shop.userReviews
                    .map(
                      (review) =>
                        `${review.userName}: ${review.review}★ - ${review.description}`
                    )
                    .join("\n")
                : "No previous bookings found."}
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 16,
                alignSelf: "flex-start",
                backgroundColor: "#6C63FF",
                paddingVertical: 8,
                paddingHorizontal: 18,
                borderRadius: 8,
              }}
              onPress={() => setShowReviewPopup(true)}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontFamily: "poppins" }}>
                Add Review
              </Text>
            </TouchableOpacity>
            <ReviewPopup
              visible={showReviewPopup}
              onClose={() => setShowReviewPopup(false)}
              shopId={shop?._id}
              onReviewSubmitted={() => setShowReviewPopup(false)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

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
    // marginTop: hp("2%"),
    // marginBottom: hp("1%"),
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

    fontFamily: "poppins",
  },
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
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 2,
  },
  gridItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f6ff",
    borderRadius: wp("2%"),
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    marginVertical: 4,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  galleryImage: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("3%"),
    marginRight: wp("3%"),
    marginTop: 8,
  },
  bookBtnWrapper: {
    marginTop: hp("1.5%"),
    width: "70%",
    height: hp("4%"),
  },
  bookBtnGradient: {
    borderRadius: wp("2.5%"),
    overflow: "hidden",
  },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp("1.2%"),
    width: "100%",
  },
  bookBtnText: {
    color: "#000000",
    fontSize: wp("3%"),
    marginLeft: wp("1.5%"),
    letterSpacing: 0.2,
    fontFamily: "poppins",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f6ff",
    borderRadius: wp("2%"),
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 4,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontWeight: "bold",
    color: "#6C63FF",
    fontSize: wp("3%"),
    marginRight: 4,
    fontFamily: "poppins",
  },
  detailValue: {
    color: "#222",
    fontSize: wp("3%"),
    width: "70%",
    fontFamily: "poppins",
  },
});

export default ShopCardDetails;
