import React from "react";
import '../pages_css/Signin.css';
import logo from '../logo.png';
import githubLogo from '../githubLogo.png';

const Signin = () => {
  return (
    <div className="App">
      <div className="inner">
        <img src={logo} id="mainLogo"></img>
        <LoginForm></LoginForm>
        <div className="sub_menu">
          <a>이메일 가입</a>
          <a>비밀번호 찾기</a>
        </div>
        <GithubLogin></GithubLogin>
      </div>

    </div>
  );
}

const LoginForm = () => {
  return (
    <form>
      <p className="input_label">이메일 주소</p>
      <input type="text" className="input_form"></input>
      <p className="input_label">비밀번호</p>
      <input type="password" className="input_form"></input>
      <input type="submit" id="submit_button"></input>
    </form>
  );
}

const GithubLogin = () => {
  return (
    <div className="github_login_button">
      <img src={githubLogo} id="githubLogo"></img>

      <p>깃허브로 로그인</p>
    </div>
  );
}

export default Signin;