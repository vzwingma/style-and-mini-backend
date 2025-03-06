import express from 'express';
import { collections } from '../services/Mongodb.Service';
import ParamTypeVetementsModel from '../models/paramTypeVetements.model';
import ParamTailleVetementsModel from '../models/paramTailleVetements.model';
import ParamUsageVetementsModel from '../models/paramUsageVetements.model';
import ParamEtatVetementsModel from '../models/paramEtatVetements.model';
import { ServiceURLEnum } from '../constants/APIconstants';

const router = express.Router();


/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TYPE_VETEMENTS, async (req, res) => {

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
router.get(ServiceURLEnum.SERVICE_PARAMS_TAILLES_MESURES, async (req, res) => {

  if (collections.paramTaillesMesures) {
    const listeParamsTaillesMesures = (await collections.paramTaillesMesures.find({}).toArray())
      .map((mongoTypeVetement: any) => {
        let tailleVetement: ParamTailleVetementsModel = {
          id        : mongoTypeVetement._id.toString(),
          libelle   : mongoTypeVetement.libelle,
          categorie : mongoTypeVetement.categorie,
          tri       : mongoTypeVetement.tri,
          type      : mongoTypeVetement.type,
        };
        return tailleVetement;
      });

    res.status(200).json(listeParamsTaillesMesures);
  } else {
    res.status(500).send('La collection Param Tailles et Mesures est introuvable');
  }
});


router.get(ServiceURLEnum.SERVICE_PARAMS_USAGES, async (req, res) => {

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
    res.status(500).send('La collection Param Usages est introuvable');
  }
});

router.get(ServiceURLEnum.SERVICE_PARAMS_ETATS, async (req, res) => {

  if (collections.paramEtatsVetements) {
    const listeParamsEtatsVetements: ParamEtatVetementsModel[] = (await collections.paramEtatsVetements.find({}).toArray())
      .map((mongoTypeVetement: any) => {
        let etatVetement: ParamEtatVetementsModel = {
          id          : mongoTypeVetement._id.toString(),
          libelle     : mongoTypeVetement.libelle,
          tri         : mongoTypeVetement.tri,
          categories  : mongoTypeVetement.categories,
        };
        return etatVetement;
      });

    res.status(200).json(listeParamsEtatsVetements);
  } else {
    res.status(500).send('La collection Param Etat est introuvable');
  }
});


export default router;