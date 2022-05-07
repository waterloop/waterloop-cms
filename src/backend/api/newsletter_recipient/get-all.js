import db from '../../db';

export default (req, res) => {
  db.newsletterRecipients
    .getRecipients()
    .then((recipients) => {
      if (recipients.length > 0) {
        res.status(200).json(recipients);
      } else {
        res.status(404).json({ error: 'No newsletter recipients found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
