import React from "react";
import { View, Image } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";

export default function SideMenuButtons({ item }) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 44 }}
    >
      <Image
        source={item.image}
        style={{ width: 20, height: 20 }}
        resizeMode="contain"
      />

      <CustomText
        text={item.name}
        style={{ marginLeft: 15 }}
        size={19}
        marginTop={3}
        font={Fonts.ProximaNovaSemiBold}
      />
    </View>
  );
}
