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
  AUTH_CLEAR_ERROR,
} from './constant';

const initialState: IReducerInitialState = {
  userID: null,
  email: null,
  error: null,
  loading: false,
};

export const ReducerRecord = Record(initialState);
export const reducerState = new ReducerRecord();

const reducer = (state = reducerState, action: AuthActionTypes): typeof reducerState => {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('loading', true).set('error', null);
    case SIGN_IN_SUCCESS: {
      const { userID, email } = action.payload;
      return state
        .set('userID', userID)
        .set('email', email)
        .set('loading', false)
        .set('error', null);
    }
    case SIGN_IN_ERROR:
    case SIGN_UP_ERROR: {
      const error = action.payload;
      return state
        .set('userID', null)
        .set('email', null)
        .set('loading', false)
        .set('error', error);
    }
    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();
    case SIGN_OUT_ERROR: {
      const { payload } = action;
      return state.set('error', payload);
    }
    case AUTH_CLEAR_ERROR:
      return state.set('error', null);
    default:
      return state;
  }
};

export default reducer;
