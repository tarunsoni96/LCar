import React, { Component } from "react";
import { StyleSheet,FlatList, TouchableWithoutFeedback, View } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import Icons from "AppLevelComponents/UI/Icons";
import CustomRadioButton from "AppLevelComponents/UI/CustomRadioButton";
import { Colors } from "UIProps/Colors";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";
import { inputContainerStyle } from "UIProps/Styles";
import locationModal from "ServiceProviders/GooglePlaceService";
import CustomModal from "AppLevelComponents/UI/CustomModal";

export default class CourseDetails extends Component {
  state = {
    showRightIcon: false,
    location: {},
  };

  chooseLocation = async () => {
    try {
      const { address, location } = await locationModal();
      this.props.courseLocationGetter(address)
      this.setState({address});
    } catch (e) {}
  };

  selectDuration(duration){
    this.props.courseDurationGetter(duration)
    this.setState({duration,showCourseDurationModal:false})
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.selectDuration(item)}
      >
        <View style={{ padding: 5, paddingVertical:15 }}>
          <CustomText text={item+ " Days"} color="#000" />
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
          text="Add Course Details"
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
          <TouchableWithoutFeedback
            onPress={() => this.setState({ showCourseDurationModal: true })}
          >
            <View>
              <CustomText
                style={{ marginBottom: 14 }}
                text={"Course Duration"}
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
                    this.state.duration
                      ? this.state.duration + " Days"
                      : "Set Course Duration"
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
            visible={this.state.showCourseDurationModal}
            closeModal={() => this.setState({ showCourseDurationModal: false })}
          >
            <FlatList
              data={['10','15','20','30']}
              renderItem={this.renderItem}
              keyExtractor={(item, i) => i}
            />
          </CustomModal>

          <CustomTextInput
            inputValueGetter={(t) => this.props.courseFeeGetter(t)}
            style={{
              backgroundColor: inputBG,
            }}
            leftIcon={(<Icons name='rupee' lib='FontAwesome' color='#000' style={{marginLeft:10}} size={22} />)}
            keyboardType='numeric'
            label="Course Fee"
            errColor="white"
            inputColor='#000'
            placeholderColor="rgba(255, 255, 255,0.4)"
            placeholder="Course Fee"
          />

          <TouchableWithoutFeedback onPress={() => this.chooseLocation()}>
            <View>
              <CustomText
                style={{ marginBottom: 14 }}
                text={"Course Location"}
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
                    this.state.address
                      ? this.state.address
                      : "Where will you teach driving?"
                  }
                  color="#000"
                />
                <Icons
                  name="right"
                  lib="AntDesign"
                  size={17}
                  style={{ marginRight: 10 }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    backgroundColor: "#fff",
  },
});
