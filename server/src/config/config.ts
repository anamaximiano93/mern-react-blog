require("dotenv").config();

const mongo_url = process.env.MONGO_URL as string;

const config = {
  mongo: {
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      socketTimeoutMS: 30000,
      /*  keepAlive: true,
      poolSize: 50, */
      autoIndex: false,
      retryWrites: false,
    },
    url: mongo_url,
  },
  server: {
    host: "localhost",
    port: 1337,
  },
};

export default config;
