import db from '../../db';

export default (req, res) => {
  const { email } = req.params;
  db.newsletterRecipients
    .getRecipientByEmail(email)
    .then((recipient) => {
      if (recipient.length === 0) {
        res.status(404).json({ error: 'Newsletter recipient not found' });
      } else if (recipient.length === 1) {
        res.status(200).json(recipient[0]);
      } else {
        return res
          .status(400)
          .json({ error: 'Multiple instances of user found in the database' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
