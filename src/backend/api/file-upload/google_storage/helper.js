import util from 'util';
import gc from './storage';

const bucketName = 'waterloop_cms_image_upload';
const bucket = gc.bucket(bucketName);

/*
  Parameters:
  1. bucketName - name of the google cloud bucket one wishes to upload a file too
  2. fileName - name of the file one wishes to upload and append to the image url
*/
const getPublicUrl = (bucketName, fileName) =>
  `https://storage.googleapis.com/${bucketName}/${fileName}`;

/*
  Parameters:
  1. originalname - name given to the image being uploaded
  2. buffer - an object that represents an image's unique fixed-length sequence of bytes
  3. mimetype - an attribute used to classify the type of an image based upon its unique nature and format
*/
export const uploadImage = (file) => {
  const { originalname, buffer, mimetype } = file;

  return new Promise((resolve, reject) => {
    let filename = `${Date.now()}-${originalname}`;
    filename = filename.replaceAll(' ', '-') // no white space in image file name
    
    const file = bucket.file(filename);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('finish', () => {
      file.makePublic().then(() => {
        resolve(getPublicUrl(bucketName, filename));
      });
    });

    stream.end(buffer);
  });
};
