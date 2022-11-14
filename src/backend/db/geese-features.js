import * as R from 'ramda';

const getFeatures = (db) => () =>
  db('geese-features')
    .then((features) => {
      return { success: 'Y', features };
    })
    .catch((error) => {
      return { success: 'N', features: [] };
    });

const getFeatureById = (db) => (id) =>
  db('geese-features')
    .where({ id })
    .then((res) => {
      return R.isEmpty(res) ? res : res[0];
    })
    .catch((err) => {
      console.error(`Error in getFeatureById: ${err}`);
      throw err;
    });
const deleteFeature = (db) => (id) =>
  db('geese-features')
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
  db('geese-features')
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
  db('geese-features')
    .insert({
      ...features,
    })
    .returning(['id', 'name', 'picture', 'description'])
    .then((response) => {
      console.log(response);
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
