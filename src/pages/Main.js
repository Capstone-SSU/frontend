import React, { useEffect } from "react";
import '../pages_css/Main.css';
import logo from '../logo.png';
import mainPic from '../mainCoding.png';
import subPic1 from '../subCoding1.png';
import subPic2 from '../subCoding2.png';
import subPic3 from '../subCoding3.png';
import { Link } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';
window.$ = $;

function Main() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
    }
    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response) => {
      // const element = document.getElementById('header_signinUsers')
      // element.innerHTML = SigninUserF(response.data.message)
      $('#header_login').val(response.data.data.userId)
      $('#header_loginerror').val('')
    }).catch(() => {
        localStorage.removeItem('token')
      }
    );

    axios
      .delete(
        '/api/studies/'+studyId,
        {}, 
        localStorage.getItem('token')
      )
      .then((response)=>{
        alert("스터디 삭제 성공");
      })
      .catch(()=>{
        alert("스터디 삭제 실패");
      })

  }, []);

  return (
    <div className="App">
      <div className="body_box">
        <MainCard></MainCard>
        <SubPicRightCard img={subPic1}></SubPicRightCard>
        <SubPicLeftCard img={subPic2}></SubPicLeftCard>
        <SubPicRight2Card img={subPic3}></SubPicRight2Card>
      </div>
    </div>
  );
}

const MainCard = () => {
  return (
    <div className="main_card">
      <img src={mainPic} id="mainPicture"></img>
      <div className="text_box">
        <h1>코딩 강의, 어떻게 골라야할지 막막하셨나요?</h1>
        <p>강의 후기, 코딩 스터디, 로드맵 추천까지</p>
        <Link to="/lectures" id="linkBox"><p id="linkButton">추천 강의 보러가기</p></Link>
      </div>

    </div>
  );
}

const SubPicRightCard = (props) => {
  return (
    <div className="sub_card">
      <div className="text_box">
        <h3>다양한 후기를 읽고 강의를 골라보세요</h3>
        <p>여러 플랫폼의 강의 후기를 한번에 모았어요! 편하게 고르고 학습해요</p>
      </div>
      <img src={props.img} id="subPicture"></img>
    </div>
  );
}

const SubPicLeftCard = (props) => {
  return (
    <div className="sub_card">
      <img src={props.img} id="subPicture"></img>
      <div className="text_box">
        <h3>스터디원과 함께 공부해요!</h3>
        <p>스터디 그룹을 만들고 참여하여 성취도를 높여요</p>
      </div>
    </div>
  );
}

const SubPicRight2Card = (props) => {
  return (
    <div className="sub_card">
      <div className="text_box">
        <h3>로드맵으로 세우는 강의계획</h3>
        <p>다른 사람의 로드맵을 참고하여 학습하고, 내 로드맵도 공유해요</p>
      </div>
      <img src={props.img} id="subPicture"></img>
    </div>
  );
}

export default Main;