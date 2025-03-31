import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { getParamsEtatsVetement, getParamsMarquesVetement, getParamsTaillesVetement, getParamsTypesVetement, getParamsUsagesVetement } from '../controllers/params.controller';


const router = express.Router();

/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TYPE_VETEMENTS, async (_req, res) => {

  getParamsTypesVetement()
    .then((listeParamsTypeVetements) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsTypeVetements)
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});




/**
 * Get all, Tailles et Mesures
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TAILLES_MESURES, async (_req, res) => {

  getParamsTaillesVetement()
    .then((listeParamsTaillesMesures) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsTaillesMesures)
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});


/**
 * Get all, Usages de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_USAGES, async (_req, res) => {

  getParamsUsagesVetement()
    .then((listeParamsUsages) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsUsages);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});


/**
 * Get all, Marques de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_MARQUES, async (_req, res) => {

  getParamsMarquesVetement()
    .then((listeParamsMarques) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsMarques);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});

/**
 * Get all, Etats de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_ETATS, async (_req, res) => {

  getParamsEtatsVetement()
    .then((listeParamsEtatsVetements) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsEtatsVetements);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});

export default router;