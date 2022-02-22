import React from "react";
import { Link } from "react-router-dom";
import '../pages_css/Nav.css';
import logo from '../logo.png';

var login = true

function Nav() {
  return (
    <>
        <div className="header_main">
          <div id="header_main_logo" className="header_main_inner">
            <div className="header_main_inner2"><Link to="/"><img id="logo" name="logo" src={logo}/></Link></div>
            <div className="header_main_inner3"><Link to="/lecture">강의평</Link></div>
            <div className="header_main_inner3"><Link to="/study">스터디</Link></div>
            <div className="header_main_inner3"><Link to="/loadmap">로드맵</Link></div>
          </div>
          <div id="header_main_center2" className="header_main_inner"></div>
          <div id="header_main_login" className="header_main_inner">
            <div className="header_main_inner3">{login ? <Link to="/login">로그인</Link> : <Link to="/mypage">마이페이지</Link>}</div>
          </div>
        </div>
    </>
  );
}

export default Nav;