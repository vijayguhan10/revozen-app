import React from "react";
import { StyleSheet, View, Text } from "react-native";
import InitialRouter from "./Router/InitialRouter";
import { useFonts } from "@use-expo/font";
import BookServicePage from "./components/Home/BookService/BookServicePage";

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    poppins: require("./fonts/Poppins-Medium.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <InitialRouter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F8",
  },
});
