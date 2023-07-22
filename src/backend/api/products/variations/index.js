import express from 'express';
import { param, body, check } from 'express-validator';
import validationCheck from '../../../utils/validation-check';
import { validateRequest } from '../../../google-auth';

import getAll from './get-all';
import get from './get';
import add from './add';
import del from './del';
import update from './update'

const router = express.Router();

router.get('/', getAll);

router.get('/:variationId', [
  check('variationId').isInt()
], validationCheck, get);

router.post('/', [
  body('variationName').exists(),
  body('price').exists(),
  body('stock').exists(),
  body('picture').exists(),
  body('lastUpdated').exists(),
], validationCheck, add);

router.patch('/:variationId', [
  check('variationId').isInt(),
  body('lastUpdated').exists(),
], validationCheck, update);

router.delete('/:variationId', [
  check('variationId').isInt()
], validationCheck, del);

export default router;
