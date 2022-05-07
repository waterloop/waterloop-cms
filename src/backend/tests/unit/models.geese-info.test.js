import * as GeeseInfoModel from '../../models/geese-info';
import chai from 'chai';
const expect = chai.expect;

const gooseInfoCamel = {
  "id": 1, 
  "name": "Goose I Test", 
  "description": "This is Goose I", 
  "updatedAt": 1609459569000
}

const gooseinfo_snake = {
  "id": 1, 
  "name": "Goose I Test", 
  "description": "This is Goose I", 
  "updated_at": 1609459569000
}

const gooseImageCamel = {
  "id": 4, 
  "gooseId": 3, 
  "imgDir": "test4.bmp"
}

const gooseimage_snake = {
  "id": 4, 
  "goose_id": 3, 
  "img_dir": "test4.bmp"
}

describe('Model: Geese Info', () => {
  describe('fromGooseInfo', () => {
    it('should return a new object with keys that are snake case', () => {
      expect(GeeseInfoModel.fromGooseInfo(gooseInfoCamel)).to.deep.equal(gooseinfo_snake);
    })
  })
  describe('toGooseInfo', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(GeeseInfoModel.toGooseInfo(gooseinfo_snake)).to.deep.equal(gooseInfoCamel);
    })
  })
  describe('fromGooseImage', () => {
    it('should return a new object with keys that are snake case', () => {
      expect(GeeseInfoModel.fromGooseImage(gooseImageCamel)).to.deep.equal(gooseimage_snake);
    })
  })
  describe('toGooseImage', () => {
    it('should return a new object with keys that are camel case', () => {
      expect(GeeseInfoModel.toGooseImage(gooseimage_snake)).to.deep.equal(gooseImageCamel);
    })
  })
})
