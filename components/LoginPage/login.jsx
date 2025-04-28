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
    marginTop: 100,
    width: "100%",
    height: "100%",
  },
  overlay: {
    // backgroundColor: "rgba(0,0,0,0.4)",
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#cccccc',
    marginHorizontal: 15,
    padding: 15
  },
  revozenLogo: {
    width: 170,
    height: 100,
    marginTop: 140,
    marginLeft: 120,
  },
  form: {
    // backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
  },
  flexColumn: {
    marginBottom: 5,
  },
  label: {
    color: "#151717",
    fontWeight: "600",
    fontSize: 16,
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ecedec",
    borderRadius: 10,
    height: 50,
    marginBottom: 15,
    paddingLeft: 10,
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    fontSize: 14,
    color: "#000",
  },
  forgotText: {
    fontSize: 14,
    color: "#2d79f3",
    fontWeight: "500",
  },
  buttonSubmit: {
    backgroundColor: "#151717",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSubmitText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  pText: {
    textAlign: "center",
    fontSize: 14,
    color: "#000",
    marginTop: 10,
  },
  spanText: {
    color: "#2d79f3",
    fontWeight: "500",
  },
  socialButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
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
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;
