import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Animated,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  setState,
  Button,
} from "react-native";

import UserContext from "../src/UserContext";
import App from "../App";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { Header } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL_SIGNUP } from "../src/uriFetchs";
import styles from "../src/styles";
import { TextInput } from "react-native-paper";
import Lottie from "lottie-react-native";
import headerbottom from "../animations/header311.json";
import header from "../animations/header.json";
import typingAnim from "../animations/typing.json";
import fill from "../animations/fill.json";

const RegisterScreen = (props) => {
  const [typing_email, setTemail] = useState(false);
  const [typing_password, setTpassword] = useState(false);
  const [typing_username, setTusername] = useState(false);

  const [enable, setEnable] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [existMsg, setExistMsg] = useState(false);
  const [check, setCheckFlag] = useState(false);

  const [set_fill, setT_fill] = useState(false);
  const [set_fill_e, setE_fill] = useState(false);
  const [set_fill_p, setP_fill] = useState(false);

  const animation_login = useRef(new Animated.Value(width - 40)).current;

  const sendRegister = async (props) => {
    validate_field();
    setCheckFlag(true);
    fetch(BASE_URL_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        try {
          setCheckFlag(false);
          await AsyncStorage.setItem("token", data.token);
          _animation();
          setTimeout(() => {
            props.navigation.navigate("home");
          }, 2000);
        } catch (e) {
          console.log("error catched", e);
        }
      })
      .catch((err) => {
        setExistMsg(true);

        setTimeout(() => {
          setCheckFlag(false);
        }, 1400);
      });

    console.log(email, password, username);
  };

  const _disableFoucus = () => {
    setTemail(false);
    setTusername(false);
    setTpassword(false);
  };
  const _foucus = (value) => {
    _disableFoucus();

    switch (value) {
      case "username":
        setTusername(true);
        break;

      case "email":
        setTemail(true);
        break;

      case "password":
        setTpassword(true);
        break;

      default:
        _disableFoucus();
        break;
    }
  };

  const fill_anim = () => {
    // setemail_fill(false)
    setTimeout(() => {
      setT_fill(false);
      setE_fill(false);
      setP_fill(false);
    }, 700);

    return (
      <View style={{ position: "absolute", flex: 1, left: -5, marginTop: 30 }}>
        <Lottie
          source={fill}
          autoPlay
          loop={false}
          style={{ width: 70, height: 70 }}
        />
      </View>
    );
  };

  const _typing = () => {
    return (
      <View
        style={{ position: "absolute", flex: 1, right: -20, marginTop: 23 }}
      >
        <Lottie
          source={typingAnim}
          autoPlay
          loop={true}
          style={{ width: 70, height: 70 }}
        />
      </View>
    );
  };

  const _animation = () => {
    if (validate_field()) {
      Animated.timing(animation_login, {
        toValue: 40,
        duration: 400,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        setEnable(false);
        setTemail(false);
        setTusername(false);
        setTpassword(false);
      }, 150);
    }
  };

  const validate_field = () => {
    if (username == "") {
      console.log("please fill username");
      setE_fill(true);
      return false;
    } else {
      setE_fill(false);
    }

    if (email == "") {
      console.log("please fill email");
      setT_fill(true);
      return false;
    } else {
      setT_fill(false);
    }

    if (password == "") {
      setP_fill(true);
      console.log("please fill password");
      return false;
    } else {
      setP_fill(false);
    }

    return true;
  };

  const calling_validate_field = () => {
    if (validate_field()) {
      console.log("created account normally");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: "height",
        android: "height",
      })}
      keyboardVerticalOffset={Platform.select({ ios: -135, android: -50 })}
      style={styles.container}
    >
      <View style={styles.footer_register}>
        <Animatable.View
          style={{ alignSelf: "center", justifyContent: "center", top: 10 }}
          animation="bounceInRight"
          duration={1200}
          delay={300}
        >
          <ImageBackground
            style={{
              top: Platform.OS === "ios" ? 30 : -10,
              left: Platform.OS === "ios" ? -50 : 0,
              width: Platform.OS === "ios" ? 180 : 300,
              height: Platform.OS === "ios" ? 120 : 180,
            }}
            source={require("../images/register.png")}
          ></ImageBackground>
        </Animatable.View>
        <Animatable.Text
          style={[
            styles.titleStyle,
            {
              top: Platform.OS === "ios" ? 0 : -5,
              left: Platform.OS === "ios" ? 90 : 5,
            },
          ]}
          animation="pulse"
          easing="ease-out"
          delay={100}
          iterationCount="infinite"
        >
          Sign Up
        </Animatable.Text>

        <Animatable.View
          style={styles.action}
          animation="bounceIn"
          duration={1400}
          delay={100}
        >
          <TextInput
            label="Username"
            theme={{
              colors: {
                text: "#5A6BA7",
                background: "#0000",
                primary: "#5A6BA7",
              },
            }}
            value={username}
            placeholder="Your Name.."
            style={styles.textInput}
            onFocus={() => _foucus("username")}
            onChangeText={(text) => setUsername(text)}
          />
          {set_fill_e === true ? fill_anim() : null}

          {typing_username ? _typing() : null}
        </Animatable.View>

        <Animatable.View
          style={styles.action}
          animation="bounceIn"
          duration={1800}
          delay={100}
        >
          <TextInput
            label="Email"
            theme={{
              colors: {
                text: "#5A6BA7",
                background: "#0000",
                primary: "#5A6BA7",
              },
            }}
            placeholder="Your email.."
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => _foucus("email")}
          />
          {set_fill === true ? fill_anim() : null}
          {typing_email ? _typing() : null}
        </Animatable.View>

        <Animatable.View
          style={styles.action}
          animation="bounceIn"
          duration={2200}
          delay={100}
        >
          <TextInput
            label="Password"
            theme={{
              colors: {
                text: "#5A6BA7",
                background: "#0000",
                primary: "#5A6BA7",
              },
            }}
            secureTextEntry
            placeholder="password.."
            style={{
              flex: 1,
              width: 10,
              height: 65,
              marginTop: 5,

              paddingBottom: 5,
              color: "gray",
            }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => _foucus("password")}
          />
          {set_fill_p === true ? fill_anim() : null}
          {typing_password ? _typing() : null}
        </Animatable.View>

        <TouchableOpacity onPress={() => sendRegister(props)}>
          <Animatable.View
            style={styles.button_container}
            animation="bounceIn"
            duration={1400}
            delay={400}
          >
            <Animated.View
              style={[
                styles.animation,
                {
                  width: animation_login,
                },
              ]}
            >
              {enable ? (
                <Text style={styles.textLogin}>Sign Up</Text>
              ) : (
                <Animatable.View animation="bounceIn" delay={50}>
                  <FontAwesome name="check" color="white" size={20} />
                </Animatable.View>
              )}
            </Animated.View>
          </Animatable.View>
        </TouchableOpacity>

        <Animatable.View
          style={styles.button_container}
          animation="bounceIn"
          duration={1400}
          delay={300}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text style={{ color: "black", fontSize: 20 }}>or</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonchangescreen}
            onPress={() => props.navigation.navigate("signin")}
          >
            <Text style={styles.textSignUp}>Sign In</Text>
          </TouchableOpacity>
        </Animatable.View>

        {check &&
          existMsg &&
          username !== "" &&
          email !== "" &&
          password !== "" && (
            <Animatable.Text
              animation={"wobble"}
              duration={1500}
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "red",
                bottom: -25,
                alignSelf: "center",
                alignItems: "center",
                position: "absolute",
                width: 242,
                height: 30,
              }}
            >
              Username or Email already exists
            </Animatable.Text>
          )}
      </View>

      <Animatable.View
        style={styles.bottomheader}
        animation="pulse"
        easing="ease-out"
        delay={100}
        iterationCount="infinite"
      >
        <Lottie
          source={headerbottom}
          autoPlay
          loop={true}
          style={{ height: 350, alignSelf: "center" }}
        />
      </Animatable.View>
    </KeyboardAvoidingView>
  );
};

const width = Dimensions.get("screen").width;

export default RegisterScreen;
