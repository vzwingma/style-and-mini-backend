import express from 'express';
import { collections } from '../services/Mongodb.Service';

const router = express.Router();


/**
 * ROOT URL : '/params'
 */

/**
 * Get all, Type de Vetements
 */
router.get("/typeVetements", async (req, res) => {

    if (collections.paramTypesVetements) {
      const listeParamsTypeVetements = (await collections.paramTypesVetements.find({}).toArray());
      res.status(200).json(listeParamsTypeVetements);
    } else {
      res.status(500).send("La collection Param Type Vetements est introuvable");
    }
  } );




/**
 * Get all, Tailles et Mesures
 */
router.get("/taillesMesures", async (req, res) => {

  if (collections.paramTaillesMesures) {
    const listeParamsTaillesMesures = (await collections.paramTaillesMesures.find({}).toArray());
    res.status(200).json(listeParamsTaillesMesures);
  } else {
    res.status(500).send("La collection Param Tailles et Mesures est introuvable");
  }
} );

export default router;