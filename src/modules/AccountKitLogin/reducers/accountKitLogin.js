import * as types from '../actions/actionTypes';

export const defaultState = {

}

const accountKitLogin = (state = defaultState, action) => {

  switch (action.type) {

    case types.AUTH_ACCOUNT_KIT:
      return state;

    case types.AUTH_ACCOUNT_KIT_REQUEST:
      return state;

    case types.AUTH_ACCOUNT_KIT_FAILURE:
      return state;

    default:
      return state;

  }
}

export default accountKitLogin;
