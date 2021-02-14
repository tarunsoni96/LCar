import React, { Component } from "react";
import { Animated, FlatList, Text } from "react-native";

import Container from "AppLevelComponents/UI/Container";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import * as Animatable from "react-native-animatable";

let animDur = 300;
export default class ScreenPush1 extends Component {
  state = {
    data: [
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
      { name: "Dummy Text" },
    ],
    loadList: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadList: true });
    }, 400);
  }

  renderItem = ({ item, index }) => {
    //0 * 200
    //1 * 200 = 200
    return (
      <Animatable.View
        style={{ padding: 10, marginBottom: 10 }}
        duration={animDur}
        delay={index * 50}
        animation="fadeInLeft"
      >
        <Text style={{fontSize:19}} >{item.name}</Text>
      </Animatable.View>
    );
  };

  render() {
    return (
      <Container headerTitle="Screen Push 1 ">
       
      </Container>
    );
  }
}
