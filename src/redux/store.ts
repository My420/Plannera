import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer, { moduleName as auth } from '../ducks/auth';
import userReducer, { moduleName as user } from '../ducks/user';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const withReduxDevTools = composeWithDevTools(enhancer);
const rootReducer = combineReducers({
  router: connectRouter(history),
  [auth]: authReducer,
  [user]: userReducer,
});

const store = createStore(rootReducer, withReduxDevTools);
sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
