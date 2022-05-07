import * as SponsorsModel from '../../models/sponsors';
import chai from 'chai';
const expect = chai.expect;

const sponsorCamel = {
  'name': 'name',
  'typeId': 12,
  'joinDate': 1234567890,
  'website': 'website',
  'contributions': 'contributions',
  'youtube': 'youtube',
  'logoDir': 'some dir',
  'createdAt': 732846827,
  'updatedAt': 4329923236
}

const sponsor_snake = {
  'name': 'name',
  'type_id': 12,
  'join_date': 1234567890,
  'website': 'website',
  'contributions': 'contributions',
  'youtube': 'youtube',
  'logo_dir': 'some dir',
  'created_at': 732846827,
  'updated_at': 4329923236
}

const sponsorDescCamel = {
  'title': 'test',
  'description': 'test',
  'images': ['test1','test2'],
  'createdAt': 9234234324,
  'updatedAt': 923432234, 
}

const sponsor_desc_snake = {
  'title': 'test',
  'description': 'test',
  'images': ['test1','test2'],
  'created_at': 9234234324,
  'updated_at': 923432234, 
}

describe('Model: Sponsor', () => {
  describe('fromSponsor', () => {
    it('should return a new object with keys that are snake case', () => {
      expect(SponsorsModel.fromSponsor(sponsorCamel)).to.deep.equal(sponsor_snake);
    })
  })
  describe('toSponsor', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(SponsorsModel.toSponsor(sponsor_snake)).to.deep.equal(sponsorCamel);
    })
  })
  describe('toSponsorDesc', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(SponsorsModel.toSponsorDesc(sponsor_desc_snake)).to.deep.equal(sponsorDescCamel);
    })
  })
})
