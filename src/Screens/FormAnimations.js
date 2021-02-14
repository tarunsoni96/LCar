import Container from "AppLevelComponents/UI/Container";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import React, { Component } from "react";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";

let animDur = 400;
export default class FormAnimations extends Component {
  state = {
    shadowVal: new Animated.Value(1),
    animatableAnim: "",
  };

  animateShadowIn() {
    Animated.timing(this.state.shadowVal, {
      toValue: 1.06,
      duration: animDur,
    }).start();
  }

  animateShadowOut() {
    Animated.timing(this.state.shadowVal, {
      toValue: 1,
      duration: animDur,
    }).start();
  }

  render() {
    return (
      <Container headerTitle="Form Animations">
        <Animated.View
          style={{
            elevation: this.state.shadowVal,
            shadowColor: "#000",
            shadowOffset: { height: 1, width: 0 },
            shadowOpacity: 0.15,
            shadowRadius: this.state.shadowVal,
            transform: [
              {
                scaleX: this.state.shadowVal,
              },
              {
                scaleY: this.state.shadowVal,
              },
            ],
          }}
        >
          <CustomTextInput
            placeholder="Depth Effect"
            onFocus={() => this.animateShadowIn()}
            onBlur={() => this.animateShadowOut()}
          />
        </Animated.View>
        <Animatable.View
          animation={this.state.animatableAnim}
          useNativeDriver={true}
          duration={animDur}
          onAnimationEnd={() => this.setState({ animation: "" })}
        >
          <CustomTextInput
            placeholder="Attention!"
            autoFocus
            onFocus={() => this.setState({ animatableAnim: "pulse" })}
            onBlur={() => this.setState({ animatableAnim: "" })}
          />
        </Animatable.View>
      </Container>
    );
  }
}
