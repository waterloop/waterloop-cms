import express from 'express';

import db from '../../db';

const router = express.Router();

router.get('/', (req, res) => {
  db.openingsDescription
    .getDescriptions()
    .then((data) => {
      const result = {
        active: data[0],
        nonActive: data[1],
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

router.patch('/', (req, res) => {
  const { active, nonActive } = req.body;
  Promise.all([
    db.openingsDescription.updateDescription(true, active),
    db.openingsDescription.updateDescription(false, nonActive),
  ])
    .then((data) => {
      const result = {
        active: data[0][0],
        nonActive: data[1][0],
      };
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
});

export default router;
