import axios from 'axios';
import md5 from 'md5';

import db from '../../db';

export default (req, res) => {
  const { email } = req.params;
  db.newsletterRecipients
    .deleteNewsletterRecipient(email)
    .then((response) => {
      if (response) {
        if (process.env.NODE_ENV === 'test') {
          res
            .status(200)
            .json({ message: 'Newsletter member removed successfully' });
        } else {
          // If the user was deleted from the database while not in test, remove them from the member list through the Mailchimp API
          const options = {
            url: `https://${
              process.env.MAILCHIMP_DC
            }.api.mailchimp.com/3.0/lists/${
              process.env.MAILCHIMP_LIST_ID
            }/members/${md5(email)}`,
            method: 'DELETE',
            headers: {
              Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
            },
          };
          axios(options)
            .then((response) => {
              console.log(`Removed user ${email} from Mailchimp member list`);
              res
                .status(200)
                .json({ message: 'Newsletter member removed successfully' });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: err.message });
            });
        }
      } else {
        res
          .status(400)
          .json({ error: 'Could not delete newsletter recipient' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
