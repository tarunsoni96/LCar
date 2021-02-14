import { Dimensions, Platform } from 'react-native';

function getWidth() {
  return Dimensions.get('window').width;
}

function getHeight() {
  return Dimensions.get('window').height;
}

function isSmallDevice() {
  return getWidth() <= 360;
}

function getCircleWidth() {
  return isSmallDevice() ? getWidth() - 90 * 2 : getWidth() - 78 * 2;
}

export default {
  deviceWidth: getWidth(),
  deviceHeight: getHeight(),
  isSmallDevice: isSmallDevice(),
  tabBarHeight: 45,
  mainPadding: 26,
  isIphoneX: getHeight() >= 812 && Platform.OS === 'ios',
  isGiganticAndroid: getHeight() >= 720 && Platform.OS === 'android',
  isGiganticScreen: getHeight() >= 720,
  circleWidth: getCircleWidth(),
  paragraphWidth: getWidth() - (isSmallDevice() ? 60 : 80),
};
