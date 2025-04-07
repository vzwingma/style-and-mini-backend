import express from 'express';

import MessageResponse from './interfaces/MessageResponse';
import apiParamsVetements from './apiParamsVetements';
import apiDressing from './apiDressing';
import BackendConfigModel from '../models/backendConfig.model';
import { ServiceURLEnum } from '../constants/APIconstants';
import { APP_MOBILE_VERSION } from '../constants/AppEnum';

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
