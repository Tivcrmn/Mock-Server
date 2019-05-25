// action-types
const ALERT_SHOW = "ALERT_SHOW";
const ALERT_HIDE = "ALERT_HIDE";

// state
const initialState = {
  show: false,
  message: "",
};

// action
export const showAlert = (message) => dispatch => dispatch({ type: ALERT_SHOW, message });

export const hideAlert = () => dispatch => dispatch({ type: ALERT_HIDE });

// reducer
const alert = (state = initialState, action) => {
  switch (action.type) {
  case ALERT_SHOW:
    return {
      show: true,
      message: action.message,
    };
  case ALERT_HIDE:
    return {
      show: false,
      message: "",
    };
  default:
    return state;
  }
};

export default alert;

// selector
export const getShow = state => state.alert.show;
export const getMessage = state => state.alert.message;
