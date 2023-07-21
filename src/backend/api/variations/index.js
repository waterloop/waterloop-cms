import express from 'express';
import { param, body, check } from 'express-validator';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';

import getAll from './get-all';
import get from './get';
import add from './add';
import del from './del';

const router = express.Router();

router.get('/', getAll);

router.get('/:id', [check('id').isInt()], validationCheck, get);

router.post(
  '/',
  [
    body('name').exists(),
    body('description').exists(),
    body('category').exists(),
  ],
  validationCheck,
  add,
);

router.delete('/:id', [check('id').isInt()], validationCheck, del);

export default router;
