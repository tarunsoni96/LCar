import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import Icons from "AppLevelComponents/UI/Icons";
import CustomRadioButton from "AppLevelComponents/UI/CustomRadioButton";
import { Colors } from "UIProps/Colors";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";

export default class AddCarDetail extends Component {
  state = {
    showRightIcon: false,
  };

  
  setURI(uri, side) {
    if (side == "front") {
      this.props.imgURIGetterFront(uri);
    } else {
      this.props.imgURIGetterSide(uri);
    }
  }


  render() {
    let inputBG = Colors.signupInputColor

    return (
      <View style={{}}>
        <CustomText
          size={27}
          marginTop={20}
          text="Add Car Details"
          color="#fcfbfc"
          font={Fonts.ProximaNovaBold}
        />

        <CustomText
          size={17}
          marginTop={10}
          text={`Enter the following details`}
          color="#fcfbfc"
          font={Fonts.ProximaNovaRegular}
        />

        <View style={{ marginTop: 30, width: "91%" }}>
          <CustomTextInput
            errorValidation="fullname"
            inputValueGetter={(t) => this.props.carNameGetter(t)}
            style={{
              backgroundColor: inputBG,
            }}
            label="Car Name"
            inputColor='#000'
            errColor="white"
            placeholderColor="rgba(255, 255, 255,0.4)"
            placeholder="Your Car Name"
          />

<CustomTextInput
            inputValueGetter={(t) => this.props.carNumberGetter(t)}
            style={{
              backgroundColor: inputBG,
            }}
            label="Car's Number"
            inputColor='#000'
            errColor="white"
            placeholderColor="rgba(255, 255, 255,0.4)"
            placeholder="Your Car Number"
          />

          <CustomText
            size={20}
            marginTop={20}
            text="Car Photos"
            color="#fcfbfc"
            font={Fonts.ProximaNovaBold}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              marginTop: 20,
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ProfilePic
                uriGetter={(uri) => this.setURI(uri, "front")}
                showCam
                style={styles.imgContainer}
              />

              <CustomText
                text="Front"
                color="#fff"
                font={Fonts.ProximaNovaBold}
                marginTop={10}
              />
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ProfilePic
                uriGetter={(uri) => this.setURI(uri, "side")}
                showCam
                style={styles.imgContainer}
              />

              <CustomText
                text="Side"
                color="#fff"
                font={Fonts.ProximaNovaBold}
                marginTop={10}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: Colors.signupInputColor,

  },
});