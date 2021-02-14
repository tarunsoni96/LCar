import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

/*
HOW TO USE E.G
render() {
  return (
      <AVAHorizontalScrollView
        screens={[<Test />, <Test />]}
        onChangeIndex={newInd => console.warn(newInd)}
        ref={ref => (this._ref = ref)}
        preRender={1}
      />
  )
}

*/

interface P {
  screens: React.ReactNode[]; // an arrays of compotent to render e.g [<View />, <View />]
  onChangeIndex?: (newIndex: number) => void; // called once the scroll transition is completed return new index
  style?: StyleProp<ViewStyle>;
  width?: number; // width of the views, defaults is phone's width
  preRender?: number; // number of screens you want to preRender if null it render all of them on mount
  scrollEnabled?: boolean;
  keyboardDismissMode?: 'none' | 'interactive' | 'on-drag';
  keyboardShouldPersistTaps?: boolean | 'handled' | 'always' | 'never';
}

// TODO:
// -add scroll index indicator component
// -add optional animation e.g fadeIn transition between screen

export default class AVAHorizontalScrollView extends React.Component<P> {
  state = {
    scrollIndex: 0,
    scrollRatio: 1,
    scrollDirection: 'right',
    alreadyRenderedIndex: 0,
  };

  _scrollView: ScrollView;
  _previousX = 0;

  // Use this method with a ref on AVAHorizontalScrollView
  // e.g: this._refOfComponent.scrollToIndex(index)
  scrollToIndex = (index: number) => {
    let finalIndex =
      index >= this.props.screens.length
        ? this.props.screens.length - 1
        : index;

    finalIndex = index < 0 ? 0 : finalIndex;
    const width = this.props.width || Dimensions.get('window').width;
    this._scrollView.scrollTo({ x: width * finalIndex });
  };
  // Use this method with a ref on AVAHorizontalScrollView
  // e.g: this._refOfComponent.scrollToIndex(index)
  scrollToIndexUnanimated = (index: number) => {
    let finalIndex =
      index >= this.props.screens.length
        ? this.props.screens.length - 1
        : index;

    finalIndex = index < 0 ? 0 : finalIndex;
    const width = this.props.width || Dimensions.get('window').width;
    this._scrollView.scrollTo({ x: width * finalIndex, animated: false });
  };

  // Use this method with a ref on AVAHorizontalScrollView to scroll forward
  // e.g: this._refOfComponent.scrollToNext()
  scrollToNext = () => {
    const newIndex = this.state.scrollIndex + 1;
    this.scrollToIndex(newIndex);
  };

  // Use this method with a ref on AVAHorizontalScrollView to scroll back
  // e.g: this._refOfComponent.scrollToPrevious()
  scrollToPrevious = () => {
    const newIndex = this.state.scrollIndex - 1;
    this.scrollToIndex(newIndex);
  };

  // return the current index
  // e.g: this._refOfComponent.getIndex()
  getIndex = () => this.state.scrollIndex;

  _renderScreenContent = () => {
    const width = this.props.width || Dimensions.get('window').width;

    if (this.props.preRender) {
      return this.props.screens
        ?.slice(0, this.state.alreadyRenderedIndex + this.props.preRender + 1)
        .map((c, index) => (
          <View
            key={index + 'AVAHorizontalScrollView'}
            style={[
              styles.viewWraper,
              this.props.style,
              this.props.width ? { width } : {},
            ]}
          >
            {c}
          </View>
        ));
    }
    return this.props?.screens?.map((c, index) => (
      <View
        key={index + 'AVAHorizontalScrollView'}
        style={[
          styles.viewWraper,
          this.props.style,
          this.props.width ? { width } : {},
        ]}
      >
        {c}
      </View>
    ));
  };

  render() {
    const { alreadyRenderedIndex } = this.state;
    const width = this.props.width || Dimensions.get('window').width;

    let locked = false;

    if (this.props.scrollEnabled === false) {
      locked = true;
    }
    return (
      <ScrollView
        ref={ref => {
          this._scrollView = ref;
        }}
        horizontal
        scrollEventThrottle={64}
        pagingEnabled
        scrollEnabled={!locked}
        showsHorizontalScrollIndicator={false}
        keyboardDismissMode={this.props.keyboardDismissMode || 'none'}
        keyboardShouldPersistTaps={
          this.props.keyboardShouldPersistTaps || 'always'
        }
        onScroll={(event: any) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);

          let direction = 'right';

          if (event.nativeEvent.contentOffset.x >= this._previousX) {
            direction = 'left';
          } else {
            direction = 'right';
          }

          this._previousX = event.nativeEvent.contentOffset.x;

          let ratio =
            (event.nativeEvent.contentOffset.x - index * width) / width;

          if (ratio !== 1) {
            ratio += 1;
          } else {
            ratio = 1;
          }

          if (this.state.scrollIndex !== index) {
            this.setState(
              {
                scrollIndex: index,
                alreadyRenderedIndex:
                  index > alreadyRenderedIndex ? index : alreadyRenderedIndex,
                scrollRatio: ratio,
                scrollDirection: direction,
              },
              () => {
                if (this.props.onChangeIndex) {
                  this.props.onChangeIndex(index);
                }
              },
            );
          }
        }}
      >

        {this._renderScreenContent()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewWraper: {
    width: Dimensions.get('window').width,
    flex: 1,
    // height: Dimensions.get('window').height,
  },
});
