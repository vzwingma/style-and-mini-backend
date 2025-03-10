import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { getParamsEtatsVetement, getParamsTaillesVetement, getParamsUsagesVetement } from '../controllers/params.controller';


const router = express.Router();

/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_TYPE_VETEMENTS, async (req, res) => {

  getParamsEtatsVetement()
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
router.get(ServiceURLEnum.SERVICE_PARAMS_TAILLES_MESURES, async (req, res) => {

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
router.get(ServiceURLEnum.SERVICE_PARAMS_USAGES, async (req, res) => {

  getParamsUsagesVetement()
    .then((listeParamsUsages) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsUsages);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});

/**
 * Get all, Etats de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_ETATS, async (req, res) => {

  getParamsEtatsVetement()
    .then((listeParamsEtatsVetements) => {
      res.status(ApiHTTPStatusEnum.OK).json(listeParamsEtatsVetements);
    })
    .catch((err) => {
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
    });
});

export default router;