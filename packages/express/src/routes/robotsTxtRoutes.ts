
import express from 'express';
import { fetchRobotsTxt } from '../controllers/robotsTxtController';

const router = express.Router();

router.get('/fetch-robots-txt', fetchRobotsTxt);

export default router;