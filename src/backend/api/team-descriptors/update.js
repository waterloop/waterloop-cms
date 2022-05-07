import express from 'express';
import db from '../../db';

export default (req, res) => {
  const id = req.params.id;
  const teamDescriptor = req.body;

  db.teamDescriptors.updateTeamDescriptorById(id, teamDescriptor)
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};
