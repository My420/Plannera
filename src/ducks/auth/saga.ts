import { Unsubscribe } from 'firebase';
import { Subscribe, eventChannel, EventChannel } from 'redux-saga';
import {
  put, takeEvery, all, call, take,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { IAuthChannelAction, ISignUpRequestAction, ISignInRequestAction } from './types';
import { SIGN_OUT_REQUEST, SIGN_IN_REQUEST, SIGN_UP_REQUEST } from './constant';
import {
  EMAIL, MAIN_PAGE, PASSWORD, LAST_NAME, FIRST_NAME,
} from '../../utils/constant';
import {
  signInError,
  signUpError,
  signOutSuccess,
  signOutError,
  signInSuccess,
} from './actionCreator';
import { createUser, loadUser, clearUserState } from '../user/actionCreator';
import authServices from '../../services/auth';

const subscribe: Subscribe<IAuthChannelAction> = (emit): Unsubscribe => {
  authServices.onStateChange(emit);
  return () => {};
};

export const createAuthChannel = () => eventChannel(subscribe);

export function* registerUser(action: ISignUpRequestAction) {
  const { payload } = action;
  const {
    [EMAIL]: email,
    [PASSWORD]: password,
    [LAST_NAME]: lastName,
    [FIRST_NAME]: firstName,
  } = payload;

  try {
    const userID: string = yield call(authServices.signUpUser, email, password);
    yield put(
      createUser({
        userID,
        email,
        firstName,
        lastName,
      }),
    );
  } catch (error) {
    const { message } = error as Error;
    yield put(signUpError(message));
  }
}

export function* loginUser(action: ISignInRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email, [PASSWORD]: password } = payload;
  try {
    yield call(authServices.signInUser, email, password);
  } catch (error) {
    const { message } = error as Error;
    yield put(signInError(message));
  }
}

export function* logoutUser() {
  try {
    yield call(authServices.signOutUser);
  } catch (error) {
    const { message } = error as Error;
    yield put(signOutError(message));
  }
}

export function* watchAuthStatusChange() {
  const authChan: EventChannel<IAuthChannelAction> = yield call(createAuthChannel);
  while (true) {
    const { uid, email }: IAuthChannelAction = yield take(authChan);
    if (uid) {
      yield put(
        signInSuccess({
          userID: uid,
          email,
        }),
      );
      yield put(loadUser(uid));
      yield put(push(MAIN_PAGE));
    } else {
      yield put(signOutSuccess());
      yield put(clearUserState());
    }
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, registerUser),
    takeEvery(SIGN_IN_REQUEST, loginUser),
    takeEvery(SIGN_OUT_REQUEST, logoutUser),
    call(watchAuthStatusChange),
  ]);
}
