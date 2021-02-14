import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Keyboard,
} from "react-native";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import Fonts from "UIProps/Fonts";
import CustomText from "AppLevelComponents/UI/CustomText";
import CustomTouchableOpacity from "AppLevelComponents/UI/CustomTouchableOpacity";
import ProfilePic from "AppLevelComponents/UI/ProfilePic";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import CustomTextInput_Mobile from "AppLevelComponents/UI/FormInputs/CustomTextInput_Mobile";
import CustomRadioButton from "AppLevelComponents/UI/CustomRadioButton";
import { connect } from "react-redux";
import { checkForEmptyKeys } from "ServiceProviders/InputsNullChecker";
import {
  SetLoggedInTrigger,
  ShowAlertTrigger,
} from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "Helpers/Constants";
import Loader from "AppLevelComponents/UI/Loader";
import { Colors } from "UIProps/Colors";
import HelperMethods from "Helpers/Methods";
import { mutateGraph } from "ServiceProviders/GraphQLCaller";
import { SchemeSendOTP } from "ServiceProviders/GraphQLSchemes";
import CustomAlertView from "AppLevelComponents/UI/CustomAlertView";
import { uploadFile } from "ServiceProviders/ApiCaller";

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

const editProfile = gql`
  mutation editProfile($editProfileInput: EditProfileInput!) {
    editProfile(editProfileInput: $editProfileInput) {
      id
      email
      country_abbr
      country_code
      mobile_number
      signup_type
      profile_image
      social_id
      auth_token
      time_zone
      name
      child_details {
        id
        user_id
        child_name
        grade
        stream
        gender
      }
    }
  }
`;
class EditProfile extends Component {
  state = {
    mobChanged: false,
    mobNotVerified: true,
    tempProfilePicURI: "",
  };

  constructor(props) {
    super(props);
    this.inputValObj = {
      fullname: "",
      email: "",
      mobile: "",
      countryCode: this.props.userData.country_code,
      countryAbbr: this.props.userData.country_abbr,
      childName: "",
      stream: "",
      grade: "",
      gender: "",
    };
    this.apolloClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/user",
      cache: new InMemoryCache(),
      headers: {
        Authorization: "Bearer " + this.props.userData.auth_token,
      },
    });
  }

  componentDidMount() {
    this.inputValObj.stream = this.props.userData.child_details?.stream;
    this.setState({ profilePicURI: this.props.userData.profile_image });
    this.setRadio(this.props.userData.child_details?.gender?.toLowerCase());
  }

  setRadio(gender) {
    this.inputValObj.gender = gender;
    switch (gender) {
      case "male":
        this.setState({
          maleSelected: true,
          femaleSelected: false,
          othersSelected: false,
        });
        break;

      case "female":
        this.setState({
          maleSelected: false,
          femaleSelected: true,
          othersSelected: false,
        });
        break;

      case "others":
        this.setState({
          maleSelected: false,
          femaleSelected: false,
          othersSelected: true,
        });
        break;

      default:
        break;
    }
  }

  process() {
    Keyboard.dismiss();

    let { errorString, anyEmptyInputs } = checkForEmptyKeys(this.inputValObj);
    if (anyEmptyInputs.length > 0) {
      this.props.ShowAlertTrigger({
        desc: errorString,
      });
    } else if(this.state.mobChanged && this.state.mobNotVerified) {
      this.props.ShowAlertTrigger({
        desc: "Please verify mobile number before proceeding",
      });
      return;
    } else {
      let obj = {
        email: this.inputValObj.email,
        country_abbr: this.inputValObj.countryAbbr,
        country_code: this.inputValObj.countryCode,
        mobile_number: this.inputValObj.mobile,
        // mobile_number: '8368809060',
        profile_image: this.state.profilePicURI,
        name: this.inputValObj.fullname,
        child_name: this.inputValObj.childName,
        gender: this.inputValObj.gender,
        grade: this.inputValObj.grade,
        stream: this.inputValObj.stream,
      };
      this.setState({ isApiCall: true });

      this.apolloClient
        .mutate({
          mutation: editProfile,
          variables: {
            editProfileInput: obj,
          },
        })
        .then((res) => {
          this.setState({ isApiCall: false });
          this.props.SetLoggedInTrigger(res.data.editProfile);
          this.props.navigation.goBack();
        })
        .catch((err) => {
          this.setState({ isApiCall: false });
          HelperMethods.animateLayout();

          this.props.ShowAlertTrigger({
            title: "User exists",
            desc: err.networkError.result.errors[0].message,
          });
        });
      // this.props.SetLoggedInTrigger(res.data);
    }
  }

  verifyMob() {
    let apolloClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/auth",
      cache: new InMemoryCache(),
    });
    let vars = {
      country_code: this.inputValObj.countryCode,
      mobile_number: this.inputValObj.mobile,
    };

    mutateGraph(apolloClient, vars, SchemeSendOTP)
      .then((res) => {
        if (res.sendOtp) {
          this.props.navigation.navigate("Login_OTPVerification", {
            mobile: this.inputValObj.mobile,
            countryAbbr: this.inputValObj.countryAbbr,
            countryCode: this.inputValObj.countryCode,
            case: "mobUpdate",
            mobVerified: () => this.setMobVerified(),
          });
        }
      })
      .catch((err) => {});
  }

  setMobVerified() {
    this.setState({ mobChanged: true, mobNotVerified: false });
  }

  uploadProfilePic() {
    Keyboard.dismiss();
    this.setState({ isApiCall: true });
    let obj = { uri: this.state.tempProfilePicURI };
    uploadFile(obj, this.props.userData.auth_token)
      .then((res) => {
        this.setState({ profilePicURI: res.url }, () => {
          this.process();
        });
      })
      .catch((err) => {
        alert(JSON.stringify(err));
      });
  }

  render() {
    let labelColor = "#282828";
    let labelFont = Fonts.ProximaNovaRegular;
    let inputColor = "#222222";

    const {
      email,
      country_code,
      country_abbr,
      mobile_number,
      image,
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
          this.state.isApiCall ? (
            <Loader
              style={{ marginRight: 10 }}
              color={Colors.accentLight}
              size="small"
            />
          ) : (
            <CustomTouchableOpacity
              onPress={() =>
                this.state.tempProfilePicURI
                  ? this.uploadProfilePic()
                  : this.process()
              }
            >
              <Image
                source={require("assets/img/tick.png")}
                style={{ width: 21, height: 21 }}
                resizeMode="contain"
              />
            </CustomTouchableOpacity>
          )
        }
        headerTitle="Edit Profile"
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={{}}>
            <ProfilePic
              uriGetter={(uri) => this.setState({ tempProfilePicURI: uri })}
              showCam
              profilePic={
                this.state.profilePicURI
                  ? { uri: this.state.profilePicURI }
                  : require("assets/img/avatar.png")
              }
            />

            <View style={{ marginTop: 40 }}>
              <SectionTitle title="Parents Detail" />
              <Divider />

              <View style={{ paddingVertical: 0, paddingTop: 20 }}>
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    errorValidation="fullname"
                    inputValueGetter={(t) => {
                      this.inputValObj.fullname = t;
                    }}
                    style={styles.inputStyle}
                    labelFont={labelFont}
                    label="Full Name"
                    value={name}
                    inputColor={inputColor}
                    labelColor={labelColor}
                    placeholderColor="#222222"
                    placeholder="Your Full Name"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <CustomTextInput
                    errorValidation="email"
                    inputValueGetter={(t) => {
                      this.inputValObj.email = t;
                    }}
                    style={styles.inputStyle}
                    labelFont={labelFont}
                    label="Email Address"
                    value={email}
                    inputColor={inputColor}
                    labelColor={labelColor}
                    placeholderColor="#222222"
                    placeholder="Your Email Address"
                  />
                </View>
                <CustomText
                  text="Mobile Number"
                  color="#282828"
                  style={{ marginBottom: 14 }}
                />
                <View style={{}}>
                  <CustomTextInput_Mobile
                    rightContent={
                      this.state.mobChanged &&
                      this.inputValObj.mobile &&
                      this.state.mobNotVerified ? (
                        <CustomText
                          onPress={() => this.verifyMob()}
                          text="Verify"
                          style={{ marginRight: 10 }}
                          color={Colors.accentLight}
                          font={Fonts.ProximaNovaBold}
                        />
                      ) : null
                    }
                    value={mobile_number}
                    countryPickerStyle={{ height: 0 }}
                    inputValueGetter={(text) => {
                      this.inputValObj.mobile = text;
                      HelperMethods.animateLayout();
                      this.setState({
                        mobChanged: this.inputValObj.mobile != mobile_number,
                        mobNotVerified:
                          this.inputValObj.mobile != mobile_number,
                      });
                    }}
                    countryCodeGetter={(cc) => {
                      this.inputValObj.countryCode = cc;
                      this.setState({ mobChanged: true });
                    }}
                    countryAbbrGetter={(cc) =>
                      (this.inputValObj.countryAbbr = cc)
                    }
                    selectedCountryCode={country_code}
                    selectedcountryAbbr={country_abbr}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <Divider style={{ marginTop: 20 }} />
            </View>

            <View style={{ marginTop: 20 }}>
              <SectionTitle title="Child Detail" />
              <Divider />

              <View style={{ paddingTop: 20 }}>
                <View style={styles.inputContainer}>
                  <CustomTextInput
                    errorValidation="fullname"
                    inputValueGetter={(t) => {
                      this.inputValObj.childName = t;
                    }}
                    style={styles.inputStyle}
                    labelFont={labelFont}
                    label="Child Name"
                    value={child_details?.child_name}
                    inputColor={inputColor}
                    labelColor={labelColor}
                    placeholderColor="#222222"
                    placeholder="Your Child Name"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <CustomTextInput
                    inputValueGetter={(t) => {
                      this.inputValObj.grade = t;
                    }}
                    style={styles.inputStyle}
                    labelFont={labelFont}
                    label="Grade"
                    value={child_details?.grade}
                    inputColor={inputColor}
                    labelColor={labelColor}
                    placeholderColor="#222222"
                    placeholder="Your Child Grade"
                  />
                </View>

                <CustomText text="Gender" color="#282828" style={{}} />

                <View
                  style={{
                    marginTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <CustomRadioButton
                    selected={this.state.maleSelected}
                    onPress={() => this.setRadio("male")}
                    color="#222222"
                  >
                    <CustomText
                      size={17}
                      style={{ marginLeft: 15 }}
                      text="Male"
                      color="#222222"
                      font={Fonts.ProximaNovaRegular}
                    />
                  </CustomRadioButton>

                  <CustomRadioButton
                    selected={this.state.femaleSelected}
                    onPress={() => this.setRadio("female")}
                    color="#222222"
                  >
                    <CustomText
                      size={17}
                      style={{ marginLeft: 15 }}
                      text="Female"
                      color="#222222"
                      font={Fonts.ProximaNovaRegular}
                    />
                  </CustomRadioButton>

                  <CustomRadioButton
                    selected={this.state.othersSelected}
                    onPress={() => this.setRadio("others")}
                    color="#222222"
                  >
                    <CustomText
                      size={17}
                      style={{ marginLeft: 15 }}
                      text="Others"
                      color="#222222"
                      font={Fonts.ProximaNovaRegular}
                    />
                  </CustomRadioButton>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    width: 130,
    height: 130,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "red",
  },

  inputContainer: {
    marginTop: 0,
  },

  imageStyle: {
    width: "100%",
    height: "100%",
  },
  inputStyle: {
    color: "#000",
    fontFamily: Fonts.ProximaNovaRegular,
    fontSize: 17,
    width: 50,
    height: 50,
    borderRadius: 4,
  },

  inputStyle: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    color: "#000",
  },
});

const mapStateToProps = (state) => {
  return {
    userData: state.reducer.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
