import React, { Component } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import { SetLoggedInTrigger, ShowAlertTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import ListItem_SelectPreferences from "./components/ListItem_SelectPreferences";
import { connect } from "react-redux";
import { gql, InMemoryCache, ApolloClient } from "@apollo/client";
import NetworkAwareContent from "AppLevelComponents/UI/NetworkAwareContent";
import HelperMethods from "Helpers/Methods";
import Constants from "Helpers/Constants";

const fetchPreferences = gql`
  query Preferences {
    preferences {
      id
      title
      description
      image
    }
  }
`;


const signup = gql`
  mutation signup(
    $country_abbr: String!
    $country_code: String!
    $mobile_number: String!
    $email: String!
    $name: String!
    $child_name: String!
    $gender: String!
    $grade: String!
    $stream: String!
    $preferences: String!
    $signup_type: String!
    $social_id: String!
    $time_zone: String!
  ) {
    signup(
    country_abbr: $country_abbr
      country_code: $country_code
      mobile_number: $mobile_number
      email: $email
      name: $name
      child_name: $child_name
      gender: $gender
      grade: $grade
      stream: $stream
      preferences: $preferences
      signup_type: $signup_type
      social_id: $social_id
      time_zone: $time_zone
    ) {
      id
    email
    country_abbr
    country_code
    mobile_number
    signup_type
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
    },
    }
  }
`;

class SelectPreferences extends Component {
  state = {
    isApiCall: undefined,
    selections: [],
  };

  constructor(props) {
    super(props);
    this.inputValObj = {};
    this.apolloClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/category",
      cache: new InMemoryCache(),
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ isApiCall: true });
    this.apolloClient
      .query({
        query: fetchPreferences,
      })
      .then((res) => {
        this.setState({ isApiCall: false, list: res.data.preferences });
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  }

  setSelected(item) {
    let arr = [...this.state.selections];
    let exists = arr.findIndex((v) => v.title == item.title);
    if (exists > -1) {
      // remove
      arr.splice(exists, 1);
    } else {
      //add
      arr.push(item);
    }

    this.setState({ selections: arr });
  }

  renderItem = ({ item, i }) => {
    let exists = this.state.selections.findIndex((v) => v.title == item.title);

    return (
      <TouchableWithoutFeedback onPress={() => this.setSelected(item)}>
        <View>
          <ListItem_SelectPreferences
            title={item.title}
            description={item.description}
            image={item.image}
            selected={exists > -1}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  moveToHome() {
    if (this.state.selections.length >= 3) {
      this.doSignup();
    } else {
    this.props.ShowAlertTrigger({desc:'Please select at least three options'})
    }
  }

  doSignup() {
    const { stepsData, countryCode, mobile,countryAbbr } = this.props.route.params || {};
    let selectedPrefers = "";
    this.state.selections.map((item, i) => {
      selectedPrefers+=item.id+','
      
    });
    selectedPrefers = selectedPrefers.slice(0, -1)

    let obj = {
      country_code: countryCode,
      mobile_number: mobile,
      email: stepsData.email,
      name: stepsData.fullName,
      child_name: stepsData.childName,
      gender: stepsData.gender.toUpperCase(),
      grade: stepsData.grade,
      stream: stepsData.stream,
      preferences: selectedPrefers,
      profile_image:this.props.socialSignUpData.photo || "",
      signup_type:this.props.socialSignUpData.socialType || "NORMAL",
      social_id: this.props.socialSignUpData.id || "",
      time_zone: "asia/kolkata",
    };


    this.setState({ isApiCall: true });

    this.apolloClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/auth",
      cache: new InMemoryCache(),
    });

    this.apolloClient
      .mutate({
        mutation: signup,
        variables: {
          country_abbr:countryAbbr,
          country_code: obj.country_code.toString(),
          mobile_number: obj.mobile_number,
          email: obj.email,
          name: obj.name,
          child_name: obj.child_name,
          gender: obj.gender,
          grade: obj.grade,
          stream: obj.stream,
          preferences: selectedPrefers,
          signup_type: obj.signup_type,
          social_id: obj.social_id,
          time_zone: obj.time_zone,
        },
        
      })
      .then((res) => {
        this.setState({ isApiCall: false });
        this.props.SetLoggedInTrigger(res.data.signup);
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
        alert(JSON.stringify( err))
      });
  }

  render() {
    return (
      <Container
        contentStyle={{ flex: 1 }} //for nested scrollviews
        barStyle="dark-content"
        showHeader={true}
        scrollEnabled={false}
        headerTitle="Select Preferences"
      >
        <CustomText
          size={17}
          text="Select at least 3 options"
          color="rgb( 35, 31, 32)"
          font={Fonts.ProximaNovaRegular}
        />

        <NoHorizontalMarginView style={{ flex: 1, paddingTop: 10 }}>
          <NetworkAwareContent
            isApiCall={this.state.isApiCall}
            apiFunc={() => this.fetchData()}
          >
            <FlatList
              data={this.state.list}
              extraData={this.state}
              renderItem={this.renderItem}
              keyExtractor={(item, i) => i}
            />
          </NetworkAwareContent>
        </NoHorizontalMarginView>

        <CustomButton
          text="Submit"
          isApiCall={this.state.isApiCall}
          onPress={() => this.moveToHome()}
          gradStyle={{ marginTop: 14, alignSelf: "center", width: "90%" }}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socialSignUpData:state.reducer.socialSignUpData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPreferences);
