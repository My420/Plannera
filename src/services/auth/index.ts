import { END } from 'redux-saga';
import { fb as firebase } from '../../firebase/config';
import { IAuthChannelAction } from '../../ducks/auth/types';

interface emitFunc {
  (input: IAuthChannelAction | END): void;
}

const auth = firebase.auth();

const signUpUser = async (email: string, password: string): Promise<string> => {
  const response = await auth.createUserWithEmailAndPassword(email, password);

  if (response.user) {
    const userID = response.user.uid;
    return userID;
  }
  throw new Error('Create user error: response.user === null');
};

// eslint-disable-next-line max-len
const signInUser = (email: string, password: string): Promise<firebase.auth.UserCredential> => auth.signInWithEmailAndPassword(email, password);

const signOutUser = (): Promise<void> => auth.signOut();

const onStateChange = (emit: emitFunc): void => {
  auth.onAuthStateChanged((user) => {
    const uid = user ? user.uid : user;
    const email = user ? user.email : user;
    emit({ uid, email });
  });
};

export default {
  signUpUser,
  signInUser,
  signOutUser,
  onStateChange,
};
