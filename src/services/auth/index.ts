import { END } from 'redux-saga';
import { fb as firebase } from '../../firebase/config';
import { IAuthChannelAction } from '../../ducks/auth/types';

interface emitFunc {
  (input: IAuthChannelAction | END): void;
}

class AuthService {
  private auth = firebase.auth();

  async signUpUser(email: string, password: string) {
    const response = await this.auth.createUserWithEmailAndPassword(email, password);

    if (response.user) {
      const userID = response.user.uid;
      return userID;
    }
    throw new Error('Create user error: response.user === null');
  }

  signInUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signOutUser(): Promise<void> {
    return this.auth.signOut();
  }

  onStateChange(emit: emitFunc) {
    this.auth.onAuthStateChanged((user) => {
      const uid = user ? user.uid : user;
      const email = user ? user.email : user;
      emit({ uid, email });
    });
  }
}

const service = new AuthService();

export default service;
