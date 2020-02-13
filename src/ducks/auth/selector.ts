import { AppState } from '../../redux/store';

export const getAuthStatus = (store: AppState) => store.auth.get('loading');

export const getAuthError = (store: AppState) => store.auth.get('error');
