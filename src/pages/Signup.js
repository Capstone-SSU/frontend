import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../pages_css/Signup.css';
import logo from '../logo.png';
import githubLogo from '../githubLogo.png';
import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const Signup = () => {
  return (
    <div style={{ width:'100%', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
    <div>
      <img src={logo} id="signup_logo"></img>
      <div>
      <div className='signup_emailPassword'>
        <div>이메일 주소</div>
        <input type='text' id="signup_email" placeholder='abc123@abc123.com'/><button className="button">중복확인</button>
      </div>
      <div className='signup_emailPassword'>
        <div>비밀번호</div>
        <input type='text' id="signup_password"/>
      </div>
      <div className='signup_emailPassword'>
        <div>비밀번호 재확인</div>
        <input type='text' id="signup_passwordRepeat"/>
      </div>
      <div className='signup_emailPassword'>
        <div>이름</div>
        <input type='text' id="signup_name"/>
      </div>
      <div className='signup_emailPassword'>
        <div>닉네임</div>
        <input type='text' id="signup_nickname"/><button className="button">중복확인</button>
      </div>
      <button type="submit" id="signup_login" className="button" onClick={() => {
        axios.post('http://13.125.135.209:8080/signin', {
          email: 'hey2@naver.com',
          password: 'hey2pwd',
        }).then((response)=>{
          console.log(response)
          console.log(response.data.message)
          if (response.data.message === "로그인 성공") {
            // setLoggedIn(true);
            // navigate("/");
          }
        })
      }}>회원가입</button>
    </div>


    </div>
  </div>
    
  );
}

export default Signup;