import '../../styles/sign/Signin.css';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/githubLogo.png';

import Backend from "../../utils/Backend";

import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const Signin = () => {
  return (
    
    <div style={{ width:'100%', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
      <div>
        <img src={logo} id="signin_logo"></img>
        <LoginForm></LoginForm>

        <div><Link to='/signup'>이메일 가입</Link>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<Link to='/signup'>비밀번호 찾기</Link></div>

        <GithubLogin></GithubLogin>

      </div>
    </div>
  );
}

const LoginForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='signin_emailPassword'>
        {/* <button onClick={() => { localStorage.removeItem('token') }}>remove</button> */}
        <div>이메일 주소</div> {/*input_label*/}
        <input type='text' id="signin_email" placeholder='abc123@abc123.com'/> {/*input_form*/}
      </div>
      <div className='signin_emailPassword'>
        <div>비밀번호</div> {/*input_label*/}
        <input type='password' id="signin_password"/> {/*input_form*/}
      </div>
      <button type="submit" id="signin_login" className="button" style={{ width: '350px', margin: '0px 0px 10px 0px', borderRadius: '5px', }} onClick={() => {
          axios({
              url: '/api/signin',
              method: 'POST',
              data: {
                user_id: $('#signin_email').val(),
                passwd: $('#signin_password').val(),
              },
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
              },
            }).then((res)=>{
              console.log(res);
              if (res.data.msg == "로그인 성공") {
                localStorage.setItem("jwToken", res.data.jwt)
                document.location.href = "/pickit/";
              }
            })
           .catch((err)=>{console.log(err)})
      }}>로그인</button>
    </div>
  );
}

const GithubLogin = () => {
  const navigate = useNavigate();
  return (
    <div>

      <div style={{ width: '350px', height: '50px', margin: '30px 0px 0px 0px', display: 'flex', alignItems: 'center', border: '1px solid rgb(219, 219, 219)', borderRadius: '10px',  }}>
        <div style={{ width: '50px', }}><img src={githubLogo} id="signin_githubLogo"/></div>
        <div style={{ width: '265px', fontWeight: 'bolder', }}>
          <a href='http://54.180.150.167:8080/oauth2/authorization/github' onClick={() => {}}>
            깃허브로 로그인
          </a>
        </div>
      </div>

    </div>
  );
}

export default Signin;