import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView, // <-- Add ScrollView
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
  const [levellogin, setLevellogin] = useState(""); // NEW

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
        role: "client",
      });
      console.log("API response:", response);

      if (response.status == 200) {
        console.log(JSON.stringify(response.data))
        const token = response.data.token;
        const userName = response.data.userName || "";
      
        const levellogin= response.data.levellogin || ""; 
        
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userName", userName);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("levellogin", levellogin); 
        // console.log(await AsyncStorage.getItem("levellogin"));
        console.log("UserName:", userName);
        console.log("Token:", token);
        console.log("Email:", email);
        console.log("Level Login:", levellogin);

        navigation.navigate("Home");
      } else {
        Toast.error("Invalid credentials.");
      }
    } catch (error) {
      console.log("Login error:", error);
      Toast.error("An error occurred while logging in.");
    }
  };

  const handleSignup = async () => {
    if (!levellogin) {
      Toast.error("Please select your login level.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/users/register`, {
        name,
        email,
        password,
        role: "client",
        levellogin, // NEW
      });
      if (response.status == 201 || response.status == 200) {
        Toast.success("Signup successful!");
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("levellogin", levellogin); // <-- Add this line
        setIsSignup(false);
      } else {
        Toast.error("Signup failed. Please try again.");
      }
    } catch (error) {
      Toast.error("An error occurred while signing up.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={TopTierImage} style={styles.topLeftImage} />
      <Image source={BottomTierImage} style={styles.bottomLeftImage} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={loginRevozenLogo} style={styles.revozenLogo} />
        <View style={styles.overlay}>
          <View style={[styles.form, isSignup && styles.signupForm]}>
            {/* Level Selector - Only for Signup */}
            {isSignup && (
              <View style={styles.levelRow}>
                <TouchableOpacity
                  style={[
                    styles.levelBtn,
                    levellogin === "enterprise" && styles.levelBtnActive,
                  ]}
                  onPress={() => setLevellogin("enterprise")}
                >
                  <Text
                    style={[
                      styles.levelBtnText,
                      levellogin === "enterprise" && styles.levelBtnTextActive,
                    ]}
                  >
                    Enterprise
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.levelBtn,
                    levellogin === "individual" && styles.levelBtnActive,
                  ]}
                  onPress={() => setLevellogin("individual")}
                >
                  <Text
                    style={[
                      styles.levelBtnText,
                      levellogin === "individual" && styles.levelBtnTextActive,
                    ]}
                  >
                    Individual
                  </Text>
                </TouchableOpacity>
              </View>
            )}
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
            <Text style={[styles.pText, { marginTop: 8, marginBottom: 4 }]}>Or With</Text>
            <View style={styles.socialRow}>
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
      </ScrollView>
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
    width: wp("25%"), // reduced size
    height: hp("23%"), // reduced size
    resizeMode: "contain",
    zIndex: 0,
  },
  bottomLeftImage: {
    position: "absolute",
    bottom: hp("0%"),
    left: 0,
    width: wp("22%"), // reduced size
    height: hp("13%"), // reduced size
    resizeMode: "contain",
    zIndex: 0,
  },
  revozenLogo: {
    width: wp("32%"), // reduced size
    height: hp("9%"),
    marginTop: hp("7%"),
    marginLeft: wp("1%"),
    marginBottom: hp("2%"),
    alignSelf: "center",
  },
  overlay: {
    marginTop: hp("1%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    borderWidth: 2,
    borderColor: "#cccccc",
    marginHorizontal: wp("4%"),
    padding: wp("3%"),
    backgroundColor: "#fff",
    zIndex: 1,
  },
  form: {
    width: wp("85%"),
    borderRadius: wp("5%"),
    marginTop: hp("2%"),
    paddingBottom: hp("2%"),
    backgroundColor: "#fff",
  },
  signupForm: {
    marginTop: hp("1%"),
  },
  flexColumn: {
    marginBottom: hp("0.5%"),
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ecedec",
    borderRadius: wp("3%"),
    height: hp("5.2%"),
    marginBottom: hp("1%"),
    paddingLeft: wp("3%"),
    backgroundColor: "#fff",
  },
  buttonSubmit: {
    backgroundColor: "#151717",
    paddingVertical: hp("1.2%"),
    borderRadius: wp("3%"),
    marginTop: hp("0.5%"),
  },
  buttonSubmitText: {
    color: "#fff",
    fontSize: wp("4%"),
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "poppins",
  },
  pText: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    color: "#000",
    marginTop: hp("1.2%"),
    fontFamily: "poppins",
  },
  spanText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp("1%"),
    gap: wp("2%"),
  },
  socialButton: {
    flex: 1,
    paddingVertical: hp("1%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    marginHorizontal: wp("1%"),
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
  levelRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  levelBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#6C63FF",
    borderRadius: wp("3%"),
    marginHorizontal: wp("2%"),
    paddingVertical: hp("1.2%"),
    backgroundColor: "#fff",
    alignItems: "center",
  },
  levelBtnActive: {
    backgroundColor: "#6C63FF",
  },
  levelBtnText: {
    color: "#6C63FF",
    fontWeight: "600",
    fontSize: wp("4%"),
    fontFamily: "poppins",
  },
  levelBtnTextActive: {
    color: "#fff",
  },
});

export default LoginScreen;
