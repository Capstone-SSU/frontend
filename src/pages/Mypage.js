import React from "react";
import { Link } from "react-router-dom";
import '../pages_css/Mypage.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

const Mypage = () => {
  axios.get('http://54.180.150.167:8080/temp-login-success', {
  }, localStorage.getItem('token')).then((response) => {
    $('#header_login').val(response.data.data.userId)
  }).catch();
  return (
    <div className="body_main" style={{ width: '15%', }}>
      {/* <div style={{ width: '10px', height: '80px', }}></div> */}
      <div className="left_menu_box">
        <p className="bigMenu">프로필</p>
        <Link to="/myprofile"><p id="myprofile" className="smallMenu">정보수정</p></Link>
        <Link to="/mycompany"><p id="mycompany" className="smallMenu">소속인증</p></Link>

        <p className="bigMenu">좋아요</p>
        <Link to="/mylikereviews"><p id="mylikereviews" className="smallMenu">강의</p></Link>
        <Link to="/mylikestudies"><p id="mylikestudies" className="smallMenu">스터디</p></Link>
        <Link to="/mylikeroadmaps"><p id="mylikeroadmaps" className="smallMenu">로드맵</p></Link>

        <p className="bigMenu">작성한</p>
        <Link to="/mywritereviews"><p id="mywritereviews" className="smallMenu">강의</p></Link>
        <Link to="/mywritestudies"><p id="mywritestudies" className="smallMenu">스터디</p></Link>
        <Link to="/mywriteroadmaps"><p id="mywriteroadmaps" className="smallMenu">로드맵</p></Link>
      
        <p className="bigMenu">강의</p>
        <Link to="/mywritelectures"><p id="mywriterlectures" className="smallMenu">강의요청내역</p></Link>
      </div>
      <div className="right_content_box">
      </div>
      {/* <div id="header_login"></div> */}
    </div>

  );
}

export default Mypage;