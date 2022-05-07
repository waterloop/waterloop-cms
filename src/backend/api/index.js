import express from 'express';
import teamDescriptors from './team-descriptors';
import postings from './postings';
import sponsors from './sponsors'; // Import entire folder to bind to sponsor URL router section.
import upload from './file-upload/upload';
import geeseInfo from './geese-info';
import openingsDescription from './openings-description';
import newsletter from './newsletter_recipient';
import blogs from './blogs';

const router = express.Router();

router.use('/team-descriptors', teamDescriptors);
router.use('/postings', postings);
router.use('/sponsors', sponsors);
router.use('/upload', upload);
router.use('/geese-info', geeseInfo);
router.use('/openings-description', openingsDescription);
router.use('/newsletter', newsletter);
router.use('/blogs', blogs);

export default router;
