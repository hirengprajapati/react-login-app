import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { accounts } from './accounts.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  accounts,
  alert
});

export default rootReducer;