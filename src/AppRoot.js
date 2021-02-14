import * as React from "react";
import { TouchableOpacity, PanResponder, Animated, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Interactable from "react-native-interactable";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "Screens/Dashboard/Dashboard";
import ListDeletionAnimation from "Screens/ListDeletionAnimation";
import { createStackNavigator } from "@react-navigation/stack";
import BubbleAnimation from "Screens/BubbleAnimation";
import ScalingDrawer from "react-native-scaling-drawer";
import { navigationRef, isReadyRef, drawerRef } from "../RootNavigation";
import { Component } from "react";
import Login_Mobile from "Screens/Login/Login_Mobile";
import Login_OTPVerification from "Screens/Login/Login_OTPVerification";
import ProfileBuilding from "Screens/Signup/ProfileBuilding";
import SelectPreferences from "Screens/SelectPreferences/SelectPreferences";
import { connect } from "react-redux";
import { Colors } from "UIProps/Colors";
import { widthPercentageToDP } from "react-native-responsive-screen";
import SideMenu from "AppComponents/SideMenu/SideMenu";
import MyProfile from "Screens/Profile/MyProfile";
import EditProfile from "Screens/Profile/EditProfile";
import { SideMenuClosedTrigger, SideMenuOpenedTrigger } from "AppLevelComponents/Redux/ActionTriggers/ActionTriggers";
import { sideMenuClosed } from "AppLevelComponents/Redux/ActionTypes/ActionTypes";
import Settings from "Screens/Settings/Settings";
import UpdatePreferences from "Screens/UpdatePreferences/UpdatePreferences";

const OnBoardingStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyChildStack = createStackNavigator();

let screenOptionsStack = {
  headerShown: false,
  gestureEnabled: false,
};

const Tab = createBottomTabNavigator();


function HomeScreen({navigation,route}) {
  if(route?.state?.index >= 1){
    navigation.setOptions({ tabBarVisible:false })
  } else {
    
    navigation.setOptions({ tabBarVisible:true})
  }
  return (
    <HomeStack.Navigator screenOptions={screenOptionsStack}>
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
      <HomeStack.Screen name="Settings" component={Settings} />
      <HomeStack.Screen name="EditPreferences" component={UpdatePreferences} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen
          name="Login_OTPVerification"
          component={Login_OTPVerification}
        />
      <HomeStack.Screen name="MyProfile" component={MyProfile} />
      <HomeStack.Screen
        name="ListDeletionAnimation"
        component={ListDeletionAnimation}
      />
    </HomeStack.Navigator>
  );
}

function MyChild() {
  return (
    <MyChildStack.Navigator screenOptions={screenOptionsStack}>
      <MyChildStack.Screen name="Dashboard" component={BubbleAnimation} />
      <MyChildStack.Screen
        name="ListDeletionAnimation"
        component={ListDeletionAnimation}
      />
    </MyChildStack.Navigator>
  );
}

class AppRoot extends Component {
  state = {
    pan: new Animated.ValueXY(),
    enableTabBar: true,
  };
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(1);
    this._deltaY = new Animated.Value(0);
    this.clippingPoint = widthPercentageToDP(76);

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
      onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({
          x: this._animatedValueX,
          y: this._animatedValueY,
        });
        this.state.pan.setValue({ x: 0, y: 0 }); //Initial value
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: this.state.pan.x, dy: this.state.pan.y },
      ]), // Creates a function to handle the movement and set offsets
      onPanResponderRelease: () => {
        this.state.pan.flattenOffset(); // Flatten the offset so it resets the default positioning
      },
    });
  }
  componentDidMount() {
    isReadyRef.current = false;
  }
  enableDrag() {}

  disableDrag() {
    alert("disabled");
  }

  onOpen() {
    this.props.sideMenuOpened()
    this.setState({ enableTabBar: false });

  }
  
  onClose() {
    this.props.sideMenuClosed()
    this.setState({ enableTabBar: true });
  }
  hideTabBar() {
    if (this.state.enableTabBar) {
      this.setState({ enableTabBar: false });
    }
  }

  renderDash() {
    let defaultScalingDrawerConfig = {
      scalingFactor: 0.6,
      minimizeFactor: 0.6,
      swipeOffset: 40,
    };

    return (
      <ScalingDrawer
        ref={drawerRef}
        hideTabBar={() => this.hideTabBar()}
        content={
          <SideMenu
            closeDrawer={() => this._drawer.close()}
            navigation={this.props.navigation}
          />
        }
        {...defaultScalingDrawerConfig}
        onClose={() => this.onClose()}
        onOpen={() => this.onOpen()}
      >
        <Tab.Navigator options={{ tabBarVisible: false }}>
          <Tab.Screen
            options={({ route, }) => ({
              
              tabBarVisible: this.state.enableTabBar
            })}
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen name="MyChild" component={MyChild} />
        </Tab.Navigator>
      </ScalingDrawer>
    );
  }

  renderSignupFlow() {
    return (
      <OnBoardingStack.Navigator screenOptions={screenOptionsStack}>
        <OnBoardingStack.Screen name="Login_Mobile" component={Login_Mobile} />
      <OnBoardingStack.Screen
          name="ProfileBuilding"
          component={ProfileBuilding}
        />
        
        <OnBoardingStack.Screen
          name="SelectPreferences"
          component={SelectPreferences}
        />
        <OnBoardingStack.Screen
          name="Login_OTPVerification"
          component={Login_OTPVerification}
        />

        {/* <OnBoardingStack.Screen
          name="Login_OTPVerification"
          component={Login_OTPVerification}
        /> */}
      </OnBoardingStack.Navigator>
    );
  }

  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          isReadyRef.current = true;
        }}
      >
        {this.props.isLoggedIn ? this.renderDash() : this.renderSignupFlow()}
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.reducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sideMenuOpened: (obj) => dispatch(SideMenuOpenedTrigger(obj)),
    sideMenuClosed: (obj) => dispatch(SideMenuClosedTrigger(obj))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
