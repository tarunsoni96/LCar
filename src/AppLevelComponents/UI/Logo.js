import React from "react";
import { View, Text, Image } from "react-native";

import "Helpers/global";

let logoStyle = {
  width:  130,
  height: 130,
  backgroundColor: "white",
  shadowColor: "#000",
  shadowOffset: { height: 1, width: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 25,
  borderRadius: 23,
  padding: 20,
  elevation:50,
  alignItems: "center",
  justifyContent: "center",
};

OpaqueBG = (logo) => (
  <View style={logoStyle}>
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode="contain"
      source={logo || require("assets/img/logo.png")}
    />
  </View>
);

TransparentBG = (logo) => (
  <View style={[logoStyle,{backgroundColor:'rgba(255,255,255,0.4)'}]}>
    <Image
      style={{
        width: "100%",
        height: "100%",
      }}
      resizeMode="contain"
      source={logo || require("assets/img/logo.png")}
    />
  </View>
);

const Logo = ({ width, height, style, type,logo }) => {
  if (type == "opaqueBG") {
    return OpaqueBG(logo);
  } else if (type == "transparentBG") {
    return TransparentBG(logo)
  } else {
    return (
      <Image
        style={{
          ...style,
          width: width ? width : 70,
          height: height ? height : 70,
        }}
        resizeMode="contain"
        source={require("assets/img/logo.png")}
      />
    );
  }
};

export default Logo;
