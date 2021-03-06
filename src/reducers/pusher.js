import * as types from '../actions/actionTypes';

export const defaultState = {
  user: false,
  messages: []
}

const pusher = (state = defaultState, action) => {

  switch (action.type) {

    case types.USER_SUBMIT:
      return {
        ...state,
        user: action.user
      }
    case types.MESSAGE_SUBMIT:
      return {
        ...state,
        messages: [
          ...state.messages,
          action.message
        ]
      }
    default:
      return state;

  }
}

export default pusher;
