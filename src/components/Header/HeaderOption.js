import { Avatar } from "@material-ui/core";
import React from "react";
import "./HeaderOption.css";

export default function HeaderOption({ avatar, Icon, title, onClick }) {
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && (
        <Avatar src="https://static.hollywoodreporter.com/sites/default/files/2019/03/avatar-publicity_still-h_2019-compressed.jpg"></Avatar>
      )}
      <span className="headerOption__title">{title}</span>
    </div>
  );
}
