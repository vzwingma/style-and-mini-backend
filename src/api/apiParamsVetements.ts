import express from 'express';
import { collections } from '../services/Mongodb.Service';
import ParamTypeVetementsModel from '../models/paramTypeVetements.model';
import ParamTailleVetementsModel from '../models/paramTailleVetements.model';
import ParamUsageVetementsModel from '../models/paramUsageVetements.model';

const router = express.Router();


/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get('/types', async (req, res) => {

  if (collections.paramTypesVetements) {
    const listeParamsTypeVetements: ParamTypeVetementsModel[] = (await collections.paramTypesVetements.find({}).toArray())
      .map((mongoTypeVetement: any) => {
        let typeVetement: ParamTypeVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
          typeTaille: mongoTypeVetement.typeTaille,
        };
        return typeVetement;
      });

    res.status(200).json(listeParamsTypeVetements);
  } else {
    res.status(500).send('La collection Param Type Vetements est introuvable');
  }
});



/**
 * Get all, Tailles et Mesures
 */
router.get('/taillesMesures', async (req, res) => {

  if (collections.paramTaillesMesures) {
    const listeParamsTaillesMesures = (await collections.paramTaillesMesures.find({}).toArray())
      .map((mongoTypeVetement: any) => {
        let typeVetement: ParamTailleVetementsModel = {
          id        : mongoTypeVetement._id.toString(),
          libelle   : mongoTypeVetement.libelle,
          categorie : mongoTypeVetement.categorie,
          type      : mongoTypeVetement.type,
        };
        return typeVetement;
      });

    res.status(200).json(listeParamsTaillesMesures);
  } else {
    res.status(500).send('La collection Param Tailles et Mesures est introuvable');
  }
});


router.get('/usages', async (req, res) => {

  if (collections.paramUsagesVetements) {
    const listeParamsUsagesVetements: ParamUsageVetementsModel[] = (await collections.paramUsagesVetements.find({}).toArray())
      .map((mongoTypeVetement: any) => {
        let usageVetement: ParamUsageVetementsModel = {
          id          : mongoTypeVetement._id.toString(),
          libelle     : mongoTypeVetement.libelle,
          categories  : mongoTypeVetement.categories,
        };
        return usageVetement;
      });

    res.status(200).json(listeParamsUsagesVetements);
  } else {
    res.status(500).send('La collection Param Type Vetements est introuvable');
  }
});



export default router;