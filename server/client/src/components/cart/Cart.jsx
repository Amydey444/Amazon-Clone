import React, { useEffect } from 'react';
import "./cart.css";
import { CircularProgress, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { LoginContext } from '../context/ContextProvider';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";



const Cart = () => {

  const { id } = useParams();
  //console.log(id);

  const history=useNavigate("");

  const {account,setAccount}= useContext(LoginContext)

  const [inddata, setInddata] = useState("");
  console.log(inddata);

  const getinddata = async () => {
    const res = await fetch(`http://localhost:8005/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"

    });

    if (res.status === 401) {
      console.log("Unauthorized user");
      alert("Please login to view this product");
      return;
    }

    const data = await res.json();
    //console.log(data);

    if (res.ok) {
      setInddata(data);
    } else {
      console.log("Error fetching data");
    }
    
  }

  useEffect(() => {
    setTimeout(getinddata,1000)
  }, [id]);


  const addtocart=async(id)=>{
    const checkres=await fetch(`http://localhost:8005/addcart/${id}`,{
      method:"POST",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        inddata
      }),
      credentials:"include"
    });


    const data1=await checkres.json();
    console.log("frontend data",data1);

    if(checkres.status===401 || !data1){
      console.log("user invalid");
      alert("user invalid");
    }else{
      //alert("data added in your cart");
      history("/buynow")
      setAccount(data1)
    }
  }











  return (

    <div className='cart_section'>
      {inddata && Object.keys(inddata).length &&

        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.url} alt="cart_img" />
            <div className="cart_btn">
              <button className='cart_btn1' onClick={()=>addtocart(inddata.id)}>Add to Cart</button>
              <button className='cart_btn2'>Buy Now</button>

            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4>{inddata.title.longTitle}</h4>
            <Divider />
            <p className='mrp'>M.R.P:₹{inddata?.price?.mrp}</p>
            <p>Deal of the Day:<span style={{ color: "#B12704" }}>₹{inddata?.price?.cost}</span></p>
            <p>You save:<span style={{ color: "#B12704" }}>₹{inddata?.price?.mrp - inddata?.price?.cost} ({inddata?.price?.discount})</span></p>

            <div className="discount_box">
              <h5>Discount:<span style={{ color: "#111" }}>{inddata.discount}</span></h5>
              <h4>Free Delivery:<span style={{ color: "#111", fontWeight: 600 }}>Oct 8-21</span> Details</h4>
              <p>Fastest Delivery:<span style={{ color: "#111", fontWeight: 600 }}>Tomorrow 11AM</span></p>
            </div>
            <p className='description'>About the item:<span style={{ color: "#565959", fontsize: 14, fontWeight: 500, letterSpacing: "0.4px" }}>{inddata.description}</span></p>

          </div>
        </div>
      }
      
      {!inddata ? <div className='circle'>
        <CircularProgress />
        <h2>Loading...</h2>
      </div>:""}
    </div>
  )
}

export default Cart