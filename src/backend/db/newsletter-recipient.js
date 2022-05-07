// SELECT * FROM newsletter_recipients;
const getRecipients = (db) => () => db('newsletter_recipients').select();

// SELECT * FROM newsletter_recipients WHERE email={email};
const getRecipientByEmail = (db) => (email) =>
  db('newsletter_recipients').select().where('email', email);

// INSERT INTO newsletter_recipients (name, email) VALUES ({name}, {email}); (if the record does not already exist)
const addUniqueRecipient = (db) => (newsletterData) =>
  db('newsletter_recipients')
    .select()
    .where('email', newsletterData.email)
    .then((recipientList) => {
      if (recipientList.length === 0) {
        return db('newsletter_recipients')
          .insert(newsletterData)
          .then((response) => {
            console.log(
              `Added newsletter recipient ${newsletterData.email} to database.`,
            );
            return response;
          })
          .catch((err) => {
            console.log(`Error in addUniqueRecipient: ${err}`);
            return null;
          });
      } else {
        console.log(
          `Newsletter recipient ${newsletterData.email} already exists in database.`,
        );
        return null;
      }
    });

//  DELETE FROM newsletter_recipients WHERE email={email};
const deleteNewsletterRecipient = (db) => (email) =>
  db('newsletter_recipients')
    .where('email', email)
    .del()
    .then((response) => {
      if (response) {
        console.log(`Removed newsletter recipient ${email} from database`);
        return response;
      } else {
        console.log(
          'Could not delete newsletter recipient, not found in database',
        );
        return null;
      }
    })
    .catch((err) => {
      console.log(`Error in deleteNewsletterRecipient: ${err}`);
      return null;
    });

export default (db) => ({
  getRecipients: getRecipients(db),
  getRecipientByEmail: getRecipientByEmail(db),
  addUniqueRecipient: addUniqueRecipient(db),
  deleteNewsletterRecipient: deleteNewsletterRecipient(db),
});
