import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Fonts from "UIProps/Fonts";
import HelperMethods from "Helpers/Methods";
import BackHandlerSingleton from "ServiceProviders/BackHandlerSingleton";
import LinearGradient from "react-native-linear-gradient";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import Container from "AppLevelComponents/UI/Container";
import { navigate, navigationRef } from "../../RootNavigation";
const { height, width } = Dimensions.get("screen");

class BubbleAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewWidth: 100,
      viewHeight: 100,
      dataSource: [
        {
          category_id: 1,
          description: "Yinka Davies, Sonny Okosun, Fela Kuti",
          image: "@2xafro-bg.png",
          status: "active",
          sub_category_name: "Afrobeats",
          sub_id: 49,
          sub_id_name: "music_afrobeats",
        },
        {
          category_id: 1,
          description: "Muddy waters, B.B. King, Robert Johnson",
          image: "@2xblues-BG.png",
          status: "active",
          sub_category_name: "Blues",
          sub_id: 1,
          sub_id_name: "music_blues",
        },
        {
          category_id: 1,
          description: "Mozart, Beethoven, Claude Debussy",
          image: "@2xclassical-BG.png",
          status: "active",
          sub_category_name: "Classical",
          sub_id: 2,
          sub_id_name: "music_classical",
        },
        {
          category_id: 1,
          description: "Calvin Harris, Daft Punk, David Guetta",
          image: "@2xelectric-BG.png",
          status: "active",
          sub_category_name: "Electronic",
          sub_id: 6,
          sub_id_name: "music_electronic",
        },
        {
          category_id: 1,
          description: "",
          image: "",
          status: "active",
          sub_category_name: "Gospel",
          sub_id: 50,
          sub_id_name: "music_gospel",
        },
        {
          category_id: 1,
          description: "Drake, Kendrik Lamar, Nicki Minaj",
          image: "@2xhiBphop-G.png",
          status: "active",
          sub_category_name: "Hip hop/Rap",
          sub_id: 15,
          sub_id_name: "music_rap_hiphop",
        },
        {
          category_id: 1,
          description: "",
          image: "",
          status: "active",
          sub_category_name: "Jazz",
          sub_id: 8,
          sub_id_name: "music_jazz",
        },
        {
          category_id: 1,
          description: "Metalica, AC/DC, Black Sabbath",
          image: "@2xmetal-BG.png",
          status: "active",
          sub_category_name: "Metal",
          sub_id: 16,
          sub_id_name: "music_metal",
        },
        {
          category_id: 1,
          description: "Adele, Ed Sheeran, Ariana Grande",
          image: "@2xpop-BG.png",
          status: "active",
          sub_category_name: "Pop",
          sub_id: 19,
          sub_id_name: "music_pop",
        },
        {
          category_id: 1,
          description: "Usher, R. Kelly, Erykah Badu",
          image: "@2xR&B-BG.png",
          status: "active",
          sub_category_name: "R&B/Soul",
          sub_id: 12,
          sub_id_name: "music_rb",
        },
        {
          category_id: 1,
          description: "Bob Marley, The Clash, Shaggy",
          image: "@2xreggae-BG.png",
          status: "active",
          sub_category_name: "Reggae",
          sub_id: 13,
          sub_id_name: "music_reggae",
        },
        {
          category_id: 1,
          description: "Queen, Jon Bon Jovi, The Rolling Stones",
          image: "@2xRock-BG.png",
          status: "active",
          sub_category_name: "Rock",
          sub_id: 18,
          sub_id_name: "music_rock",
        },
      ],
      selectedView: false,
      backgroundColorView: "transparent",
      selectedCats: [],
      selectedValue: [],
      count: 0,
      newArray: [],
      arrayLength: "",
      asdf: [],
    };

    this.rx = [];
    this.ry = [];
  }
  
  componentDidMount() {
    this.props.navigation.dangerouslyGetParent().addListener('tabPress',(e)=>{
    })

  }

  selectItem(item) {
    let arr = [...this.state.selectedCats];
    let i = arr.indexOf(item.item.sub_id);
    if (i > -1) {
      arr.splice(i, 1);
    } else {
      arr.push(item.item.sub_id);
    }
    this.setState({ selectedCats: arr }, () => {});

    item.item.isSelect = !item.item.isSelect;
    item.item.count = item.item.count + 1;
    HelperMethods.animateLayout();
    this.setState({
      asdf: this.state.asdf,
    });

    let new_array = [];
    let data = this.state.asdf.filter((itemcount) => {
      if (itemcount.isSelect == true) {
        new_array.push(item);
        console.log("NEW  ======", new_array);
        this.setState(
          {
            arrayLength: new_array.length,
            newArray: new_array,
          },
          console.log("NEW ARRAY ======", this.state.newArray)
        );
        return true;
      }

      return false;
    });

    // })
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  renderItemList(item, index) {
    let gradColor = ["#841470", "#6b1770"]
    let borderColor = "#d6b9d4"
        

    let boxSize = this.randomIntFromInterval(
      heightPercentageToDP(12),
      heightPercentageToDP(14.5)
    );
    if (this.ry.length < this.state.asdf.length) {
      this.ry[index] = this.randomIntFromInterval(Math.random(0, 10), 14);
      this.rx[index] = this.randomIntFromInterval(Math.random(0, 5), 7);
    }
    return (
      <TouchableOpacity
        onPress={(index) => this.selectItem(item)}
        style={{
          margin: widthPercentageToDP(1.4),
          // marginBottom:15,
          height: boxSize,
          width: boxSize,
          marginTop: this.ry[index],
          marginLeft: this.rx[index],
          borderRadius: boxSize / 2,
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={
            item.item.isSelect ? gradColor : ["rgba(0,0,0,0)", "rgba(0,0,0,0)"]
          }
          style={{
            borderColor,
            borderRadius: boxSize / 2,
            borderWidth: item.item.isSelect ? 1 : 2,
            alignItems: "center",
            justifyContent: "center",
            // flex:1,
            paddingHorizontal: boxSize / 15,
            height: boxSize,
            width: boxSize,
          }}
        >
          <Text
            style={{
              fontSize: boxSize / 7.5,
              color: item.item.isSelect ? "#fff" : "#000",
              textAlign: "center",
              // padding:20
            }}
          >
            {item.item.sub_category_name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <>
        <Container showHeader={false}  headerTitle="Interactivity">
          <FlatList
            data={this.state.dataSource}
            renderItem={(item, index) => this.renderItemList(item, index)}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            style={{ alignSelf: "center" }}
          />
        </Container>
      </>
    );
  }
}
export default BubbleAnimation
