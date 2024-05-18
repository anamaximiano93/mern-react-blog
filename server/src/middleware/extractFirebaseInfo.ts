import logging from "../config/logging";
import firebaseAdmin from "firebase-admin";
import { Request, Response, NextFunction } from "express";

const extractFirebaseInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info("Validando firebase token...");

  let token = req.headers.authorization?.split(" ")[1];

  if (token) {
    firebaseAdmin
      .auth()
      .verifyIdToken(token)
      .then((result) => {
        if (result) {
          res.locals.firebase = result;
          res.locals.fire_token = token;
          next();
        } else {
          logging.warn("Token Invalido, não autorizado...");

          return res.status(401).json({
            message: "Não autorizado",
          });
        }
      })
      .catch((error) => {
        logging.error(error);

        return res.status(401).json({
          error,
          message: "Não autorizado",
        });
      });
  } else {
    return res.status(401).json({
      message: "Não autorizado",
    });
  }
};
export default extractFirebaseInfo;
