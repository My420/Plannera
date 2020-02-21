import { Record } from 'immutable';
import { IReducerInitialState, UserActionTypes } from './types';
import {
  CREATE_USER_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_ERROR,
  CREATE_USER_ERROR,
  CHANGE_USER_DATA_REQUEST,
  CHANGE_USER_DATA_SUCCESS,
  CHANGE_USER_DATA_ERROR,
  CLEAR_USER_STATE,
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

const reducer = (state = reducerState, action: UserActionTypes): typeof reducerState => {
  switch (action.type) {
    case CREATE_USER_REQUEST:
    case LOAD_USER_REQUEST:
    case CHANGE_USER_DATA_REQUEST:
      return state.set('loading', true).set('error', null);
    case CHANGE_USER_DATA_SUCCESS:
    case LOAD_USER_SUCCESS: {
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
    case LOAD_USER_ERROR:
    case CREATE_USER_ERROR: {
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
    case CHANGE_USER_DATA_ERROR: {
      const { payload } = action;
      return state.set('error', payload);
    }
    case CLEAR_USER_STATE:
      return new ReducerRecord();
    default:
      return state;
  }
};

export default reducer;
