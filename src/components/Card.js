import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ productId, imageUrl, productName, price }) => {
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <Link to={`/products/${productId}`}>
        <img className="hover:grow hover:shadow-lg object-fit" src={imageUrl} alt={productName}/>
        <div className="pt-3 flex items-center justify-between">
          <p className="">{productName}</p>
          <svg className="h-6 w-6 fill-current text-gray-500 hover:text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"></svg>
        </div>
        <p className="pt-1 text-md text-gray-900 font-semibold">{price}$</p>
        <h2>{productId}</h2>
      </Link>
    </div>
  );
};

export default Card;
