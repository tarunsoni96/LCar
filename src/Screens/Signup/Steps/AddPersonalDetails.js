import React, { Component } from "react";
import { StyleSheet, FlatList, View,TouchableWithoutFeedback } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import Icons from "AppLevelComponents/UI/Icons";
import { connect } from "react-redux";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";
import { Colors } from "UIProps/Colors";
import CustomModal from "AppLevelComponents/UI/CustomModal";
import { inputContainerStyle } from "UIProps/Styles";
import HelperMethods from "Helpers/Methods";
class AddPersonalDetails extends Component {
  state = {
    showRightIcon: false,
    showExperienceModal: false,

    selectedYr: undefined,
  };

  componentDidMount() {
    this.props.fullNameGetter(this.props.socialSignUpData.name);
    this.setEmail(this.props.socialSignUpData.email);
  }

  setEmail(text) {
    this.setState({ showRightIcon: text ? true : false });
    if (text) {
      this.props.emailGetter(text);
    } else {
      this.props.emailGetter("");
    }
  }

  setURI(uri, side) {
    if (side == "front") {
      this.props.imgURIGetterFront(uri);
    } else {
      this.props.imgURIGetterBack(uri);
    }
  }

  selectExperienceYr(yr) {
    this.setState({ selectedYr: yr, showExperienceModal: false });
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectExperienceYr(index + 1)}
      >
        <View style={{ padding: 5, paddingVertical: 15, }}>
          <CustomText text={index + 1 + "Yr(s)"} color="#000" />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    let inputBG = Colors.signupInputColor;
    return (
      <View style={{}}>
        <CustomText
          size={27}
          marginTop={20}
          text="Add Your Details"
          color="#fff"
          font={Fonts.ProximaNovaBold}
        />

        <CustomText
          size={17}
          marginTop={10}
          text={`Enter the following details`}
          color="#fff"
          font={Fonts.ProximaNovaRegular}
        />

        <View style={{ marginTop: 30, width: "91%", paddingBottom: 30 }}>
          <CustomTextInput
            errorValidation="fullname"
            inputValueGetter={(t) => this.props.fullNameGetter(t)}
            style={{
              backgroundColor: inputBG,
            }}
            inputColor="#000"
            label="Full Name"
            value={this.props.socialSignUpData.name}
            errColor="white"
            placeholderColor="rgba(255, 255, 255,0.4)"
            placeholder="Your Full Name"
          />

          <TouchableWithoutFeedback
            onPress={() => this.setState({ showExperienceModal: true })}
          >
          <View>
            <CustomText
              style={{ marginBottom: 14 }}
              text={"Total Driving Experience"}
              color={"#fff"}
              font={Fonts.ProximaNovaBold}
            />
            <View
              style={[
                inputContainerStyle,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,

                  backgroundColor: inputBG,
                },
              ]}
            >
              <CustomText
                style={{ marginLeft: 10 }}
                text={
                  this.state.selectedYr
                    ? this.state.selectedYr + "Yr(s)"
                    : "Your Driving Experience"
                }
                color="#000"
              />
              <Icons
                name="down"
                lib="AntDesign"
                size={17}
                style={{ marginRight: 10 }}
              />
            </View>
            </View>
          </TouchableWithoutFeedback>

          <CustomModal
            style={{ padding:10 }}
            visible={this.state.showExperienceModal}
            closeModal={() => this.setState({ showExperienceModal: false })}
          >
            <FlatList
              data={Array(10).fill(10)}
              renderItem={this.renderItem}
              keyExtractor={(item, i) => i}
            />
          </CustomModal>

          <CustomTextInput
            errColor="white"
            errorValidation="email"
            keyboardType="email-address"
            value={this.props.socialSignUpData.email}
            inputValueGetter={(text) => this.setEmail(text)}
            placeholderColor="rgba(255, 255, 255,0.4)"
            style={{
              backgroundColor: inputBG,
            }}
            inputColor="#000"
            showRightIcon={this.state.showRightIcon}
            rightIcon={
              <Icons
                lib="Material"
                color="#000"
                size={23}
                style={{ marginRight: 10 }}
                name="check-circle"
              />
            }
            label="Email ID"
            placeholder="Your Email ID"
          />

          <CustomText
            text="Driving Licence Photos"
            color="#fff"
            font={Fonts.ProximaNovaBold}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 20,
              marginTop: 20,
              paddingBottom:0,
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

            <View style={{ alignItems: "center", justifyContent: "center", }}>
              <ProfilePic
                uriGetter={(uri) => this.setURI(uri, "back")}
                showCam
                style={styles.imgContainer}
              />

              <CustomText
                text="Back"
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

const mapStateToProps = (state) => {
  return {
    socialSignUpData: state.reducer.socialSignUpData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPersonalDetails);
