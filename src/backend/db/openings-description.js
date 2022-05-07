const getDescriptions = (db) => () =>
  db.select(['heading', 'body']).from('openings_description');

const updateDescription = (db) => (active, changes) =>
  db('openings_description')
    .where({ active })
    .update(changes)
    .then(() =>
      db
        .select('heading', 'body')
        .from('openings_description')
        .where({ active })
    );

export default (db) => ({
  getDescriptions: getDescriptions(db),
  updateDescription: updateDescription(db),
});
