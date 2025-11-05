import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);

  const[productData, setProductData] = useState(false);
  const[image, setImage] = useState('');
  const[size, setSize] = useState('');

  const fetchProductData = async () => {
      products.map((item) => {
        if(item._id === productId){
          setProductData(item)
          setImage(item.image[0])
          return null;
        }
      })
  }

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* ----------- Product Data ----------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* ----------- Product Images ----------- */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, key) => (
                <img onClick={() => setImage(item)} key={key} src={item} alt="product image" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="image" className='w-full h-auto' />
          </div>
      </div>

      {/* ----------- Product Info ----------- */}
      <div className="flex-1">
        <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
        <div className="flex items-center gap-1 mt-2">
          <img src={assets.star_icon} alt="Star Icon" className="w-3 5" />
          <img src={assets.star_icon} alt="Star Icon" className="w-3 5" />
          <img src={assets.star_icon} alt="Star Icon" className="w-3 5" />
          <img src={assets.star_icon} alt="Star Icon" className="w-3 5" />
          <img src={assets.star_dull_icon} alt="Star Icon" className="w-3  5" />
          <p className="pl-2">{122}</p>
        </div>
        <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
        <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
        <div className="flex flex-col gap-4 my-8">
          <p>Select Size:</p>
          <div className="flex gap-2">
            {
              productData.sizes.map((item, key) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={key} >{item}</button>
              ))
            }
          </div>
        </div>
        <button onClick={() => addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
        <hr className="mt-8 sm:w-4/5" />
        <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
        </div>
      </div>
    </div>
    
    {/* ----------- Description & Review Section ----------- */}
    <div className='mt-20'>
      <div className="flex">
            <b className="border px-5 py-3 text-sm">Description</b>
            <p className="border px-5 py-3 text-sm">Reviews (122)</p>
      </div>
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia reprehenderit commodi officiis similique, dolor sit amet consectetur adipisicing elit. Quis perspiciatis placeat a nobis voluptates repellendus, reprehenderit iusto asperiores quam, ex mollitia. Itaque qui quis provident debitis animi quas consectetur, exercitationem sint iste ipsam rerum numquam, vero adipisci commodi ducimus ullam non in tempore atque fuga alias ad! Atque, rerum non.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae, suscipit cupiditate, voluptate obcaecati accusamus molestias at, unde ab quae aperiam eum! Quasi expedita autem fugiat saepe cupiditate, delectus harum. Necessitatibus mollitia eveniet nihil repellat cumque!</p>
      </div>
    </div>

    {/* ----------- Display related products ----------- */}
    <RelatedProducts category={productData.category} subCategory={productData.subCategory} productId={productData._id} />
    
    </div>
  ) : <div className='opacity-0'>

  </div>
}

export default Product
