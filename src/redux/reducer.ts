import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import authReducer, { moduleName as auth } from '../ducks/auth';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  [auth]: authReducer,
});

export type AppState = ReturnType<typeof createRootReducer>;

export default createRootReducer;
