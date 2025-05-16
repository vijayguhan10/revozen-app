import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

const stations = [
  {
    id: 1,
    name: "John's station",
    rating: 4.5,
    reviews: 120,
    distance: 1.2,
    phone: "1234567890",
    image:
      "https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "William's station",
    rating: 4.0,
    reviews: 98,
    distance: 2.2,
    phone: "1234347890",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Jack's station",
    rating: 5.0,
    reviews: 150,
    distance: 2.6,
    phone: "1234347890",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Watson's station",
    rating: 4.8,
    reviews: 110,
    distance: 3.4,
    phone: "1234347890",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=400&q=80",
  },
];

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
  const onChangeSearch = (query) => setSearchQuery(query);

  const navigation = useNavigation();

  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        <Ionicons name="car-sport" size={wp("6%")} color="#4f8cff" /> Nearest
        car wash stations
      </Text>
      {/* Attractive Gradient Searchbar */}
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
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: hp("10%") }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.stationName}>{item.name}</Text>
              <View style={styles.ratingRow}>
                {renderStars(item.rating)}
                <Text style={styles.ratingText}>
                  ({item.rating}) · {item.reviews} reviews
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="call" size={wp("4.2%")} color="#4f8cff" />
                <Text style={styles.phone}>{item.phone}</Text>
              </View>
              <View style={styles.infoRow}>
                <Ionicons name="location" size={wp("4.2%")} color="#4f8cff" />
                <Text style={styles.distance}>{item.distance} km away</Text>
              </View>
              {/* Book Now button below info, full width, gradient */}
              <View style={styles.bookBtnWrapper}>
                <LinearGradient
                  colors={["#a1c0ff", "#cbbfff"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.bookBtnGradient}
                >
                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() => navigation.navigate("shopdetails")}
                    activeOpacity={0.85}
                  >
                    <Ionicons name="calendar" size={wp("4.5%")} color="#fff" />
                    <Text style={styles.bookBtnText}>Book now</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}
      />
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
