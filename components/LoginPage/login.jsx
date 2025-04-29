//
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  //   CheckBox,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const loginPageBackground = require("../../assets/LoginPage/loginPageBackground.png");
const loginRevozenLogo = require("../../assets/LoginPage/loginRenozenLogo.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Login attempted with:", email, password);
  };

  return (
    <ImageBackground
      source={loginPageBackground}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <Image source={loginRevozenLogo} style={styles.revozenLogo} />
      <View style={styles.overlay}>
        <View style={styles.form}>
          <View style={styles.flexColumn}>
            <Text style={styles.label}>Email</Text>
          </View>
          <View style={styles.inputForm}>
            {/* Icon placeholder */}
            <View style={styles.iconPlaceholder} />
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

          <View style={styles.flexColumn}>
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={styles.inputForm}>
            {/* Icon placeholder */}
            <View style={styles.iconPlaceholder} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your Password"
              placeholderTextColor="#666"
              secureTextEntry
            />
          </View>

          <View style={styles.flexRow}>
            <View style={styles.rememberMeContainer}>
              {/* <CheckBox
                value={rememberMe}
                onValueChange={setRememberMe}
              /> */}
              <Text style={styles.rememberMeText}>Remember me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buttonSubmit} onPress={handleLogin}>
            <Text style={styles.buttonSubmitText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.pText}>
            Don't have an account? <Text style={styles.spanText}>Sign Up</Text>
          </Text>

          <Text style={styles.pText}>Or With</Text>

          <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.socialButton, styles.google]}>
              {/* Google Icon Placeholder */}
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.apple]}>
              {/* Apple Icon Placeholder */}
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    marginTop: hp("12%"),
    width: wp("100%"),
    height: hp("100%"),
  },
  overlay: {
    marginTop: hp("2%"),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    borderWidth: 2,
    borderColor: "#cccccc",
    marginHorizontal: wp("4%"),
    padding: wp("4%"),
  },
  revozenLogo: {
    width: wp("40%"),
    height: hp("12%"),
    marginTop: hp("14%"),
    marginLeft: wp("30%"),
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
  iconPlaceholder: {
    width: wp("5%"),
    height: wp("5%"),
    backgroundColor: "#ccc",
    borderRadius: wp("2%"),
  },
  input: {
    flex: 1,
    marginLeft: wp("2%"),
    fontSize: wp("4%"),
    color: "#000",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp("2%"),
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: wp("3.5%"),
    color: "#000",
  },
  forgotText: {
    fontSize: wp("3.5%"),
    color: "#2d79f3",
    fontWeight: "500",
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
  },
  pText: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    color: "#000",
    marginTop: hp("2%"),
  },
  spanText: {
    color: "#2d79f3",
    fontWeight: "500",
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
  apple: {
    backgroundColor: "#000",
  },
  socialButtonText: {
    color: "#000",
    fontSize: wp("4%"),
    fontWeight: "600",
    marginLeft: wp("2%"),
  },
  icon: {
    width: wp("5%"),
    height: wp("5%"),
  },
});

export default LoginScreen;
