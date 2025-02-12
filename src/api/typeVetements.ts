import express from 'express';
import { collections } from '../services/Mongodb.Service';

const router = express.Router();

/**
 * Get all, Type de Vetements
 */
router.get("/", async (req, res) => {

    if (collections.typesVetements) {
      const collectionTypeVetements = (await collections.typesVetements.find({}).toArray());
      res.status(200).send(collectionTypeVetements);
    } else {
      res.status(500).send("Type Vetements collection is undefined");
    }
  } );

export default router;
