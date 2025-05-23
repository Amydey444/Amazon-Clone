import { React, useContext, useEffect } from 'react'
import "./navbaar.css";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from '../context/ContextProvider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import {useSelector} from "react-redux"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';




const Navbaar = () => {

  const { account, setAccount } = useContext(LoginContext);
  //console.log(account);

  const history=useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [text,setText]=useState("");
  const[liopen,setLiopen]=useState(true);

  const {products}=useSelector(state=>state.getproductsdata);

  const [dropen, setDropen] = useState(false)

  const getdetailvaliduser = async () => {
    const res = await fetch("http://localhost:8005/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
  
    const data = await res.json();
  
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };
  

  const handleopen = () => {
    setDropen(true)
  }

  const handledrclose = () => {
    setDropen(false)
  }

  const logoutuser = async () => {
    const res2 = await fetch("http://localhost:8005/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"

    });

    const data2 = await res2.json();
    //console.log(data);

    if (res2.status !== 201) {
      console.log("error");

    } else {
      console.log("data valid log");
      //alert("logout")
      toast.success("user logout", { position: "top-center" });
      history("/");
      setAccount(false);
      
    }
  };

  const getText=(items)=>{
    setText(items)
    setLiopen(false)

  }

  useEffect(() => {
    getdetailvaliduser()
  }, [])




  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className='hamburger' onClick={handleopen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={dropen} onClose={handledrclose}>
            <Rightheader Logclose={handledrclose} Logoutuser={logoutuser}/>

          </Drawer>
          <div className="navlogo">
            <NavLink to="/"><img src="./amazon_PNG25.png" alt="" /></NavLink>
          </div>
          <div className="nav_searchbaar">
            <input type="text" name="" 
            onChange={(e)=>getText(e.target.value)}
            placeholder='Search your products'id="" />
            <div className="search_icon">
              <SearchIcon id="search" />

            </div>

            {/* search filter */}

            {
              text &&
              <List className='extrasearch' hidden={liopen}>
                {
                  products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(products=>(
                    <ListItem>
                      <NavLink to={`/getproductsone/${products.id}` }onClick={()=>setLiopen(true)}>
                      {products.title.longTitle}

                      </NavLink>
                      
                    </ListItem>

                  ))
                    

                }

              </List>
            }
          </div>

        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signin</NavLink>
          </div>
          <div className="cart_btn">

            {
              account ? <NavLink to="/buynow">
                <Badge badgeContent={account?.carts?.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>

              </NavLink> : <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            }

            <ToastContainer />


            <p>Cart</p>

          </div>
          {
            account ? (
              <Avatar className='avtar2' id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar>
            ) : (
              <Avatar className='avtar' id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}></Avatar>
            )
          }

          
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            {
              account ? <MenuItem onClick={() => { handleClose(); logoutuser(); }}><LogoutIcon style={{ fonstSize:16,marginRight: "3" }}/>Logout</MenuItem>:""
            }
            
          </Menu>





        </div>
      </nav>
    </header>
  )
}

export default Navbaar