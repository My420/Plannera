import {
  takeEvery, all, call, put,
} from 'redux-saga/effects';
import { IUser, ICreateUserRequestAction, ILoadUserRequestAction } from './types';
import { usersCollectionRef, CREATE_USER_REQUEST, LOAD_USER_REQUEST } from './constant';
import createInitial from '../../utils/createInitial';
import { createUserError, loadUserSuccess, loadUserError } from './actionCreator';

export function* createUser(action: ICreateUserRequestAction) {
  const { payload } = action;
  const {
    userID, email, lastName, firstName,
  } = payload;
  try {
    const userDocRef = usersCollectionRef.doc(userID);
    const initial = createInitial(firstName, lastName);
    const userData: IUser = {
      email,
      firstName,
      lastName,
      initial,
      userID,
    };
    yield call([userDocRef, userDocRef.set], userData);
  } catch (error) {
    const { message } = error as Error;
    yield put(createUserError(message));
  }
}

export function* loadUser(action: ILoadUserRequestAction) {
  const { payload } = action;
  const { userID } = payload;
  try {
    const userDocRef = usersCollectionRef.doc(userID);
    const doc: firebase.firestore.DocumentSnapshot = yield call([userDocRef, userDocRef.get]);
    if (doc.exists) {
      const data = doc.data();
      if (data) {
        const {
          email, lastName, firstName, userID: id, initial,
        } = data as IUser;
        yield put(
          loadUserSuccess({
            email,
            lastName,
            firstName,
            userID: id,
            initial,
          }),
        );
      }
    }
  } catch (error) {
    const { message } = error as Error;
    yield put(loadUserError(message));
  }
}

export default function* userSaga() {
  yield all([takeEvery(CREATE_USER_REQUEST, createUser), takeEvery(LOAD_USER_REQUEST, loadUser)]);
}
