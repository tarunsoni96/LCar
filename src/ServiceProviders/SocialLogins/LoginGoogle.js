import React, { Component } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import HelperMethods from "Helpers/Methods";
import { GoogleSignin } from "react-native-google-signin";
import Icons from "AppLevelComponents/UI/Icons";
import { Colors } from "UIProps/Colors";
import { UserInfoConsumer } from "AppLevelComponents/Contexts/CxtUserInfo";
import { storeUserInfo } from "DataManagers/UserDataManager";
import { login } from "ServiceProviders/ApiCaller";
import Loader from "AppLevelComponents/UI/Loader";
import { connect } from "react-redux";
import { SetLoggedInTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";

let currentContext;

class LoginGoogle extends Component {
  state = {
    isApiCall: false,
  };

  componentWillMount() {
    GoogleSignin.configure({
      androidClientId:'237059092365-6iutpj370453c86o2rb3oujle3bmahe9.apps.googleusercontent.com',
      offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
    });
  }

  revokeAccess = async () => {
    this.setState({ isApiCall: true });
    try {
      GoogleSignin.signIn()
        .then((data) => {
          const { photo, email, name, id } = data.user;
          let obj = {...data.user,socialType:'GMAIL'}
          this.props.idGetter(obj)
        })
        .catch((error) => {
          this.setState({ isApiCall: false });
          const { code, message } = error;
          // alert(JSON.stringify(message ))
        });
    } catch (error) {}
  };

  signIn = () => {
    this.revokeAccess();
  };

  loginApi(data) {
    this.setState({ isApiCall: false });
    this.props.SetLoggedInTrigger();
  }

  renderIcon() {
    const { iconType, image, style, size } = this.props;
    switch (iconType) {
      case "image":
        return (
          <Image
            source={require("assets/img/google.png")}
            style={[{ width: 30, height: 30 }, style]}
          />
        );
      default:
        return (
          <Icons
            lib="FontAwesome"
            size={size || 20}
            color={Colors.accent}
            name="google"
            style={[styles.socialPlatform_icon]}
          />
        );
    }
  }

  render() {
    const { backgroundViewStyle } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.signIn.bind(this)}>
        <View style={backgroundViewStyle}>
          {this.state.isApiCall ? <Loader size="small" /> : this.renderIcon()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
  },

  socialPlatform_icon: {
    fontSize: 35,
  },
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginGoogle);
