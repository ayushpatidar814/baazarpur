import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext.jsx'
import { assets } from '../assets/assets.js';
import Title from '../components/Title.jsx';
import ProductItem from '../components/ProductItem.jsx'

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const[showFilter, setShowFilter] = useState(true);
  const[filterProducts, setFilterProducts] = useState([]);
  const[category, setCategory] = useState([]);
  const[subCategory, setSubCategory] = useState([]);
  const[sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {  

    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {

    if(subCategory.includes(e.target.value)){
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if(showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    
    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    if(sortType === 'low-high'){
      productsCopy = productsCopy.sort((a, b) => a.price - b.price);
    } else if(sortType === 'high-low'){
      productsCopy = productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy)
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, sortType, search, showSearch, products])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
        
        {/* Filter Options */}
        <div className="min-w-60">
          <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
            <img src={assets.dropdown_icon} alt="dropdown icon" className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
          </p>
 
          {/* Category Filter */} 
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" checked={category.includes("Men")} value={'Men'} className="w-3" onChange={toggleCategory} />Men
              </p>
              
              <p className="flex gap-2">
                <input type="checkbox" checked={category.includes("Women")} value={'Women'} className="w-3" onChange={toggleCategory} />Women
              </p>
              
              <p className="flex gap-2">
                <input type="checkbox" checked={category.includes("Kids")} value={'Kids'} className="w-3" onChange={toggleCategory} />Kids
              </p>

            </div>
          </div>

          {/* SubCategory Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 my-5 ${showFilter ? '' : 'hidden'}`}>
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input type="checkbox" value={'Topwear'} checked={subCategory.includes("Topwear")} className="w-3" onChange={toggleSubCategory} />Topwear
              </p>
              
              <p className="flex gap-2">
                <input type="checkbox" value={'Bottomwear'} checked={subCategory.includes("Bottomwear")} className="w-3" onChange={toggleSubCategory} />Bottomwear
              </p>
              
              <p className="flex gap-2">
                <input type="checkbox" value={'Winterwear'} checked={subCategory.includes("Winterwear")} className="w-3" onChange={toggleSubCategory} />Winterwear
              </p>

            </div>
          </div>
          <div className={`pl-3 ${showFilter ? '' : 'hidden'}`}>
            <button onClick={() => {setCategory([]); setSubCategory([]); setSortType("relevant")}} className="mt-3 text-sm text-blue-600 hover:cursor-pointer" >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'} />
            {/* Product Sort */}
            <select onChange={(e) => setSortType(e.target.value)} value={sortType} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price- Low to High</option>
              <option value="high-low">Sort by: Price- High to Low</option>
            </select>
          </div>

          {/* Map Products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {filterProducts.length === 0 && (
               <p className="text-gray-500 mt-10">No products match your filters.</p>
            )}
            {
              filterProducts.map((item, key) => (
                  <ProductItem key={key} id={item._id} name={item.name} image={item.image} price={item.price} />
              ))
            }
          </div>
        </div>
    </div>
  )
}

export default Collection
