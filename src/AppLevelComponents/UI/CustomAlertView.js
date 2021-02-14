import React from "react";
import { View, Image, StyleSheet, SegmentedControlIOS } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { Colors } from "UIProps/Colors";
import { connect } from "react-redux";
import CustomModal from "./CustomModal";
import { CloseAlertViewTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import CustomButton from "./CustomButton";
import 'Helpers/global'
class CustomAlertView extends React.Component {
  constructor(props) {
    super(props);
  }
  // values={['xlight', 'light', 'dark', 'regular', 'prominent']}
  state = {
    showBlurs: true,
    blurBlurType: "light",
    blurActiveSegment: 1,
    vibrancyBlurType: "light",
    vibrancyActiveSegment: 2,
  };

  render() {
    const { title, text } = this.props;

    return (
      <BlurView
        blurType={this.state.blurBlurType}
        blurAmount={50}
        style={[styles.blurView]}
      >
        <CustomModal
          visible={this.props.isAlertShown}
          style={{ borderRadius: 20,marginVertical:20 }}
  
          closeModal={() => {this.props.CloseAlertViewTrigger()}}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Image
              source={require("assets/img/alert.png")}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />

            <CustomText
              marginTop={30}
              font={Fonts.ProximaNovaBold}
              color="#231f20"
              size={23}
              text={this.props.alertTitle}
            />
            <CustomText
              marginTop={20}
              font={Fonts.ProximaNovaRegular}
              color="#231f20"
              textAlign="center"
              size={18}
              text={
                this.props.alertDesc
              }
            />

            <CustomButton
              text="Got it"
              onPress={() => this.props.CloseAlertViewTrigger()}
              gradStyle={{
                marginTop: 26,
                alignSelf: "center",
                width: "70%",
              }}
            />
          </View>
        </CustomModal>
      </BlurView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20,
  },
  blurView: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  img: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: null,
    width: null,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    color: "white",
  },
  blurToggle: {
    position: "absolute",
    top: 30,
    right: 10,
    alignItems: "flex-end",
  },
});

const mapStateToProps = (state) => {
  return {
    isAlertShown: state.reducer.isAlertShown,
    alertTitle: state.reducer.alertTitle,
    alertDesc: state.reducer.alertDesc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CloseAlertViewTrigger: (obj) => dispatch(CloseAlertViewTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomAlertView);
