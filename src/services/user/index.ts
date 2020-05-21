import { fb as firebase } from '../../firebase/config';
import { IUser } from '../../ducks/user/types';
import isUserData from '../../typeGuards/isUserData';

const USERS_CATALOG_NAME = 'users';
const usersCollectionRef = firebase.firestore().collection(USERS_CATALOG_NAME);

const createUser = (data: IUser): Promise<void> => {
  const { userID } = data;
  return usersCollectionRef.doc(userID).set(data);
};

const loadUser = async (userID: string): Promise<IUser> => {
  const doc = await usersCollectionRef.doc(userID).get();
  if (doc.exists) {
    const data = doc.data();
    if (isUserData(data)) {
      return data;
    }
    throw new Error(`Date retrieved from ${userID} document is not valid UserData!`);
  } else {
    throw new Error(`Document ${userID} in users collection not exist!`);
  }
};

export default { createUser, loadUser };
