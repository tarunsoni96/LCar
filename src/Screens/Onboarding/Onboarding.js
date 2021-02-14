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
import Viewpager from "AppLevelComponents/UI/Viewpager";
import OnboardingMobileNumber from "./OnboardingMobileNumber";
import OnboardingOTP from "./OnboardingOTP";
import OnboardingUserSelection from "./OnboardingUserSelection";
import OnboardingUserProfile from "./OnboardingUserProfile";

let dummyTutors = [
  {
    instituteName: "Maruti driving school",
    carImage: require("assets/img/car.png"),
    price: `${"\u20B9"} 2,000`,
    userImage: "https://www.techvrm.com/Transporter/assets/dist/img/m1.png",
  },

  {
    instituteName: "Maruti driving school",
    carImage: require("assets/img/car.png"),
    price: `${"\u20B9"} 2,000`,
    userImage: "https://www.techvrm.com/Transporter/assets/dist/img/m1.png",
  },

  {
    instituteName: "Maruti driving school",
    carImage: require("assets/img/car.png"),
    price: `${"\u20B9"} 2,000`,
    userImage: "https://www.techvrm.com/Transporter/assets/dist/img/m1.png",
  },

  {
    instituteName: "Maruti driving school",
    carImage: require("assets/img/car.png"),
    price: `${"\u20B9"} 2,000`,
    userImage: "https://www.techvrm.com/Transporter/assets/dist/img/m1.png",
  },
];

@observer
class MobileScreen extends Component {
  constructor(props) {
    super(props);

    this.inputValObj = {};
    this.state = {
      isApiCall: false,
      showWhiteInput: true,
    };
  }

  onBackPress = () => {
    HelperMethods.appExitPrompter();
  };

  componentDidMount() {
    this.vpRef.scrollToIndex(0)
  }

  setGlobalRef(ref) {
    if (!this.vpRef) {
      this.vpRef = ref;
      this.forceUpdate();
    }
  }

  render() {
    let screens = [
      <OnboardingMobileNumber scrollNext={()=>this.vpRef.scrollToNext()} />,
      <OnboardingOTP scrollNext={()=>this.vpRef.scrollToNext()} scrollPrev={()=> this.vpRef.scrollToPrevious()} />,
      <OnboardingUserSelection scrollNext={()=>this.vpRef.scrollToNext()} scrollPrev={()=> this.vpRef.scrollToPrevious()} />,
      <OnboardingUserProfile scrollNext={()=>this.vpRef.scrollToNext()} scrollPrev={()=> this.vpRef.scrollToPrevious()} />,
    ];
    return (
      <Container
        scrollEnabled={true}
        safeAreaColor={Colors.screenBG}
        showHeader={false}
      >
        <NoHorizontalMarginView verticalAlso>
          <Viewpager
          scrollEnabled={false}
            screens={screens}
            onChangeIndex={(newInd) => console.warn(newInd)}
            ref={(ref) => (this.vpRef = ref)}
            preRender={0}
          />
        </NoHorizontalMarginView>
      </Container>
    );
  }
}

export default MobileScreen;
