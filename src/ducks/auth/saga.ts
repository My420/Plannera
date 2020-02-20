import { Unsubscribe } from 'firebase';
import { Subscribe, eventChannel, EventChannel } from 'redux-saga';
import {
  put, takeEvery, all, call, take,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { IAuthChannelAction, ISignUpRequestAction, ISignInRequestAction } from './types';
import {
  auth, SIGN_OUT_REQUEST, SIGN_IN_REQUEST, SIGN_UP_REQUEST,
} from './constant';
import { EMAIL, MAIN_PAGE, PASSWORD } from '../../utils/constant';
import {
  signInError,
  signUpError,
  signOutSuccess,
  signOutError,
  signInSuccess,
} from './actionCreator';

const subscribe: Subscribe<IAuthChannelAction> = (emit): Unsubscribe => {
  auth.onAuthStateChanged((user) => {
    const uid = user ? user.uid : user;
    const email = user ? user.email : user;
    emit({ uid, email });
  });
  return () => {};
};

const createAuthChannel = () => eventChannel(subscribe);

export function* registerUser(action: ISignUpRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email, [PASSWORD]: password } = payload;

  try {
    yield call([auth, auth.createUserWithEmailAndPassword], email, password);
  } catch (error) {
    const { message } = error as Error;
    yield put(signUpError(message));
  }
}

export function* loginUser(action: ISignInRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email, [PASSWORD]: password } = payload;
  try {
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
  } catch (error) {
    const { message } = error as Error;
    yield put(signInError(message));
  }
}

export function* logoutUser() {
  try {
    yield call([auth, auth.signOut]);
  } catch (error) {
    const { message } = error as Error;
    yield put(signOutError(message));
  }
}

export function* watchAuthStatusChange() {
  const authChan: EventChannel<firebase.User | null> = yield call(createAuthChannel);
  while (true) {
    const { uid, email }: IAuthChannelAction = yield take(authChan);
    if (uid) {
      yield put(
        signInSuccess({
          userID: uid,
          email,
        }),
      );
      yield put(push(MAIN_PAGE));
    } else {
      yield put(signOutSuccess());
    }
  }
}

export default function* authSaga() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, registerUser),
    takeEvery(SIGN_IN_REQUEST, loginUser),
    takeEvery(SIGN_OUT_REQUEST, logoutUser),
    watchAuthStatusChange(),
  ]);
}
