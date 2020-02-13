import { Record } from 'immutable';
import { IReducerInitialState, AuthActionTypes } from './types';
import {
  SIGN_UP_REQUEST,
  SIGN_UP_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from './constant';

const initialState: IReducerInitialState = {
  userID: null,
  email: null,
  firstName: null,
  lastName: null,
  initial: null,
  error: null,
  loading: false,
};

const ReducerRecord = Record(initialState);
const reducerState = new ReducerRecord();

const reducer = (state = reducerState, action: AuthActionTypes): typeof reducerState => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('loading', true).set('error', null);
    case SIGN_IN_SUCCESS: {
      const {
        userID, email, lastName, firstName, initial,
      } = action.payload;
      return state
        .set('userID', userID)
        .set('email', email)
        .set('firstName', firstName)
        .set('lastName', lastName)
        .set('initial', initial)
        .set('loading', false)
        .set('error', null);
    }
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR: {
      const error = action.payload;
      return state
        .set('userID', null)
        .set('email', null)
        .set('firstName', null)
        .set('lastName', null)
        .set('initial', null)
        .set('loading', false)
        .set('error', error);
    }
    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();
    case SIGN_OUT_ERROR: {
      const { payload } = action;
      return state.set('error', payload);
    }
    default:
      return state;
  }
};

export default reducer;
