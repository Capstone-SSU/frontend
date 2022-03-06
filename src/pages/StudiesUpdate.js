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
        axios.get('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {

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
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'>스터디 수정</div>

      <div style={{ width: '1200px', height: '810px', display: 'inline-block', }}>
          <div style={{ width: '100%', margin: '10px 10px', display: 'flex', alignItems: 'center', }}>
            <div id ='studiesUpdate_hashtag'></div>
            <div id ='studiesUpdate_peeple'>모집인원수 <input id='studiesUpdate_max' type='number' min='0'/> / <input id='studiesUpdate_min' type='number'  min='0'/>
            </div>
          </div>
          
          <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>

              <div id='studiesUpdate_location' className='studiesUpdate_locationStudy'>지역 <input id='studiesUpdate_locationInput' /></div>
              <div id='studiesUpdate_category' className='studiesUpdate_locationStudy'>카테고리 <input id='studiesUpdate_categoryInput' /></div>
          </div>

          <div id="studiesUpdate_title">제목 <input id="studiesUpdate_titleInput" /></div>

          <div id="studiesUpdate_description">내용 <input id="studiesUpdate_descriptionInput" /></div>

          <div style={{ width: '98%', margin: '10px 10px', textAlign: 'right', }}>
            <button style={{ color: 'white', backgroundColor: '#17173D', }} onClick={() => {
              if ($('#studiesUpdate_max').val() < $('#studiesUpdate_min').val()) {
                alert('모집 최대인원이 모집 최소인원보다 작을 수 없습니다')
                return
              }
              if ($('#studiesUpdate_titleInput').val()==='' || $('#studiesUpdate_descriptionInput').val()==='' || $('#studiesUpdate_locationInput').val()==='' || $('#studiesUpdate_categoryInput').val()==='' || $('#studiesUpdate_max').val()==='' || $('#studiesUpdate_max').val()===0 || $('#studiesUpdate_min').val()==='' || $('#studiesUpdate_min').val()===0) {
                alert('빈 칸이 있습니다')
                return
              }
              axios.patch('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {
                "studyCategoryName": $('#studiesUpdate_categoryInput').val(),
                "studyContent": $('#studiesUpdate_descriptionInput').val(),
                "studyLocation": $('#studiesUpdate_locationInput').val(),
                "studyMaxReq": $('#studiesUpdate_max').val(),
                "studyMinReq": $('#studiesUpdate_min').val(),
                "studyTitle": $('#studiesUpdate_titleInput').val(),
              }, localStorage.getItem('token'),).then(()=>{
                navigate('/studies/' + parseInt(current.split("/")[4]))
              }).catch((error) => {
                alert('스터디 글수정 실패')
              })
            }}>
              글수정
            </button>
          </div>
      </div>
    </div>
  );
}

export default StudiesUpdate;