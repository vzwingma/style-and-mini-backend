import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { getParamsEtatsVetement, getParamsTaillesVetement, getParamsTypesVetement, getParamsUsagesVetement } from '../controllers/params.controller';
import { patchParamsMarquesVetement, patchParamsTaillesVetement, patchParamsTypesVetement } from '../controllers/params.patch.controller';


const router = express.Router();

/**
 * ROOT URL : 'admin/params/vetements/'
 */

/**
 * Patch Type de Vetements
 */
router.patch(ServiceURLEnum.SERVICE_PARAMS_TYPE_VETEMENTS, async (req, res) => {

  patchParamsTypesVetement()
    .then((listeParamsTypeVetements) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsTypeVetements.length)
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});




/**
 * Patch Tailles et Mesures
 */
router.patch(ServiceURLEnum.SERVICE_PARAMS_TAILLES_MESURES, async (req, res) => {

  patchParamsTaillesVetement()
    .then((listeParamsTaillesMesures) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsTaillesMesures.length)
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});


/**
 * Patch Marques de Vetements
 */
router.patch(ServiceURLEnum.SERVICE_PARAMS_MARQUES, async (req, res) => {

  patchParamsMarquesVetement()
    .then((listeParamsMarques) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsMarques.length);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});


export default router;