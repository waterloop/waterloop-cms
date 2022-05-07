import express from 'express';
import { body, param } from 'express-validator';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';

import getAll from './get-all';
import get from './get';
import add from './add';
import del from './del';

const router = express.Router();

router.get('/', validateRequest, getAll);

router.get(
  '/:email',
  [param('email').isEmail()],
  validationCheck,
  validateRequest,
  get,
);

router.post(
  '/',
  [
    body('name').exists({ checkNull: true }).isString().notEmpty().trim(),
    body('email')
      .exists({ checkNull: true })
      .isString()
      .notEmpty()
      .trim()
      .isEmail(),
  ],
  validationCheck,
  add,
);

router.delete(
  '/:email',
  [param('email').isEmail()],
  validationCheck,
  validateRequest,
  del,
);

export default router;
