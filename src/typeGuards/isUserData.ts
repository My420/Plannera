/* eslint-disable dot-notation */
import { IUser } from '../ducks/user/types';
import isObject from './isObject';
import isString from './isString';

const isUserData = (data: unknown): data is IUser => isObject(data)
  && 'userID' in data
  && isString(data['userID'])
  && 'email' in data
  && isString(data['email'])
  && 'firstName' in data
  && isString(data['firstName'])
  && 'lastName' in data
  && isString(data['lastName'])
  && 'initial' in data
  && isString(data['initial']);

export default isUserData;
