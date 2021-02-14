import React, { Component } from "react";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import CustomText from "AppLevelComponents/UI/CustomText";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import { Button } from "react-native-elements";
import "Helpers/global";

import HelperMethods from "Helpers/Methods";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Loader from "./Loader";

export default class CustomButton extends Component {
  state = {
    animation: "",
  };
  onPress() {
    let { onPress } = this.props;
    if (!onPress) {
      alert("Provide onpress prop");
      return;
    }
    if(this.props.isApiCall){
      alert('Please wait for the current operation to be finished')
    } else {
      onPress();
    }
    Keyboard.dismiss();
  }

  componentWillReceiveProps(nextProps) {
    const { isApiCall } = nextProps;
    this.setState({ animation: isApiCall == "failed" ? "shake" : "" });
  }


  renderNormal() {
    let { text, containerStyle,white, gradStyle, half, isApiCall } = this.props;
    return (
      <Animatable.View
        animation={this.state.animation}
        useNativeDriver={true}
        duration={600}
        style={[
          {
            width: "100%",
            borderRadius: 6,
            shadowColor: "#000",
                shadowOffset: { height: 10, width: 0 },
                shadowOpacity: 0.45,
                shadowRadius: 15,
            ...containerStyle,
          },
          half && { width: widthPercentageToDP(38), alignSelf: "flex-end" },
        ]}
      >
        <TouchableWithoutFeedback onPress={() => this.onPress()}>
          <LinearGradient
            useAngle={true}
            angle={90}
            angleCenter={{ x: 0.2, y: 0.15 }}
            colors={white ? ['#fff','#fff'] : [Colors.accent, Colors.accentLight]}
            style={[
              styles.btn,
              {
                padding: 15,
                borderRadius:10,
                alignItems: "center",
                ...gradStyle,
              },
            ]}
          >
            {isApiCall ? (
              <Loader size={wp(4.5)}  color={"#fff"} />
            ) : (
              <CustomText
                font={Fonts.ProximaNovaRegular}
                text={text || "Button"}
                letterSpacing={0.5}
                size={wp(4.5)}
                color={white ? '#231f20'  : "#fff"}
                marginBottom={heightPercentageToDP(-0.5)}
              />
            )}
          </LinearGradient>
        </TouchableWithoutFeedback>
      </Animatable.View>
    );
  }
  render() {
    let { showGradient } = this.props;
    return <>{this.renderNormal()}</>;
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  button: {
    height: "44rem",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },

  btn: {
    borderRadius: 6,
    elevation: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: "black",
    shadowOpacity: 1,
  },
});
