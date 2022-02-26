import React from "react";
import '../pages_css/Signin.css';
import logo from '../logo.png';
import githubLogo from '../githubLogo.png';
// import axios from 'axios';

const Signin = () => {
  return (
    
    <div style={{ width:'100%', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
      <div style={{}}>
        <img src={logo} id="main_logo"></img>
        <LoginForm></LoginForm>

        <div>이메일 가입&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;비밀번호 찾기</div>

        <GithubLogin></GithubLogin>
      </div>
    </div>
  );
}

const LoginForm = () => {
  return (
    <form>
      <div className='main_emailPassword'>
        <div id="main_email">이메일 주소</div> {/*input_label*/}
        <input type='text' placeholder='abc123@abc123.com'/> {/*input_form*/}
      </div>
      <div className='main_emailPassword'>
        <div id="main_password">비밀번호</div> {/*input_label*/}
        <input type='text'/> {/*input_form*/}
      </div>
      <input type="submit" id="main_login" className="button"></input>
    </form>
  );
}

const GithubLogin = () => {
  return (
    <div>
      <div style={{ width: '350px', height: '50px', margin: '30px 0px 0px 0px', display: 'flex', alignItems: 'center', border: '1px solid rgb(219, 219, 219)', }}>
        <div style={{ width: '50px', }}><img src={githubLogo} id="main_githubLogo"/></div>
        <div style={{ width: '265px', fontWeight: 'bolder', }}>깃허브로 로그인</div>
      </div>
    </div>
  );
}

export default Signin;