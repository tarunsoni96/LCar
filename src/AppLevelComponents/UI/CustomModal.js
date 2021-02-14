import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import 'Helpers/global'
import { Colors } from "UIProps/Colors";
import Fonts from "UIProps/Fonts";

import Modal from "react-native-modal";

export default class CustomModal extends Component {
  render() {
    const { style, visible, closeModal, backdropColor } = this.props;
    return (
      <Modal
        animationIn="slideInUp"
        swipeDirection="down"
        animationInTiming={500}
        isVisible={visible}
        onSwipeComplete={() => closeModal()}
        onBackButtonPress={() => {
          closeModal();
        }}
        onBackdropPress={() => closeModal()}
      >
        <View style={[{backgroundColor:'#fff',padding:global.contentPadding}, style]}>{this.props.children}</View>
      </Modal>
    );
  }
}
