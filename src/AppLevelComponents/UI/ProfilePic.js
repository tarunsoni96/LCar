import React, { Component, Fragment } from "react";
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import "Helpers/global";
import { TakePhoto } from "ServiceProviders/TakePhoto";
class ProfilePic extends Component {
  state = {
    profilePic: { uri: "" },
    picURI: "",
    refresher: 0,
  };

  componentWillReceiveProps(nextProps) {}

  componentDidMount() {}

  navigateProfile() {
    this.props.navigation.navigate("Profile");
  }

  tapFunc() {
    if (this.props.showCam)
      TakePhoto(
        (resp) => {
          if (this.props.uriGetter) this.props.uriGetter(resp.uri);
          this.setState({ picURI: resp.uri, profilePic: { uri: resp.uri } });
        },
        (err) => {
          this.setState({ refresher: Math.random(0, 10) });
        },
        (photoRemove) => {
          this.props.uriGetter("");
          this.setState({
            refresher: Math.random(0, 10),
            picURI: "",
            profilePic: {
              uri: this.props.profilePic?.uri ? this.props.profilePic?.uri : "",
            },
          });
        },
        (canRemovePhoto = this.state.picURI)
      );
  }

  render() {
    let { showCam, pic, size, style } = this.props;
    return (
      <TouchableWithoutFeedback
        key={this.state.refresher}
        onPress={() => this.tapFunc()}
      >
        <View style={[styles.imageContainer, { style }]}>
          <Image
            source={
              this.state.profilePic.uri
                ? this.state.profilePic
                : this.props.profilePic
            }
            resizeMode="cover"
            style={{
              borderWidth: 2,
              borderColor: "transparent",
              width: size || "100%",
              height: size || "100%",
              borderRadius: 20,
              ...style,
            }}
          />
          {showCam && (
            <View style={[{ position: "absolute", bottom: -11, right: -14 }]}>
              <Image
                source={require("assets/img/camera.png")}
                resizeMode="contain"
                style={{ width: 40, height: 40 }}
              />
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100 / 2,
    backgroundColor: "#F7FAFD",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  imageContainer: {
    alignItems: "center",
    width: 130,
    elevation: 20,
    height: 130,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
});
export default ProfilePic;
