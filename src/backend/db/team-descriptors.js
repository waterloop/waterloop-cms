import { toTeamDescriptors, toTeamDesc } from "../models/team-descriptors";

/* TEAMS API ENDPOINTS */

const getTeamDescriptors = (db) => () =>
  db("team_descriptors").then(toTeamDescriptors);

const addTeamDescriptor = (db) => (teamDescriptor) =>
  db("team_descriptors")
    .insert({
      team_name: teamDescriptor.teamName,
      description: teamDescriptor.description,
    })
    .returning("id")
    .then((response) => {
      console.log(response);
      return response;
    });

const updateTeamDescriptorById = (db) => (id, teamDescriptor) =>
  db("team_descriptors")
    .where({
      id,
    })
    .update({
      team_name: teamDescriptor.teamName,
      description: teamDescriptor.description,
    });

const deleteTeamDescriptorById = (db) => (teamDescriptorId) =>
  db.raw(
    `
  DELETE FROM team_descriptors
  WHERE id = ?
`,
    teamDescriptorId
  );

/* TEAMS DESCRIPTION API ENDPOINTS */

const getTeamDesc = (db) => () =>
  db("team_desc")
    .where({ id: 1 })
    .first() // There should only be one entry in this table and it's id should be 1
    .then((res) => {
      let images; // images array is stored as string in database, convert back to array:
      try {
        const resImages = res.images;
        if (typeof resImages === "string") {
          images = JSON.parse(res.images);
        } else if (typeof resImages === "object") {
          // If array already
          images = resImages;
        }
      } catch (_) {
        // Empty array in database is stringified to something that isn't JSON for some reason.
        images = [];
      }

      let body = {
        ...res,
        images: images,
      };
      delete body.id; // Since we should only have 1 entry.
      console.log(res)
      return toTeamDesc(body);
    })
    .catch((err) => {
      console.error(`Error in getTeamDesc: ${err}`);
      throw err;
    });

const updateTeamDesc = (db) => (data) =>
  db("team_desc")
    .update({
      ...data,
      images: JSON.stringify(data.images),
    })
    .where({
      id: 1, // There is only one item
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(`Error in updateTeamDesc: ${err}`);
      throw err;
    });

export default (db) => ({
  getTeamDescriptors: getTeamDescriptors(db),
  addTeamDescriptor: addTeamDescriptor(db),
  updateTeamDescriptorById: updateTeamDescriptorById(db),
  deleteTeamDescriptorById: deleteTeamDescriptorById(db),
  getTeamDesc: getTeamDesc(db),
  updateTeamDesc: updateTeamDesc(db),
});
