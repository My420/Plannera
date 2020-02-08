import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer, { moduleName as auth, authSaga } from '../ducks/auth';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const withReduxDevTools = composeWithDevTools(enhancer);
const rootReducer = combineReducers({
  router: connectRouter(history),
  [auth]: authReducer,
});

const store = createStore(rootReducer, withReduxDevTools);
sagaMiddleware.run(authSaga);

export type AppState = ReturnType<typeof rootReducer>;

export default store;
