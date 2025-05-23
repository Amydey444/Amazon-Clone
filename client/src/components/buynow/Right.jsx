import React,{useState} from 'react';
import { useEffect } from 'react';

const Right = ({item}) => {
    const [price,setPrice]=useState(0);

    useEffect(()=>{
        totalAmount();
      },[item])
    
      const totalAmount=()=>{
        let price=0;
        item.map((item)=>{
          price += item.price.cost
        });
        setPrice(price)
      }

    return <div className='right_buy'>
        <img src=""></img>
        <div className='cost_right'>
            <p>Your order is eligible for FREE Delivery</p><br />
            <span style={{ color: "#565959" }}>Select this option at checkout.Details</span>
            <h3>Subtotal ({item.length} items):<span style={{fontWeight:700}}>₹{price}.00</span></h3>
            <button className='rightbuy_btn'>Process to Buy</button>
            <div className="emi">
                EMI Available
            </div>
        </div>

    </div>

}

export default Right
