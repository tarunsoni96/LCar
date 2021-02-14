import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import Container from "AppLevelComponents/UI/Container";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import SvgButton from "AppLevelComponents/UI/SvgButton";
import backBtn from "assets/svgIcons/back.svg";

import Icons from "AppLevelComponents/UI/Icons";
import { navigationRef } from "../../../RootNavigation";

class Header extends Component {
  render() {
    let commonVal = widthPercentageToDP(80);
    const {
      x,
      hideBG = true,
      back,
      hideBack,
      headerContainerStyle,
      hideTitle,
      subtitleAppender,
      title,
      rightIcon,
      subTitle,
      titleStyle,
      marginBottom,
      backColor,
      onBack,
    } = this.props;
    return (
      <NoHorizontalMarginView verticalAlso>
        <View
          style={{
            marginBottom: hideBG
              ? widthPercentageToDP(2)
              : marginBottom || widthPercentageToDP(63),
              
          }}
        >
          <View
            style={{
              marginTop:20,

              ...headerContainerStyle,
            }}
          >
            <View style={styles.headerTop}>
              {!hideBack ? (
                <TouchableOpacity
                  style={{ width: 40, height: 40,alignItems:'center',justifyContent:'center' }}
                  onPress={() =>
                    onBack ? onBack() : navigationRef.current.goBack()
                  }
                >
                  <Icons
                    lib="Entypo"
                    color={backColor || '#040714'}
                    size={33}
                    name={"chevron-left"}
                  />
                </TouchableOpacity>
              ) : null}

            {!hideTitle && (
              <CustomText
                text={title || "Header Title"}
                style={{
                  fontFamily: Fonts.ProximaNovaBold,
                  color: "#231f20",
                  fontSize: 26,
                  ...titleStyle,
                }}
              />

            )}
            </View>
           
           {rightIcon}
          </View>
        </View>
      </NoHorizontalMarginView>
    );
  }
}

const styles = StyleSheet.create({
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    
  },
});

export default Header;
