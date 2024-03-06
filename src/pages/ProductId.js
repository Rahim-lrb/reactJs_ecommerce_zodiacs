import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import toast, { Toaster } from 'react-hot-toast';
import { useProductContext } from '../context/ProductContext';

export default function PostId() {
  const { productId } = useParams();
  const [number, setNumber] = useState(1);

  const { items: cartItems, addOneToCart, removeOneFromCart, getProductQuantity, getTotalCost  } = useProductContext();

  
  const quantity = getProductQuantity(productId)
  console.log(quantity)

  const { data, loading, error } = useFetch(
    `https://api.escuelajs.co/api/v1/products/${productId}`,
    { method: 'GET' }
  );


  if (loading) return (
    <div className="text-center py-20">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className='mx-20 mt-8 flex items-center gap-x-8 pb-20'>
        <div className='w-1/2'>
          <div className=''><img className='w-[500px]' src={data.images[0]} alt='dam' /></div>
        </div>

        <div className='w-1/2'>
          <h2 className='text-3xl font-semibold mb-10'>{data.title}</h2>
          <p className=' text-sm text-gray-600 mb-8 font-normal leading-5'>{data.description}</p>
          <h3 className='font-semibold text-2xl mr-32 '>{data.price}$</h3>

          <div className='flex space-x-4 items-center justify-end mt-6'>

            {quantity > 0 && (
              <div className='w-32 h-10 flex justify-between items-center border-2 border-gray-500 select-none'>
                <span className='text-3xl cursor-pointer active:bg-sky-200 duration-150 w-1/3 h-full p-auto text-center' onClick={() => {removeOneFromCart(productId)}}>-</span>
                <span className='text-md'>{quantity}</span>
                <span className='text-3xl cursor-pointer active:bg-sky-200 duration-150 w-1/3 h-full p-auto text-center' onClick={() => {addOneToCart(productId)}}>+</span>
              </div>
            )}
            

            {quantity > 0 ? (
              <button onClick={() => { removeOneFromCart(productId); toast("removed successfully")  }} className={`w-60 h-10 text-white font-bold capitalize cursor-pointer duration-150 bg-red-600 hover:bg-red-500`}>Remove from Cart</button>
            ) : (
              <button onClick={() => {addOneToCart(productId, data.price); toast("added successfully")} } className={`w-60 h-10 text-white font-bold capitalize cursor-pointer duration-150 bg-sky-600 hover:bg-sky-500`}>Add to Cart</button>)}
            <Toaster />
          </div>
        </div>
      </div>
    </div>
  );
}
