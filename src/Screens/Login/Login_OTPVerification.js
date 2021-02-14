import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
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
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import CustomTextInput_Mobile from "AppLevelComponents/UI/FormInputs/CustomTextInput_Mobile";
import LoginFacebook from "ServiceProviders/SocialLogins/LoginFacebook";
import LoginGoogle from "ServiceProviders/SocialLogins/LoginGoogle";
import LoginApple from "ServiceProviders/SocialLogins/LoginApple";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Header from "AppLevelComponents/UI/Header";
import HelperMethods from "Helpers/Methods";
import { gql, ApolloConsumer } from "@apollo/client";
import { SetLoggedInTrigger, ShowAlertTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import { connect } from "react-redux";
import { SchemeSendOTP,SchemeGetUserData } from "ServiceProviders/GraphQLSchemes";

let maxTime = 30;
let valObj = {
  email: "",
  password: "",
};
const timer = require("react-native-timer");

let currentContext;

const verifyOTP = gql`
  query OtpVerification(
    $countryCode: String!
    $mobile_number: String!
    $otp: String!
  ) {
    otpVerification(
      country_code: $countryCode
      mobile_number: $mobile_number
      otp: $otp
    ) {
      is_user_exist
      auth_token
    }
  }
`;



class Login_OTPVerification extends Component {
  state = {
    isApiCall: undefined,
    timer: maxTime,
    case: "",
    timerStarted: false,
  };

  constructor(props) {
    super(props);

    this.inputValObj = {};
    this.apolloClient = null;
  }
  componentDidMount() {
    this.setState({ case: this.props.route.params.case });
  }

  verify  (code)  {
    this.setState({ code:code|| this.state.code }, () => {
      this.setState({ isApiCall: true });
      const { mobile, countryCode } = this.props.route.params;
      this.apolloClient
        .query({
          query: verifyOTP,
          variables: {
            countryCode,
            otp: this.state.code,
            mobile_number: mobile,
          },
        })
        .then((res) => {
          this.setState({ isApiCall: false });
          if (this.state.case == "mobUpdate") {
            this.props.route.params.mobVerified()
            this.props.navigation.goBack();
          } else {
            if (res.data.otpVerification.is_user_exist) {
              if(this.props.socialSignUpData.id){
                this.props.ShowAlertTrigger({desc:'You are already registered with this number'})
                return
              } else {
                this.fetchUserData(res.data.otpVerification.auth_token);
              }
            } else {
              this.props.navigation.navigate(
                "ProfileBuilding",
                this.props.route.params
              );
            }
          }
        })
        .catch((err) => {
          this.setState({ isApiCall: false });
          alert(JSON.stringify(err));
        });
    });
  };

  fetchUserData(auth) {
    this.setState({ isApiCall: false });
    this.apolloClient
      .query({
        query: SchemeGetUserData,
        variables: {
          auth_token: auth,
        },
      })
      .then((res) => {
        this.setState({ isApiCall: false });
        this.props.SetLoggedInTrigger(res.data.login);
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
        alert(JSON.stringify(err));
      });
  }

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

  render() {
    const { mobile } = this.props.route.params || {};
    return (
      <ApolloConsumer>
        {(client) => {
          this.apolloClient = client;
          return (
              <Container
                isFullScreen
                barStyle="dark-content"
                showHeader={false}
              >
                <NoHorizontalMarginView
                  verticalAlso
                  style={{ height: global.deviceHeight / 2.2 }}
                >
                  <ImageBackground
                    source={require("assets/img/whitePolygonsImg.png")}
                    style={{
                      paddingBottom: 50,
                      flex: 1,
                      padding: global.contentPadding,
                    }}
                  >
                    <View style={{ marginTop: 90 }}>
                      <Header hideTitle />
                    </View>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flex: 1,
                      }}
                    >
                      <Logo type="opaqueBG" />
                    </View>
                  </ImageBackground>
                </NoHorizontalMarginView>
                <CustomText
                  size={27}
                  marginTop={20}
                  text="OTP verification"
                  color="rgb( 35, 31, 32)"
                  font={Fonts.ProximaNovaBold}
                />
                <CustomText
                  size={17}
                  marginTop={20}
                  text={`We have sent a verification Code to`}
                  color="rgb( 35, 31, 32)"
                  font={Fonts.ProximaNovaRegular}
                />
                <CustomText
                  size={17}
                  marginTop={7}
                  text={mobile}
                  color="rgb( 35, 31, 32)"
                  font={Fonts.ProximaNovaSemiBold}
                />

                <View style={{ marginTop: 20, marginBottom: 10 }}>
                  <OTPInputView
                    style={{ height: 70 }}
                    pinCount={6}
                    autoFocusOnLoad
                    onCodeChanged={(code) =>
                      this.setState({ codeFilled: code.length == 6 })
                    }
                    codeInputFieldStyle={styles.inputStyle}
                    onCodeFilled={(code) => {
                      this.verify(code);
                    }}
                  />
                  {this.state.timerStarted && (
                    <CustomText
                      style={{ alignSelf: "flex-end" }}
                      text={`00:${this.state.timer}`}
                      color="#7d7d7d"
                      font={Fonts.ProximaNovaRegular}
                    />
                  )}
                </View>
                <CustomButton
                  text="Verify"
                  isApiCall={this.state.isApiCall}
                  onPress={() =>
                    this.state.codeFilled
                      ? this.verify()
                      : alert("Please fill in the OTP")
                  }
                  gradStyle={{
                    marginTop: 14,
                    alignSelf: "center",
                    width: "50%",
                  }}
                />

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                  }}
                >
                  {this.state.timerStarted ? (
                    <CustomText text="Code resent" style={{}} color="#7d7d7d" />
                  ) : (
                    <>
                      <CustomText
                        text="Didn’t receive the code?"
                        style={{}}
                        color="#7d7d7d"
                      />

                      <CustomText
                        text=" Resend"
                        style={{}}
                        onPress={() => this.resendOTP()}
                        font={Fonts.ProximaNovaBold}
                        color={Colors.accent}
                      />
                    </>
                  )}
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 30,
                    flexWrap: "wrap",
                  }}
                >
                  <CustomText
                    text="By signing up, I agree to"
                    style={{}}
                    font={Fonts.ProximaNovaRegular}
                    color="#7d7d7d"
                  />

                  <CustomText
                    text=" Terms and Privacy policy"
                    style={{}}
                    font={Fonts.ProximaNovaBold}
                    color={Colors.accent}
                  />
                </View>
              </Container>
          );
        }}
      </ApolloConsumer>
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
    marginLeft: 0,

    marginRight: 0,
    borderRadius: 4,
  },
});

const mapStateToProps = (state) => {
  return {
    socialSignUpData:state.reducer.socialSignUpData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login_OTPVerification);
