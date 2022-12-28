import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/header/Nav.css';
import logo from '../../assets/logo.png';

import axios from "axios";
import $ from 'jquery';

function Nav( session, ) {
  var navigate = useNavigate();

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
          <div className="header_main_inner3">
            {session.session ? 
            <>
              <Link to="/myprofile">마이페이지</Link> 
              <div 
                onClick={()=>{
                  axios({
                    url: '/api/logout/',
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      'Authorization' : localStorage.jwToken,
                    },
                  }).then((res)=>{
                    console.log(res);
                    localStorage.removeItem("jwToken");
                    document.location.href = "/pickit/";
                    // if (res.data.isSuccess) {
                    //   localStorage.removeItem("jwToken");
                    //   document.location.href = "/pickit/";
                    // }
                    // $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(res.data.data.length/20)/8));
                  })
                 .catch((err)=>{
                    console.log(err);
                    // setSession(false);
                  })
                }}>로그아웃
              </div> 
            </>
            : 
            <Link to="/signin">로그인</Link> }
          </div>
        </div>
      </div>
      <div id="header_login"></div>
      <div id="header_loginerror"></div>
    </>
  );
}

export default Nav;