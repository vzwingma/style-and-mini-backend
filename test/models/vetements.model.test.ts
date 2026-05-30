import { ObjectId } from 'mongodb';
import { mongoModelToVetementModel } from '../../src/models/vetements/vetements.model';
import { SaisonVetementEnum, StatutVetementEnum } from '../../src/constants/AppEnum';

// ─── mongoModelToVetementModel ────────────────────────────────────────────────
describe('mongoModelToVetementModel', () => {

  const _id = new ObjectId();
  const baseMongoVetement = {
    _id,
    dressing   : { id: 'dressing1', libelle: 'Mon dressing' },
    libelle    : 'Ma chemise',
    image      : { s3uri: 's3://bucket/image.jpg', hauteur: 200, largeur: 150 },
    type       : { id: 'type1', libelle: 'Chemise' },
    taille     : { id: 'taille1', libelle: 'M' },
    usages     : [{ id: 'usage1', libelle: 'Casual' }],
    saisons    : [SaisonVetementEnum.ETE],
    couleurs   : 'bleu',
    etat       : { id: 'etat1', libelle: 'Bon état' },
    marque     : { id: 'marque1', libelle: 'Zara' },
    collection : 'Printemps 2024',
    prix       : { achat: 30, neuf: 50 },
    description: 'Une belle chemise',
    statut     : StatutVetementEnum.ACTIF,
    dateCreation: new Date('2024-01-01'),
  };

  it('cas nominal : mappe tous les champs depuis l\'objet MongoDB', () => {
    const result = mongoModelToVetementModel(baseMongoVetement);
    expect(result.id).toBe(_id.toString());
    expect(result.dressing).toEqual(baseMongoVetement.dressing);
    expect(result.libelle).toBe('Ma chemise');
    expect(result.image).toEqual(baseMongoVetement.image);
    expect(result.type).toEqual(baseMongoVetement.type);
    expect(result.taille).toEqual(baseMongoVetement.taille);
    expect(result.usages).toEqual(baseMongoVetement.usages);
    expect(result.saisons).toEqual([SaisonVetementEnum.ETE]);
    expect(result.couleurs).toBe('bleu');
    expect(result.etat).toEqual(baseMongoVetement.etat);
    expect(result.marque).toEqual(baseMongoVetement.marque);
    expect(result.collection).toBe('Printemps 2024');
    expect(result.prix).toEqual(baseMongoVetement.prix);
    expect(result.description).toBe('Une belle chemise');
    expect(result.statut).toBe(StatutVetementEnum.ACTIF);
    expect(result.dateCreation).toEqual(new Date('2024-01-01'));
  });

  it('cas avec champs optionnels absents : image, etat, marque, prix, description sont undefined', () => {
    const mongo = {
      _id,
      dressing  : { id: 'dressing1', libelle: 'Mon dressing' },
      libelle   : 'Pantalon',
      type      : { id: 'type2', libelle: 'Pantalon' },
      taille    : { id: 'taille2', libelle: 'L' },
      usages    : [],
      saisons   : [SaisonVetementEnum.HIVER],
      statut    : StatutVetementEnum.ACTIF,
    };
    const result = mongoModelToVetementModel(mongo);
    expect(result.image).toBeUndefined();
    expect(result.etat).toBeUndefined();
    expect(result.marque).toBeUndefined();
    expect(result.prix).toBeUndefined();
    expect(result.description).toBeUndefined();
  });

  it('statut ARCHIVE → StatutVetementEnum.ARCHIVE', () => {
    const mongo = { ...baseMongoVetement, statut: StatutVetementEnum.ARCHIVE };
    const result = mongoModelToVetementModel(mongo);
    expect(result.statut).toBe(StatutVetementEnum.ARCHIVE);
  });

  it('statut autre que ARCHIVE → StatutVetementEnum.ACTIF', () => {
    const mongo = { ...baseMongoVetement, statut: 'INCONNU' };
    const result = mongoModelToVetementModel(mongo);
    expect(result.statut).toBe(StatutVetementEnum.ACTIF);
  });

  it('statut undefined → StatutVetementEnum.ACTIF', () => {
    const mongo = { ...baseMongoVetement, statut: undefined };
    const result = mongoModelToVetementModel(mongo);
    expect(result.statut).toBe(StatutVetementEnum.ACTIF);
  });
});
