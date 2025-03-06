import express from 'express';

import MessageResponse from './interfaces/MessageResponse';
import apiParamsVetements from './apiParamsVetements';
import apiDressing from './apiDressing';
import BackendConfigModel from '../models/backendConfig.model';
import { SERVICES_URL } from '../constants/APIconstants';

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

router.use(SERVICES_URL.SERVICE_PARAMS, apiParamsVetements);
router.use(SERVICES_URL.SERVICE_DRESSINGS, apiDressing);

export default router;
