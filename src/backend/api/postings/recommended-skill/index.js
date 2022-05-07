import { Router } from 'express';
import { check } from 'express-validator';
import validationCheck from '../../../utils/validation-check';
import add from './add';
import del from './del';

const router = Router();

router.post('/', add);

router.delete('/:recommendedSkillId', [
  check('recommendedSkillId').isInt(),
], validationCheck, del);

export default router;
