import Constants from "Helpers/Constants";
import HelperMethods from "Helpers/Methods";
import AsyncStorageHandler from "StorageHelpers/AsyncStorageHandler";

const {
  Action_setLoggedIn,
  logout,
  sideMenuOpened,
  showAlert,
  sideMenuClosed,
  closeAlertView,
  setSocialSignupData,
} = require("../ActionTypes/ActionTypes");



const initalState = {
  isLoggedIn: false,
  isAlertShown: false,
  alertTitle: "",
  alertDesc: "",
  userData: {},
  socialSignUpData: {},
  sideMenuOpened: false,
};

export const addRemoveServiceReducer = (state = initalState, action) => {
  switch (action.type) {
    case Action_setLoggedIn:
      AsyncStorageHandler.store(Constants.userInfoObj, action.payload);
      HelperMethods.snackbar("Welcome "+action.payload.name,undefined,undefined,'short');
      return {
        ...state,
        userData: action.payload,
        isLoggedIn: true,
      };

    case logout:
      return {
        ...state,
        userData: {},
        socialSignUpData: {},
        isLoggedIn: false,
      };

    case sideMenuOpened:
      return {
        ...state,
        sideMenuOpened: true,
      };

    case sideMenuClosed:
      return {
        ...state,
        sideMenuOpened: false,
      };

    case showAlert:
      // HelperMethods.animateLayout();
      return {
        ...state,
        isAlertShown: true,
        alertTitle: action.payload.title || "Error",
        alertDesc: action.payload.desc,
      };

    case closeAlertView:
      return {
        ...state,
        isAlertShown: false,
        alertTitle: "",
        alertDesc: "",
      };

    case setSocialSignupData:
      return {
        ...state,
        socialSignUpData: action.payload,
      };

    default:
      return { ...state };
  }
};
