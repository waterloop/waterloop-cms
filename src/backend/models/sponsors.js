import * as R from 'ramda';
import renameProps from '../utils/rename-props';


export const fromSponsor = (sponsor) => renameProps(sponsor, {
  typeId: 'type_id',
  joinDate: 'join_date',
  logoDir: 'logo_dir',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// This model allows us to convert values from the database to JSON to send over the API.
export const toSponsor = (sponsor) => renameProps(sponsor, {
  type_id: 'typeId',
  join_date: 'joinDate',
  logo_dir: 'logoDir',
  created_at: 'createdAt',
  updated_at: 'updatedAt'
});

export const toSponsors = R.map(toSponsor);

export const toSponsorDesc = (desc) => renameProps(desc, {
  created_at: 'createdAt',
  updated_at: 'updatedAt'
});