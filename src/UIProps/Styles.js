import "Helpers/global";
import { StyleSheet } from "react-native";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";

export const inputStyle = {
  borderWidth: 0,
  paddingHorizontal: 10,
  fontSize: 19,
  fontFamily: Fonts.medium,
};

export let labelStyle = {
  color: "#9E9E9E",
  fontFamily: Fonts.regular,
  top:-15,
  paddingLeft: 10,
};

export let inputErrorStyle = {
  fontFamily:Fonts.regular,
  marginTop:-13,
};


export const inputContainerStyle = {
  borderRadius:10,
  height:50,
  fontSize:17,
  flex:1,
  paddingLeft:10,
  color:'#040714',
  fontFamily:Fonts.medium,
};

export const cardStyle = {
  backgroundColor: Colors.noticeMsgBox,
  alignItems: "flex-start",
  margin: 0,
  borderRadius: 5,
  marginVertical: 10,
};
export const personaContainer = {
  flex: 1,
  width: "100%",
  backgroundColor: "#f7f7f9",
};

export const containerStyle = {
  flex: 1,
  backgroundColor: "#000",
};
