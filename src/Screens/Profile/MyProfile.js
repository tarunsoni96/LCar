import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomTouchableOpacity from "AppLevelComponents/UI/CustomTouchableOpacity";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";
import { connect } from "react-redux";

const Divider = ({ style }) => {
  return (
    <View
      style={{
        backgroundColor: "#EFEFEF",
        padding: 2.3,
        borderRadius: 10,
        width: "100%",
        ...style,
      }}
    />
  );
};

const SectionTitle = ({ title }) => {
  return (
    <CustomText
      text={title}
      style={{ marginVertical: 20 }}
      color="#000"
      font={Fonts.ProximaNovaSemiBold}
    />
  );
};

const DataRow = ({ dataTitle, data }) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          marginVertical: 20,
          
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText
          text={dataTitle}
          style={{}}
          color="#000"
          font={Fonts.ProximaNovaRegular}
        />

        <CustomText
         numberOfLines={1}
          fit
          text={data}
          style={{maxWidth:'56%'}}
          color="#000"
          font={Fonts.ProximaNovaSemiBold}
        />
      </View>
      <Divider style={{ padding: 0.7, marginHorizontal: -10, width: "106%" }} />
    </>
  );
};

class MyProfile extends Component {
  state = {};

 
  render() {
    const {
      email,
      mobile_number,
      profile_image,
      name,
      child_details = {},
    } = this.props.userData || {};

    return (
      <Container
        headerContainerStyle={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        rightIcon={
          <CustomTouchableOpacity
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
            <Image
              source={ require("assets/img/edit.png")}
              style={{ width: 21, height: 21 }}
              resizeMode="contain"
            />
          </CustomTouchableOpacity>
        }
        headerTitle="My Profile"
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{}}>
            <ProfilePic profilePic={profile_image ? {uri:profile_image} :require("assets/img/avatar.png") } />

            <View style={{ marginTop: 40 }}>
              <SectionTitle title="Parents Detail" />
              <Divider />

              <View style={{ padding: 12, paddingVertical: 0 }}>
                <DataRow dataTitle={"Full Name"} data={name} />
                <DataRow
                  dataTitle={"Email Address"}
                  data={email}
                />
                <DataRow dataTitle={"Mobile Number"} data={mobile_number} />
              </View>
              <Divider style={{ marginTop: 0 }} />
            </View>

            <View style={{ marginTop: 20 }}>
              <SectionTitle title="Child Detail" />
              <Divider />

              <View style={{ padding: 12, paddingVertical: 0 }}>
                <DataRow dataTitle={"Child Name"} data={child_details?.child_name} />
                <DataRow dataTitle={"Grade"} data={child_details?.grade} />
                <DataRow dataTitle={"Gender"} data={child_details?.gender.charAt(0).toUpperCase()+child_details?.gender.slice(1)} />
              </View>
              <Divider style={{ marginTop: 0 }} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userData: state.reducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
