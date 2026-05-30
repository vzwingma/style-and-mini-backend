import { jest } from '@jest/globals';
import { ParametragesVetementEnum } from '../../src/constants/AppEnum.js';
import { MONGO_DB_COLLECTIONS } from '../../src/constants/AppConstants.js';

// ─── Mocks ────────────────────────────────────────────────────────────────────
// On utilise des factories pour éviter l'instanciation de MongoClient au chargement du module
const mockLoadParametrages = jest.fn();

jest.unstable_mockModule('../../src/services/mongodb.service.js', () => ({
  connectToDatabase  : jest.fn(),
  findInCollections  : jest.fn(),
  findInCollection   : jest.fn(),
  countInCollection  : jest.fn(),
  save               : jest.fn(),
  update             : jest.fn(),
  deleteInMongo      : jest.fn(),
}));
jest.unstable_mockModule('../../src/services/params.service.js', () => ({
  loadParametrages: mockLoadParametrages,
}));

const { getParametresVetements: mockedGetParametresVetements } = await import('../../src/controllers/params.controller.js');

// ─── getParametresVetements ───────────────────────────────────────────────────
describe('getParametresVetements', () => {

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadParametrages.mockResolvedValue([]);
  });

  it('type TYPES : appelle loadParametrages avec la collection PARAM_TYPES_VETEMENTS', async () => {
    await mockedGetParametresVetements(ParametragesVetementEnum.TYPES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_TYPES_VETEMENTS,
      ParametragesVetementEnum.TYPES,
    );
  });

  it('type TAILLES : appelle loadParametrages avec la collection PARAM_TAILLES_MESURES', async () => {
    await mockedGetParametresVetements(ParametragesVetementEnum.TAILLES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_TAILLES_MESURES,
      ParametragesVetementEnum.TAILLES,
    );
  });

  it('type USAGES : appelle loadParametrages avec la collection PARAM_USAGES_VETEMENTS', async () => {
    await mockedGetParametresVetements(ParametragesVetementEnum.USAGES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_USAGES_VETEMENTS,
      ParametragesVetementEnum.USAGES,
    );
  });

  it('type ETATS : appelle loadParametrages avec la collection PARAM_ETATS_VETEMENTS', async () => {
    await mockedGetParametresVetements(ParametragesVetementEnum.ETATS);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_ETATS_VETEMENTS,
      ParametragesVetementEnum.ETATS,
    );
  });

  it('type MARQUES : appelle loadParametrages avec la collection PARAM_MARQUES_VETEMENTS', async () => {
    await mockedGetParametresVetements(ParametragesVetementEnum.MARQUES);
    expect(mockLoadParametrages).toHaveBeenCalledWith(
      MONGO_DB_COLLECTIONS.PARAM_MARQUES_VETEMENTS,
      ParametragesVetementEnum.MARQUES,
    );
  });

  it('type invalide (DRESSING) : throw une Error "Type de paramètre inconnu"', () => {
    expect(() => mockedGetParametresVetements(ParametragesVetementEnum.DRESSING))
      .toThrow('Type de paramètre inconnu');
  });

  it('retourne un tableau vide quand loadParametrages renvoie []', async () => {
    mockLoadParametrages.mockResolvedValue([]);
    const result = await mockedGetParametresVetements(ParametragesVetementEnum.TYPES);
    expect(result).toEqual([]);
  });
});
