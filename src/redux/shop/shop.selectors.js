import { createSelector } from 'reselect';


const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// vamos a crear el selector SelectCollection, el resultado será un array, para que pueda ser mapeado después en el componente collections-overview.
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => 
    Object.keys(collections).map(key => collections[key])
// la función Object.keys("objeto") te devuelve un array con todas las keys que hay dentro de ese objeto. ["hats","sneakers","jackets" ...]
// si este resultado, se mapea,y para cada key, se obtiene que collections hay, entonces el resultado de ese mapeo será un array, en el que cada elemento estará la collection de cada key del objeto collections original.
);

export const selectCollection = collectionUrlParam =>
createSelector(
  [selectCollections],
  collections => 
    collections[collectionUrlParam]
);

// al haber hecho el mapeo en COLLECTION_ID_MAP, se utiliza para hacer la condición en el find de todas las collections a filtrar.