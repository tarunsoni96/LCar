import React, { Component } from "react";
import Constants from "Helpers/Constants";
import "Helpers/global";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";
import { connect } from "react-redux";
import { SetLoggedInTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";

class ScreenMemory extends Component {
  state = {
    renderContent: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.judgeScreenMemory();
  }

  judgeScreenMemory() {
    let { screen, screenParams } = this.props; //optional screenParams for influenced custom  behaviour

    switch (
      screen //need to always provide screen prop to this class or else nothing would render.
    ) {
      case 'login':
        this.checkIsLoggedIn();
        break;
    }
  }

  checkIsLoggedIn(){
    this.validate(Constants.userInfoObj,'Dashboard')
  }

  validate(constant,screen){
    AsyncStorageHandler.get(constant, val => {
      if (val == null) {
        this.drawContent()
      } else {
        this.props.SetLoggedInTrigger(val)
      }
    })
  }


  isLangSelected(screenParams) {
    let { isForLanguageChange } = screenParams ? screenParams : {};

    if (isForLanguageChange) {
      this.setState({ renderContent: true });
      // return
    } else {
      AsyncStorageHandler.get(Constants.LANGUAGE_SELECTED, val => {
        if (val == null) {
          this.drawContent();
        } else {
        }
      });
    }
  }

  haveAccount(callback) {
    AsyncStorageHandler.get(Constants.HAS_ACCOUNT, val => {
        callback(val)
    });
  }

  drawContent() {
    this.setState({ renderContent: true });
  }

  renderChildren() {
    let { children } = this.props;
    return children;
  }

  render() {
    return <>{this.state.renderContent && this.renderChildren()}</>;
  }
}


const mapStateToProps = (state) =>{
  return {
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    SetLoggedInTrigger: (obj) => dispatch(SetLoggedInTrigger(obj)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ScreenMemory)