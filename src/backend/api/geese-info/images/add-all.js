import * as R from 'ramda';
import db from '../../../db';

/**Accepts an array of geese images, 
 * not necessarily just for one goose.
 */

export default (req, res) => {
  Promise.all(req.body.map((gooseImage) =>
    db.geeseInfo.addGooseImage(gooseImage)
  ))
  .then((response) => {
    if (response) {
      res.send(response);
    }
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
}