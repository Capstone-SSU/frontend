import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/StudiesUpdate.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const StudiesUpdate = () => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[6]), {

        }, localStorage.getItem('token'),).then((response)=>{
            $("#studiesUpdate_titleInput").val(response.data.data.studyTitle);
            $("#studiesUpdate_descriptionInput").val(response.data.data.studyContent);
            $("#studiesUpdate_locationInput").val(response.data.data.studyLocation);
            $("#studiesUpdate_categoryInput").val(response.data.data.studyCategoryName);
            $("#studiesUpdate_max").val(response.data.data.studyMaxReq);
            $("#studiesUpdate_min").val(response.data.data.studyMinReq);
        }).catch((error) => { 
            // navigate('/signin')
        })
    });

  return (
    <div id='body_main' style={{ background:'rgb(240, 240, 240)', }}>
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '120px', background:'rgb(240, 240, 240)', }}></div>

      <div style={{ width: '60%', height: '850px', display: 'inline-block', borderRadius: '10px', background: 'white', }}>
        <div style={{ width: 'auto', height: '50px', }}>
          <div style={{ width: '6.5%', height: '60px',  display: 'flex', float: 'left', }}></div>
          <div style={{ width: '225px', margin: '10px 10px', display: 'flex', float: 'right', }}></div>

          <div style={{ width: '100px', height: '13px', opacity: '0', background: 'red' }}>a</div>
          <div style={{ width: '38px', height: '50px', margin: '11px 0px 0px 0px', display: 'flex', float: 'left', }}>
            
            <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              <select id='studiesUpdate_locationInput' className='studiesUpdate_input'>
                <option>지역</option>
                <option value='서울'>서울</option>
                <option value='경기'>경기</option>
                <option value='인천'>인천</option>
                <option value='대구'>대구</option>
                <option value='광주'>광주</option>
                <option value='대전'>대전</option>
                <option value='울산'>울산</option>
                <option value='세종'>세종</option>
                <option value='강원'>강원</option>
                <option value='충북'>충북</option>
                <option value='충남'>충남</option>
                <option value='전북'>전북</option>
                <option value='전남'>전남</option>
                <option value='경북'>경북</option>
                <option value='경남'>경남</option>
                <option value='부산'>부산</option>
                <option value='제주'>제주</option>
                <option value='온라인'>온라인</option>
              </select>
            </div>
            <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              <select id='studiesUpdate_categoryInput' className='studiesUpdate_input'>
                <option>카테고리</option>
                <option value='모각코'>모각코</option>
                <option value='코딩테스트'>코딩테스트</option>
                <option value='사이드 프로젝트'>사이드 프로젝트</option>
                <option value='공모전'>공모전</option>
                <option value='프로그래밍언어'>프로그래밍언어</option>
                <option value='강의완독'>강의완독</option>
                <option value='로드맵공략'>로드맵공략</option>
                <option value='자격증'>자격증</option>
              </select>
            </div>
          </div>
        </div>

        <div id ='studiesUpdate_peeple'>모집인원수&nbsp;&nbsp;
          <input id='studiesUpdate_max' type='number' min='2'/>
          &nbsp;&nbsp;/&nbsp;&nbsp;
          <input id='studiesUpdate_min' type='number' min='1'/>
        </div>
        {/* <div id ='studiesUpdate_peeple'>모집인원수&nbsp;&nbsp;<input id="studiesUpdate_max" /></div> */}
        <div id="studiesUpdate_title"><div style={{ textAlign: 'center', }}>제목&nbsp;&nbsp;</div><input id="studiesUpdate_titleInput" /></div>
        <div id="studiesUpdate_description"><div style={{ textAlign: 'center', }}>내용&nbsp;&nbsp;</div><textarea id="studiesUpdate_descriptionInput" /></div>

        <div style={{ width: '98%', margin: '10px 15px', textAlign: 'center', }}>
          <button style={{ margin: '10px 0px', color: 'white', borderRadius: '5px', backgroundColor: '#17173D', }} onClick={() => {
              if ($('#studiesUpdate_max').val() < $('#studiesUpdate_min').val()) {
                alert('모집 최대인원이 모집 최소인원보다 작을 수 없습니다')
                return
              }
              if ($('#studiesUpdate_titleInput').val()==='' || $('#studiesUpdate_descriptionInput').val()==='' || $('#studiesUpdate_locationInput').val()==='지역' || $('#studiesUpdate_categoryInput').val()==='카테고리' || $('#studiesUpdate_max').val()==='' || $('#studiesUpdate_min').val()==='') {
                alert('빈 칸이 있습니다')
                return
              }

              axios
                .patch('/api/studies/' + parseInt(current.split("/")[6]), 
                  {
                    "studyCategoryName": studyCategoryName,
                    "studyContent": studyContent,
                    "studyLocation": studyLocation,
                    "studyMaxReq": studyMaxReq,
                    "studyMinReq": studyMinReq,
                    "studyTitle": studyTitle,
                  }, 
                  localStorage.getItem('token'),)
                .then(()=>{
                  alert('스터디 글수정 성공')
                })
                .catch((error) => {
                  alert('스터디 글수정 실패')
                })
            }}>
              글수정
            </button>
          </div>
      </div>
      <div id='body_center_name' style={{ height: '120px', background:'rgb(240, 240, 240)', }}></div>
    </div>
  );
}

export default StudiesUpdate;