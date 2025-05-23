
import React from 'react';
import './App.css';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/newnavbaar/Newnav';
import Maincomponent from './components/home/Maincomponent.jsx';
import Footer from './components/footer/footer.jsx';
import Sign_in from './components/signup_signin/Sign_in.jsx';
import SignUp from './components/signup_signin/SignUp.jsx';
import Cart from './components/cart/Cart.jsx';
import { Routes, Route } from "react-router-dom"
import Buynow from './components/buynow/Buynow.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import { useState,useEffect } from 'react';



function App() {

  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true)
    }, 2000)
  })

  return (
    <>
      {
        data ? (
          <>
            <Navbaar />
            <Newnav />
            <Routes>
              <Route path="/" element={<Maincomponent />} />
              <Route path="/login" element={<Sign_in />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/getproductsone/:id" element={<Cart />} />
              <Route path="/buynow" element={<Buynow />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <div className='circle'>
            <CircularProgress />
            <h2>Loading...</h2>
          </div>
        )

    }

    </>
  );
}

export default App;
