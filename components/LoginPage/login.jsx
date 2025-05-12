import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Toast } from "toastify-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import env from "../../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
const TopTierImage = require("../../assets/LoginPage/TopTire.png");
const BottomTierImage = require("../../assets/LoginPage/BottomTire.png");
const loginRevozenLogo = require("../../assets/LoginPage/loginRenozenLogo.png");
const googleLogo = require("../../assets/LoginPage/google.png");
const appleLogo = require("../../assets/LoginPage/apple.png");

const LoginScreen = () => {
  const API_URL = env.API_URL;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        role:"client",
      });
      if (response.status == 200) {
        Toast.success("Login successful!");
        await AsyncStorage.setItem("token", response.data.token);
        const token = await AsyncStorage.getItem("token");
        console.log("Stored token:", token);
        navigation.navigate("Home");
      } else {
        Toast.error("Invalid credentials.");
      }
    } catch (error) {
      Toast.error("An error occurred while logging in.");
    }
  };

  

  const handleSignup = async () => {
    try {
      console.log(name, email, password);
      const response = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
        role: "client",
      });
      if (response.status == 201 || response.status == 200) {
        console.log(JSON.stringify(response, null, 2));
        Toast.success("Signup successful!");
        await AsyncStorage.setItem("token", response.data.token);
        setIsSignup(false);
      } else {
        Toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      console.log(JSON.stringify(error.message, null, 2));

      Toast.error("An error occurred while signing up.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={TopTierImage} style={styles.topLeftImage} />
      <Image source={BottomTierImage} style={styles.bottomLeftImage} />
      <Image source={loginRevozenLogo} style={styles.revozenLogo} />
      <View style={styles.overlay}>
        <View style={styles.form}>
          {isSignup && (
            <View style={styles.flexColumn}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputForm}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your Name"
                  placeholderTextColor="#666"
                />
              </View>
            </View>
          )}
          <View style={styles.flexColumn}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputForm}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.flexColumn}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputForm}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your Password"
                placeholderTextColor="#666"
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonSubmit}
            onPress={isSignup ? handleSignup : handleLogin}
          >
            <Text style={styles.buttonSubmitText}>
              {isSignup ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.pText}>
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <Text
              style={styles.spanText}
              onPress={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Sign Up"}
            </Text>
          </Text>
          <Text style={styles.pText}>Or With</Text>
          <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.socialButton, styles.google]}>
              <Image source={googleLogo} style={styles.googleLogoStyle} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.apple]}>
              <Image source={appleLogo} style={styles.appleLogoStyle} />
              <Text style={styles.appleButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  topLeftImage: {
    position: "absolute",
    top: hp("7%"),
    left: 0,
    width: wp("30%"),
    height: hp("20%"),
    resizeMode: "contain",
  },
  bottomLeftImage: {
    position: "absolute",
    bottom: hp("0%"),
    left: 0,
    width: wp("30%"),
    height: hp("20%"),
    resizeMode: "contain",
  },
  revozenLogo: {
    width: wp("40%"),
    height: hp("12%"),
    marginTop: hp("14%"),
    marginLeft: wp("30%"),
  },
  overlay: {
    marginTop: hp("3%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    borderWidth: 2,
    borderColor: "#cccccc",
    marginHorizontal: wp("4%"),
    padding: wp("4%"),
  },
  form: {
    width: wp("85%"),
    borderRadius: wp("5%"),
  },
  flexColumn: {
    marginBottom: hp("1%"),
  },
  label: {
    color: "#151717",
    fontWeight: "600",
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ecedec",
    borderRadius: wp("3%"),
    height: hp("6%"),
    marginBottom: hp("2%"),
    paddingLeft: wp("3%"),
  },
  input: {
    flex: 1,
    marginLeft: wp("2%"),
    fontSize: wp("4%"),
    color: "#000",
    fontFamily: "poppins",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp("2%"),
  },
  buttonSubmit: {
    backgroundColor: "#151717",
    paddingVertical: hp("2%"),
    borderRadius: wp("3%"),
    marginTop: hp("1%"),
  },
  buttonSubmitText: {
    color: "#fff",
    fontSize: wp("4%"),
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "poppins",
  },
  pText: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    color: "#000",
    marginTop: hp("2%"),
    fontFamily: "poppins",
  },
  spanText: {
    color: "#2d79f3",
    fontWeight: "500",
    fontFamily: "poppins",
  },
  socialButton: {
    flex: 1,
    paddingVertical: hp("1.5%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginHorizontal: wp("1.5%"),
    flexDirection: "row",
    justifyContent: "center",
  },
  google: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  googleLogoStyle: {
    width: wp("6%"),
    height: hp("2.5%"),
    resizeMode: "contain",
  },
  apple: {
    backgroundColor: "#000",
  },
  appleLogoStyle: {
    width: wp("12%"),
    height: hp("3%"),
  },
  socialButtonText: {
    color: "#000",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginLeft: wp("2%"),
    fontFamily: "poppins",
  },
  appleButtonText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginLeft: wp("2%"),
    fontFamily: "poppins",
  },
});

export default LoginScreen;
