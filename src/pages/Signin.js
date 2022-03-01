import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../pages_css/Signin.css';

import logo from '../logo.png';
import githubLogo from '../githubLogo.png';
import Main from "./Main";

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
        <div>이메일 주소</div> {/*input_label*/}
        <input type='text' id="signin_email" placeholder='abc123@abc123.com'/> {/*input_form*/}
      </div>
      <div className='signin_emailPassword'>
        <div>비밀번호</div> {/*input_label*/}
        <input type='text' id="signin_password"/> {/*input_form*/}
      </div>
      <button type="submit" id="signin_login" className="button" onClick={() => {
        
        axios.post('http://54.180.150.167:8080/signin', {
          email: $('#signin_email').val(),
          password: $('#signin_password').val(),
        }).then((response)=>{
          localStorage.setItem('token', response.data.data.jwtToken)
          if (response.data.message === "로그인 성공") {
            navigate("/?token=" + response.data.data.jwtToken);
          }
        }).catch((error) => { alert('로그인 실패') })
      }}>로그인</button>
    </div>
  );
}

const GithubLogin = () => {
  return (
    <div>
      <Link to=''>
        <div style={{ width: '350px', height: '50px', margin: '30px 0px 0px 0px', display: 'flex', alignItems: 'center', border: '1px solid rgb(219, 219, 219)', }}>
          <div style={{ width: '50px', }}><img src={githubLogo} id="signin_githubLogo"/></div>
          <div style={{ width: '265px', fontWeight: 'bolder', }}>깃허브로 로그인</div>
        </div>
      </Link>
    </div>
  );
}

export default Signin;