import express from 'express';
import { ApiHTTPStatusEnum, ServiceURLEnum } from '../constants/APIconstants';
import { ParametragesVetementEnum } from '../constants/AppEnum';
import { deleteParametrage, getParametresVetements, saveParametrage, updateParametrage } from '../controllers/params.controller';
import ParamGenericVetementsModel from '../models/paramGenericVetements.model';


const router = express.Router();

/**
 * ROOT URL : '/params/vetements/'
 */

/**
 * Get all, Type de Vetements
 */
router.get(ServiceURLEnum.SERVICE_PARAMS_BY_TYPE, async (req, res) => {

  const typeParam = getTypeParametrageFromRequest(req.params.type);
  console.log('[API] Chargement de tous les paramètrages de Vetements', typeParam);

  if (typeParam !== null) {
    getParametresVetements(typeParam)
      .then((listeParamsTypeVetements) => {
        console.debug('Paramètrages de Vetements', typeParam, listeParamsTypeVetements);
        res.status(ApiHTTPStatusEnum.OK).json(listeParamsTypeVetements)
      })
      .catch((err) => {
        res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).send(err);
      });
  }
  else {
    res.status(ApiHTTPStatusEnum.BAD_REQUEST).json( { error : 'Type de paramètre inconnu'});
  }

});


const getTypeParametrageFromRequest = (typeParam: string): ParametragesVetementEnum | null => {
  return typeParam ? typeParam.toUpperCase() as ParametragesVetementEnum : null;
}

/**
 * Extrait et retourne le paramétrage à partir de la requête HTTP.
 * 
 * Cette fonction tente de parser le corps de la requête en tant que JSON.
 * Si le parsing échoue, elle retourne directement le corps de la requête tel quel.
 * 
 * @param req - La requête HTTP de type `express.Request`.
 * @returns Le modèle de paramétrage de type `ParamGenericVetementsModel`.
 */
const getParametrageFromRequestBody = (req: express.Request): ParamGenericVetementsModel => {
  let parametrage: ParamGenericVetementsModel
  try {
    parametrage = JSON.parse(req.body);
  } catch (error) {
    parametrage = req.body;
  }
  return parametrage;
}

/**
 * POST (CREATE) Type de Vetements
 */
router.post(ServiceURLEnum.SERVICE_PARAMS_BY_TYPE, async (req, res) => {

  const typeParam = getTypeParametrageFromRequest(req.params.type);
  let parametrage = getParametrageFromRequestBody(req);
  console.log('[API] Création d\'un paramètrage de vêtements', typeParam, parametrage);
  if (typeParam === null) {
    res.status(ApiHTTPStatusEnum.BAD_REQUEST).json( { error : 'Type de paramètre inconnu'});
    return;
  }
  saveParametrage(typeParam, parametrage)
    .then((
      idSaved: string | null) => {
      console.log('Paramètrage [', idSaved, '] ajouté dans la catégorie [', req.params.type, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idParametrage: idSaved });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).json( {error : "L'enregistrement du paramétrage a échoué"});
    });
});




/**
 * POST (UPDATE) Type de Vetements
 */
router.post(ServiceURLEnum.SERVICE_PARAMS_BY_TYPE_AND_ID, async (req, res) => {

  const typeParam = getTypeParametrageFromRequest(req.params.type);
  let parametrage = getParametrageFromRequestBody(req);
  console.log('[API] Mise à jour du paramètrage de vetements', req.params.type, " id=", req.params.idp, parametrage);
  if (typeParam === null) {
    res.status(ApiHTTPStatusEnum.BAD_REQUEST).json({ error : 'Type de paramètre inconnu'});
    return;
  }
  updateParametrage(typeParam, parametrage, req.params.idp)
    .then((idSaved: string | null) => {
      console.log('Paramètrage [', idSaved, '] modifié dans la catégorie [', req.params.type, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idParametrage: idSaved });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).json({error : "L'enregistrement du paramétrage a échoué"});
    });
});



/**
 * DELETE Type de Vetements
 */
router.delete(ServiceURLEnum.SERVICE_PARAMS_BY_TYPE_AND_ID, async (req, res) => {

  const typeParam = getTypeParametrageFromRequest(req.params.type);
  let parametrage = getParametrageFromRequestBody(req);
  console.log('[API] Suppression du paramètrage de vetements', req.params.type, " id=", req.params.idp, parametrage);
  if (typeParam === null) {
    res.status(ApiHTTPStatusEnum.BAD_REQUEST).json({ error : 'Type de paramètre inconnu'});
    return;
  }
  deleteParametrage(typeParam, req.params.idp)
    .then((idSaved: boolean) => {
      console.log('Paramètrage [', req.params.idp, '] supprimé dans la catégorie [', req.params.type, ']');
      res.status(ApiHTTPStatusEnum.OK).json({ idParametrage: idSaved });
    })
    .catch((err) => {
      console.error('Erreur MongoDB', err);
      res.status(ApiHTTPStatusEnum.INTERNAL_ERROR).json({error : "L'enregistrement du paramétrage a échoué"});
    });
});



export default router;