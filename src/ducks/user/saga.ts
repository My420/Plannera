import {
  takeEvery, all, call, put,
} from 'redux-saga/effects';
import { IUser, ICreateUserRequestAction, ILoadUserRequestAction } from './types';
import { CREATE_USER_REQUEST, LOAD_USER_REQUEST } from './constant';
import createInitial from '../../utils/createInitial';
import { createUserError, loadUserSuccess, loadUserError } from './actionCreator';
import userService from '../../services/user';

export function* createUser(action: ICreateUserRequestAction) {
  const { payload } = action;
  const {
    userID, email, lastName, firstName,
  } = payload;
  try {
    const initial: string = yield call(createInitial, firstName, lastName);
    const userData: IUser = {
      email,
      firstName,
      lastName,
      initial,
      userID,
    };
    yield call([userService, userService.createUser], userData);
  } catch (error) {
    const { message } = error as Error;
    yield put(createUserError(message));
  }
}

export function* loadUser(action: ILoadUserRequestAction) {
  const { payload } = action;
  const { userID } = payload;
  try {
    const data: IUser = yield call([userService, userService.loadUser], userID);
    yield put(loadUserSuccess(data));
  } catch (error) {
    const { message } = error as Error;
    yield put(loadUserError(message));
  }
}

export default function* userSaga() {
  yield all([takeEvery(CREATE_USER_REQUEST, createUser), takeEvery(LOAD_USER_REQUEST, loadUser)]);
}
