import express from 'express';
import { body, check } from 'express-validator';
import validationCheck from '../../utils/validation-check';
import passArg from '../../utils/pass-arg';
import { validateRequest } from '../../google-auth';

import getAll from './get-all';
import get from './get';
import add from './add';
import update from './update';
import del from './del';
import info from './info';
import requirement from './requirement';
import task from './task';
import recommendedSkill from './recommended-skill';
import skillToBeLearned from './skill-to-be-learned';


const router = express.Router();

router.get('/', getAll);

router.get('/:id', [
  check('id').isInt()
], validationCheck, get);

router.post('/', validateRequest, [
  body('title').exists(),
  body('teamId').exists(),
  body('deadline').exists(),
  body('location').exists(),
  body('termYear').exists(),
  body('termSeason').exists(),
  body('description').exists(),
  body('timeCommitment').exists()
], validationCheck, add);

router.patch('/:id', [
  check('id').isInt(),
], validationCheck, validateRequest, update);

router.delete('/:id', [
  check('id').isInt()
], validationCheck, validateRequest, del);

router.use('/:postingId/requirement', [
  check('postingId').isInt()
], validationCheck, passArg('postingId'), validateRequest, requirement);

router.use('/:postingId/task', [
  check('postingId').isInt()
], validationCheck, passArg('postingId'), validateRequest, task);

router.use('/:postingId/info', [
  check('postingId').isInt()
], validationCheck, passArg('postingId'), validateRequest, info);

router.use('/:postingId/recommendedSkill', [
  check('postingId').isInt()
], validationCheck, passArg('postingId'), validateRequest, recommendedSkill);

router.use('/:postingId/skillToBeLearned', [
  check('postingId').isInt()
], validationCheck, passArg('postingId'), validateRequest, skillToBeLearned);


export default router;
