import { Unsubscribe } from 'firebase';
import { Subscribe, eventChannel, EventChannel } from 'redux-saga';
import {
  put, takeEvery, all, call, take,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { IAuthChannelAction, ISignUpRequestAction, ISignInRequestAction } from './types';
import { IUser } from '../../types/user';
import {
  auth,
  usersCollectionRef,
  SIGN_OUT_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
} from './constant';
import {
  EMAIL, LAST_NAME, FIRST_NAME, MAIN_PAGE, PASSWORD,
} from '../../utils/constant';
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
    emit({ uid });
  });
  return () => {};
};

const createAuthChannel = () => eventChannel(subscribe);

export function* registerUser(action: ISignUpRequestAction) {
  const { payload } = action;
  const {
    [EMAIL]: email,
    [PASSWORD]: password,
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
  } = payload;

  try {
    const response: firebase.auth.UserCredential = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
    );

    if (response.user) {
      const userID = response.user.uid;
      const userDocRef = usersCollectionRef.doc(userID);
      const initial = (firstName[0] + lastName[0]).toUpperCase();
      const userData: IUser = {
        email,
        firstName,
        lastName,
        initial,
        userID,
      };
      yield call([userDocRef, userDocRef.set], userData);
    }
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
    yield put(signOutSuccess());
  } catch (error) {
    const { message } = error as Error;
    yield put(signOutError(message));
  }
}

export function* watchAuthStatusChange() {
  const authChan: EventChannel<firebase.User | null> = yield call(createAuthChannel);
  while (true) {
    const { uid }: IAuthChannelAction = yield take(authChan);
    if (uid) {
      const userDocRef = usersCollectionRef.doc(uid);
      const doc: firebase.firestore.DocumentSnapshot = yield call([userDocRef, userDocRef.get]);
      if (doc.exists) {
        const data = doc.data();
        if (data) {
          const {
            email, lastName, firstName, userID, initial,
          } = data as IUser;
          yield put(
            signInSuccess({
              email,
              lastName,
              firstName,
              userID,
              initial,
            }),
          );
          yield put(push(MAIN_PAGE));
        }
      }
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
