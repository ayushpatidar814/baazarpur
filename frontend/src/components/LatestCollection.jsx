import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext.jsx'
import Title from './Title.jsx';
import ProductItem from './ProductItem.jsx';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const[latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
    }, [products])
        
  return (
    <div className='my-10'>
        <div className="text-center py-8 text-3xl">
            <Title text1={'LATEST'} text2={'COLLECTIONS'} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
                Step into the season with our latest arrivals — where trend meets comfort. Explore fresh styles, vibrant colors, and premium-quality outfits designed to elevate your everyday look. Stay ahead of fashion with Baazarpur's handpicked new collection, crafted for every mood and moment.
            </p>
        </div>

        {/* Rendering products */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                latestProducts.map((item, key) => (
                    <ProductItem key={key} id={item._id} image={item.image} name={item.name} price={item.price} />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection
