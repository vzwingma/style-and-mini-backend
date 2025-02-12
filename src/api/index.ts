import express from 'express';

import MessageResponse from './interfaces/MessageResponse';
import typeVetements from './typeVetements';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '👗​ Styles and Mini 👚 - API',
  });
});

router.get<{}, MessageResponse>('/status', (req, res) => {
  res.json({
    message: '✅​ OK ✅​',
  });
});

router.use('/typeVetements', typeVetements);

export default router;
