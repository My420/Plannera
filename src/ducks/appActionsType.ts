import { AuthActionTypes } from './auth/types';
import { UserActionTypes } from './user/types';

type AppActions = AuthActionTypes | UserActionTypes;

export default AppActions;
