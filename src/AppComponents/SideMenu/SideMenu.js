import { LogoutTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import Container from "AppLevelComponents/UI/Container";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomTouchableOpacity from "AppLevelComponents/UI/CustomTouchableOpacity";
import Icons from "AppLevelComponents/UI/Icons";
import Constants from "Helpers/Constants";
import HelperMethods from "Helpers/Methods";
import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import { drawerRef, navigationRef } from "../../../RootNavigation";
import SideMenuButtons from "./components/SideMenuButtons";

let buttons = [
  {
    name: "Home",
    navigation: "Dashboard",
    image: require("assets/img/sideMenuIcons/home.png"),
  },

  {
    name: "Profile",
    navigation: "MyProfile",
    image: require("assets/img/sideMenuIcons/profile.png"),
  },
  {
    name: "Logout",
    navigation: "Home",
    image: require("assets/img/sideMenuIcons/logout.png"),
  },
];
class SideMenu extends Component {
  closeDrawer() {
    alert();
    drawerRef.current.close();
  }

  navigate(item) {
    drawerRef.current.close();
    if (item.name == "Logout") {
      HelperMethods.animateLayout();
      AsyncStorageHandler.delete(Constants.userInfoObj);
      this.props.logoutTrigger();
    } else {
      setTimeout(() => {
        navigationRef.current.navigate(item.navigation);
      }, 50);
    }
  }

  renderItem = ({ item, i }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.navigate(item)}>
        <View style={{}}>
          <SideMenuButtons item={item} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: global.contentPadding,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("assets/img/logo.png")}
              style={{ width: 100, height: 100, marginVertical: 40 }}
              resizeMode="contain"
            />
            <CustomText
              text="LCar"
              color={Colors.appColor}
              font={Fonts.ProximaNovaBold}
              size={30}
              style={{ marginLeft: 15 }}
            />
          </View>

          <Icons
            name="close"
            onPress={() => this.closeDrawer()}
            lib="Material"
            color="#000"
            size={33}
          />
        </View>
        <FlatList
          data={buttons}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => i}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutTrigger: (obj) => dispatch(LogoutTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
