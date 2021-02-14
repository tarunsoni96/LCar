import Container from 'AppLevelComponents/UI/Container'
import CustomButton from 'AppLevelComponents/UI/CustomButton'
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class ButtonAnimations extends Component {
    render() {
        return (
            <Container headerTitle="Button Animations" >
            <CustomButton
            animation="wobble"
            text="Reveal"
            btnStyle={{ flex: 1,marginBottom:20 }}
          />
          <CustomButton
            animation="zoomOut"
            text="Squeeze!"
            btnStyle={{ flex: 1,marginBottom:20 }}
          />
          <CustomButton
            animation="fadeOut"
            text="Disappear!"
            btnStyle={{ flex: 1,marginBottom:20 }}
          />
          </Container>
        )
    }
}
