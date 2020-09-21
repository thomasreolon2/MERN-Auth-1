import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL_DASH } from "../src/uriFetchs";
import { BASE_URL_UPLOAD_IMG } from "../src/uriFetchs";
import styles from "../src/styles";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const HomeScreen = (props) => {
  const [email, setEmail] = useState("loading");
  const [username, setUsername] = useState("loading");

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("token");

    fetch(BASE_URL_DASH, {
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then(async (res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setUsername(data.username);
      })

      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = (props) => {
    AsyncStorage.removeItem("token").then(() => {
      props.navigation.navigate("signin");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}> LOGGED EMAIL: {email}</Text>
      <Text style={{ fontSize: 18 }}> WELCOME: {username}</Text>
      <Button
        title="logout"
        mode="contained"
        style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
        onPress={() => logout(props)}
      ></Button>
    </View>
  );
};

export default HomeScreen;
