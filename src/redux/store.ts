import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './reducer';
import { authSaga } from '../ducks/auth';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const withReduxDevTools = composeWithDevTools(enhancer);
const reducer = createRootReducer(history);

const store = createStore(reducer, withReduxDevTools);
sagaMiddleware.run(authSaga);

export default store;
