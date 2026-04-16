import { ObjectId } from 'mongodb';
import {
  transformCategoriesVetementToMongoModel,
  transformMongoModelToParametrageModel,
  transformParametrageModelToMongoModel,
} from '../../src/models/params/paramGenericVetements.model';
import { CategorieDressingEnum, ParametragesVetementEnum, TypeTailleEnum } from '../../src/constants/AppEnum';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const makeId = () => new ObjectId();

// ─── transformCategoriesVetementToMongoModel ─────────────────────────────────
describe('transformCategoriesVetementToMongoModel', () => {

  it('cas nominal : retourne categories quand il est défini', () => {
    const categories = [CategorieDressingEnum.ADULTE, CategorieDressingEnum.ENFANT];
    const result = transformCategoriesVetementToMongoModel({ categories });
    expect(result).toEqual(categories);
  });

  it('cas legacy : retourne [categorie] quand categorie est une string', () => {
    const result = transformCategoriesVetementToMongoModel({ categorie: CategorieDressingEnum.BEBE });
    expect(result).toEqual([CategorieDressingEnum.BEBE]);
  });

  it('cas legacy : retourne le tableau tel quel quand categorie est déjà un tableau', () => {
    const cats = [CategorieDressingEnum.ADULTE];
    const result = transformCategoriesVetementToMongoModel({ categorie: cats });
    expect(result).toEqual(cats);
  });

  it('retourne undefined quand ni categories ni categorie ne sont définis', () => {
    const result = transformCategoriesVetementToMongoModel({});
    expect(result).toBeUndefined();
  });
});

// ─── transformMongoModelToParametrageModel ────────────────────────────────────
describe('transformMongoModelToParametrageModel', () => {
  const _id = makeId();
  const base = {
    _id,
    libelle: 'Mon libellé',
    categories: [CategorieDressingEnum.ADULTE],
    vetements: 5,
  };

  it('type TYPES : mappe id, libelle, categories, types depuis mongoObj.types', () => {
    const mongo = { ...base, types: [TypeTailleEnum.VETEMENTS] };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.TYPES, mongo);
    expect(result.id).toBe(_id.toString());
    expect(result.libelle).toBe('Mon libellé');
    expect(result.categories).toEqual([CategorieDressingEnum.ADULTE]);
    expect(result.types).toEqual([TypeTailleEnum.VETEMENTS]);
  });

  it('type TYPES : utilise [mongoObj.type] quand types est absent', () => {
    const mongo = { ...base, type: TypeTailleEnum.CHAUSSURES };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.TYPES, mongo);
    expect(result.types).toEqual([TypeTailleEnum.CHAUSSURES]);
  });

  it('type TAILLES : mappe id, libelle, categories, types et tri', () => {
    const mongo = { ...base, types: [TypeTailleEnum.CHAUSSETTES], tri: 3 };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.TAILLES, mongo);
    expect(result.types).toEqual([TypeTailleEnum.CHAUSSETTES]);
    expect(result.tri).toBe(3);
  });

  it('type TAILLES : utilise [mongoObj.type] quand types est absent', () => {
    const mongo = { ...base, type: TypeTailleEnum.CHAUSSURES, tri: 1 };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.TAILLES, mongo);
    expect(result.types).toEqual([TypeTailleEnum.CHAUSSURES]);
    expect(result.tri).toBe(1);
  });

  it('type MARQUES : mappe id, libelle, categories, types', () => {
    const mongo = { ...base, types: [TypeTailleEnum.VETEMENTS] };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.MARQUES, mongo);
    expect(result.types).toEqual([TypeTailleEnum.VETEMENTS]);
    expect(result.tri).toBeUndefined();
  });

  it('type ETATS : mappe id, libelle, categories, tri (pas de types)', () => {
    const mongo = { ...base, tri: 2 };
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.ETATS, mongo);
    expect(result.tri).toBe(2);
    expect(result.types).toBeUndefined();
  });

  it('type USAGES : mappe id, libelle, categories (pas de types ni tri)', () => {
    const result = transformMongoModelToParametrageModel(ParametragesVetementEnum.USAGES, base);
    expect(result.id).toBe(_id.toString());
    expect(result.libelle).toBe('Mon libellé');
    expect(result.types).toBeUndefined();
    expect(result.tri).toBeUndefined();
  });
});

// ─── transformParametrageModelToMongoModel ────────────────────────────────────
describe('transformParametrageModelToMongoModel', () => {
  const idStr = new ObjectId().toHexString();
  const base = {
    id: idStr,
    libelle: 'Test libellé',
    categories: [CategorieDressingEnum.ENFANT],
  };

  it('type TYPES : génère _id, libelle, categories, types', () => {
    const param = { ...base, types: [TypeTailleEnum.VETEMENTS] };
    const result = transformParametrageModelToMongoModel(ParametragesVetementEnum.TYPES, param);
    expect(result._id).toBeInstanceOf(ObjectId);
    expect(result.libelle).toBe('Test libellé');
    expect(result.categories).toEqual([CategorieDressingEnum.ENFANT]);
    expect(result.types).toEqual([TypeTailleEnum.VETEMENTS]);
    expect(result.tri).toBeUndefined();
  });

  it('type TAILLES : génère _id, libelle, categories, types, tri', () => {
    const param = { ...base, types: [TypeTailleEnum.CHAUSSURES], tri: 5 };
    const result = transformParametrageModelToMongoModel(ParametragesVetementEnum.TAILLES, param);
    expect(result.types).toEqual([TypeTailleEnum.CHAUSSURES]);
    expect(result.tri).toBe(5);
  });

  it('type MARQUES : génère _id, libelle, categories, types', () => {
    const param = { ...base, types: [TypeTailleEnum.CHAUSSETTES] };
    const result = transformParametrageModelToMongoModel(ParametragesVetementEnum.MARQUES, param);
    expect(result.types).toEqual([TypeTailleEnum.CHAUSSETTES]);
    expect(result.tri).toBeUndefined();
  });

  it('type ETATS : génère _id, libelle, categories, tri (sans types)', () => {
    const param = { ...base, tri: 7 };
    const result = transformParametrageModelToMongoModel(ParametragesVetementEnum.ETATS, param);
    expect(result.tri).toBe(7);
    expect(result.types).toBeUndefined();
  });

  it('type USAGES : génère _id, libelle, categories (sans types ni tri)', () => {
    const result = transformParametrageModelToMongoModel(ParametragesVetementEnum.USAGES, base);
    expect(result._id).toBeInstanceOf(ObjectId);
    expect(result.types).toBeUndefined();
    expect(result.tri).toBeUndefined();
  });
});
