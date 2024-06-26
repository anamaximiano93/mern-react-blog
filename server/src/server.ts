import http from "http";
import express from "express";
import logging from "./config/logging";
import config from "./config/config";
import mongoose from "mongoose";
import firebaseAdmin from "firebase-admin";

import userRoutes from "./routes/user";
import blogRoutes from "./routes/blog";

const router = express();

const httpServer = http.createServer(router);

/* Connect to firebase admin */
let serviceAccountKey = require("./config/serviceAccountKey");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

/* Connect to mongo */

mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info("Mongo Connect.");
  })
  .catch((error) => {
    logging.error(error);
  });

/* Looging middleware */
router.use((req, res, next) => {
  logging.info(
    `METHOD: '${req.method}' - URL '${req.url}' -  IP: '${req.socket.remoteAddress}'`
  );

  res.on("finish", () => {
    `METHOD: '${req.method}' - URL '${req.url}' -  IP: '${req.socket.remoteAddress}' - STATUS: '${res.statusCode}'`;
  });

  next();
});

/* Parse the body */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/* API Access Policies */
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

/* Routes */
router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);
/* Error Handling */
router.use((req, res, next) => {
  const error = new Error("not found");

  return res.status(404).json({
    message: error.message,
  });
});

/* Listen for Requests */
httpServer.listen(config.server.port, () => {
  logging.info(
    `Server is running ast ${config.server.host}:${config.server.port} ...`
  );
});
