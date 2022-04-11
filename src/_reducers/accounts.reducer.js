import { accountsConstants } from '../_constants';

export function accounts(state = {}, action) {
  switch (action.type) {
    case accountsConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case accountsConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case accountsConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}