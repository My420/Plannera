import { Record } from 'immutable';
import { put, takeEvery, all } from 'redux-saga/effects';
import { ISignUpFormData, ISignInFormData } from '../types/signUpForm';
import { IUser } from '../types/user';
import { EMAIL, LAST_NAME, FIRST_NAME } from '../utils/constant';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = 'Plannera/auth/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'Plannera/auth/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'Plannera/auth/SIGN_UP_ERROR';
export const SIGN_IN_REQUEST = 'Plannera/auth/SIGN_IN_REQUEST';

/**
 * types
 */

export interface ISignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  payload: ISignUpFormData;
}
export interface ISignUpSuccessAction {
  type: typeof SIGN_UP_SUCCESS;
  payload: IUser;
}
export interface ISignUpErrorAction {
  type: typeof SIGN_UP_ERROR;
  payload: string;
}
export interface ISignInRequestAction {
  type: typeof SIGN_IN_REQUEST;
  payload: ISignInFormData;
}

export type AuthActionTypes =
  | ISignUpRequestAction
  | ISignUpSuccessAction
  | ISignUpErrorAction
  | ISignInRequestAction;

export interface IReducerInitialState extends IUser {
  error: null | string;
  loading: boolean;
}

/**
 * Reducer
 */

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
    case SIGN_UP_REQUEST:
      return state.set('loading', true);
    case SIGN_UP_SUCCESS: {
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
    default:
      return state;
  }
};

export default reducer;

/**
 * Action Creator
 */

export const signUp = (data: ISignUpFormData): ISignUpRequestAction => ({
  type: SIGN_UP_REQUEST,
  payload: data,
});

export const signUpSuccess = (data: IUser): ISignUpSuccessAction => ({
  type: SIGN_UP_SUCCESS,
  payload: data,
});

export const signIn = (data: ISignInFormData): ISignInRequestAction => ({
  type: SIGN_IN_REQUEST,
  payload: data,
});

/**
 *  Saga
 */

export function* registerUser(action: ISignUpRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email, [FIRST_NAME]: firstName, [LAST_NAME]: lastName } = payload;

  // register new user in firebase get ID

  // create initial
  const initial = (firstName[0] + lastName[0]).toUpperCase();

  // add user profile card

  // dispatch success or error action

  const data: IUser = {
    userID: 'dsdfadsasdad2dsdsa',
    email,
    firstName,
    lastName,
    initial,
  };

  yield put(signUpSuccess(data));
}

export function* loginUser(action: ISignInRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email } = payload;

  // login user in firebase get ID

  // fetch user data from firebase

  // dispatch success or error action

  const data: IUser = {
    userID: 'dsdfadsasdad2dsdsa',
    email,
    firstName: 'firstName',
    lastName: 'lastName',
    initial: 'FL',
  };

  yield put(signUpSuccess(data));
}

export function* authSaga() {
  yield all([takeEvery(SIGN_UP_REQUEST, registerUser), takeEvery(SIGN_IN_REQUEST, loginUser)]);
}
