import * as TeamDescriptorsModel from '../../models/team-descriptors';
import chai from 'chai';
const expect = chai.expect;

const tdCamel = { teamName: 'WebTeam', description: 'A team' };
const tdSnake = { team_name: 'WebTeam', description: 'A team' };

describe('Model: TeamDescriptor', () => {
  describe('toTeamDescriptor', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(TeamDescriptorsModel.toTeamDescriptor(tdSnake)).to.deep.equal(tdCamel);
    });
  });

  describe('toTeamDescriptors', () => {
    it('should return a list of objects, each with camel case keys', () => {
      expect(TeamDescriptorsModel.toTeamDescriptors([tdSnake, tdSnake, tdSnake])).to.deep.equal([tdCamel, tdCamel, tdCamel]);
    });
  });
});
