import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";


const OnboardingScreen = ({ navigation }: any) => {
  return (
    <View>
      {/* <View style={styles.container}>
    
    <Text style={styles.title}>Start Your Journey{`\n`}With Us.</Text>

    <Text style={styles.subtitle}>
      Sign up now to unlock powerful features.{"\n"}
      Enter your email to create an account and{`\n`}
      begin enhancing your business today!
    </Text>

    <View style={styles.dotsContainer}>
      <View style={[styles.dot, styles.activeDot]} />
      <View style={styles.dot} />
      <View style={styles.dot} />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View> */}
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
    marginBottom: 20,
  },
  image: {
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    lineHeight: 20,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#005A54",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  skipButton: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  skipText: {
    fontSize: 16,
    color: "#000",
  },
  nextButton: {
    backgroundColor: "#005A54",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  nextText: {
    fontSize: 16,
    color: "#FFF",
    fontWeight: "bold",
  },
});
