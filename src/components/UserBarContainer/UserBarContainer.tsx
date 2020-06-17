import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { getUserInfo } from '../../ducks/user/selector';
import UserBar from '../UserBar';

export interface IUserBarContainerProps {}

const UserBarContainer: React.FC<IUserBarContainerProps> = () => {
  const userData = useSelector(getUserInfo, shallowEqual);

  return <UserBar data={userData} />;
};

export default UserBarContainer;
