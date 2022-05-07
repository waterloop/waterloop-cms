import db from '../../db';
import isEmpty from '../../utils/is-empty';


const get = (req, res, next) => {
  const { query, params } = req;
  const { id } = params;
  const { joinTeamName } = query;

  db.postings.getPostingById(id, joinTeamName)
    .then((posting) => {
      if (isEmpty(posting)) {
        res.sendStatus(404);
      } else {
        res.send(posting);
      }
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

export default get;
