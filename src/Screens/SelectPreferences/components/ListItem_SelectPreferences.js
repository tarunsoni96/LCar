import React from "react";
import { View, Image, StyleSheet } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import { Colors } from "UIProps/Colors";
export default function ListItem_SelectPreferences({
  title,
  selected,
  description,
  image,
}) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: selected ? Colors.accentLight : "#fff" },
      ]}
    >
      <Image
        source={{ uri: image }}
        style={{ ...styles.image,borderRadius:15, borderColor: selected ? "#fff" : "#fff" }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <CustomText
          color={selected ? "#fff" : "#231f20"}
          size={19}
          font={Fonts.ProximaNovaBold}
          text={title}
        />
        <CustomText
          marginTop={6}
          color={selected ? "#fff" : "#231f20"}
          font={Fonts.ProximaNovaRegular}
          text={description}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    shadowOffset: { height: 2, width: 0 },
    margin: global.contentPadding,
    marginTop: 10,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 10,
    padding: 15,
    marginBottom: 20,
  },

  image: {
    width: 80,
    borderRadius: 12,
    marginRight: 20,
    height: 75,
    borderWidth: 1,
  },
});
