import { EventChannel } from 'redux-saga';
import {
  call, put, take, all, takeEvery,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { ISignInRequestAction, ISignUpRequestAction, IAuthChannelAction } from './types';
import { ISignInFormData, ISignUpFormData } from '../../types/signUpForm';
import {
  EMAIL, PASSWORD, FIRST_NAME, LAST_NAME, MAIN_PAGE,
} from '../../utils/constant';
import { SIGN_UP_REQUEST, SIGN_IN_REQUEST, SIGN_OUT_REQUEST } from './constant';
import authSaga, {
  loginUser,
  logoutUser,
  registerUser,
  watchAuthStatusChange,
  createAuthChannel,
} from './saga';
import {
  signIn,
  signInError,
  signOutError,
  signUp,
  signUpError,
  signInSuccess,
  signOutSuccess,
} from './actionCreator';
import auth from '../../services/auth';
import { createUser, loadUser, clearUserState } from '../user/actionCreator';

describe('test Auth saga', () => {
  describe('test loginUser saga', () => {
    test('should correct call auth.signInUser method', () => {
      const data: ISignInFormData = {
        [EMAIL]: 'test@test.test',
        [PASSWORD]: '1234',
        from: '/',
      };
      const action: ISignInRequestAction = signIn(data);
      const gen = loginUser(action);

      const actual = gen.next().value;
      const expected = call(auth.signInUser, data[EMAIL], data[PASSWORD]);

      expect(actual).toEqual(expected);
      expect(gen.next().done).toBeTruthy();
    });

    test('should correct put error action if auth.signInUser method throw error', () => {
      const data: ISignInFormData = {
        [EMAIL]: 'test@test.test',
        [PASSWORD]: '1234',
        from: '/',
      };
      const action: ISignInRequestAction = signIn(data);
      const gen = loginUser(action);
      const errorMsg = 'test error msg';

      gen.next();
      expect(gen.throw(new Error(errorMsg)).value).toEqual(put(signInError(errorMsg)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('test logoutUser saga', () => {
    test('should correct call auth.signOutUser method', () => {
      const gen = logoutUser();
      const actual = gen.next().value;
      const expected = call(auth.signOutUser);
      expect(actual).toEqual(expected);
      expect(gen.next().done).toBeTruthy();
    });

    test('should correct put error action if auth.signOutUser method throw error', () => {
      const gen = logoutUser();
      const errorMsg = 'error in logout';

      gen.next();
      expect(gen.throw(new Error(errorMsg)).value).toEqual(put(signOutError(errorMsg)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('test registerUser saga', () => {
    test('should correct call auth.signUpUser method', () => {
      const data: ISignUpFormData = {
        [EMAIL]: 'test@test.test',
        [PASSWORD]: '1234',
        [FIRST_NAME]: 'testFirstName',
        [LAST_NAME]: 'testLastName',
      };
      const action: ISignUpRequestAction = signUp(data);
      const gen = registerUser(action);

      const actual = gen.next().value;
      const expected = call(auth.signUpUser, data[EMAIL], data[PASSWORD]);

      expect(actual).toEqual(expected);
    });

    test('should put correct action if call auth.signUpUser was success ', () => {
      const data: ISignUpFormData = {
        [EMAIL]: 'test@test.test',
        [PASSWORD]: '1234',
        [FIRST_NAME]: 'testFirstName',
        [LAST_NAME]: 'testLastName',
      };
      const action: ISignUpRequestAction = signUp(data);
      const gen = registerUser(action);

      gen.next();
      const userID = 'testUserID';
      const actual = gen.next(userID).value;
      const expected = put(
        createUser({
          userID,
          email: data[EMAIL],
          firstName: data[FIRST_NAME],
          lastName: data[LAST_NAME],
        }),
      );

      expect(actual).toEqual(expected);
      expect(gen.next().done).toBeTruthy();
    });

    test('should correct put error action if auth.signUpUser method throw error', () => {
      const data: ISignUpFormData = {
        [EMAIL]: 'test@test.test',
        [PASSWORD]: '1234',
        [FIRST_NAME]: 'testFirstName',
        [LAST_NAME]: 'testLastName',
      };
      const action: ISignUpRequestAction = signUp(data);
      const gen = registerUser(action);
      const errorMsg = 'test error msg';

      gen.next();
      expect(gen.throw(new Error(errorMsg)).value).toEqual(put(signUpError(errorMsg)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('test watchAuthStatusChange saga', () => {
    describe('should work correct when user is login', () => {
      test(' 1: should call create auth channel function', () => {
        const gen = watchAuthStatusChange();
        expect(gen.next().value).toEqual(call(createAuthChannel));
      });

      test('2: should return take effect with correct function', () => {
        const gen = watchAuthStatusChange();
        gen.next();
        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        expect(gen.next(authChan).value).toEqual(take(authChan));
      });

      test('3: should return put effect with signInSuccess action creator function', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: '12345',
          email: 'test@test.test',
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        const expected = put(signInSuccess({ userID: data.uid, email: data.email }));
        expect(gen.next(channelData).value).toEqual(expected);
      });
      test('4: should return put effect with loadUser action creator function', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: '12345',
          email: 'test@test.test',
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        gen.next(channelData);

        expect(gen.next().value).toEqual(put(loadUser(data.uid as string)));
      });

      test('5: should return put effect with push ac function that redirect on main page', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: '12345',
          email: 'test@test.test',
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        gen.next(channelData);
        gen.next();
        expect(gen.next().value).toEqual(put(push(MAIN_PAGE)));
      });

      test('6: should return to take effect', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: '12345',
          email: 'test@test.test',
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        gen.next(channelData);
        gen.next();
        gen.next();

        expect(gen.next().value).toEqual(take(authChan));
      });
    });

    describe('should work correct when user is logout', () => {
      test(' 1: should call create auth channel function', () => {
        const gen = watchAuthStatusChange();
        expect(gen.next().value).toEqual(call(createAuthChannel));
      });

      test('2: should return take effect with correct function', () => {
        const gen = watchAuthStatusChange();
        gen.next();
        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        expect(gen.next(authChan).value).toEqual(take(authChan));
      });

      test('3: should return put effect with signOutSuccess action creator function', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: null,
          email: null,
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        const expected = put(signOutSuccess());
        expect(gen.next(channelData).value).toEqual(expected);
      });

      test('4: should return put effect with clearUserState action creator function', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: null,
          email: null,
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        gen.next(channelData);

        expect(gen.next().value).toEqual(put(clearUserState()));
      });

      test('5th: should return to take effect', () => {
        const gen = watchAuthStatusChange();
        gen.next();

        const authChan = createAuthChannel() as EventChannel<IAuthChannelAction> &
        IAuthChannelAction;
        gen.next(authChan);

        const data: IAuthChannelAction = {
          uid: null,
          email: null,
        };
        const channelData = data as EventChannel<IAuthChannelAction> & IAuthChannelAction;
        gen.next(channelData);
        gen.next();

        expect(gen.next().value).toEqual(take(authChan));
      });
    });
  });

  describe('test authSaga saga', () => {
    test('should return correct all effect', () => {
      const gen = authSaga();
      const actual = gen.next().value;
      const expected = all([
        takeEvery(SIGN_UP_REQUEST, registerUser),
        takeEvery(SIGN_IN_REQUEST, loginUser),
        takeEvery(SIGN_OUT_REQUEST, logoutUser),
        call(watchAuthStatusChange),
      ]);

      expect(actual).toEqual(expected);
    });
  });
});
