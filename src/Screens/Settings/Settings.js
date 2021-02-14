import React, { Component } from "react";
import { View, FlatList, TouchableWithoutFeedback } from "react-native";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import {
  SetLoggedInTrigger,
  ShowAlertTrigger,
} from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import NoHorizontalMarginView from "AppLevelComponents/UI/NoHorizontalMarginView";

import { connect } from "react-redux";

import ListItem_SettingsButton from "./components/ListItem_SettingsButton";

class Settings extends Component {
  state = {
    isApiCall: undefined,
    selections: [],
  };

  navigate(route) {
    this.props.navigation.navigate(route);
  }

  renderItem = ({ item, i }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.navigate(item.route)}>
        <View>
          <ListItem_SettingsButton title={item.name} image={item.img} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    let buttons = [
      {
        name: "Notification",
        img: require("assets/img/settings/notification.png"),
        route: "Notifications",
      },
      {
        name: "My Subscription",
        img: require("assets/img/settings/my_subscription.png"),
        route: "Notifications",
      },
      {
        name: "Edit Preferences",
        img: require("assets/img/settings/edit_prefrences.png"),
        route: "EditPreferences",
      },
      {
        name: "Delete Account",
        img: require("assets/img/settings/delete_account.png"),
        route: "Notifications",
      },
    ];
    return (
      <Container
        contentStyle={{ flex: 1 }} //for nested scrollviews
        barStyle="dark-content"
        showHeader={true}
        scrollEnabled={false}
        headerTitle="Settings"
      >
        <NoHorizontalMarginView style={{ flex: 1 }}>
          <FlatList
            data={buttons}
            extraData={this.state}
            renderItem={this.renderItem}
            keyExtractor={(item, i) => i}
          />
        </NoHorizontalMarginView>
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
  return {
    ShowAlertTrigger: (obj) => dispatch(ShowAlertTrigger(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
