import express from 'express';
import getBlogs from './get-blogs';
import getLatestBlogs from './get-latest-blogs';
import add from './add';
import deleteBlog from './del';
import editBlog from './edit';
import validationCheck from '../../utils/validation-check';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', getBlogs);
router.get('/latest', getLatestBlogs);

router.delete('/:id', validationCheck, deleteBlog);

router.patch('/:id', [
  body('author').isString(),
  body('title').isString(),
  body('summary').isString().isLength({min:1, max:200}),
  body('date').isString().matches(/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/),
  body('link').isString(),
  body('image').isString(),
  body('closed').isBoolean()
], validationCheck, editBlog);

router.post('/', [
    body('author').isString(),
    body('title').isString(),
    body('summary').isString().isLength({min:1, max:200}),
    body('date').isString().matches(/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/),
    body('link').isString(),
    body('image').isString(),
    body('closed').isBoolean(),
  ], validationCheck, add);

export default router;