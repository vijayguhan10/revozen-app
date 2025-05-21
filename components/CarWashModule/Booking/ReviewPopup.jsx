import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import api from "../../../env.json";

const ReviewPopup = ({ visible, onClose, shopId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingCompleted = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!rating || !description.trim()) {
      Alert.alert("Please provide a rating and description.");
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(
        `${api.API_URL}/carwash/addreview/${shopId}`,
        { review: rating, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(0);
      setDescription("");
      onReviewSubmitted && onReviewSubmitted();
      onClose();
      Alert.alert("Thank you!", "Your review has been submitted.");
    } catch (error) {
      Alert.alert("Error", "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Add Your Review</Text>
          <AirbnbRating
            count={5}
            reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
            defaultRating={rating}
            size={32}
            onFinishRating={handleRatingCompleted}
            showRating={false}
            starContainerStyle={{ marginVertical: 10 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Write your review..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} disabled={loading}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading}>
              <LinearGradient
                colors={["#4f8cff", "#ffb75e"]}
                style={styles.gradient}
              >
                <Text style={styles.submitText}>{loading ? "Submitting..." : "Submit"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "poppins",
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontFamily: "poppins",
    minHeight: 60,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
  },
  submitBtn: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradient: {
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ReviewPopup;