import express from 'express';
import { param, body, check} from 'express-validator';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';

import getAll from './get-all.js'
import get from './get';


const router = express.Router();

router.get('/', getAll);

router.get('/:id', [
    check('id').isInt()
  ], validationCheck, get);

export default router