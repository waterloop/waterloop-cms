import express from 'express';
import getAllFeatures from './get-all-features';
import addFeature from './add';
import deleteFeature from './del';
import editFeature from './edit';
import getFeature from './get-feature';
import validationCheck from '../../utils/validation-check';
import { body, param } from 'express-validator';

const router = express.Router();

router.get('/', getAllFeatures);
router.get('/:id', getFeature);

router.delete('/:id', validationCheck, deleteFeature);

router.patch(
  '/:id',
  [
    // Required
    param('id').isInt(),
    // Optional
    body('name')
      .if(body('name').exists({ checkNull: true }))
      .isString(),
    body('description')
      .if(body('description').exists({ checkNull: true }))
      .isString()
      .isLength({ min: 1, max: 200 }),
    body('picture')
      .if(body('picture').exists({ checkNull: true }))
      .isString(),
  ],
  validationCheck,
  editFeature,
);

router.post(
  '/',
  [
    body('name').isString(),
    body('picture').isString(),
    body('description').isString().isLength({ min: 1, max: 200 }),
  ],
  validationCheck,
  addFeature,
);

export default router;
