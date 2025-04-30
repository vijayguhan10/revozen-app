// App.js
import React from "react";
import { StyleSheet, View } from "react-native";
import InitialRouter from "./Router/InitialRouter";
export default function App() {
  return (
      <View style={styles.container}>
        <InitialRouter  />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F9F8",
  },
});
