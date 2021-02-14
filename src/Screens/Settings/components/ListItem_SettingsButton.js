import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import { Colors } from "UIProps/Colors";
import Icons from "AppLevelComponents/UI/Icons";
export default function ListItem_SettingsButton({
  title,
  image,
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor:  "#fff" },
      ]}
    >

<View style={{flexDirection:'row',alignItems:'center',}} >

<Image
        source={ image }
        style={{width:23,height:23,marginRight:20,borderColor:  "#fff" }}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <CustomText
          color={"#231f20"}
          size={19}
          font={Fonts.ProximaNovaSemiBold}
          text={title}
        />
            </View>

            <Icons lib="Entypo" name='chevron-right' color='#222222' size={19} />
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { height: 2, width: 0 },
    margin: global.contentPadding,
    marginTop: 0,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    padding: 20,
    marginBottom: 20,
    paddingVertical:25,
  },

  image: {
    width: 80,
    borderRadius: 12,
    marginRight: 20,
    height: 75,
    borderWidth: 1,
  },
});
