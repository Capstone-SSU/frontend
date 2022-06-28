import React from "react";
import Mypage from '../pages/Mypage';
import { useNavigate } from "react-router-dom";
import '../mypages_css/myCompany.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

// axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/', {
// }, localStorage.getItem('token')).then((response2) => {
// document.getElementById('myProfile_main').innerHTML = MyProfileContentF(response2.data.data)
// }).catch();

const MyCompany = () => {
  var navigate = useNavigate();
  axios.get('http://54.180.150.167:8080/temp-login-success', {
  }, localStorage.getItem('token')).then((response2) => {
    axios.get('http://54.180.150.167:8080/roadmaps/' + response2.data.data.userId + '/company', {
    }).then((response)=>{
      if (response.data.message != '소속인증 요청 필요') 
        document.getElementById('myCompany_main').innerHTML = "<button id='myCompany_nicknameButton2'>소속 인증 완료</button>"
    }).catch((error) => { alert('소속인증 가져오기 실패'); })
  }).catch(()=>{navigate('/signin/');});

  return (
    <>
        <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D'}}>
            <Mypage/>
            <div id='myProfile_body'>
                <div id='myProfile_top'></div>
                <div id="myCompany_main">
                  <div style={{ margin: '5px 10px', }}>
                    <input id="myCompany_email"/>
                    <button id='myCompany_nicknameButton' onClick={() => {
                          axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/company?email=’' + $('#myCompany_email').val() + '’', {
                          }, localStorage.getItem('token')).then((response) => {
                              alert(response.data.message)
                          }).catch((error) => {
                            alert("소속인증 메일 보내기 실패")
                          });
                    }}>회사 메일 입력</button>
                  </div>
                  <div style={{ margin: '5px 10px', }}>
                    <input id="myCompany_num"/>
                    <button id='myCompany_nicknameButton' onClick={() => {
                          axios.post('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/company', {
                            "certificateNumber" : $('#myCompany_num').val(),
                          }, localStorage.getItem('token')).then((response) => {
                            alert(response.data.message)
                            // document.getElementById('myCompany_main').innerHTML = "<button id='myCompany_nicknameButton2'>소속 인증 완료</button>"
                          }).catch((error) => {
                            alert("소속인증 실패")
                          });
                    }}>인증 번호 입력</button>
                  </div>
                </div>
            </div>
        </div>
    </>

  );
}

export default MyCompany;