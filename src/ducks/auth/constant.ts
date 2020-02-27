import { fb as firebase } from '../../firebase/config';

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
export const AUTH_CLEAR_ERROR = 'Plannera/auth/AUTH_CLEAR_ERROR';

export const auth = firebase.auth();
