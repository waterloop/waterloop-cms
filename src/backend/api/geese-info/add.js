import db from '../../db';
import { parseTimeFromRequest } from '../../utils/db-dates';

export default (req, res) => {
  const gooseInfoData = {
    ...req.body,
    updatedAt: parseTimeFromRequest(req.body.updatedAt),
  };

  db.geeseInfo.addGooseInfo(gooseInfoData)
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
