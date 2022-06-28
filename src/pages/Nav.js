import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../pages_css/Nav.css';
import logo from '../logo.png';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function Nav() {
  var navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
    }
    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response) => {
      // const element = document.getElementById('header_signinUsers')
      // element.innerHTML = SigninUserF(response.data.message)
      $('#header_login').val(response.data.data.userId)
      $('#header_loginerror').val('')
    }).catch(() => {
        localStorage.removeItem('token')
      }
    );

  }, []);

  return (
    <>
      <div className="header_main">
        <div id="header_main_logo" className="header_main_inner">
          <div className="header_main_inner2"><Link to="/"><img id="logo" name="logo" src={logo} /></Link></div>
          <div className="header_main_inner3"><Link to="/lectures">강의평</Link></div>
          <div className="header_main_inner3"><Link to="/studies">스터디</Link></div>
          <div className="header_main_inner3"><Link to="/roadmaps">로드맵</Link></div>
        </div>
        <div id="header_main_center2" className="header_main_inner"></div>
        <div id="header_main_login" className="header_main_inner">
          {/* <div id='header_signinUsers' className="header_main_inner3" dangerouslySetInnerHTML={{ __html: signin }}></div> */}
          <div className="header_main_inner3">{ (localStorage.getItem('token') == null || $('#header_loginerror').val() == '401') ? <Link to="/signin">로그인</Link> : <Link to="/myprofile">마이페이지</Link> }</div>
        </div>
      </div>
      <div id="header_login"></div>
      <div id="header_loginerror"></div>
    </>
  );
}

export default Nav;