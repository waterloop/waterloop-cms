import axios from 'axios';

import db from '../../db';

export default (req, res) => {
  const newsletterData = req.body;
  db.newsletterRecipients
    .addUniqueRecipient(newsletterData)
    .then((recipient) => {
      if (recipient) {
        if (process.env.NODE_ENV === 'test') {
          res.status(200).json({
            email: newsletterData.email,
            name: newsletterData.name,
          });
        } else {
          // If the user was added to the database while not in test, add them to the member list through the Mailchimp API
          const options = {
            url: `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
            method: 'POST',
            headers: {
              Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,
            },
            data: {
              email_address: newsletterData.email,
              status: 'subscribed', // Single opt-in
            },
          };
          axios(options)
            .then((response) => {
              console.log(
                `Added recipient ${response.data.email_address} to Mailchimp members list.`,
              );
              res.status(200).json({
                email: newsletterData.email,
                name: newsletterData.name,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ error: err.message });
            });
        }
      } else {
        res.status(400).json({ error: 'Could not add newsletter recipient' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
