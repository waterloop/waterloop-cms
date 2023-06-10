import * as R from 'ramda';

const getFeatures = (db) => () =>
  db('geese_features')
    .then((features) => {
      return { features };
    })
    .catch((error) => {
      console.error(`Error in getFeatures: ${err}`);
      throw err;
    });

const getFeatureById = (db) => (id) =>
  db('geese_features')
    .where({ id })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(`Error in getFeatureById: ${err}`);
      throw err;
    });
const deleteFeature = (db) => (id) =>
  db('geese_features')
    .where({
      id,
    })
    .del()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in deleteFeatures: ${err}`);
      throw err;
    });

const editFeature = (db) => (id, featureInfo) =>
  db('geese_features')
    .where({
      id,
    })
    .update({
      ...featureInfo,
    })
    .returning(['id', 'name', 'picture', 'description'])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in editFeature: ${err}`);
      throw err;
    });

const addFeature = (db) => (features) =>
  db('geese_features')
    .insert({
      ...features,
    })
    .returning(['id', 'name', 'picture', 'description'])
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(`Error in addFeature: ${err}`);
      throw err;
    });

export default (db) => ({
  getFeatures: getFeatures(db),
  addFeature: addFeature(db),
  editFeature: editFeature(db),
  deleteFeature: deleteFeature(db),
  getFeatureById: getFeatureById(db),
});
