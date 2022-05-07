import * as UsersModel from '../../models/users';
import chai from 'chai';
const expect = chai.expect;

const userCamel = {
  givenName: "Hello",
  familyName: "World",
  email: 'test@test.test',
  admin: false,
};
const userSnake = {
  given_name: "Hello",
  family_name: "World",
  email: 'test@test.test',
  admin: false,
};

describe('Model: Users', () => {
  describe('toUser', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(UsersModel.toUser(userSnake)).to.deep.equal(userCamel);
    });
  });
});
