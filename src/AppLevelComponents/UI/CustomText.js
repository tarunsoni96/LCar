import React, { Component } from "react";
import { Text, Image } from "react-native";
import "Helpers/global";
import "Helpers/Methods";
import EStyleSheet from "react-native-extended-stylesheet";
import { LanguageConsumer } from "AppLevelComponents/LanguageSelector/LanguageContext";
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";
import HelperMethods from "Helpers/Methods";
import Constants from "Helpers/Constants";
import { widthPercentageToDP, heightPercentageToDP } from "react-native-responsive-screen";


export default class CustomText extends Component {
  render() {
    let {
      size,
      onPress,
      textAlign,
      type,
      color,
      marginTop,
      font,
      padding,
      numberOfLines,
      fit,
      text,
      style,
      regular
    } = this.props;
    let rem = global.rem;

    padding = padding == undefined && 1
    
    return (
      <LanguageConsumer>
        {context => {
          
          return (
            <Text
              adjustsFontSizeToFit={fit}
              numberOfLines={fit ? 1 : numberOfLines}
              allowFontScaling={true}
              onPress={onPress ? () => onPress() : onPress}
              style={[
                styles.text,
                {
                  fontSize:size || 17,
                  color: color || Colors.textPrimary,
                  marginTop:marginTop || 0,
                  textAlign: textAlign ,
                  ...style,
                  fontFamily: font ||Fonts.ProximaNovaRegular,
                }
              ]}
            >
              {text}
            </Text>
          );
        }}
      </LanguageConsumer>
    );
  }
}

const styles = EStyleSheet.create({
  text: {
    textAlign: "center",
  }
});
