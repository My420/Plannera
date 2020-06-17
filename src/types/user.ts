export interface IUserInfo {
  email: null | string;
  firstName: null | string;
  lastName: null | string;
  initial: null | string;
}

export interface IUserStatus {
  userID: null | string;
  error: null | string;
  isLoading: boolean;
}
