import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from  'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors.js';

import CollectionPreview from '../collection-preview/collection-preview.component';

const CollectionsOverview = ({ collections }) => (
 <div>
   {collections.map(({id , ...otherCollectionsProps})=>(
     <CollectionPreview key={id} {...otherCollectionsProps} />
   ))}	
 </div>
);

const mapStateToProps = createStructuredSelector({
	collections:selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview);
