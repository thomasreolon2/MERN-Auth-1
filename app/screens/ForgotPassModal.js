import React, { useState, useEffect, useRef } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Button,
  TouchableHiglight,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BASE_URL_DASH } from "../src/uriFetchs";
import styles from "../src/styles";
import * as Animatable from "react-native-animatable";
import Lottie from "lottie-react-native";
import typingAnim from "../animations/typing.json";
import fill from "../animations/fill.json";
import { BASE_URL_FORTGOT_PASS } from "../src/uriFetchs";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const ForgotPassModal = (props) => {
  const [email, setEmail] = useState("");
  const [set_fill, setT_fill] = useState(false);
  const [typing_email, setTemail] = useState(false);

  const [enable, setEnable] = useState(true);
  const width = Dimensions.get("screen").width - 150;
  const animation_login = useRef(new Animated.Value(width - 40)).current;

  const _disableFoucus = () => {
    setTemail(false);
  };
  const _foucus = (value) => {
    _disableFoucus();

    switch (value) {
      case "email":
        setTemail(true);
        break;

      default:
        _disableFoucus();
        break;
    }
  };

  const forgotpass_ = async (props) => {
    fetch(
      BASE_URL_FORTGOT_PASS,

      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );
  };

  const validate_field = () => {
    if (email == "") {
      console.log("please fill email");
      setT_fill(true);
      return false;
    }

    return true;
  };

  const calling_validate_field = () => {
    if (validate_field()) {
      console.log("field validate");
    }
  };
  const _animation = () => {
    //sendRegister(props);
    forgotpass_(props);
    calling_validate_field();

    Animated.timing(animation_login, {
      toValue: 40,
      duration: 250,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      setEnable(false);
      setTemail(false);
    }, 150);
  };

  const fill_anim = () => {
    // setemail_fill(false)
    setTimeout(() => {
      setT_fill(false);
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
        style={{ position: "absolute", flex: 1, right: -15, marginTop: 38 }}
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
  return (
    <View
      style={{
        flex: 1,
        zIndex: 1,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          backgroundColor: "grey",
          opacity: 0.8,
          width: "100%",
          height: "100%",
        }}
      ></View>
      <Animatable.View
        animation="flipInX"
        duration={1200}
        style={[styles.footer_forgotPassModal, { zIndex: 5 }]}
      >
        <Animatable.View
          style={[
            styles.action,
            { justifyContent: "center", alignSelf: "center" },
          ]}
          animation="bounceInRight"
          duration={1600}
          delay={400}
        >
          <TextInput
            mode="outlined"
            theme={{
              colors: {
                disabled: "#ffffff",
                primary: "#3f51b5",
                text: "#5A6BA7",
                background: "#0000",
              },
            }}
            selectionColor="blue"
            underlineColor="#5A6BA7"
            placeholder="Your email.."
            style={{
              width: 280,
              height: 50,
              marginTop: 40,

              paddingBottom: 5,
              color: "gray",
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => _foucus("email")}
          />

          {set_fill ? fill_anim() : null}

          {typing_email ? _typing() : null}
        </Animatable.View>
        <TouchableOpacity
          style={{
            position: "absolute",
            paddingTop: 6,
            right: 10,
            zIndex: 10,
            width: 25,
            height: 25,
          }}
          onPress={() => {
            props.closeModal();
          }}
        >
          <AntDesign name="close" size={25} color={"#000000"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _animation()}>
          <Animatable.View
            style={{
              height: 70,

              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
            animation="flipInY"
            duration={700}
          >
            <Animated.View
              style={[
                styles.animation,
                {
                  bottom: 10,
                  paddingBottom: 10,
                  width: animation_login,
                },
              ]}
            >
              {enable ? (
                <Text style={styles.textLogin}>Send</Text>
              ) : (
                <Animatable.View animation="bounceIn" delay={50}>
                  <FontAwesome name="check" color="white" size={20} />
                </Animatable.View>
              )}
            </Animated.View>
          </Animatable.View>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default ForgotPassModal;
