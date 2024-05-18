import { NextFunction, Request, Response } from "express";
import logging from "../config/logging";
import User from "../models/user";
import mongoose from "mongoose";

const validate = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Token validado, retornando o usuario....");

  let firebase = res.locals.firebase;
  console.log(firebase);

  return User.findOne({
    uid: firebase.uid,
  })
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({
          message: "usuario não encontrado",
        });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const create = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Tentando registrar usuario.....");

  let { uid, name } = req.body;
  let fire_token = res.locals.fire_token;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    uid,
    name,
  });

  return user
    .save()
    .then((newUser) => {
      logging.info(`Novo Usuario ${uid} criado...`);
      return res.status(201).json({ user: newUser, fire_token });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const login = (req: Request, res: Response, next: NextFunction) => {
  logging.info("Login do usuario...");

  let { uid } = req.body;
  let fire_token = res.locals.fire_token;

  return User.findOne({ uid })
    .then((user) => {
      if (user) {
        logging.info(`Usuario ${uid} encontrado, logando... `);
        return res.status(200).json({ user, fire_token });
      } else {
        logging.info(`Usuario ${uid} não encontrado, registre-se... `);
        return create(req, res, next);
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const read = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.userID;
  logging.info(`Procurando id  ${_id}`);

  User.findById(_id)
    .then((user) => {
      if (user) {
        return res.status(200).json({ user });
      } else {
        return res.status(404).json({ message: "Não encontrado" });
      }
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};
const readAll = (req: Request, res: Response, next: NextFunction) => {
  logging.info(`Procurando Todos`);

  User.find()
    .exec()
    .then((users) => {
      return res.status(200).json({
        count: users.length,
        users,
      });
    })
    .catch((error) => {
      logging.error(error);
      return res.status(500).json({
        error,
      });
    });
};

export default {
  validate,
  create,
  login,
  read,
  readAll,
};
