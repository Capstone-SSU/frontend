import '../../styles/sign/Signup.css';

import logo from '../../assets/logo.png';
import githubLogo from '../../assets/githubLogo.png';

import Backend from "../../utils/Backend";

import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const Signup = () => {
  var navigate = useNavigate();
  var emailR = false;
  var nicknameR = false;
  return (
    <div style={{ width:'100%', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', }}>
    <div>
      <img src={logo} id="signup_logo"></img>
      <div>
      <div className='signup_emailPassword'>
        <div>이메일 주소</div>
        <input type='text' id="signup_email" placeholder='abc123@abc123.com' onClick={() => {
          emailR = false;
          $('#signup_emailT').hide()
          $('#signup_emailF').hide()
        }}/>
        <button className="button" style={{ width: '75px', height: '35px', borderRadius: '10px', }} onClick={()=> {
          var emailTest =  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
          if (!emailTest.test($('#signup_email').val())) {
            emailR = false;
            $('#signup_emailT').hide();
            $('#signup_emailF').show();
            return;
          }
          if ($('#signup_email').val() === '') {
            $('#signup_emailT').hide();
            $('#signup_emailF').hide();
            alert('이메일을 적어주세요'); return;
          }
          axios({
            url: '/api/signup/userid',
            method: 'POST',
            data: {
              user_id: $('#signup_email').val()
            },
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
           }).then((res)=>{
            console.log(res);
            if (res.data.msg === "사용 가능한 이메일"){
              emailR = true;
              $('#signup_emailT').show()
              $('#signup_emailF').hide()
            } else {
              emailR = false;
              $('#signup_emailT').hide()
              $('#signup_emailF').show()
            }
            })
           .catch((err)=>{console.log(err)})
        }}>중복확인</button>
        <div style={{ width: '200px', height: '7px', padding: '3px 0px 0px 3px', }}>
          <div id='signup_emailF' style={{ display: 'none', fontSize: '12px', color: 'red' }}>사용 불가능한 이메일 입니다</div>
          <div id='signup_emailT' style={{ display: 'none', fontSize: '12px', color: 'blue' }}>사용 가능한 이메일 입니다</div>
        </div>
      </div>
      <div className='signup_emailPassword'>
        <div>비밀번호</div>
        <input type='password' id="signup_password"/>
      </div>
      <div className='signup_emailPassword'>
        <div>비밀번호 재확인</div>
        <input type='password' id="signup_passwordRepeat"/>
      </div>
      <div className='signup_emailPassword'>
        <div>이름</div>
        <input type='text' id="signup_name"/>
      </div>
      <div className='signup_emailPassword'>
        <div>닉네임</div>
        <input type='text' id="signup_nickname" onClick={() => {
          nicknameR = false;
          $('#signup_nicknameT').hide()
          $('#signup_nicknameF').hide()
        }}/>
        <button className="button" style={{ width: '75px', height: '35px', borderRadius: '10px', }} onClick={()=> {
          if ($('#signup_nickname').val() === '') {
            $('#signup_nicknameT').hide();
            $('#signup_nicknameF').hide();
            alert('닉네임을 적어주세요'); return;
          }
          axios({
            url: '/api/signup/nickname',
            method: 'POST',
            data: {
              nickname: $('#signup_nickname').val()
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
           }).then((res)=>{
            console.log(res);
            if (res.data.msg === "사용 가능한 닉네임"){
              nicknameR = true;
              $('#signup_nicknameT').show()
              $('#signup_nicknameF').hide()
            } else {
              nicknameR = false;
              $('#signup_nicknameT').hide()
              $('#signup_nicknameF').show()
            }
            })
           .catch((err)=>{console.log(err)})
        }}>중복확인</button>
        <div style={{ width: '200px', height: '7px', padding: '3px 0px 0px 5px', }}>
          <div id='signup_nicknameF' style={{ display: 'none', fontSize: '12px', color: 'red', }}>사용 불가능한 닉네임 입니다</div>
          <div id='signup_nicknameT' style={{ display: 'none', fontSize: '12px', color: 'blue', }}>사용 가능한 닉네임 입니다</div>
        </div>
      </div>
      <button type="submit" id="signup_login" className="button" style={{ width: '350px', margin: '0px 0px 10px 0px', borderRadius: '5px', }} onClick={() => {
        if ($('#signup_email').val() === '' || $('#signup_password').val() === '' || $('#signup_name').val() === '' || $('#signup_nickname').val() === '') {
          alert('빈 칸이 있습니다'); return;
        }
        if (!(emailR && nicknameR)) {
          alert('중복확인을 체크해주세요'); return;
        }
        if ($('#signup_password').val().length < 8) {
          alert('비밀번호 길이를 8자리 이상해주세요'); return;
        }
        if ($('#signup_password').val() !== $('#signup_passwordRepeat').val()) {
          alert('비밀번호를 확인해주세요'); return;
        }
        axios({
          url: '/api/signup',
          method: 'POST',
          data: {
              user_id: $('#signup_email').val(),
              name: $('#signup_name').val(),
              nickname: $('#signup_nickname').val(),
              passwd: $('#signup_password').val()
          },
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
          },
          }).then((res)=>{
            console.log(res)
            navigate("/signin");
          })
         .catch((err)=>{console.log(err)})
      }}>회원가입</button>
    </div>


    </div>
  </div>
    
  );
}

export default Signup;