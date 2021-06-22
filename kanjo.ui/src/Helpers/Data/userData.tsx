import axios from "axios";
import config from "../config";
import { User } from "../Types/UserTypes";

const usersUrl = `${config.BaseURL}/users`;

const getUserById = (id: number): Promise<User> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${usersUrl}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const getUserByFirebaseUid = (firebase_Uid: string): Promise<User> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${usersUrl}/firebase/${firebase_Uid}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const addNewUser = (user: User): Promise<User> =>
  new Promise((resolve, reject) => {
    console.log(user);
    axios
      .post(`${usersUrl}`, user)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const userData = {
  getUserById,
  getUserByFirebaseUid,
  addNewUser,
};

export default userData;
