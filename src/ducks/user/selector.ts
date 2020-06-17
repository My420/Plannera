import { AppState } from '../../redux/store';
import { moduleName } from './constant';
import { IUserInfo, IUserStatus } from '../../types/user';

export const getUserStatus = (store: AppState): IUserStatus => ({
  userID: store[moduleName].get('userID'),
  isLoading: store[moduleName].get('loading'),
  error: store[moduleName].get('error'),
});

export const getUserInfo = (store: AppState): IUserInfo => ({
  email: store[moduleName].get('email'),
  firstName: store[moduleName].get('firstName'),
  lastName: store[moduleName].get('lastName'),
  initial: store[moduleName].get('initial'),
});
