import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { getParamsEtatsVetement, getParamsMarquesVetement, getParamsTaillesVetement, getParamsTypesVetement, getParamsUsagesVetement } from '../controllers/params.controller';
import { ParametragesVetementEnum } from '../constants/AppEnum';


const router = express.Router();

/**
 * ROOT URL : '/params/vetements/'
 */



/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_POST_PARAMS, async (req, res) => {

  console.log('[API] Chargement de tous les paramètrages de Vetements', req.params.type);
  const typeParam = req.params.type ? req.params.type.toUpperCase() : null;


  switch (typeParam) {
    case ParametragesVetementEnum.TYPE:
      getParamsTypesVetement()
        .then((listeParamsTypeVetements) => {
          res.status(ApiHTTPStatusEnum.OK).json(listeParamsTypeVetements)
        })
        .catch((err) => {
          res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
        });
      break;
    case ParametragesVetementEnum.TAILLES:
      getParamsTaillesVetement()
        .then((listeParamsTaillesMesures) => {
          res.status(ApiHTTPStatusEnum.OK).json(listeParamsTaillesMesures)
        })
        .catch((err) => {
          res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
        });
      break;
    case ParametragesVetementEnum.USAGES:
      getParamsUsagesVetement()
        .then((listeParamsUsages) => {
          res.status(ApiHTTPStatusEnum.OK).json(listeParamsUsages);
        })
        .catch((err) => {
          res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
        });
      break;
    case ParametragesVetementEnum.MARQUES:
      getParamsMarquesVetement()
        .then((listeParamsMarques) => {
          res.status(ApiHTTPStatusEnum.OK).json(listeParamsMarques);
        })
        .catch((err) => {
          res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
        });
      break;
    case ParametragesVetementEnum.ETATS:
      getParamsEtatsVetement()
        .then((listeParamsEtatsVetements) => {
          res.status(ApiHTTPStatusEnum.OK).json(listeParamsEtatsVetements);
        })
        .catch((err) => {
          res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
        });
      break;
    default:
      res.status(ApiHTTPStatusEnum.BAD_REQUEST).send('Type de paramètre inconnu : ' + req.params.type);
      break;
  }

});



/**
 * POST (CREATE) Type de Vetements
 */
router.post(ServiceURLEnum.SERVICE_POST_PARAMS, async (req, res) => {

  console.log('[API] Création d\'un paramètrage de Vetements', req.params.type);
  res.status(ApiHTTPStatusEnum.OK).json(req.params.type);
});




/**
 * POST (UPDATE) Type de Vetements
 */
router.post(ServiceURLEnum.SERVICE_POST_PARAMS_BY_ID, async (req, res) => {

  console.log('[API] Mise à jour d\'un paramètrage de Vetements', req.params.type, req.params.idp);
  res.status(ApiHTTPStatusEnum.OK).json(req.params.type + "-" + req.params.idp);
});





export default router;