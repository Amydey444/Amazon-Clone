import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: ""
  });

  const adddata = (e) => {
    const { name, value } = e.target;

    setUdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;

    const res = await fetch("http://localhost:8005/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ fname, email, mobile, password, cpassword })
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      toast.warn("Invalid details", { position: "top-center" });
    } else {
      toast.success("Data successfully added", { position: "top-center" });
      setUdata({ fname: "", email: "", mobile: "", password: "", cpassword: "" });
    }
  };

  return (
    <section>
      <div className='sign_container'>
        <div className="sign_header">
          <img src="./blacklogoamazon.png" alt="amazonlogo" />
        </div>
        <div className="sign_form">
          <form method='POST'>
            <h1>Sign-Up</h1>
            <div className="form_data">
              <label htmlFor="fname">Your Name</label>
              <input type="text" onChange={adddata} value={udata.fname} name="fname" id="fname" />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input type="text" onChange={adddata} value={udata.email} name="email" id="email" />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile Number</label>
              <input type="text" onChange={adddata} value={udata.mobile} name="mobile" id="mobile" />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input type="password" onChange={adddata} value={udata.password} name="password" placeholder='At least 6 char' id="password" />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input type="text" onChange={adddata} value={udata.cpassword} name="cpassword" id="cpassword" />
            </div>
            <button className='signin_btn' onClick={senddata}>Continue</button>
            <div className='signin_info'>
              <p>Already have an account</p>
              <NavLink to="/login">SignIn</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUp;
