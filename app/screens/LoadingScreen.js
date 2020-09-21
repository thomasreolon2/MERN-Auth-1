import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

const LoadingScreen = (props) => {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      props.navigation.navigate("home");
    } else {
      props.navigation.navigate("signin");
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
    justifyContent: "center",
  },
});

export default LoadingScreen;
