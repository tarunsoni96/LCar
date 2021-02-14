import React, { Component } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import { SetLoggedInTrigger, ShowAlertTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";
import CustomText from "AppLevelComponents/UI/CustomText";
import Fonts from "UIProps/Fonts";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import { connect } from "react-redux";
import { gql, InMemoryCache, ApolloClient } from "@apollo/client";
import NetworkAwareContent from "AppLevelComponents/UI/NetworkAwareContent";
import HelperMethods from "Helpers/Methods";
import Constants from "Helpers/Constants";
import ListItem_SelectPreferences from "Screens/SelectPreferences/components/ListItem_SelectPreferences";
import { mutateGraph } from "ServiceProviders/GraphQLCaller";
const fetchPreferences = gql`
  query userPreferences {
    userPreferences{
      id
      title
      image
      description
      is_selected
    }
  }
`;

const updatePrefers = gql`
  mutation editPreferences(
    $preferences: [user_preferences]!
  ) {
    editPreferences(
      preferences: $preferences
    ) 
  }
`;

class UpdatePreferences extends Component {
  state = {
    isApiCall: undefined,
    selections: [],
  };

  constructor(props) {
    super(props);
    this.inputValObj = {};
    this.apolloClient = new ApolloClient({
      uri: Constants.baseUrl + "/api/user",
      headers: {
        Authorization: "Bearer " + this.props.userData.auth_token,
      },
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
        this.setState({ isApiCall: false, list: res.data.userPreferences });
        this.setInitialSelections(res.data.userPreferences)
      })
      .catch((err) => {
        this.setState({ isApiCall: "failed" });
      });
  }

  setInitialSelections(apiArr){
    let arr = []
    apiArr.map((item,i) =>{
      if(item.is_selected){
        arr.push(item)
      }
    })
    this.setState({ selections: arr });
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
    let exists = this.state.selections.findIndex((v) => v.title == item.title)

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
      this.save();
    } else {
      this.props.ShowAlertTrigger({desc:'Please select at least three options'})
    }
  }

  save() {
    let selectedPrefers = []
    this.state.selections.map((item, i) => {
      selectedPrefers.push({preference_id:parseInt(item.id)})
    });

    this.setState({ isApiCall: true });
    this.apolloClient
      .mutate({
        mutation: updatePrefers,
        variables: {
          preferences: selectedPrefers,
        },
      })
      .then((res) => {
        this.setState({ isApiCall: false });
        this.props.navigation.goBack()
      })
      .catch((err) => {
        this.setState({ isApiCall: false });
      });
  }

  render() {
    return (
      <Container
        contentStyle={{ flex: 1 }} //for nested scrollviews
        barStyle="dark-content"
        showHeader={true}
        scrollEnabled={false}
        headerTitle="Edit Preferences"
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
          text="Save"
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
    userData:state.reducer.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePreferences);
