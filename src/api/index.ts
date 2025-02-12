import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './emojis';
import { collections } from '../services/Mongodb.Service';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.get<{}, MessageResponse>('/status', (req, res) => {
  res.json({
    message: 'OK',
  });
});

router.use('/emojis', emojis);

router.get("/mongodb", async (req, res) => {

    if (collections.typesVetements) {
      const collectionTypeVetements = (await collections.typesVetements.find({}).toArray());
      res.status(200).send(collectionTypeVetements);
    } else {
      res.status(500).send("Games collection is undefined");
    }
  } 
);

export default router;
