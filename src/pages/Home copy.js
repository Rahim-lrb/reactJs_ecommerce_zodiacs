import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Card from '../components/Card';
import Loader from '../components/Loader'
// import SearchForm from '../components/SearchForm';

export default function Home() {
  const [ displayedData, setDisplayedData ] = useState([]);
  const [ dataEnd, setDataEnd ] = useState(false)
  const [ offset, setOffset ] = useState(0);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ loading, setIsLoading ] = useState(false);
  const [ loadMoreLoading, setLoadMoreLoading] = useState(false); // New state

  const [ categoryId, setCategoryId ] = useState(null)

  // ! fetching categories
  const { data: categoriesData } = useFetch('https://api.escuelajs.co/api/v1/categories',{ method: 'GET' });

  const fetchData = async () => {
    setLoadMoreLoading(true);
    try {
      // ! fetching products based on the category id if it exists
      let apiUrl = `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=12`;
      // if (categoryId) {
      //   console.log(offset)
      //   apiUrl = `https://api.escuelajs.co/api/v1/products?categoryId=${categoryId}&offset=0&limit=12`;
      // }
      const response = await fetch(apiUrl);
      const newData = await response.json();

      if (response.status === 200) {
        setOffset(offset + 10);
        setDisplayedData((prevData) => [...prevData, ...newData]);
      }
      if (newData.length < 10) setDataEnd(true)
      console.log(dataEnd)
    } catch (err) {
      console.log(err);
    }
    setLoadMoreLoading(false);
  };

  useEffect(() => {
    setOffset(0)
    fetchData();
  }, [categoryId]);


  return (
    <div className="flex flex-col justify-center">
      <section className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0 md:items-center bg-cover bg-right" style={{ maxWidth: '1600px', height: '32rem', backgroundImage: "url('https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container mx-auto">
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-start px-6 tracking-wide">
            <h1 className="text-black text-2xl my-4">Stripy Zig Zag Jigsaw Pillow and Duvet Set</h1>
            <a className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black" href="*">products</a>
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
      {/* ! nav */}
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-5 py-3">
            <button className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">Store</button>
            <div className="flex items-center relative">
              <button onClick={() => setIsOpen(!isOpen)} className="pl-3 inline-block no-underline hover:text-black" ><svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"> <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" /></svg></button>
              {/* drop menu */}
              {isOpen && (
                <div className="absolute right-10 top-4 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                    <p onClick={() => {setIsOpen(false); setCategoryId(null)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">all</p>
                    {categoriesData.map((cat) => (
                    <p key={cat.id} onClick={() => {setIsOpen(false); setCategoryId(cat.id)}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">{cat.name}</p>
                  ))}
                </div>
              )}

              {/* search buttons */}
              {/* <SearchForm></SearchForm> */}
              <button className="relative pl-3 inline-block no-underline hover:text-black">
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" /></svg>
              </button>

            </div>
          </div>
        </nav>
        {/* products */}
        {loading ? (
          <div className="text-center py-20">
            <Loader />
          </div>
        ) : (
          <div>
            {/* products */}
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
              {displayedData.map((d) => (
                <Card productId={d.id} imageUrl={d.images[0]} productName={d.title} price={d.price} />
              ))}
            </div>

            {dataEnd ?
              (<p className='text-center text-md block font-semibold'>All data loaded</p>) : 
              (<button className='mx-auto text-md block font-semibold' onClick={fetchData}>
                  {loadMoreLoading ? <Loader></Loader> : 'Load more'}
              </button>)
            }
          </div>)}
      </section>
    </div>
  );
}
