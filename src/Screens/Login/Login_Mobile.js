import React, { Component } from "react";
import { StyleSheet, View, StatusBar, ImageBackground } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import Logo from "AppLevelComponents/UI/Logo";
import "Helpers/global";
import ScreenMemory from "AppLevelComponents/UI/ScreenMemory";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import LottieView from "lottie-react-native";

import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import CustomTextInput_Mobile from "AppLevelComponents/UI/FormInputs/CustomTextInput_Mobile";
import LoginFacebook from "ServiceProviders/SocialLogins/LoginFacebook";
import LoginGoogle from "ServiceProviders/SocialLogins/LoginGoogle";
import LoginApple from "ServiceProviders/SocialLogins/LoginApple";
import { checkForEmptyKeys } from "ServiceProviders/InputsNullChecker";
import { ApolloConsumer, gql } from "@apollo/client";
import { mutateGraph, queryGraph } from "ServiceProviders/GraphQLCaller";
import {
  SchemeGetUserData,
  SchemeSendOTP,
} from "ServiceProviders/GraphQLSchemes";
import CustomAlertView from "AppLevelComponents/UI/CustomAlertView";
import { Colors } from "UIProps/Colors";
import HelperMethods from "Helpers/Methods";
import { connect } from "react-redux";
import {
  ShowAlertTrigger,
  SetSocialSignupDataTrigger,
  SetLoggedInTrigger,
} from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";

class Login_Mobile extends Component {
  state = {
    isApiCall: undefined,
  };

  constructor(props) {
    super(props);
    this.apolloClient = null;
    this.inputValObj = { mobile: "", countryCode: "91", countryAbbr: "IN" };
  }

  login = () => {
    let { errorString, anyEmptyInputs } = checkForEmptyKeys(this.inputValObj);
    if (anyEmptyInputs.length > 0) {
      alert(errorString);
    } else {
      this.setState({ isApiCall: true });
      this.sendOTP();
    }
  };

  sendOTP() {
    let vars = {
      country_code: this.inputValObj.countryCode.toString(),
      mobile_number: this.inputValObj.mobile,
    };
    mutateGraph(this.apolloClient, vars, SchemeSendOTP)
      .then((res) => {
        this.setState({ isApiCall: false });
        if (res.sendOtp) {
          this.props.navigation.navigate("Login_OTPVerification", {
            mobile: this.inputValObj.mobile,
            countryAbbr: this.inputValObj.countryAbbr,
            countryCode: this.inputValObj.countryCode.toString(),
          });
        }
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
      });
  }

  navigateForgotPass = () => {
    this.props.navigation.navigate("forgotPassword");
  };

  checkIfSocialSignedUp(data) {
    let vars = {
      social_id: data.id,
    };
    const checkSocial = gql`
      query checkSocial($social_id: String!) {
        checkSocial(social_id: $social_id) {
          is_user_exist
          auth_token
        }
      }
    `;
    queryGraph(this.apolloClient, vars, checkSocial)
      .then((res) => {
        if (!res.checkSocial.is_user_exist) {
          this.setState({ isSocialLogin: true });
          this.props.SetSocialSignupDataTrigger(data);
          HelperMethods.animateLayout();
          this.props.ShowAlertTrigger({
            desc: "Please verify your mobile number to continue",
          });
        } else {
          this.fetchUserData(res.checkSocial.auth_token);
        }
      })
      .catch((err) => {
        this.setState({ isSocialLogin: false });
        alert(JSON.stringify(err));
      });
  }

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

  cancelSocialSignup() {
    this.props.SetSocialSignupDataTrigger({});
    HelperMethods.animateLayout();
    this.setState({ isSocialLogin: false });
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          this.apolloClient = client;
          return (
            <ScreenMemory screen="login">
              <Container
                barStyle="dark-content"
                isFullScreen
                showHeader={false}
              >
                <NoHorizontalMarginView
                  verticalAlso
                  style={{ height: global.deviceHeight / 2.2 }}
                >
                  <ImageBackground
                    source={require("assets/img/introImg.png")}
                    style={{
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                    {/* <LottieView style={{
                    width:global.deviceWidth,
                    }} source={require('assets/lotties/plexus_.json')} autoPlay loop /> */}

                    {/* <Logo type="opaqueBG" /> */}
                  </ImageBackground>
                </NoHorizontalMarginView>

                <CustomText
                  size={27}
                  marginTop={20}
                  text="Welcome to LCar"
                  color="rgb( 35, 31, 32)"
                  font={Fonts.ProximaNovaBold}
                />
                <CustomText
                  size={17}
                  marginTop={20}
                  text="Find nearby driving schools and car tutors or register as a car tutor"
                  color="rgb( 35, 31, 32)"
                  font={Fonts.ProximaNovaRegular}
                />
                <View style={{ marginTop: 10 }} />

                <CustomTextInput_Mobile
                  inputValueGetter={(text) => {
                    this.inputValObj.mobile = text;
                    text.length == 10 ? this.login() : {};
                  }}
                  countryCodeGetter={(cc) =>
                    (this.inputValObj.countryCode = cc)
                  }
                  countryAbbrGetter={(cc) =>
                    (this.inputValObj.countryAbbr = cc)
                  }
                  keyboardType="phone-pad"
                  onSubmit={() => this.login()}
                />

                <CustomButton
                  text="Send OTP"
                  isApiCall={this.state.isApiCall}
                  onPress={() => this.login()}
                  gradStyle={{
                    marginTop: 26,
                    alignSelf: "center",
                    width: "50%",
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 30,
                  }}
                >
                  <View
                    style={{ backgroundColor: "#eee", flex: 1, height: 1 }}
                  />
                  <CustomText
                    text="Continue with"
                    style={{
                      backgroundColor: "white",
                      marginHorizontal: 10,
                    }}
                    color="#777777"
                  />
                  <View
                    style={{ backgroundColor: "#eee", flex: 1, height: 1 }}
                  />
                </View>

                <View style={{ alignItems: "center" }}>
                  {this.state.isSocialLogin ? (
                    <CustomText
                      text="Cancel social signup"
                      marginTop={20}
                      color={Colors.accentLight}
                      size={20}
                      onPress={() => this.cancelSocialSignup()}
                    />
                  ) : (
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <LoginFacebook
                        idGetter={(data) => this.checkIfSocialSignedUp(data)}
                        backgroundViewStyle={[
                          styles.socialLoginBG,
                          { marginHorizontal: 20, marginLeft: 0 },
                        ]}
                      />
                      <LoginGoogle
                        idGetter={(data) => this.checkIfSocialSignedUp(data)}
                        backgroundViewStyle={styles.socialLoginBG}
                        iconType="image"
                      />
                    </View>
                  )}
                </View>
              </Container>
            </ScreenMemory>
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
    fontWeight: "bold",
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
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),
    SetSocialSignupDataTrigger: (obj) =>
      dispatch(SetSocialSignupDataTrigger(obj)),
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login_Mobile);
