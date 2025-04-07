import express from 'express';
import { ApiHTTPStatusEnum } from '../constants/APIconstants';

const router = express.Router();
/**
 * ROOT URL : '/upload/images'
 */

/**
 * Get all dressings
 */
router.get('/', async (_req, res) => {
  console.log('[API] Get Upload Images');
    res.status(ApiHTTPStatusEnum.OK).json({"message": "Upload Images"});
});

export default router;