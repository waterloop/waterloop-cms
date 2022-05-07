// Bind sponsor API functions to router under specific URLs.
import express from 'express';

// Check inputs are properly sanitized:
import { body, param } from 'express-validator';
import validationCheck from '../../utils/validation-check';

import getGeeseInfo from './get-all';
import getGooseInfo from './get';
import getGooseImages from './images/get-by-id';

import addGooseInfo from './add';
import addGeeseImages from './images/add-all';

import updateGooseInfo from './update';

import deleteGooseInfo from './del';
import deleteGooseImage from './images/del';
import { validateRequest } from '../../google-auth';

const router = express.Router();

router.get('/', getGeeseInfo);
router.get('/:id', [
  param('id').isInt()
], validationCheck, getGooseInfo);
router.get('/images/:id', [
  param('id').isInt()
], validationCheck, getGooseImages);

router.post('/', [
  // Required
  body('name').isString(),
  body('description').isString(),
  body('updatedAt').isInt(),
], validationCheck, validateRequest, addGooseInfo);

router.post('/images', [
  // Required
  body().isArray({ min: 1 }),
  body('*.gooseId').isInt(),
  body('*.imgDir').isString()
], validationCheck, validateRequest, addGeeseImages);

router.patch('/:id', [
  // Required
  param('id').isInt(),
  // Optional
  body('name').if(body('name').exists({checkNull: true})).isString(),
  body('description').if(body('description').exists({checkNull: true})).isString(),
  body('updatedAt').if(body('updatedAt').exists({checkNull: true})).isInt()
], validationCheck, validateRequest, updateGooseInfo);

// Handles case when an ID is not provided for the update (PATCH) request.
router.patch('/', (req, res) => {res.sendStatus(400)});

router.delete('/:id', [
  param('id').isInt()
], validationCheck, validateRequest, deleteGooseInfo);

// Handle case when an ID is not provided for the DELETE request.
router.delete('/', (req, res) => {res.sendStatus(400)});

router.delete('/images/:id', [
  param('id').isInt()
], validationCheck, validateRequest, deleteGooseImage);

export default router;
