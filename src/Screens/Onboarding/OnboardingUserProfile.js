import React, { Component } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";

import { Image, TouchableWithoutFeedback, View } from "react-native";
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
import Header from "AppLevelComponents/UI/Header";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import CustomButton from "AppLevelComponents/UI/CustomButton";

class OnboardingUserProfile extends Component {
  componentDidMount() {}

  constructor(props){
      super(props)
  
      this.inputValObj = {}
      
    }
  verifyOTP() {}

  selectUser(userType) {
    this.props.scrollNext();
  }

  render() {
    const { scrollPrev } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            padding: global.contentPadding,
            paddingBottom: 0,
            flex: 1,
          }}
        >
          <Header onBack={() => scrollPrev()} title="Add Profile Details" />
          <CustomText
            text="Please Complete Your profile to Stay updated"
            color="#444B65"
            font={Fonts.semiBold}
            size={18}
            style={{ marginTop: 0, marginLeft: 4 }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop:230,
              alignItems: "center",
            }}
          >
            <CustomTextInput  inputValueGetter={text => this.inputValObj.name = text} placeholder="Full Name" />
            <View style={{ paddingHorizontal: 10 }} />
            <CustomButton icon='check' press={() => {this.props.navigation.navigate('InsideApp');  } } round />
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

  userBtn: {
    backgroundColor: "#040714",
    flex: 1,
    padding: global.contentPadding,
    borderRadius: 15,
    marginTop: 40,
  },
};
export default OnboardingUserProfile