import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Location from "expo-location";
import api from "../../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={
          rating >= i
            ? "star"
            : rating >= i - 0.5
              ? "star-half"
              : "star-outline"
        }
        size={wp("4.5%")}
        color="#4f8cff"
        style={{ marginRight: 1 }}
      />
    );
  }
  return stars;
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shops, setShops] = useState([]);
  const [clientCoordinates, setClientCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocationAndShops = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to find nearby car wash stations."
          );
          setLoading(false);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        setClientCoordinates({ latitude, longitude });
        console.log("Client Coordinates : ", latitude, longitude);
        console.log("Api Url : ", api.API_URL);

        const token = await AsyncStorage.getItem("token"); // Added await

        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.post(
          `${api.API_URL}/client/carwash/getlocation`,
          { latitude, longitude },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data || !response.data.shops) {
          throw new Error("Invalid response format from server");
        }

        console.log("Shops : ", JSON.stringify(response.data.shops, null, 2));
        setShops(response.data.shops || []);
      } catch (error) {
        console.error("Error fetching location or shops:", error);
        let errorMessage =
          "Failed to fetch location or car wash stations. Please try again.";

        if (error.response?.status === 403) {
          errorMessage = "Access denied. Please login again.";
        } else if (error.message === "Authentication token not found") {
          errorMessage = "Please login to access this feature.";
        }

        Alert.alert("Error", errorMessage);
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndShops();
  }, []);

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <Ionicons name="car-sport" size={wp("6%")} color="#4f8cff" /> Nearest
        car wash stations
      </Text>
      <LinearGradient
        colors={["#4f8cff", "#ffb75e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.searchBarGradient}
      >
        <Searchbar
          placeholder="Search stations"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={{ fontFamily: "poppins", color: "#222" }}
          iconColor="#4f8cff"
          placeholderTextColor="#888"
        />
      </LinearGradient>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4f8cff"
          style={{ marginTop: hp("5%") }}
        />
      ) : (
        <FlatList
          data={filteredShops}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: hp("10%") }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={{
                textAlign: "center",
                marginTop: hp("5%"),
                color: "#888",
              }}
            >
              No car wash stations found nearby.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={
                  item.image
                    ? { uri: item.image }
                    : require("../../assets/Vehicle/car.png")
                }
                style={styles.image}
              />
              <View style={styles.info}>
                <Text style={styles.stationName}>{item.name}</Text>
                <View style={styles.ratingRow}>
                  {renderStars(Number(item.averageReview || 0))}
                  <Text style={styles.ratingText}>
                    ({item.averageReview || "0.0"}) ·{" "}
                    {item.userReviews ? item.userReviews.length : 0} reviews
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="call" size={wp("4.2%")} color="#4f8cff" />
                  <Text style={styles.phone}>{item.phoneNumber}</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="location" size={wp("4.2%")} color="#4f8cff" />
                  <Text style={styles.distance}>{item.distance} km away</Text>
                </View>
                <View style={styles.infoRow}>
                  <Ionicons name="pin" size={wp("4.2%")} color="#4f8cff" />
                  <Text style={styles.distance}>{item.businessAddress}</Text>
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
                      onPress={() => navigation.navigate("shopdetails", { shop: item })}
                      activeOpacity={0.85}
                    >
                      <Ionicons
                        name="calendar"
                        size={wp("4.5%")}
                        color="#fff"
                      />
                      <Text style={styles.bookBtnText}>Book now</Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("6%"),
    paddingHorizontal: wp("4%"),
    zIndex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: wp("13%"),
    borderTopRightRadius: wp("13%"),
    marginTop: hp("16%"),
  },
  heading: {
    fontSize: wp("5.5%"),
    // fontWeight: "700",
    marginBottom: hp("2.5%"),
    color: "#2a2a2a",
    alignSelf: "center",
    letterSpacing: 0.2,
    fontFamily: "poppins",
  },
  searchBarGradient: {
    borderRadius: wp("4%"),
    marginBottom: hp("2%"),
    padding: 2,
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: wp("4%"),
    elevation: 0,
    fontFamily: "poppins",
    height: hp("6%"),
    justifyContent: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8faff",
    borderRadius: wp("4%"),
    marginBottom: hp("2.5%"),
    padding: wp("3%"),
    borderLeftWidth: wp("1%"),
    borderLeftColor: "#4f8cff",
    borderWidth: 1,
    borderColor: "#e3f0ff",
  },
  image: {
    width: wp("22%"),
    height: wp("22%"),
    borderRadius: wp("4%"),
    marginRight: wp("4%"),
    borderWidth: 2,
    borderColor: "#e3f0ff",
    backgroundColor: "#fff",
    position: "relative",
    bottom: hp("6%"),
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  stationName: {
    fontSize: wp("5%"),
    // fontWeight: "700",
    color: "#222",
    marginBottom: hp("0.7%"),
    letterSpacing: 0.2,
    fontFamily: "poppins",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.7%"),
  },
  ratingText: {
    color: "#4f8cff",
    fontSize: wp("3.5%"),
    marginLeft: wp("1%"),
    // fontWeight: "500",
    fontFamily: "poppins",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.5%"),
  },
  phone: {
    color: "#555",
    fontSize: wp("3.8%"),
    marginLeft: wp("1.5%"),
    // fontWeight: "500",
    fontFamily: "poppins",
  },
  distance: {
    color: "#4f8cff",
    // fontWeight: "600",
    fontSize: wp("3.8%"),
    marginLeft: wp("1.5%"),
    fontFamily: "poppins",
  },
  bookBtnWrapper: {
    marginTop: hp("1.5%"),
    width: "100%",
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
    // fontWeight: "700",
    fontSize: wp("4%"),
    marginLeft: wp("1.5%"),
    letterSpacing: 0.2,
    fontFamily: "poppins",
  },
});

export default HomePage;
