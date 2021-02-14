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

export default class OnboardingUserSelection extends Component {
  componentDidMount() {}

  verifyOTP() {}

  selectUser(userType){
    this.props.scrollNext()
  }

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
          <Header onBack={() => scrollPrev()} title="User selection" />

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 40,
            }}
          >
            <Image
              source={require("assets/img/userSelection.png")}
              style={{ width: 290, height: 220 }}
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
              marginTop: 15,
            }}
          >
            <CustomText
              text="Who Are You?"
              size={30}
              color="#040714"
              font={Fonts.bold}
            />
            <CustomText
              text="What Kind of Service are you looking for? Please select from the options below"
              color="#444B65"
              font={Fonts.semiBold}
              style={{ marginTop: 5, marginLeft: 4 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding:20,
              paddingVertical:0,
              justifyContent: "space-between",
            }}
          >
          <TouchableWithoutFeedback onPress={()=>this.selectUser('learner')} style={{flex:1}} >

            <View style={styles.userBtn}>
              <CustomText
                text="Learner"
                color={Colors.buttonText}
                
                font={Fonts.semiBold}
                style={{ marginTop: 5, marginLeft: 4 }}
              />

              <Image
                source={require("assets/img/learnerIll.png")}
                style={{ width: 40, height: 110,margin:10,marginLeft:0 }}
                
                resizeMode="contain"
              />
            </View>
            </TouchableWithoutFeedback>

            <View style={{paddingHorizontal:25}} />

            <TouchableWithoutFeedback onPress={()=>this.selectUser('tutor')}  >

            <View style={styles.userBtn}>
              <CustomText
                text="Tutor"
                color={Colors.buttonText}
                font={Fonts.semiBold}
                style={{ marginTop: 5, marginLeft: 4 }}
              />

              <Image
                source={require("assets/img/tutorIll.png")}
                style={{ width: 40, height: 110,margin:10 }}
                resizeMode="contain"
              />
            </View>

            </TouchableWithoutFeedback>

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
    borderRadius:15,
    marginTop:40,
  },
};
