import { AppState } from '../../redux/store';
import { moduleName } from './constant';

export const getAuthStatus = (store: AppState) => store[moduleName].get('loading');

export const getAuthError = (store: AppState) => store[moduleName].get('error');
