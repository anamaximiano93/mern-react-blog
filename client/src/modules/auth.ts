import firebase from "firebase";
import { auth } from "../config/firebase";
import IUser from "../interfaces/user";
import config from "../config/config";
import logging from "../config/logging";
import axios from "axios";

const NAMESPACE = "Auth";

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) =>
  new Promise<firebase.auth.UserCredential>((resolve, reject) => {
    auth
      .signInWithPopup(provider)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });

export const Authenticate = async (
  uid: string,
  name: string,
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${config.server.url}/users/login`,
      data: {
        uid,
        name,
      },
      headers: { Authorization: `Bearer ${fire_token}` },
    });

    if (
      response.status === 200 ||
      response.status === 201 ||
      response.status === 304
    ) {
      logging.info("Sucesso em autenticar", NAMESPACE);
      callback(null, response.data.user);
    } else {
      logging.warn("Inabilitado para Autenticar.", NAMESPACE);
      callback("Inabilitado para Autenticar.", null);
    }
  } catch (error) {
    logging.error(error);
    callback("Inabilitado para Autenticar.", null);
  }
};
export const Validate = async (
  fire_token: string,
  callback: (error: string | null, user: IUser | null) => void
) => {
  try {
    console.log(fire_token);
    const response = await axios({
      method: "GET",
      url: `${config.server.url}/users/validate`,
      headers: { Authorization: `Bearer ${fire_token}` },
    });

    if (response.status === 200 || response.status === 304) {
      logging.info("Sucesso em validado", NAMESPACE);
      callback(null, response.data.user);
    } else {
      logging.warn("Inabilitado para validadção.", NAMESPACE);
      callback("Inabilitado para validadção.", null);
    }
  } catch (error) {
    logging.error(error, NAMESPACE);
    callback("Inabilitado para validadção.", null);
  }
};
