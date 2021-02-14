import React, { Component } from "react";
import { Image, TextInput, StyleSheet, View } from "react-native";

import { Colors } from "UIProps/Colors";
import InputValidations from "Helpers/InputValidations";
import {
  inputStyle,
  inputErrorStyle,
  labelStyle,
  inputContainerStyle,
} from "UIProps/Styles";
import InputIcon from "./InputIcon";
import "Helpers/global";
import HelperMethods from "Helpers/Methods";
import CustomText from "../CustomText";
import Fonts from "UIProps/Fonts";
import Icons from "../Icons";
import { TouchableWithoutFeedback } from "react-native";
import { Platform } from "react-native";

export default class CustomTextInput extends Component {
  state = {
    error: "",
    wantToEdit: false,
    text: "",
  };

  componentDidMount() {
    if (this.props.setRef) this.props.setRef(this.inputRef);

    if(this.props.value){
      this.props.inputValueGetter(this.props.value);
    }
  }
  

  setText(text) {
    if (this.props.inputValueGetter == undefined) {
      alert("Please provide input value getter function to this component");
      return;
    }

    this.setState({ text, wantToEdit: true });

    switch (this.props.errorValidation) {
      case "fullname":
        InputValidations.validationUserName(text, (valid, error) => {
          this.processErrorLogic(text, valid, error);
        });
        break;

      case "email":
        InputValidations.validateEmail(text, (valid, error) => {
          this.processErrorLogic(text, valid, error);
        });
        break;

      default:
      this.props.inputValueGetter(text);
        break;
    }
  }

  processErrorLogic(text, valid, error) {
    if (this.state.error.length == 0 && !valid) HelperMethods.animateLayout();
    this.setState({ error });
    if (valid) {
      if (this.state.error.length > 0) HelperMethods.animateLayout();
      this.props.inputValueGetter(text);
    } else {
      this.props.inputValueGetter("");
    }
  }

  render() {
    let {
      value,
      keyboardType,
      style,
      placeholder,
      onSubmit,
      limit,
      errColor,
      forceErr,
      label,
      labelColor,
      rightIcon,
      placeholderColor,
      labelFont,
      inputColor,
      err,
      leftIcon,
    } = this.props;
    return (
      <View
        style={[
          {
            marginBottom: 24,
          },
        ]}
      >
        <CustomText
          style={{ marginBottom: 14 }}
          text={label || ""}
          color={labelColor || "#fff"}
          font={labelFont || Fonts.ProximaNovaBold}
        />
        <View
          style={[
            inputContainerStyle,
            {
              flexDirection: "row",
              alignItems: "center",
              ...style,
              borderRadius: HelperMethods.isPlatformAndroid() ? 10 : 10,

            },
          ]}
        >
          {this.props.leftIcon && leftIcon}


          <TextInput
            ref={(ref) => (this.inputRef = ref)}
            placeholder={placeholder || "Mobile number"}
            placeholderTextColor={inputColor || "#898989"}
            maxLength={limit}
            onChangeText={(text) => this.setText(text)}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            keyboardType={keyboardType || "default"}
            {...this.props}
              value={this.state.wantToEdit ? this.state.text : value}
            style={[
              inputContainerStyle,
              { fontFamily: Fonts.ProximaNovaRegular, flex: 1, color:inputColor || "#fff" },
            ]}
          />

          {this.props.showRightIcon && rightIcon}
          {/* {this.state.text ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ text: "" });
                this.inputRef.focus();
              }}
            >
              <Image
                source={require("assets/img/clear.png")}
                style={{ width: 25, height: 25, marginRight: 10 }}
                resizeMode="contain"
              />
            </TouchableWithoutFeedback>
          ) : null} */}
        </View>

        {forceErr ? (
          <CustomText
            size={14}
            font={Fonts.ProximaNovaRegular}
            style={inputErrorStyle}
            text={forceErr}
            color="red"
          />
        ) : null}

        {this.state.error && this.state.text ? (
          <CustomText
            size={14}
            marginTop={10}
            font={Fonts.ProximaNovaRegular}
            text={err || this.state.error}
            color={errColor || "red"}
          />
        ) : null}
      </View>
    );
  }
}
