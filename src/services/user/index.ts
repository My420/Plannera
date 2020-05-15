import { fb as firebase } from '../../firebase/config';
import { IUser } from '../../ducks/user/types';

class UserService {
  private USERS_CATALOG_NAME = 'users';

  private usersCollectionRef = firebase.firestore().collection(this.USERS_CATALOG_NAME);

  createUser(data: IUser): Promise<void> {
    const { userID } = data;
    return this.usersCollectionRef.doc(userID).set(data);
  }

  async loadUser(userID: string): Promise<IUser> {
    const doc = await this.usersCollectionRef.doc(userID).get();
    if (doc.exists) {
      const data = doc.data();
      if (data) {
        const {
          email, lastName, firstName, userID: id, initial,
        } = data as IUser;
        return {
          email,
          lastName,
          firstName,
          userID: id,
          initial,
        };
      }
      throw new Error(`Document ${userID} in users collection not exist!`);
    } else {
      throw new Error(`Document ${userID} in users collection not exist!`);
    }
  }
}

export default new UserService();
