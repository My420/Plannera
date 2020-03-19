import { AppState } from '../../redux/store';
import { moduleName } from './constant';
import { ReducerRecord } from './reducer';
import { getAuthStatus, getAuthError } from './selector';

describe('test Auth Selector functions', () => {
  const loading: boolean = true;
  const testError: string = 'test error';

  const store = {
    [moduleName]: new ReducerRecord().set('loading', loading).set('error', testError),
  } as AppState;

  test('test getAuthStatus selector function', () => {
    expect(getAuthStatus(store)).toBe(loading);
  });

  test('test getAuthError selector function', () => {
    expect(getAuthError(store)).toBe(testError);
  });
});
