import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  PixelRatio,
} from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Swiper from "react-native-swiper";

import Logo from "AppLevelComponents/UI/Logo";
import HorizontalScrollView from "AppLevelComponents/UI/HorizontalScrollView";
import "Helpers/global";
import ScreenMemory from "AppLevelComponents/UI/ScreenMemory";
import { login } from "ServiceProviders/ApiCaller";
import { storeUserInfo } from "DataManagers/UserDataManager";
import { UserInfoConsumer } from "../../AppLevelComponents/Contexts/CxtUserInfo";
import AsyncStorageHandler from "../../StorageHelpers/AsyncStorageHandler";
import { Colors } from "UIProps/Colors";
import Constants from "../../Helpers/Constants";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomButton from "AppLevelComponents/UI/CustomButton";

import Header from "AppLevelComponents/UI/Header";
import HelperMethods from "Helpers/Methods";
import LinearGradient from "react-native-linear-gradient";
import ProgressStepsBar from "AppComponents/ProgressStepsBar";
import AddPersonalDetails from "./Steps/AddPersonalDetails";
import metrics from "Helpers/metrics";
import AddCarDetail from "./Steps/AddCarDetail";
import { connect } from "react-redux";
import {
  SetLoggedInTrigger,
  ShowAlertTrigger,
} from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import CourseDetails from "./Steps/CourseDetails";

let maxTime = 30;
let valObj = {
  email: "",
  password: "",
};
const timer = require("react-native-timer");

let currentContext;

class ProfileBuilding extends Component {
  state = {
    isApiCall: undefined,
    timer: maxTime,
    timerStarted: false,
    currentStep: 0,
  };

  constructor(props) {
    super(props);

    this.stepsData = {};
  }

  componentDidMount() {}

  verify = () => {
    alert("Verify");
    return;
    this.setState({ isApiCall: true });
    login(valObj.email, valObj.password)
      .then((resp) => {
        this.setState({ isApiCall: false });
        currentContext.setUserData(resp);
        storeUserInfo(resp).then(() => {
          AsyncStorageHandler.get(Constants.canResetPass, (val) => {
            if (val != null) {
              if (val == "true") {
                this.props.navigation.navigate("resetPassword");
              }
            } else {
              this.props.navigation.navigate("DashboardStack");
            }
          });
        });
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  };

  navigateForgotPass = () => {
    this.props.navigation.navigate("forgotPassword");
  };

  resendOTP() {
    this.startTimer();
  }

  startTimer() {
    HelperMethods.animateLayout();

    this.setState({ timerStarted: true }, () =>
      timer.setInterval(this, "resendTimer", () => this.reduceTime(), 1000)
    );
  }

  reduceTime() {
    if (this.state.timer != 0) {
      this.setState({ timer: this.state.timer - 1 });
    } else {
      HelperMethods.animateLayout();
      this.setState({ timerStarted: false, timer: maxTime });
      this.clearTimeout();
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    timer.clearInterval(this);
  }

  moveNext() {
    switch (this.hs.getIndex()) {
      case 0:
        if (
          !this.stepsData.fullName ||
          !this.stepsData.email ||
          !this.stepsData.drivingLicenceImgFront ||
          !this.stepsData.drivingLicenceImgBack
        ) {
          this.showErrorAlert();
          return;
        }
        break;

      case 1:
        if (
          !this.stepsData.carName ||
          !this.stepsData.carNumber ||
          !this.stepsData.carImgFront ||
          !this.stepsData.carImgSide
        ) {
          this.showErrorAlert();
          return;
        }
        break;

      case 2:
        if (
          !this.stepsData.courseDuration ||
          !this.stepsData.courseFee ||
          !this.stepsData.courseLocation
        ) {
          this.showErrorAlert();

          return;
        }
        break;

      default:
        break;
    }
    if (this.hs.getIndex() == 2) {
      this.hs.scrollToIndex(0);
      alert('Signup done')
      return
      this.props.navigation.navigate("SelectPreferences", {
        stepsData: this.stepsData,
        ...this.props.route.params,
      });
    } else {
      this.hs.scrollToNext();
      this.setState({ currentStep: this.hs.getIndex() + 1 });
    }
  }

  showErrorAlert() {
    this.props.ShowAlertTrigger({ desc: "Please fill in the details" });
  }

  moveBack() {
    if (this.hs.getIndex() == 0) {
      this.props.navigation.navigate("Login_Mobile");
    } else {
      this.hs.scrollToPrevious();
      this.setState({ currentStep: this.hs.getIndex() - 1 });
    }
  }

  render() {
    let stepScreens = [
      <AddPersonalDetails
        imgURIGetterFront={(uri) =>
          (this.stepsData.drivingLicenceImgFront = uri)
        }
        imgURIGetterBack={(uri) => (this.stepsData.drivingLicenceImgBack = uri)}
        emailGetter={(text) => (this.stepsData.email = text)}
        fullNameGetter={(text) => (this.stepsData.fullName = text)}
      />,
      <AddCarDetail
        carNameGetter={(g) => (this.stepsData.carName = g)}
        carNumberGetter={(text) => (this.stepsData.carNumber = text)}
        imgURIGetterFront={(uri) => (this.stepsData.carImgFront = uri)}
        imgURIGetterSide={(uri) => (this.stepsData.carImgSide = uri)}
      />,
      <CourseDetails
        courseDurationGetter={(g) => (this.stepsData.courseDuration = g)}
        courseFeeGetter={(text) => (this.stepsData.courseFee = text)}
        courseLocationGetter={(text) => (this.stepsData.courseLocation = text)}
      />,
    ];

    return (
      <>
        <Container
          onBackPress={() => this.moveBack("")}
          isFullScreen
          barStyle="dark-content"
          safeAreaColorBottom={Colors.accent}
          showHeader={false}
        >
          <NoHorizontalMarginView verticalAlso style={{ flex: 1 }}>
            <ImageBackground
              source={require("assets/img/addDetailsBG.png")}
              imageStyle={{ height: global.deviceHeight / 2 }}
              style={{
                flex: 1,
                paddingRight: 0,
              }}
            >
              <LinearGradient
                style={{
                  position: "absolute",
                  bottom: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                }}
                colors={["rgba(10, 112, 184,0)", Colors.accent]}
                locations={[
                  metrics.isGiganticScreen ? 0.2 : 0.2,
                  metrics.isGiganticScreen ? 0.36 : 0.1,
                ]}
                useAngle={true}
                angle={180}
                pointerEvents={"none"}
              />

              <View
                style={{
                  alignItems: "center",
                  marginTop: 180,
                  justifyContent: "flex-end",
                }}
              >
                <Logo
                  logo={require("assets/img/logoWhite.png")}
                  type="transparentBG"
                />
              </View>

              <View style={{ padding: global.contentPadding, marginTop: 30 }}>
                <ProgressStepsBar currentPosition={this.state.currentStep} />

                <HorizontalScrollView
                  screens={stepScreens}
                  scrollEnabled={false}
                  onChangeIndex={(newInd) => console.log(newInd)}
                  ref={(ref) => (this.hs = ref)}
                  preRender={1}
                />
              </View>
            </ImageBackground>
          </NoHorizontalMarginView>
        </Container>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            backgroundColor: Colors.accent,
          }}
        >
          <CustomButton
            text="Next"
            white
            onPress={() => this.moveNext()}
            gradStyle={{
              marginBottom: 0,
              alignSelf: "center",
              width: "60%",
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            top: 90,
            left: global.contentPadding,
            padding: 20,
            paddingLeft: 0,
          }}
        >
          <Header onBack={() => this.moveBack()} backColor="#000" hideTitle />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  socialLoginBG: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    width: 65,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  inputStyle: {
    color: "#000",
    fontFamily: Fonts.ProximaNovaRegular,
    fontSize: 17,
    width: 50,
    height: 50,
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedIn: (obj) => dispatch(SetLoggedInTrigger(obj)),
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileBuilding);
