import * as types from './actionTypes';

export function userSubmit(user) {
  return {
    type: types.USER_SUBMIT,
    user
  }
}

export function messageSubmit(message) {
  return {
    type: types.MESSAGE_SUBMIT,
    message
  }
}
