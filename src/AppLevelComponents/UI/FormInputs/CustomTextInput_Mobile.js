import React, { Component } from "react";
import { Image, TextInput, StyleSheet, View } from "react-native";

import { Colors } from "UIProps/Colors";
import InputValidations from "Helpers/InputValidations";
import CountryPicker, {
  Flag,
  FlagButton,
  getAllCountries,
} from "react-native-country-picker-modal";
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

export default class CustomTextInput_Mobile extends Component {
  state = {
    error: "",
    wantToEdit: undefined,
    text: "",
    selectedCountry: { cca2: "IN", callingCode: "91" },
    showCountryCodeModal: false,
  };

  componentDidMount() {
    if (this.props.setRef) this.props.setRef(this.inputRef);

    if (this.props.value) {
      this.props.inputValueGetter(this.props.value);
    }

    if (this.props.selectedCountryCode && this.props.selectedcountryAbbr) {
      let obj = {
        cca2: this.props.selectedcountryAbbr,
        callingCode: this.props.selectedCountryCode,
      };
      this.setState({ selectedCountry: obj });
    }
  }
  setText(text) {
    if (this.props.inputValueGetter == undefined) {
      alert("Please provide input value getter function to this component");
      return;
    }

    this.setState({ text, wantToEdit: true });
    InputValidations.validatePhone(text, (valid, error) => {
      if (this.state.error.length == 0 && !valid) HelperMethods.animateLayout();

      this.setState({ error });
      if (valid) {
        if (this.state.error.length > 0) HelperMethods.animateLayout();
        this.props.inputValueGetter(text);
      } else {
        
        this.props.inputValueGetter('');
      }
    });
  }

  setCountryData(country) {
    this.setState({ selectedCountry: country });
    if (this.props.countryCodeGetter && this.props.countryAbbrGetter) {
      this.props.countryCodeGetter(country.callingCode.toString())
        this.props.countryAbbrGetter(country.cca2)
    }
  }
  render() {
    let {
      value,
      keyboardType,
      style,
      placeholder,
      onSubmit,
      hideBorder,
      limit,
      countryPickerStyle,
    } = this.props;
    return (
      <View
        style={[
          {
            shadowColor: "#000",
            shadowOffset: { height: 0, width: 0 },
            shadowOpacity: 0.25,
            elevation: 1,
            shadowRadius: 1,
          },
        ]}
      >
        <CountryPicker
          placeholder=" "
          onSelect={(country) => this.setCountryData(country)}
          withCurrencyButton
          withCountryNameButton={false}
          withFlag
          withAlphaFilter
          containerButtonStyle={{ ...countryPickerStyle }}
          withCallingCode
          withModal
          visible={this.state.showCountryCodeModal}
          onClose={() => this.setState({ showCountryCodeModal: false })}
        />

        <View
          style={[
            inputContainerStyle,
            {
              flexDirection: "row",
              alignItems: "center",
              borderRadius: HelperMethods.isPlatformAndroid() ? 4 : 10,
              
            },
            !hideBorder ? {borderWidth: 0.3,
              borderColor: "#B7B7B7"} : null
          ]}
        >
         
          
          <TextInput
            ref={(ref) => (this.inputRef = ref)}
            placeholder={placeholder || "Mobile number"}
            style={[inputContainerStyle, { fontFamily: Fonts.ProximaNovaRegular, }]}
            placeholderTextColor="#898989"
            // maxLength={15}
            onChangeText={(text) => this.setText(text)}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            keyboardType={keyboardType || "default"}
            {...this.props}
            value={this.state.wantToEdit ? this.state.text : value}
          />
          {this.props.rightContent}
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

        {/* {forceErr ? (
          <CustomText
            size={14}
            font={Fonts.regular}
            style={inputErrorStyle}
            text={forceErr}
            color="red"
          />
        ) : null}

        */}
        {this.state.error && this.state.text ? (
          <CustomText
            size={14}
            style={{ margin: 0}}
            marginTop={15}
            font={Fonts.ProximaNovaRegular}
            text={this.state.error}
            color="rgb(234, 67, 53)"
          />
        ) : null}
      </View>
    );
  }
}
