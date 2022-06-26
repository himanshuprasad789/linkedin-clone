import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";
import "./Sidebar.scss";
const Sidebar = () => {
  const user=useSelector(selectUser)
  const RecentItem = topic => {
    return (
      <div className="sidebar__recentItem">
        <span>#</span> <p>{topic}</p>
      </div>
    );
  };
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://source.unsplash.com/87PP9Zd7MNo/1600x900"
          alt="background"
          className="sidebar__image"
        />
        {/* <div className="sidebar__image"></div> */}
        <Avatar src={user.photoUrl} className="sidebar__avatar">{user.name[0]??user.email[0]}</Avatar>
        <h2>{user.name}</h2>
        <h4>{user.email}</h4>
      </div>
      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__stat--number">2432</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__stat--number">2448</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p>Recent</p>
        {RecentItem("reactjs")}
        {RecentItem("design")}
        {RecentItem("elonbuystwitter")}
        {RecentItem("javascriptprogramming")}
        {RecentItem("linkedin")}
      </div>
    </div>
  );
};

export default Sidebar;
