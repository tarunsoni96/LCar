import React, { Component } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Container from "AppLevelComponents/UI/Container";
import Fonts from "UIProps/Fonts";
import NetworkAwareContent from "AppLevelComponents/UI/NetworkAwareContent";
import LinearGradient from "react-native-linear-gradient";

import HelperMethods from "../../Helpers/Methods";
import SubHeader from "../../AppLevelComponents/UI/SubHeader";
import MobxStore from "StorageHelpers/MobxStore";
import { observer } from "mobx-react";
import "Helpers/global";
import Constants from "Helpers/Constants";
import { apiFuncGet } from "ServiceProviders/ApiCaller";
import { FlatList } from "react-native";
import { Card } from "react-native-elements";
import Icons from "AppLevelComponents/UI/Icons";
import { Colors } from "UIProps/Colors";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native";
import FirstName from "AppLevelComponents/UI/FormInputs/FirstName";
import CardSwiper from "AppLevelComponents/UI/CardSwiper";
import { ImageBackground } from "react-native";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import { widthPercentageToDP } from "react-native-responsive-screen";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import RNSimData from "react-native-sim-data";
import Header from "AppLevelComponents/UI/Header";

export default class OnboardingOTP extends Component {
  componentDidMount() {}

  verifyOTP() {}
  render() {
    const { scrollPrev } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: global.contentPadding,
            paddingBottom: 0,
            borderBottomWidth:1,
            borderBottomColor:'#eee',
            backgroundColor: "#FCFCFD",
          }}
        >
          <Header onBack={() => scrollPrev()} title="OTP Verification" />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <Image
              source={require("assets/img/otpImage.png")}
              style={{ width: 250, height: 220 }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            
            padding: global.contentPadding,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <OTPInputView
              style={{ flex: 0.92, height: 100 }}
              pinCount={4}
              autoFocusOnLoad={false}
              codeInputHighlightStyle={{
                // elevation:1,
                shadowColor: "#000",
                shadowOffset: { height: 1, width: 0 },
                shadowOpacity: 0.15,
                shadowRadius: 2,
              }}
              codeInputFieldStyle={styles.inputStyle}
              onCodeFilled={(code) => {
                this.verifyOTP(code);
              }}
            />
            <CustomButton press={()=>this.props.scrollNext()} round />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <CustomText text="Didn’t get OTP?" />
            <CustomText text=" Resend" color="#4D8AF0" />
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 15,
              alignItems: "center",
            }}
          >
            <CustomText text="Wrong number?" />
            <CustomText text=" Start again" color="#4D8AF0" />
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    fontFamily: Fonts.heavy,
    color: Colors.inputTextColor,
    width: 55,
    borderRadius: 14,
    fontSize: 17,
    height: 50,
  },
};
