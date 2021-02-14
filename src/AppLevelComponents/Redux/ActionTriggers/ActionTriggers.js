const {
  decreaseFoodQty,
setSocialSignupData,
closeAlertView,
showAlert,
sideMenuClosed,
sideMenuOpened,
logout,
  Action_setLoggedIn,
  increaseFoodQty,
  clearFood,
} = require("../ActionTypes/ActionTypes");

export const clearFoodFunction = (obj) => {
  return {
    type: clearFood,
    payload: obj,
  };
};

export const decreaseFoodQtyFunction = (obj) => {
  return {
    type: decreaseFoodQty,
    payload: obj,
  };
};

export const increaseFoodQtyFunction = (obj) => {
  return {
    type: increaseFoodQty,
    payload: obj,
  };
};

export const SetLoggedInTrigger = (obj) => {
  return {
    type: Action_setLoggedIn,
    payload: obj,
  };
};


export const LogoutTrigger = (obj) => {
		return {
			type : logout,
			payload:obj
		}
	}

export const SideMenuOpenedTrigger = (obj) => {
		return {
			type : sideMenuOpened,
			payload:obj
		}
	}

export const SideMenuClosedTrigger = (obj) => {
		return {
			type : sideMenuClosed,
			payload:obj
		}
	}

export const ShowAlertTrigger = (obj) => {
		return {
			type : showAlert,
			payload:obj
		}
	}

export const CloseAlertViewTrigger = (obj) => {
		return {
			type : closeAlertView,
			payload:obj
		}
	}

export const SetSocialSignupDataTrigger = (obj) => {
		return {
			type : setSocialSignupData,
			payload:obj
		}
	}