import React, { useEffect, useState, useRef } from "react";
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
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Button,
  Modal,
  Image,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";

import AsyncStorage from "@react-native-community/async-storage";
import { BASE_URL_SIGNIN } from "../src/uriFetchs";
import { TextInput } from "react-native-paper";

import Lottie from "lottie-react-native";
import headerbottom from "../animations/header311.json";
import header from "../animations/header.json";
import typingAnim from "../animations/typing.json";
import fill from "../animations/fill.json";
import ForgotPassModal from "./ForgotPassModal";
import styles from "../src/styles";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [set_fill, setT_fill] = useState(false);
  const [set_fill_p, setT_fill_p] = useState(false);

  const [typing_email, setTemail] = useState(false);
  const [typing_password, setTpassword] = useState(false);
  const [modalForgotPass, setModalForgotPass] = useState(false);

  const [existMsg, setExistMsg] = useState(false);
  const [enable, setEnable] = useState(true);

  const animation_login = useRef(new Animated.Value(width - 40)).current;

  const _disableFoucus = () => {
    setTemail(false);
    setTpassword(false);
  };
  const _foucus = (value) => {
    _disableFoucus();

    switch (value) {
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

  const fill_anim = () => {
    // setemail_fill(false)
    setTimeout(() => {
      setT_fill(false);
      setT_fill_p(false);
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

  const validate_field = () => {
    if (email == "") {
      console.log("please fill email");
      setT_fill(true);
      return false;
    }

    if (password == "") {
      setT_fill_p(true);
      console.log("please fill password");

      return false;
    }
    return true;
  };

  const calling_validate_field = () => {
    if (validate_field()) {
      console.log("logged on account normally");
    }
  };

  const _animation = (props) => {
    if (validate_field()) {
      Animated.timing(animation_login, {
        toValue: 40,
        duration: 400,
        useNativeDriver: false,
      }).start();

      setTimeout(() => {
        setEnable(false);
        setTemail(false);
        setTpassword(false);
      }, 150);
    }
  };

  const forgotPassword = () => {
    setModalForgotPass(!modalForgotPass);
    console.log(!modalForgotPass);
  };

  const login_ = async (props) => {
    validate_field();
    fetch(BASE_URL_SIGNIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log(data);
        try {
          await AsyncStorage.setItem("token", data.token);
          _animation();
          setTimeout(() => {
            props.navigation.navigate("home");
            animation_login.setValue(width - 40);
            setEnable(true);
          }, 2000);
        } catch (e) {
          console.log("error catched", e);
        }
      });
  };

  return (
    //UI COLOR #5A6BA7
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: "height",
        android: "height",
      })}
      keyboardVerticalOffset={Platform.select({ ios: -125, android: -60 })}
      style={styles.container}
    >
      <Modal
        animationType="none"
        transparent={true}
        visible={modalForgotPass}
        onRequestClose={() => {
          setModalForgotPass(!modalForgotPass);
        }}
      >
        <ForgotPassModal
          closeModal={() => setModalForgotPass(!modalForgotPass)}
        />
      </Modal>

      <View style={styles.footer_login}>
        <Animatable.View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            top: Platform.OS === "ios" ? 0 : 10,
          }}
          animation="bounceInRight"
          duration={1200}
        >
          <ImageBackground
            style={{
              top: 50,

              width: Platform.OS === "ios" ? 160 : 285,
              height: Platform.OS === "ios" ? 140 : 235,
            }}
            source={require("../images/login.png")}
          ></ImageBackground>
        </Animatable.View>
        <Animatable.Text
          style={[
            styles.titleStyle,
            {
              top: Platform.OS === "ios" ? 10 : -20,
              left: Platform.OS === "ios" ? 40 : 75,
              fontSize: Platform.OS === "ios" ? 20 : 35,
            },
          ]}
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
        >
          Sign In
        </Animatable.Text>

        <Animatable.View
          style={styles.action}
          animation="bounceInRight"
          duration={1800}
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
            selectionColor="blue"
            placeholder="Your email.."
            style={styles.textInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => _foucus("email")}
          />

          {set_fill ? fill_anim() : null}

          {typing_email ? _typing() : null}
        </Animatable.View>

        <Animatable.View
          style={styles.action}
          animation="bounceInRight"
          duration={2200}
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
            placeholder="Your password.."
            style={styles.textInput}
            value={password}
            onChangeText={(text) => setPassword(text)}
            onFocus={() => _foucus("password")}
          />

          {set_fill_p ? fill_anim() : null}

          {typing_password ? _typing() : null}
        </Animatable.View>

        <Text
          style={{
            justifyContent: "flex-start",
            alignSelf: "flex-end",
            marginTop: 15,
            width: 140,
            zIndex: 2,
          }}
          onPress={forgotPassword}
        >
          Forgot Password?
        </Text>
        <Animatable.View
          animation="flipInY"
          duration={700}
          style={{ top: -28 }}
        >
          <TouchableOpacity
            style={{
              height: 25,
              zIndex: 3,
              alignSelf: "flex-end",
              right: Platform.OS === "ios" ? 30 : 120,
              top: 5,
            }}
            onPress={() => console.log("login with google")}
          >
            <Image
              source={require("../images/signingoogle.png")}
              style={{ height: 25, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </Animatable.View>
        <TouchableOpacity onPress={() => login_(props)}>
          <Animatable.View
            style={styles.button_container}
            animation="flipInY"
            duration={700}
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
                <Text style={styles.textLogin}>Login</Text>
              ) : (
                <Animatable.View animation="bounceIn" delay={50}>
                  <FontAwesome name="check" color="white" size={20} />
                </Animatable.View>
              )}
            </Animated.View>
          </Animatable.View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>or</Text>
        </View>

        <Animatable.View
          style={styles.button_container}
          animation="flipInY"
          duration={700}
        >
          <TouchableOpacity
            style={styles.buttonchangescreen}
            onPress={() => props.navigation.navigate("signup")}
          >
            <Text style={styles.textSignUp}>Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <View style={styles.bottomheader}>
        <Lottie
          source={headerbottom}
          autoPlay
          loop={true}
          style={{ height: 350, alignSelf: "center" }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const width = Dimensions.get("screen").width;

export default LoginScreen;
