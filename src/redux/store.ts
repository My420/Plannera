import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducer';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);
const reducer = createRootReducer(history);

const store = createStore(reducer, enhancer);

export default store;
