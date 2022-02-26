import React from "react";
import '../pages_css/Signin.css';
import logo from '../logo.png';
import githubLogo from '../githubLogo.png';
import axios from 'axios';
// import $ from 'jquery';
// window.$ = $;

function SigninF() {
  // console.log($('main_email').val())
  // axios.post('http://13.125.135.209:8080/signin', {
  //   email: 'hey2@naver.com',
  //   password: 'hey2pwd'
  // }).then((response)=>{
  //   console.log(response)
  //   return response.data.message
  // })
  // .catch((error)=>{  })
}

const Signin = () => {
  return (
    
    <div style={{ width:'100%', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
      <div>
        <img src={logo} id="main_logo"></img>
        <LoginForm></LoginForm>

        <div>이메일 가입&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;비밀번호 찾기</div>

        <GithubLogin></GithubLogin>

      </div>
    </div>
  );
}
var email = 'ema'
var password = 'pass'
const LoginForm = () => {
  return (
    <form>
      <div className='main_emailPassword'>
        <div>이메일 주소</div> {/*input_label*/}
        <input type='text' id="main_email" placeholder='abc123@abc123.com'/> {/*input_form*/}
      </div>
      <div className='main_emailPassword'>
        <div>비밀번호</div> {/*input_label*/}
        <input type='text' id="main_password"/> {/*input_form*/}
      </div>
      <input type="submit" id="main_login" className="button" onClick={SigninF} />
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