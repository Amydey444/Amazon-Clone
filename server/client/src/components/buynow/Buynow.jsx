import React, { useState } from 'react'
import "./buynow.css";
import { Divider } from '@mui/material';
import Option from './Option';
import Subtotal from './Subtotal';
import Right from './Right';
import { useEffect } from 'react'

const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    //console.log(cartdata.carts)

    const getdatabuy = async () => {
       try {
        const res = await fetch("http://localhost:8005/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!res.ok) {
            console.log("Fetch error:", res.status);
            return;
        }


        const data = await res.json();

        if (!data || !data.carts) {
            console.log("Invalid data format");
            return;
        }

        setCartdata(data.carts);
    } catch (error) {
        console.log("Error parsing JSON:", error.message);
    }


};

useEffect(() => {
    getdatabuy();

}, []);

return (
    <>
        {cartdata && cartdata.length ? (
            <div className='buynow_section'>
                <div className='buynow_container'>
                    <div className='left_buy'>
                        <h1>Shopping Cart</h1>
                        <p>Select all items</p>
                        <span className='leftbuyprice'>Price</span>
                        <Divider />
                        {
                            cartdata.map((e, k) => {
                                return (
                                    <>
                                        <div className="item_container">
                                            <img
                                                src={e.url}
                                                alt=""
                                            />
                                            <div className='item_details'>
                                                <h3>{e.title.longTitle}</h3>
                                                <h3>{e.shortTitle}</h3>
                                                <h3 className='differentplace'>₹{e.price.cost}</h3>
                                                <p className='unusuall'>Usually dispatched in 8 days</p>
                                                <p>Eligible for FREE Shipping</p>
                                                <img
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfr22u36GCzusfT5seK6LXmRcdEpCWG8dXA&s"
                                                    alt=""
                                                />
                                                <Option deletedata={e.id} get={getdatabuy}/>
                                            </div>
                                            <h3 className='item_price'>₹{e.price.cost}</h3>
                                        </div>
                                        <Divider />
                                    </>
                                )

                            })
                        }



                        
                        <Subtotal item={cartdata}/>
                    </div>
                    <Right  item={cartdata}/>
                </div>
            </div>
        ) : null}

    </>
);



};

export default Buynow
