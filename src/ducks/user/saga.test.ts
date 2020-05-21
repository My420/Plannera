import {
  call, put, all, takeEvery,
} from 'redux-saga/effects';
import {
  ICreateUserRequestAction, ICreateUserData, IUser, ILoadUserRequestAction,
} from './types';
import { CREATE_USER_REQUEST, LOAD_USER_REQUEST } from './constant';
import {
  createUser,
  createUserError,
  loadUser,
  loadUserSuccess,
  loadUserError,
} from './actionCreator';
import userSaga, { createUser as createUserSaga, loadUser as loadUserSaga } from './saga';
import createInitial from '../../utils/createInitial';
import userService from '../../services/user';

describe('test User saga', () => {
  describe('test createUser saga', () => {
    describe('backend successfully creates user', () => {
      test('1. should call createInitial function with correct arguments', () => {
        const data: ICreateUserData = {
          userID: '123456',
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
        };
        const action: ICreateUserRequestAction = createUser(data);
        const gen = createUserSaga(action);

        const actual = gen.next().value;
        const expected = call(createInitial, data.firstName, data.lastName);

        expect(actual).toEqual(expected);
      });

      test('2. should call userService.createUser method with correct arguments', () => {
        const data: ICreateUserData = {
          userID: '123456',
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
        };
        const action: ICreateUserRequestAction = createUser(data);
        const gen = createUserSaga(action);

        gen.next();

        const initial = createInitial(data.firstName, data.lastName);
        const userData: IUser = {
          ...data,
          initial,
        };

        const actual = gen.next(initial).value;
        const expected = call(userService.createUser, userData);

        expect(actual).toEqual(expected);
        expect(gen.next().done).toBeTruthy();
      });
    });

    describe('backend returns an error', () => {
      test('1. should call createInitial function with correct arguments', () => {
        const data: ICreateUserData = {
          userID: '123456',
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
        };
        const action: ICreateUserRequestAction = createUser(data);
        const gen = createUserSaga(action);

        const actual = gen.next().value;
        const expected = call(createInitial, data.firstName, data.lastName);

        expect(actual).toEqual(expected);
      });

      test('2. should call userService.createUser method with correct arguments', () => {
        const data: ICreateUserData = {
          userID: '123456',
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
        };
        const action: ICreateUserRequestAction = createUser(data);
        const gen = createUserSaga(action);

        gen.next();

        const initial = createInitial(data.firstName, data.lastName);
        const userData: IUser = {
          ...data,
          initial,
        };

        const actual = gen.next(initial).value;
        const expected = call(userService.createUser, userData);

        expect(actual).toEqual(expected);
      });

      test('3. should correct put error action if userService.createUser method throw error', () => {
        const data: ICreateUserData = {
          userID: '123456',
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
        };
        const action: ICreateUserRequestAction = createUser(data);
        const gen = createUserSaga(action);

        gen.next();

        const initial = createInitial(data.firstName, data.lastName);
        gen.next(initial);

        const errorMsg = 'test error msg';
        const error = new Error(errorMsg);

        const actual = gen.throw(error).value;
        const expected = put(createUserError(errorMsg));

        expect(actual).toEqual(expected);
        expect(gen.next().done).toBeTruthy();
      });
    });
  });

  describe('test loadUser saga', () => {
    describe('user load was successful', () => {
      test('1. should call userService.loadUser method with correct arguments', () => {
        const userID = '123456';
        const action: ILoadUserRequestAction = loadUser(userID);
        const gen = loadUserSaga(action);

        const actual = gen.next().value;
        const expected = call(userService.loadUser, userID);

        expect(actual).toEqual(expected);
      });

      test('2. should put correct load user action', () => {
        const userID = '123456';
        const action: ILoadUserRequestAction = loadUser(userID);
        const gen = loadUserSaga(action);
        gen.next();

        const data: IUser = {
          userID,
          email: 'test@test.test',
          firstName: 'first',
          lastName: 'last',
          initial: 'FL',
        };

        const actual = gen.next(data).value;
        const expected = put(loadUserSuccess(data));

        expect(actual).toEqual(expected);
        expect(gen.next().done).toBeTruthy();
      });
    });

    describe('user load was unsuccessful', () => {
      test('1. should call userService.loadUser method with correct arguments', () => {
        const userID = '123456';
        const action: ILoadUserRequestAction = loadUser(userID);
        const gen = loadUserSaga(action);

        const actual = gen.next().value;
        const expected = call(userService.loadUser, userID);

        expect(actual).toEqual(expected);
      });

      test('2. should correct put error action if userService.loadUser method throw error', () => {
        const userID = '123456';
        const action: ILoadUserRequestAction = loadUser(userID);
        const gen = loadUserSaga(action);
        gen.next();

        const errorMsg = 'test error msg';
        const error = new Error(errorMsg);

        const actual = gen.throw(error).value;
        const expected = put(loadUserError(errorMsg));

        expect(actual).toEqual(expected);
        expect(gen.next().done).toBeTruthy();
      });
    });
  });

  describe('test userSaga', () => {
    test('should return correct all effect', () => {
      const gen = userSaga();
      const actual = gen.next().value;
      const expected = all([
        takeEvery(CREATE_USER_REQUEST, createUserSaga),
        takeEvery(LOAD_USER_REQUEST, loadUserSaga),
      ]);

      expect(actual).toEqual(expected);
    });
  });
});
