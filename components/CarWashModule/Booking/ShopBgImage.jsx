import React from "react";
import { View, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const shopBgImageStyles = StyleSheet.create({
  carImage: {
    width: "100%",
    height: hp("33%"),
    borderBottomLeftRadius: wp("5%"),
    borderBottomRightRadius: wp("5%"),
  },
  carousel: {
    position: "absolute",
    top: hp("26%"),
    left: wp("6%"),
    right: 0,
    height: hp("7%"),
    flexDirection: "row",
    zIndex: 3,
  },
  carouselImage: {
    width: wp("13%"),
    height: wp("13%"),
    borderRadius: wp("3%"),
    marginRight: wp("2%"),
    borderWidth: 2,
    borderColor: "#fff",
  },
});

const ShopBgImage = () => (
  <>
    <Image
      source={{
        uri: "https://www.team-bhp.com/forum/attachments/bangalore/2410230d1674654008-car-wash-detailing-studio-turtle-wax-sarjapur-road-bangalore-img20230113114758.jpg",
      }}
      style={shopBgImageStyles.carImage}
      resizeMode="cover"
    />

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={shopBgImageStyles.carousel}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Image
          key={i}
          source={{
            uri: "https://image.made-in-china.com/202f0j00VbtcHwUKARoJ/4-7min-Car-8-Hours-100-Cars-Automatic-Touchless-Car-Washing-Machine-for-Wash-Shop-Gas-Station-with-4-PCS-5-5kw-Blowers.webp",
          }}
          style={shopBgImageStyles.carouselImage}
        />
      ))}
    </ScrollView>
  </>
);

export default ShopBgImage;
