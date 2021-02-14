import Icons from "AppLevelComponents/UI/Icons";
import React, { Component } from "react";
import { Text, View } from "react-native";
import StepIndicator from "react-native-step-indicator";

const labels = ["Personal Details", "Car Details", "Course Details"];
const customStyles = {
  stepIndicatorSize: 23,
currentStepIndicatorSize: 23,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: "rgba(0,0,0,0)",
  stepStrokeWidth: 1,
  stepStrokeFinishedColor: "#fff",
  stepStrokeUnFinishedColor: "#fff",
  separatorFinishedColor: "#fff",
  separatorUnFinishedColor: "rgba(255,255,255,0.5)",
  stepIndicatorFinishedColor: "#fff",
  stepIndicatorUnFinishedColor: "transparent",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fff",
  stepIndicatorLabelFinishedColor: "rgba(0,0,0,0)",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#fff",
  labelSize: 13,
  currentStepLabelColor: "#fff",
};

export default class ProgressStepsBar extends Component {
  state = {
    currentPosition: 0,
  };

  renderStepStatus = (position, stepStatus) => {
    if (stepStatus == "finished" || position == this.props.currentPosition) {
      return (
        <View style={{ backgroundColor: "transparent" }}>
          <Icons lib="Feather" size={15} name="check" color="#000" />
        </View>
      );
    } else {
        // return <View style={{ backgroundColor: "transparent" }}>
        //   <Icons size={15} lib="Feather" name="check" color={stepStatus == 'finished' ? '#000' : '#fff'} />
        // </View>
      return <View style={{ backgroundColor: "transparent" }} />;
    }
  };
  render() {
    return (
      <StepIndicator
        customStyles={customStyles}
        currentPosition={this.props.currentPosition}
        labels={labels}

        stepCount={3}
        renderStepIndicator={({position, stepStatus}) =>
          this.renderStepStatus(position, stepStatus)
        }
      />
    );
  }
}
