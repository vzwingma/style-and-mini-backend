import express from 'express';

import MessageResponse from './interfaces/MessageResponse.js';
import apiParamsVetements from './apiParamsVetements.js';
import apiDressing from './apiDressing.js';
import BackendConfigModel from '../models/backendConfig.model.js';
import { ServiceURLEnum } from '../constants/APIconstants.js';
import { APP_MOBILE_VERSION } from '../constants/AppConstants.js';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req, res) => {
  res.json({
    message: '👗​ Styles and Mini 👚 - API',
  });
});

router.get<{}, BackendConfigModel>('/status', (_req, res) => {
  res.json({
    status: '✅​ OK ✅​',
    version: APP_MOBILE_VERSION,
    env: '' + process.env.NODE_ENV,
  });
});

router.use(ServiceURLEnum.SERVICE_PARAMS,     apiParamsVetements);
router.use(ServiceURLEnum.SERVICE_DRESSINGS,  apiDressing);
export default router;
