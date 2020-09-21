import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  bottomheader: {
    flex: 1,
    marginTop: 100,
    bottom: -20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 0,
  },
  header: {
    justifyContent: "space-around",
    paddingTop: 20,
    paddingBottom: 10,

    flex: 1,
    zIndex: 2,
  },
  footer_login: {
    justifyContent: "flex-end",
    flex: 2,
    top: -45,
    padding: 20,
    zIndex: 1,
  },

  footer_register: {
    justifyContent: "flex-end",
    flex: 2,
    top: -60,
    padding: 20,
    zIndex: 1,
  },
  footer_forgotPassModal: {
    width: 300,
    height: 200,
    zIndex: 9999,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  imageBackground: {
    flex: 1,
    top: -20,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 150,
  },
  title: {
    color: "black",
    fontWeight: "bold",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  textInput: {
    flex: 1,
    width: 30,
    height: 65,
    marginTop: 5,
    paddingBottom: 5,
    color: "gray",
  },
  button_container: {
    height: 70,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  animation: {
    backgroundColor: "#5A6BA7",
    paddingVertical: 7,
    marginTop: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  buttonchangescreen: {
    backgroundColor: "#fff",
    height: 40,
    width: 250,
    marginTop: 10,
    borderColor: "#5A6BA7",
    borderWidth: 2,
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  textLogin: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textSignUp: {
    color: "#5A6BA7",
    fontWeight: "bold",
    fontSize: 18,
  },
  signUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  titleStyle: {
    textAlign: "center",
    justifyContent: "center",
    color: "#5A6BA7",
    fontWeight: "bold",
    fontSize: 25,
  },
  profileImage: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#5A6BA7",
  },
});

export default styles;
