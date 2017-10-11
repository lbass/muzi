import express from 'express';
import imageupload from './imageupload';
import imagelist from './imagelist';

const router = express.Router();
router.use('/preview', imageupload);
router.use('/preview', imagelist);

export default router;
