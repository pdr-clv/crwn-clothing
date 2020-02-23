import React from 'react';

import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';


import { DirectoryMenu} from './directory.styles'

// aquí necesitamos guardar en state el valor de los items que se le pasará al menu-item. 
// hay que crear una clase.
/* Forma primitiva, antes de incluir en el state/store y en el rooot-reducer los sections
class Directory extends React.Component{
  constructor() {
		super();

		this.state ={
			sections:[
				{
					title: 'hats',
					imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
					id: 1,
					linkUrl: 'shop/hats'
				},
				{
					title: 'jackets',
					imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
					id: 2,
					linkUrl: 'shop/jackets'
				},
				{
					title: 'sneakers',
					imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
					id: 3,
					linkUrl: 'shop/sneakers'
				},
				{
					title: 'women',
					imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
					size: 'large',
					id: 4,
					linkUrl: 'shop/womens',
				},
				{
					title: 'men',
					imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
					size: 'large',
					id: 5,
					linkUrl: 'shop/mens',
				}
			]
		}
	}

	render() {
		return (
			<div className='directory-menu'>
			{this.state.sections.map(({title,imageUrl,id,size})=>(
				<MenuItem key = {id} title={title} imageUrl={imageUrl} size={size}/>
			))}
			</div>
		)
	}
}*/

const Directory = ({sections}) => (
	<DirectoryMenu>
	{sections.map(({id, ...otherProps})=>(
		<MenuItem key = {id} {...otherProps}/>
	))}
	</DirectoryMenu>
);
  
const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections
});


export default connect(mapStateToProps)(Directory);