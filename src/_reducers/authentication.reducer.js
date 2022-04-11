import { accountsConstants } from '../_constants';

let account = JSON.parse(localStorage.getItem('account'));
const initialState = account ? { loggedIn: true, account } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case accountsConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case accountsConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        account: action.account
      };
    case accountsConstants.LOGIN_FAILURE:
      return {};
    case accountsConstants.LOGOUT:
      return {};
    default:
      return state
  }
}