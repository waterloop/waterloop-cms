import express from 'express';
import { param, body, check} from 'express-validator';
import validationCheck from '../../utils/validation-check';
import passArg from '../../utils/pass-arg';
import { validateRequest } from '../../google-auth';

// Products 
import getAll from './get-all';
import get from './get';
import add from './add';
import del from './del';
import update from './update';
import getDetails from './get-details';

import variations from './variations';

const router = express.Router();

router.get('/', getAll);

router.get('/:id', [
    check('id').isInt()
  ], validationCheck, get);

router.get('/details/:id', [
  check('id').isInt()
], validationCheck, getDetails);

router.post('/', [
  body('name').exists(),
  body('description').exists(),
  body('category').exists(),
], validationCheck, validateRequest, add);

router.delete('/:id', [
  check('id').isInt()
], validationCheck, validateRequest, del);

router.patch('/:id', [
  check('id').isInt(),
], validationCheck, validateRequest, update);


router.use('/:productId/variations', [
  check('productId').isInt()
], validationCheck, passArg('productId'), variations);

export default router