import { toGooseInfo, toGooseImage, fromGooseInfo, fromGooseImage } from "../models/geese-info";
import * as R from "ramda";

const getGeeseInfo = (db) => () => db('geese_info')
  .then((res) => {
    return res.map(toGooseInfo);
  }).catch(err => {
    console.error(`Error in getGeeseInfo: ${err}`);
    throw err;
  });

const getGooseInfoById = (db) => (id) => db('geese_info')
  .where({id})
  .then((res) => {
    return R.isEmpty(res) ? res : toGooseInfo(res[0]);
  }).catch(err => {
    console.error(`Error in getGooseInfoById: ${err}`);
    throw err;
  });

const getGooseImagesById = (db) => (id) => db('geese_images')
  .where({"goose_id": id})
  .then((res) => {
    return res.map(toGooseImage);
  }).catch(err => {
    console.error(`Error in getGooseImagesById: ${err}`);
    throw err;
  });

const addGooseInfo = (db) => (gooseInfo) => db('geese_info')
  .insert(
    fromGooseInfo(gooseInfo) 
  )
  .returning('id')
  .then((response) => {
    return response;
  })
  .catch(err => {
    console.error(`Error in addGooseInfo: ${err}`);
    throw err;
  });

const addGooseImage = (db) => (gooseImage) => db('geese_images')
  .insert(
    fromGooseImage(gooseImage)
  )
  .returning('id')
  .then((response) => {
    return response;
  })
  .catch(err => {
    console.error(`Error in addGooseImage: ${err}`);
    throw err;
  });

const updateGooseInfoById = (db) => (id, gooseInfo) => db('geese_info')
  .where({
    id
  })
  .update({
    ...fromGooseInfo(gooseInfo)
  }).then((response) => {
    return response;
  }).catch(err => {
    console.error(`Error in updateGooseInfoById: ${err}`);
    throw err;
  });

const deleteGooseInfoById = (db) => (id) => db('geese_info')
  .where({
    id
  })
  .del()
  .then((response) => {
    return response;
  }).catch(err => {
    console.error(`Error in deleteGooseInfoById: ${err}`);
    throw err;
  });

const deleteGooseImageById = (db) => (id) => db('geese_images')
  .where({
    id
  })
  .del()
  .then((response) => {
    return response;
  }).catch(err => {
    console.error(`Error in deleteGooseImageById: ${err}`);
    throw err;
  });

export default (db) => ({
  getGeeseInfo: getGeeseInfo(db),
  getGooseInfoById: getGooseInfoById(db),
  getGooseImagesById: getGooseImagesById(db),
  addGooseInfo: addGooseInfo(db),
  addGooseImage: addGooseImage(db),
  updateGooseInfoById: updateGooseInfoById(db),
  deleteGooseInfoById: deleteGooseInfoById(db),
  deleteGooseImageById: deleteGooseImageById(db)
});