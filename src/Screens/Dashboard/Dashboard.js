import React, { Component } from "react";
import Container from "AppLevelComponents/UI/Container";
import "Helpers/global";
import * as Animatable from "react-native-animatable";
import { observer } from "mobx-react";
import "Helpers/global";
import CustomButton from "AppLevelComponents/UI/CustomButton";
import { navigate } from "../../../RootNavigation";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import { Colors } from "UIProps/Colors";
import AppBar_Home from "./components/AppBar_Home";
import Fonts from "UIProps/Fonts";
import { connect } from "react-redux";
let anim = "zoomIn";
@observer
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.inputValObj = {};
    this.state = {
      animation: anim,
      isApiCall: false,
      showWhiteInput: true,
    };
  }

 

  render() {
    return (
      <Container showHeader={false}>
        <AppBar_Home navigation={this.props.navigation} />

        <View style={{ marginTop: 25 }}>
          <CustomText
            text={`Hello, ${this.props.userData.name.split(' ')[0]}!`}
            font={Fonts.ProximaNovaBold}
            color="#282828"
            size={24}
          />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    padding: global.contentPadding,
    marginLeft: -global.contentPadding,
  },

  notificationBellContainer: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationCounter: {
    position: "absolute",
    backgroundColor: Colors.accentLight,
    borderRadius: 30,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    top: -5,
    right: -8,
  },
});


const mapStateToProps = (state) =>{
  return {
    userData:state.reducer.userData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dashboard)
