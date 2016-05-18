import * as types from './actionTypes';
import axios from 'axios';

export function authWithAccountKit(code) {
  return {
    type: types.AUTH_ACCOUNT_KIT,
    promise: axios.post('/sendcode', {code: code})
  }
}
