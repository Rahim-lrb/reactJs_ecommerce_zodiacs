import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import useFetch from '../hooks/useFetch';
import toast, { Toaster } from 'react-hot-toast';



export default function Cart() {
  const { items, getTotalCost, deleteFromCart, clear, getProductQuantity } = useProductContext();
  const [filteredData, setFilteredData] = useState([]);
  const [cost, setCost] = useState([]);

  const { data, loading, error } = useFetch( `https://api.escuelajs.co/api/v1/products`, { method: 'GET' });

  const totalCost = items.reduce((acc, cartItem) => {
    return acc + cartItem.price * cartItem.quantity;
  }, 0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products`);
        const newData = await response.json();
        const result = newData.filter(obj => items.map(obj => Number(obj.id)).includes(obj.id));
        setFilteredData(result)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [items]);

  if (loading) {
    return (
      <div className="text-center py-20">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
      </div>
    </div>
    )
  }
  // console.log(items)
  const quantity = getProductQuantity(20)
  console.log("the is: "+quantity)
  return (
    <div className='my-10'>
      <h2 className='text-center text-xl font-bold'>Your Cart</h2>
      {filteredData.length === 0 ? (
        <p className='text-2xl font-semibold text-center my-40'>Your cart is empty</p>
      ) : (
        <div className='w-full text-center'>
          <ul>
            {filteredData.map((item) => (
              <div key={item.id} className='mx-20 mt-8 flex items-center gap-x-8 pb-20'>
                <div className='w-1/4'>
                  {item.images && item.images.length > 0 && ( <div> <img className='w-[500px]' src={item.images[0]} alt='dam' /></div>)}
                </div>
                  
                <div className='w-1/2'>
                  {item.title && <h2 className='text-2xl font-semibold mb-10'>{item.title}</h2>}
                  <h3 className='font-semibold text-xl mr-32 '>{item.price}$</h3>

                </div>
              <button onClick={() => { deleteFromCart(item.id); toast("removed successfully"); }} className={`w-60 h-10 text-white font-bold capitalize cursor-pointer duration-150 bg-red-600 hover:bg-red-500`}>Remove from Cart</button>
              </div>
            ))}
          </ul>
            <p className='text-center text-md text-gray-500 font-semibold my-6'>your total price is <span className='font-bold text-black'>{totalCost} $</span></p>
            <div className='space-x-10'>
              <button onClick={() => {toast("thank you for purchasing 😊")} } className={`w-60 h-10 text-white font-bold capitalize cursor-pointer duration-150 bg-sky-600 hover:bg-sky-500 rounded-md`}>purchase</button>
              <button onClick={() => {toast("the cart is cleared"); clear() } } className={`w-60 h-10 text-white font-bold capitalize cursor-pointer duration-150 bg-red-600 hover:bg-red-500 rounded-md`}>clear</button>
              <Toaster />
            </div>
        </div>
      )}
    </div>
  );
}
