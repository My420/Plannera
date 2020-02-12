import { Unsubscribe } from 'firebase';
import { Record } from 'immutable';
import { Subscribe, eventChannel, EventChannel } from 'redux-saga';
import {
  put, takeEvery, all, call, take,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { fb as firebase } from '../firebase/config';
import { ISignUpFormData, ISignInFormData } from '../types/signUpForm';
import { IUser } from '../types/user';
import {
  EMAIL,
  LAST_NAME,
  FIRST_NAME,
  MAIN_PAGE,
  PASSWORD,
  DB_USER_CATALOG,
} from '../utils/constant';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = 'Plannera/auth/SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'Plannera/auth/SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'Plannera/auth/SIGN_UP_ERROR';
export const SIGN_IN_REQUEST = 'Plannera/auth/SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'Plannera/auth/SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'Plannera/auth/SIGN_IN_ERROR';
export const SIGN_OUT_REQUEST = 'Plannera/auth/SIGN_OUT_REQUEST';
export const SIGN_OUT_SUCCESS = 'Plannera/auth/SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'Plannera/auth/SIGN_OUT_ERROR';

/**
 * types
 */

export interface ISignUpRequestAction {
  type: typeof SIGN_UP_REQUEST;
  payload: ISignUpFormData;
}
export interface ISignUpErrorAction {
  type: typeof SIGN_UP_ERROR;
  payload: string;
}
export interface ISignInRequestAction {
  type: typeof SIGN_IN_REQUEST;
  payload: ISignInFormData;
}
export interface ISignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: IUser;
}

export interface ISignInErrorAction {
  type: typeof SIGN_IN_ERROR;
  payload: string;
}
export interface ISignOutRequestAction {
  type: typeof SIGN_OUT_REQUEST;
  payload: null;
}
export interface ISignOutSuccessAction {
  type: typeof SIGN_OUT_SUCCESS;
  payload: null;
}
export interface ISignOutErrorAction {
  type: typeof SIGN_OUT_ERROR;
  payload: string;
}

export type AuthActionTypes =
  | ISignUpRequestAction
  | ISignUpErrorAction
  | ISignInRequestAction
  | ISignInSuccessAction
  | ISignInErrorAction
  | ISignOutSuccessAction
  | ISignOutRequestAction
  | ISignOutErrorAction;

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
    case SIGN_IN_REQUEST:
    case SIGN_UP_REQUEST:
      return state.set('loading', true);
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

/**
 * Action Creator
 */

export const signUp = (data: ISignUpFormData): ISignUpRequestAction => ({
  type: SIGN_UP_REQUEST,
  payload: data,
});

export const signUpError = (error: string): ISignUpErrorAction => ({
  type: SIGN_UP_ERROR,
  payload: error,
});

export const signIn = (data: ISignInFormData): ISignInRequestAction => ({
  type: SIGN_IN_REQUEST,
  payload: data,
});

export const signInSuccess = (data: IUser): ISignInSuccessAction => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const signInError = (error: string): ISignInErrorAction => ({
  type: SIGN_IN_ERROR,
  payload: error,
});

export const signOut = (): ISignOutRequestAction => ({
  type: SIGN_OUT_REQUEST,
  payload: null,
});

export const signOutSuccess = (): ISignOutSuccessAction => ({
  type: SIGN_OUT_SUCCESS,
  payload: null,
});

export const signOutError = (error: string): ISignOutErrorAction => ({
  type: SIGN_OUT_ERROR,
  payload: error,
});

/**
 *  Saga
 */

export function* registerUser(action: ISignUpRequestAction) {
  const { payload } = action;
  const {
    [EMAIL]: email,
    [PASSWORD]: password,
    [FIRST_NAME]: firstName,
    [LAST_NAME]: lastName,
  } = payload;

  try {
    const auth = firebase.auth();
    const response: firebase.auth.UserCredential = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      email,
      password,
    );

    if (response.user) {
      const userID = response.user.uid;
      const userDocRef = firebase
        .firestore()
        .collection(DB_USER_CATALOG)
        .doc(userID);
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
    // handle error
    console.log(error);
    const { message } = error as Error;
    yield put(signUpError(message));
  }
}

export function* loginUser(action: ISignInRequestAction) {
  const { payload } = action;
  const { [EMAIL]: email, [PASSWORD]: password, from } = payload;

  // login user in firebase get ID
  try {
    const auth = firebase.auth();
    yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(push(from));
  } catch (error) {
    // handle error
    console.log(error);
    const { message } = error as Error;
    yield put(signInError(message));
  }
}

export function* logoutUser() {
  try {
    const auth = firebase.auth();

    yield call([auth, auth.signOut]);

    yield put(signOutSuccess());
  } catch (e) {
    console.log(e);
  }
}

const subscribe: Subscribe<firebase.User | null> = (emit): Unsubscribe => {
  firebase.auth().onAuthStateChanged((user) => {
    emit(user);
  });
  return () => {};
};

const createAuthChannel = () => eventChannel(subscribe);

export function* watchAuthStatusChange() {
  const authChan: EventChannel<firebase.User | null> = yield call(createAuthChannel);
  while (true) {
    const user: firebase.User | null = yield take(authChan);
    if (user) {
      const { uid } = user;
      const userDocRef = firebase
        .firestore()
        .collection(DB_USER_CATALOG)
        .doc(uid);
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

export function* authSaga() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, registerUser),
    takeEvery(SIGN_IN_REQUEST, loginUser),
    takeEvery(SIGN_OUT_REQUEST, logoutUser),
    watchAuthStatusChange(),
  ]);
}
