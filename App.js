import React, { Component } from "react";
import { UIManager } from "react-native";
import AppRoot from "./src/AppRoot";
import SplashScreen from "react-native-splash-screen";
import PushNotification from "./src/ServiceProviders/PushNotfication";
import HelperMethods from "Helpers/Methods";
import { MenuProvider } from "react-native-popup-menu";
import { UserInfoProvider } from "./src/AppLevelComponents/Contexts/CxtUserInfo";
import { enableScreens } from "react-native-screens";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import Constants from "Helpers/Constants";
import CustomAlertView from "AppLevelComponents/UI/CustomAlertView";
import { connect } from "react-redux";

const client = new ApolloClient({
  uri: Constants.baseUrl+"/api/auth",
  cache: new InMemoryCache(),
});

class App extends Component {
  componentDidMount() {
    enableScreens(true);
    SplashScreen.hide();
    HelperMethods.isPlatformAndroid() &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRoot />
        {this.props.isAlertShown ? 
        (<CustomAlertView />) : null
        }
      </ApolloProvider>
    );
  }
}


const mapStateToProps = (state) =>{
  return {
    isAlertShown:state.reducer.isAlertShown
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

