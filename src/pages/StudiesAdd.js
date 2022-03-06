import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/StudiesAdd.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const StudiesAdd = () => {
  const navigate = useNavigate();
  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'>스터디 추가</div>

      <div style={{ width: '1200px', height: '810px', display: 'inline-block', }}>
          <div style={{ width: '100%', margin: '10px 10px', display: 'flex', alignItems: 'center', }}>
            <div id ='studiesAdd_hashtag'></div>
            <div id ='studiesAdd_peeple'>모집인원수 <input id='studiesAdd_max' type='number' min='0'/> / <input id='studiesAdd_min' type='number'  min='0'/>
            </div>
          </div>
          
          <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
            {/* <div style={{ width: '5%', }}>
              <div id='studiesAdd_onoff'>온</div>
            </div> */}

              <div id='studiesAdd_location' className='studiesAdd_locationStudy'>지역 <input id='studiesAdd_locationInput' /></div>
              <div id='studiesAdd_category' className='studiesAdd_locationStudy'>카테고리 <input id='studiesAdd_categoryInput' /></div>
          </div>

          <div id="studiesAdd_title">제목 <input id="studiesAdd_titleInput" /></div>

          <div id="studiesAdd_description">내용 <input id="studiesAdd_descriptionInput" /></div>

          <div style={{ width: '98%', margin: '10px 10px', textAlign: 'right', }}>
            <button style={{ color: 'white', backgroundColor: '#17173D', }} onClick={() => {
              if ($('#studiesAdd_max').val() < $('#studiesAdd_min').val()) {
                alert('모집 최대인원이 모집 최소인원보다 작을 수 없습니다')
                return
              }
              if ($('#studiesAdd_titleInput').val()==='' || $('#studiesAdd_descriptionInput').val()==='' || $('#studiesAdd_locationInput').val()==='' || $('#studiesAdd_categoryInput').val()==='' || $('#studiesAdd_max').val()==='' || $('#studiesAdd_max').val()===0 || $('#studiesAdd_min').val()==='' || $('#studiesAdd_min').val()===0) {
                alert('빈 칸이 있습니다')
                return
              }
              axios.post('http://54.180.150.167:8080/studies', {
                "studyCategoryName": $('#studiesAdd_categoryInput').val(),
                "studyContent": $('#studiesAdd_descriptionInput').val(),
                "studyLocation": $('#studiesAdd_locationInput').val(),
                "studyMaxReq": $('#studiesAdd_max').val(),
                "studyMinReq": $('#studiesAdd_min').val(),
                "studyTitle": $('#studiesAdd_titleInput').val(),
              }, localStorage.getItem('token'),).then(()=>{
                navigate('/studies')
              }).catch((error) => {
                alert('스터디 글추가 실패')
              })
            }}>
              글추가
            </button>
          </div>
      </div>
    </div>
  );
}

export default StudiesAdd;