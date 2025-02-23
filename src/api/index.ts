import express from 'express';

import MessageResponse from './interfaces/MessageResponse';
import apiParams from './apiParams';
import apiDressing from './apiDressing';
import BackendConfigModel from '../models/backendConfig.model';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '👗​ Styles and Mini 👚 - API',
  });
});

router.get<{}, BackendConfigModel>('/status', (req, res) => {
  res.json({
    status: '✅​ OK ✅​',
  });
});

router.use('/params', apiParams);
router.use('/dressing', apiDressing);

export default router;
