// Bind sponsor API functions to router under specific URLs.
import express from 'express';

// Check inputs are properly sanitized:
import { body, param } from 'express-validator';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';

import getTiers from './get-tiers';
import getSponsors from './get-sponsors';
import add from './add';
import update from './update';
import del from './del';
import getDesc from './description/get';
import updateDesc from './description/update';

const router = express.Router();

// Sponsor tiers.
router.get('/tiers', getTiers);

// Sponsor page description
router.get('/description', getDesc);

router.patch('/description', [
  // Required
  body('title').isString(),
  body('description').isString(),
  body('images').isArray()

], validationCheck, updateDesc);

// Sponsors
router.get('/', getSponsors);

router.post('/', [
  // Required
  body('name').isString(),
  body('typeId').isInt(),
  body('joinDate').isInt(),
  // Optional
  body('website').if(body('website').exists({checkNull: true})).isString(),
  body('contributions').if(body('contributions').exists({checkNull: true})).isString(),
  body('youtube').if(body('youtube').exists({checkNull: true})).isString(),
  body('logoDir').if(body('logoDir').exists({checkNull: true})).isString()
], validationCheck, validateRequest, add);

router.patch('/:id', [
  param('id').isInt(),
  // Optional
  body('name').if(body('name').exists({checkNull: true})).isString(),
  body('typeId').if(body('typeId').exists({checkNull: true})).isInt(),
  body('joinDate').if(body('joinDate').exists({checkNull: true})).isInt(),
  body('website').if(body('website').exists({checkNull: true})).isString(),
  body('contributions').if(body('contributions').exists({checkNull: true})).isString(),
  body('youtube').if(body('youtube').exists({checkNull: true})).isString(),
  body('logoDir').if(body('logoDir').exists({checkNull: true})).isString()
], validationCheck, validateRequest, update);

router.delete('/:id', [
  param('id').isInt()
], validationCheck, validateRequest, del);

export default router;
