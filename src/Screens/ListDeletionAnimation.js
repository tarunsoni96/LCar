import React, { Component } from "react";
import { Animated, TouchableOpacity,TouchableWithoutFeedback,View, Text } from "react-native";

import Container from "AppLevelComponents/UI/Container";
import CustomTextInput from "AppLevelComponents/UI/FormInputs/CustomTextInput";
import * as Animatable from "react-native-animatable";
import { SwipeListView } from 'react-native-swipe-list-view';

let animDur = 300;
export default class ListDeletionAnimation extends Component {
  state = {
    data: [
      { name: "Swipe Left" },
      { name: "Swipe Left" },
      { name: "Swipe Left" },
      { name: "Swipe Left" },
    ],
    loadList: false,
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadList: true });
    }, 400);
  }

  renderItem = ({ item, index }) => {
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
      <Container headerTitle="List Delete Animation">
        {this.state.loadList && (
          <SwipeListView
            data={this.state.data}
            disableRightSwipe
            useNativeDriver
            closeOnRowPress
            renderItem={({ item, index }) => {
              return <View  key={index + 'ava'} style={{backgroundColor:'#fff',paddingVertical:15}} >
                <Text style={{fontSize:20}} >{item.name}</Text>
                </View>
              } }
            renderHiddenItem={(data, rowMap, key) => (
              <TouchableWithoutFeedback key={key} onPress={() => alert('')}>
                <View
                  style={{
                    alignItems: 'center',
                    width: 100,
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    height: '100%',
                    backgroundColor: '#BE2B27',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      marginTop: 3,
                    }}
                  >
                    Delete
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            leftOpenValue={0}
            rightOpenValue={-105}
          />
        )}
      </Container>
    );
  }
}
