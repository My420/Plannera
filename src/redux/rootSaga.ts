import { all } from 'redux-saga/effects';
import { authSaga } from '../ducks/auth';
import { userSaga } from '../ducks/user';

export default function* rootSaga() {
  yield all([authSaga(), userSaga()]);
}
