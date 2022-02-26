import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import '../pages_css/Nav.css';
import logo from '../logo.png';
import axios from "axios";

var login = !(localStorage.getItem('token'))
console.log(login)

function Nav() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log(localStorage.getItem('token'))
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
    }
    axios.get('http://13.125.135.209:8080/temp-login-success', {
    }).then((response) => {});
  });
  return (
    <>
        <div className="header_main">
          <div id="header_main_logo" className="header_main_inner">
            <div className="header_main_inner2"><Link to="/"><img id="logo" name="logo" src={logo}/></Link></div>
            <div className="header_main_inner3"><Link to="/lectures">강의평</Link></div>
            <div className="header_main_inner3"><Link to="/studies">스터디</Link></div>
            <div className="header_main_inner3"><Link to="/roadmaps">로드맵</Link></div>
          </div>
          <div id="header_main_center2" className="header_main_inner"></div>
          <div id="header_main_login" className="header_main_inner">
            <div className="header_main_inner3">{login ? <Link to="/signin">로그인</Link> : <Link to="/users">마이페이지</Link> }</div>
          </div>
        </div>
    </>
  );
}

export default Nav;