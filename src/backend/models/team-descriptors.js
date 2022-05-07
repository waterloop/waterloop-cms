import * as R from 'ramda';
import renameProps from '../utils/rename-props';

export const toTeamDescriptor = (teamDescriptor) =>
  renameProps(teamDescriptor, {
    team_name: 'teamName',
  });

export const toTeamDescriptors = R.map(toTeamDescriptor);

export const toTeamDesc = (desc) =>
  renameProps(desc, {
    created_at: 'createdAt',
    updated_at: 'updatedAt',
  });
