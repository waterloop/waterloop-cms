require('dotenv').config();
import { Storage } from '@google-cloud/storage';
import path from 'path';

const storage = new Storage({
  keyFilename: path.join(__dirname),
  projectId: process.env.PROJECT_ID,
});

export default storage;
