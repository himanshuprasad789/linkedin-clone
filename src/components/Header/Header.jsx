import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter"
import ChatBubbleIcon from "@mui/icons-material/ChatBubble"
import NotificationIcon from "@mui/icons-material/Notifications"
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {  signOut } from "firebase/auth";
import './Header.scss'
import Tooltip from '@mui/material/Tooltip';
import HeaderOption from "./HeaderOption/HeaderOption"
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/user/userSlice";
import { auth } from "../../firebase/firebase";
import { Avatar } from "@mui/material";
const Header = () => {
  const user=useSelector(selectUser)
  const dispatch =useDispatch()
  function logOutofApp(){
    if(!user) return
    dispatch(logout())
    signOut(auth).then(()=>{
      alert('logged out')
    }).catch((err)=>{
      alert(err)
    })
  }
  return (
    <div className="header">
      <div className="header__left">
        {/* <img src='' alt='logo'/> */}
        <div className="header__icon">
          <LinkedInIcon fontSize="large" color="primary" />
        </div>
        <div className="header__search">
          <SearchIcon fontSize="small"/>
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title='home'/>
        <HeaderOption Icon={SupervisorAccountIcon} title='my network'/>
        <HeaderOption Icon={BusinessCenterIcon} title='my network'/>
        <HeaderOption Icon={ChatBubbleIcon} title='chat' />
        <HeaderOption Icon={NotificationIcon} title='notification'/>
        <Tooltip title={user?'logout':'login or register'} arrow>
          <Avatar fontSize='small' onClick={logOutofApp} style={{display: 'flex', alignSelf:'center',cursor:'pointer',width:'30px',height:'30px' ,background:'#1976D2'}}>{user?.name?user.name[0]:null}</Avatar>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
