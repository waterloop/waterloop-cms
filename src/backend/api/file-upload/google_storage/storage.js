require('dotenv').config();
import { Storage } from '@google-cloud/storage';

var path = require('path');
const storage = new Storage({
  keyFilename: path.join(__dirname, process.env.KEY_FILE_NAME),
  projectId: process.env.PROJECT_ID,
});

export default storage;
