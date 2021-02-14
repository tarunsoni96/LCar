import React, { Component } from "react";
import { BackHandler } from "react-native";
import { navigate, navigationRef } from "../../RootNavigation";


let isTransitionInProgress = false;
class BackHandlerSingleton extends Component {
  constructor(props) {
    super(props);
    this.attachBackHandler();
    // this.willFocusListener = navigationRef.current.addListener(
    //   "willFocus",
    //   this.willFocus
    // );
    // this.didFocusListener = navigationRef.current.addListener(
    //   "didFocus",
    //   this.didFocus
    // );
    // this.blurListener = navigationRef.current.addListener(
    //   "willBlur",
    //   this.willBlur
    // );
  }

  didFocus = () => {
    isTransitionInProgress = false;
    this.attachBackHandler();
  };

  willFocus = () => {
    this.attachBackHandler();
    isTransitionInProgress = true;
  };

  willBlur = () => {
    this.removeBackHandler();
  };

  componentWillUnmount() {
    this.removeBackHandler();
  }

  attachBackHandler() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  removeBackHandler() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    if (isTransitionInProgress ) {
      return true;
    } else {
      if (this.props.onBackPress) {
        this.props.onBackPress();
        return true;
      } else {
        return false;
      }
    }
  };

  render() {
    return null;
  }
}

export default BackHandlerSingleton
