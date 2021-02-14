import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { Colors } from "UIProps/Colors";
import RadioButton from "react-native-radio-button";

export default class CustomRadioButton extends Component {
    render() {
        const {selected,color,direction = 'row',onPress = ()=>{}} = this.props
        return (
        <TouchableWithoutFeedback onPress={()=>onPress()} >
        <View style={{flexDirection:direction,alignItems:'center',}} >

        <RadioButton
        innerColor={color || Colors.accent}
        outerColor={color || Colors.accent}
        size={10}
        animation={"bounceIn"}
        isSelected={ selected || false}
          onPress={() =>onPress()}
      />
      {this.props.children}
        </View>
                    </TouchableWithoutFeedback>
        )
    }
}
