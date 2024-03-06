import React  from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Error from './pages/Error'
import ProductId from './pages/ProductId'
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import About from './pages/About'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/products/:productId" element={<ProductId/>}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
