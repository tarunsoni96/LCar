import React, { Component } from "react";
import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  View,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import "Helpers/global";

import HelperMethods from "Helpers/Methods";
import "Helpers/global";
import EStyleSheet from "react-native-extended-stylesheet";
import { Colors } from "UIProps/Colors";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import LinearGradient from "react-native-linear-gradient";
import Header from "./Header";
import { connect } from "react-redux";

class Container extends Component {

  renderFullScreen(){
    let {
      refreshingData,
      scrollEnabled,
      safeAreaColorBottom,
      onRefresh,
      showHeader = true,
      contentStyle,
      hideBack = false,
      headerTitle,
      extraScrollheight,
      headerContainerStyle,
      barStyle,
      rightIcon,
    } = this.props;
    return(<>
     
        <StatusBar translucent={true} barStyle={barStyle || "light-content"} />
        {showHeader === false ? null : (
          <View style={{ padding: global.contentPadding }}>
            <Header
            rightIcon={rightIcon}
              headerContainerStyle={headerContainerStyle}
              hideBack={hideBack}
              title={headerTitle}
            />
          </View>
        )}

        <KeyboardAwareScrollView
          ref={(ref) => {
            refSetter = ref;
          }}
          refreshControl={
            onRefresh && (
              <RefreshControl
                refreshing={refreshingData}
                onRefresh={onRefresh || undefined}
              />
            )
          }
          nestedScrollEnabled
          scrollEnabled={scrollEnabled == undefined ? true : scrollEnabled}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={[styles.contentFixed, {backgroundColor:'#fff', ...contentStyle, }]}
          behavior="padding"
          {...this.props}
        >
          {this.props.children}
        </KeyboardAwareScrollView>
    </>)
  }
  renderForIOS() {
    let {
      refreshingData,
      scrollEnabled,
      safeAreaColorBottom,
      onRefresh,
      showHeader = true,
      contentStyle,
      rightIcon,
      hideBack = false,
      headerTitle,
      extraScrollheight,
      headerContainerStyle,
      isFullScreen,
    } = this.props;
    if(isFullScreen){
      return this.renderFullScreen()
    } else {

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: "#fff" }} />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: safeAreaColorBottom || "white" }}
        >
          <StatusBar translucent={true} barStyle="dark-content" />
          {showHeader === false ? null : (
            <View style={{ padding: global.contentPadding }}>
              <Header
              rightIcon={rightIcon}
                headerContainerStyle={headerContainerStyle}
                hideBack={hideBack}
                title={headerTitle}
              />
            </View>
          )}

          {this.renderScrollView()}
        </SafeAreaView>
      </>
    );
  }



  }

  renderScrollView(){
    let {
      refreshingData,
      scrollEnabled,
      onRefresh,
      contentStyle,
    } = this.props;
    return(
      <KeyboardAwareScrollView
            ref={(ref) => {
              refSetter = ref;
            }}
            refreshControl={
              onRefresh && (
                <RefreshControl
                  refreshing={refreshingData}
                  onRefresh={onRefresh || undefined}
                />
              )
            }
            nestedScrollEnabled
            scrollEnabled={scrollEnabled == undefined ? true : scrollEnabled}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[styles.contentFixed, { ...contentStyle,paddingBottom:HelperMethods.isPlatformAndroid() ? 0 : global.contentPadding }]}
            behavior="padding"
            {...this.props}
          >
            {this.props.children}
          </KeyboardAwareScrollView>
    )
  }

  renderForAndroid() {
    let {
      refreshingData,
      onRefresh,
      scrollEnabled,
      contentStyle,
      showHeader = true,
      hideBack = false,
      extraScrollheight,
      headerContainerStyle,
      rightIcon,
      showGradient,
      headerTitle,
      barStyle,
      isFullScreen,
    } = this.props;

    return (
      <>
      {isFullScreen ? 
        <StatusBar translucent backgroundColor="transparent" barStyle={barStyle || "dark-content"} />
      
      :
        <StatusBar backgroundColor="#fff" barStyle={barStyle || "dark-content"} />
      }

        {showHeader === false ? null : (
          <View style={{ padding: global.contentPadding,backgroundColor:'white'}}>
            <Header
            rightIcon={rightIcon}
              headerContainerStyle={headerContainerStyle}
              hideBack={hideBack}
              title={headerTitle}
            />
          </View>
        )}

        {this.renderScrollView()}
      </>
    );
  }

  render() {
    console.log(this.props.sideMenuOpened)
    return (
      <View style={{flex:1,paddingTop:this.props.isFullScreen ? 0 : 4,backgroundColor:'#fff'}} pointerEvents={this.props.pointerEventException || this.props.sideMenuOpened ? 'none' : 'auto'} >
        {<BackHandlerSingleton onBackPress={this.props.onBackPress} />}
        {HelperMethods.isPlatformAndroid()
          ? this.renderForAndroid()
          : this.renderForIOS()}
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  $columnWidth: "100%",
  $rem: global.rem,

  container: {
    width: "100%",
  },

  contentFixed: {
    flexGrow: 1,
    backgroundColor:'#fff',
    padding: global.contentPadding,
  },

  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: "0rem",
    width: "100%",
  },
});


const mapStateToProps = (state) =>{
  return {
    sideMenuOpened:state.reducer.sideMenuOpened
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Container)

