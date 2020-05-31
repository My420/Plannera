import { useSelector } from 'react-redux';
import { getAuthStatus, getAuthError } from '../../ducks/auth/selector';

const useAuthRequestStatus = () => {
  const isLoading = useSelector(getAuthStatus);
  const error = useSelector(getAuthError);
  return { isLoading, error };
};

export default useAuthRequestStatus;
