import React, { Component } from "react";
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
import RNSimData from 'react-native-sim-data'
export default class OnboardingMobileNumber extends Component {

  state = {
    focus:false,
  }
  constructor(props){
      super(props)
  
      this.inputValObj = {}
      
    }
  componentDidMount(){
    setTimeout(() => {
      // this.inputRef.focus()
    }, 4000);
  }


    render() {
      const {scrollNext} = this.props
        return (
            <LinearGradient
              useAngle={true}
              angle={180}
              angleCenter={{ x: 0.25, y: 0.25 }}
              colors={["#F5FF00", "#FFE200"]}
              style={[
                {
                  flex: 1,
                  height: global.deviceHeight,
                },
              ]}>
              <ImageBackground
                source={require("assets/img/cartutorial.png")}
                style={{
                  height: "70%",
                  marginTop: 0,
                  padding: global.contentPadding,
                }}
              >
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <CustomText
                    text="Welcome To"
                    color="#040714"
                    size={30}
                    font={Fonts.bold}
                  />
                  <CustomText
                    text="Driving School"
                    color="#040714"
                    size={37}
                    font={Fonts.black}
                  />
                  <CustomText
                    text="Start learning with us"
                    color="#040714"
                    style={{ marginVertical: 6 }}
                    size={25}
                    font={Fonts.semiBold}
                  />
                  <CustomText
                    text="Enter your contact details below to get started"
                    color="#040714"
                    style={{ bottom: 0, marginVertical: 10 }}
                    size={20}
                    font={Fonts.regular}
                  />
                </View>
              </ImageBackground>
  
              <View style={{ padding: global.contentPadding }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomTextInput
                  setRef={ref => this.inputRef = ref}
                    autoFocus={this.state.focus}
                    keyboardType="numeric"
                    inputValueGetter={(text) =>
                      (this.inputValObj.mobileNumber = text)
                    }
                  />
                  <View style={{ paddingHorizontal: 5 }} />
  
                  <CustomButton round press={() => scrollNext()} />
                </View>
  
                <CustomText
                  font={Fonts.regular}
                  color="#444B65"
                  size={16}
                  style={{ marginTop: 30 }}
                  text="By proceeding, I agree to terms & conditions and Privacy Policy."
                />
              </View>
            </LinearGradient>
        )
    }
}
