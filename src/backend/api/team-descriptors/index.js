import express from 'express';
import { param, body } from 'express-validator';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';

import getDesc from './description/get';
import updateDesc from './description/update';
import getAll from './get-all';
import add from './add';
import update from './update';
import del from './del';

const router = express.Router();

/* TEAMS PAGE DESCRIPTION */

router.get('/description', getDesc);

router.patch(
  '/description',
  [
    body('title').isString(),
    body('description').isString(),
    body('images').isArray(),
  ],
  validationCheck,
  validateRequest,
  updateDesc,
);

/* TEAMS */

router.get('/', getAll);

router.post(
  '/',
  [body('teamName').isString(), body('description').isString()],
  validationCheck,
  validateRequest,
  add,
);

router.patch(
  '/:id',
  [
    param('id').isInt(),
    body('teamName').isString(),
    body('description').isString(),
  ],
  validationCheck,
  validateRequest,
  update,
);

router.delete(
  '/:id',
  [param('id').isInt()],
  validationCheck,
  validateRequest,
  del,
);

export default router;
