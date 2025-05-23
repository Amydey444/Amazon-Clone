import React from 'react'
import "./footer.css"

const Footer = () => {

    const year=new Date().getFullYear();
    console.log(year);
  return (
    <footer>
        <div className="footer_container">
            <div className="footer_details_one">
                <h3>Get to Know Us</h3>
                <h3>About Us</h3>
                <h3>Careers</h3>
                <h3>Press Release</h3>
                <h3>Amazon cares</h3>
            </div>
            <div className="footer_details_one">
                <h3>Make Money with Us</h3>
                <h3>Facebook</h3>
                <h3>Twitter</h3>
                <h3>Instagram</h3>
            </div>
            <div className="footer_details_one">
                <h3>Make Money with Us</h3>
                <h3>Facebook</h3>
                <h3>Twitter</h3>
                <h3>Instagram</h3>
            </div>
        </div>
        <div className="lastdetails">
            <img src="./amazon_PNG25.png" alt="" />
            <p>Conditions of Use & Sale &nbsp; &nbsp; &nbsp;   Privacy Notice&nbsp; &nbsp; &nbsp;    Interest-Based Ads &nbsp; &nbsp; &nbsp;       1996-{year},Amazon.com,Inc.or its affiliates</p>
        </div>
      
    </footer>
  )
}

export default Footer
