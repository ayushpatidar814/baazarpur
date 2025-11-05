import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({category, subCategory, productId }) => {

    const { products } = useContext(ShopContext);
    const[related, setRelated] = useState([]);

    useEffect(() => {
        if(products && products.length > 0 ){
            let filtered = [];
            
            if(category && subCategory){
                filtered = products.filter((item) => item.category === category && item.subCategory === subCategory && item._id !== productId)
            }

            if(filtered.length === 0 && category) {
                filtered = products.filter((item) => item.category === category && item._id !== productId)
            }

            if(filtered.length === 0) {
                filtered = products.filter((item) => item._id !== productId)
            }

            const start = Math.floor(Math.random() * Math.max(filtered.length - 4, 1))
            setRelated(filtered.slice(start, start + 5))
        }
    }, [products, category, subCategory, productId])

  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item, key) => (
                    <ProductItem key={key} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProducts
