import { createSelector } from 'reselect';
// como la información que aparece en la url son strings hats, sneakers, etc, y la información en el state son números de id, se hace este mapeo.
const COLLECTION_ID_MAP = {
  hats:1,
  sneakers:2,
  jackets:3,
  women:4,
  men:5
}

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollection = collectionUrlParam =>
createSelector(
  [selectCollections],
  collections => collections.find(collection => 
    collection.id === COLLECTION_ID_MAP[collectionUrlParam])
);

// al haber hecho el mapeo en COLLECTION_ID_MAP, se utiliza para hacer la condición en el find de todas las collections a filtrar.