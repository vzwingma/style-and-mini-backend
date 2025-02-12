import express from 'express';

import MessageResponse from './interfaces/MessageResponse';
import typeVetements from './typeVetements';
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

router.use('/typeVetements', typeVetements);

export default router;
