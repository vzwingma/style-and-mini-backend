import express from 'express';
import ParamTypeVetementsModel from '../models/paramTypeVetements.model';
import ParamTailleVetementsModel from '../models/paramTailleVetements.model';
import ParamUsageVetementsModel from '../models/paramUsageVetements.model';
import ParamEtatVetementsModel from '../models/paramEtatVetements.model';
import { ServiceURLEnum } from '../constants/APIconstants';
import { getParamsEtatVetements } from '../controllers/params.controller';
import { MONGO_DB_COLLECTIONS } from '../constants/AppConstants';

const router = express.Router();


/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TYPE_VETEMENTS, async (req, res) => {

  getParamsEtatVetements(MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS)
    .then((result) => {
      const listeParamsTypeVetements = result.map((mongoTypeVetement: any) => {
        let typeVetement: ParamTypeVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
          typeTaille: mongoTypeVetement.typeTaille,
        };
        return typeVetement;
      });
      res.status(200).json(listeParamsTypeVetements)
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB', err);
      res.status(500).send('La collection Param Type Vetements est introuvable');
    });
});




/**
 * Get all, Tailles et Mesures
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TAILLES_MESURES, async (req, res) => {

  getParamsEtatVetements(MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES)
    .then((result) => {
      const listeParamsTaillesMesures = result.map((mongoTypeVetement: any) => {
        let tailleVetement: ParamTailleVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categorie: mongoTypeVetement.categorie,
          tri: mongoTypeVetement.tri,
          type: mongoTypeVetement.type,
        };
        return tailleVetement;
      });

      res.status(200).json(listeParamsTaillesMesures)
    })
    .catch(() => {
      res.status(500).send('La collection Param Tailles et Mesures est introuvable');
    });
});


/**
 * Get all, Usages de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_USAGES, async (req, res) => {

  getParamsEtatVetements(MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS)
    .then((result) => {
      const listeParamsTaillesMesures = result.map((mongoTypeVetement: any) => {
        let usageVetement: ParamUsageVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          categories: mongoTypeVetement.categories,
        };
        return usageVetement;
      });

    res.status(200).json(listeParamsTaillesMesures);
  })
  .catch(() => {
    res.status(500).send('La collection Param Usages est introuvable');
  });
});

/**
 * Get all, Etats de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_ETATS, async (req, res) => {

  getParamsEtatVetements(MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS)
    .then((result) => {
      const listeParamsEtatsVetements = result.map((mongoTypeVetement: any) => {
        let etatVetement: ParamEtatVetementsModel = {
          id: mongoTypeVetement._id.toString(),
          libelle: mongoTypeVetement.libelle,
          tri: mongoTypeVetement.tri,
          categories: mongoTypeVetement.categories,
        };
        return etatVetement;
      });

    res.status(200).json(listeParamsEtatsVetements);
  })
  .catch(() => {
    res.status(500).send('La collection Param Etat est introuvable');
  });
});

export default router;