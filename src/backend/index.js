import path from 'path';

/** Used for the development file storage */
if (process.env.NODE_ENV !== 'production') {
  global.rootDirectory = path.resolve(__dirname);
  global.fileStorageDirectory = path.resolve(path.join(__dirname, 'tmp'));
}

require('dotenv').config();
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import socketio from 'socket.io'; // unused, add package when needed.
import http from 'http';
import multer from 'multer';
import googleAuth from './google-auth';
import fs from 'fs';

import api from './api';

// setup middleware
// TODO: find another CSRF implementation, csurf is deprecated.

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const host = process.env.HOST || '127.0.0.1'; // Loop back for default

/**
 * @brief Multer Middleware:
 * Multer is an express middleware for handling multi-part forms. In the
 * CMS, we use multer to handle file uploads.
 */
const multerMid = multer({
  limits: {
    storage: multer.memoryStorage(),
    fileSize: 5 * 1024 * 1024, // max file size in bytes
  },
});

app.disable('x-powered-by');
app.use(multerMid.array('files'));

/**
 * @brief express body handler Middleware:
 * This converts the body of POST and PUT requests to
 * json
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

/**
 * @brief CORS:
 * CORS aka Cross Origin Resource Sharing
 * This enables us to tell browsers which
 * domains are allowed to request resources
 * from our server. These domains are indicated by the origin
 * array provided. This only applies to web browsers,
 * CORS will not block requests from places like CURL, postman, or other web servers.
 */
app.use(
  cors({
    origin: [
      /^http:\/\/localhost:[0-9]{4}$/, // CLIENT_URI should hold the cms client uri
      'https://teamwaterloop.ca', // Always allow the main site
    ],
    credentials: true,
  }),
);

/**
 * @brief Sessions
 * This section initializes sessions. Sessions are a mechanism for using cookies and
 * Database entries to track users across separate user "sessions".
 *
 * saveUninitialized: true allows us to attach the socket id to the session
 * before we have authenticated the user
 */
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' },
};
if (process.env.NODE_ENV === 'production') {
  sessionConfig.store = new (require('express-pg-session')(session))();
}
app.use(session(sessionConfig));

/**NOTE: UNUSED FOR NOW
 * @brief Websocket Initialization:
 * The following enables us to create web socket connections
 * with the frontend in the event that real time communication is required.
 */
// const io = socketio(server, { origins: '*:*' });
// app.set('io', io); // allows us to access io from the req obj

app.use('/google', googleAuth);
app.use('/api', api);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(418).send(err.code);
  }
  next();
});

if (process.env.NODE_ENV !== 'production') {
  /**
   * @brief Development File Server
   *  This section initiates a development file server for serving images that are saved
   * via the form upload api route. In Production this is not needed because files will be
   * saved to a GOOGLE CLOUD STORAGE Bucket to keep persistance across deploys
   *
   */
  if (!fs.existsSync(global.fileStorageDirectory)) {
    fs.mkdirSync(global.fileStorageDirectory);
  }

  app.get('/waterloop/tmp/:fileName', (req, res) => {
    const {
      params: { fileName },
    } = req;

    res.sendFile(`${global.fileStorageDirectory}${fileName}`);
  });

  /**
   * Remove All files from the tmp directory when the server is closed.
   * This should prevent bloating a developer's filesystem
   */
  app.on('close', () => {
    fs.readdirSync(global.fileStorageDirectory).forEach((path) => {
      fs.rmSync(path);
    });
  });
}

// Dev environment doesn't use build folder:
let folder = process.env.NODE_ENV === 'production' ? 'build' : 'public';

/* These need to be the last routes */
app.use(express.static(`./${folder}`));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, `../../${folder}`) });
});

if (process.env.NODE_ENV === 'production') {
  app.listen(port);
} else {
  app.listen(port, host);
  console.log(`HOST: ${host}`);
}
console.log(`ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${port}`);
export default server;
