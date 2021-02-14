import React, { Component } from "react";
import { View, FlatList, Text, Dimensions } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import Container from "AppLevelComponents/UI/Container";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import * as Animatable from "react-native-animatable";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

let animDur = 300;
export default class SharedElementTransition extends Component {
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
    index += 1;
    const screenWidth = Dimensions.get("window").width;
    const numColumns = 3;
    const tileSize = screenWidth / numColumns;

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          this.props.navigation.navigate("SharedElementTransitionDetail", {
            index,
          })
        }
      >
        <SharedElement key={index} style={{position:'relative'}} id={index}>
          <View
            style={{
              padding: 10,
              marginBottom: 10,
              backgroundColor: "red",
              margin: 5,
              width: tileSize / 1.22,
              height: tileSize / 1.2,
              alignItems:'center',
              justifyContent:'center'
            
            }}
          >
            <Text style={{ fontSize: 19,textAlign:'center', color: "white" }}>{item.name}</Text>
          </View>
        </SharedElement>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <Container scrollEnabled={false} headerTitle="Shared Element Transition">
        <FlatList
          data={this.state.data}
          numColumns={3}
          scrollEnabled={false}
          renderItem={this.renderItem}
          keyExtractor={(item, i) => i}
        />
      </Container>
    );
  }
}
