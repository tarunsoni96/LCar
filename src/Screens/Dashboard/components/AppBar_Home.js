import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import CustomText from "AppLevelComponents/UI/CustomText";
import { Colors } from "UIProps/Colors";
import { drawerRef } from '../../../../RootNavigation';

export default class AppBar_Home extends React.Component {
  constructor(props) {
    super(props);
  }


  openSideMenu() {
    drawerRef.current.open()
  }



  render() {
      return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              style={styles.sideMenuContainer}
              onPress={() => this.openSideMenu()}
            >
              <Image
                source={require("assets/img/sideMenu.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            
          </View>
      )
  }
}


const styles = StyleSheet.create({
    sideMenuContainer: {
      padding: global.contentPadding,
      marginLeft: -global.contentPadding,
    },
  
    notificationBellContainer: {
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOffset: { height: 1, width: 0 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation:30,
      padding: 10,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
  
    notificationCounter: {
      position: "absolute",
      backgroundColor: Colors.accentLight,
      borderRadius: 30,
      paddingHorizontal: 5,
      alignItems: "center",
      justifyContent: "center",
      top: -5,
      right: -8,
    },
  });

