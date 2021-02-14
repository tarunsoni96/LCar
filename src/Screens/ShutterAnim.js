import React, { Component } from "react";
import { Animated, FlatList, Text, View } from "react-native";

import Container from "AppLevelComponents/UI/Container";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import * as Animatable from "react-native-animatable";
import Interactable from "react-native-interactable";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

let animDur = 300;
export default class ShutterAnim extends Component {
  state = {
    data: [
      { name: "Pull down" },
      { name: "Pull down" },
      { name: "Pull down" },
      { name: "Pull down" },
      { name: "Pull down" },
      { name: "Pull down" },
    ],
    loadList: false,
  };

  constructor(props) {
    super(props);

    this.inputValObj = {};
    this.clippingPoint = heightPercentageToDP(50);
    this._deltaY = new Animated.Value(0);
  }

  componentDidMount() {}

  renderItem = ({ item, index }) => {
    return (
      <Animatable.View
        style={{ padding: 10, marginBottom: 10 }}
        duration={animDur}
        delay={index * 50}
        animation="fadeInLeft"
      >
        <Text style={{ fontSize: 19 }}>{item.name}</Text>
      </Animatable.View>
    );
  };

  onDownSwipeSnap(e) {
    if (e.nativeEvent.index == 0) {
      this.setState({ carScrollEnabled: true });
    }
    this.setState({ catListPosType: "relative", turnOffScroll: true });
  }

  render() {
    return (
      <Container scrollEnabled={false} headerTitle="Shutter Animation ">
        <Animated.View
          style={{
            opacity: this._deltaY.interpolate({
              inputRange: [0, this.clippingPoint],
              outputRange: [0, 1],
            }),
            position: "absolute",
            width: widthPercentageToDP(86),
            alignSelf: "center",
          }}
        >
          <View style={{ height: this.clippingPoint }}>
            <View style={{ backgroundColor: "red", flex: 1 }} />
          </View>
        </Animated.View>

        <Interactable.View
          verticalOnly
          // boundaries={{top:0, }}
          dragEnabled={!this.state.noMatches}
          ref={(caraousalInteractable) =>
            (this.caraousalInteractable = caraousalInteractable)
          }
          style={{ flex: 1 }}
          dragWithSpring={{ tension: 2000, damping: 0.5 }}
          onSnap={(e) => this.onDownSwipeSnap(e)}
          animatedValueY={this._deltaY}
          snapPoints={[{ y: 0 }, { y: this.clippingPoint }]}
        >
          <FlatList
          scrollEnabled={false}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, i) => i}
          />
        </Interactable.View>
      </Container>
    );
  }
}
