import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { ParametragesVetementEnum } from '../constants/AppEnum';
import { getParametresVetements } from '../controllers/params.controller';


const router = express.Router();

/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_POST_PARAMS, async (req, res) => {

  const typeParam = req.params.type ? req.params.type.toUpperCase() as ParametragesVetementEnum : null;
  console.log('[API] Chargement de tous les paramètrages de Vetements', typeParam);

  if (!typeParam && typeParam !== null) {
    getParametresVetements(typeParam)
      .then((listeParamsTypeVetements) => {
        res.status(ApiHTTPStatusEnum.OK).json(listeParamsTypeVetements)
      })
      .catch((err) => {
        res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
      });
  }
  else {
    res.status(ApiHTTPStatusEnum.BAD_REQUEST).send('Type de paramètre inconnu : ' + req.params.type);
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