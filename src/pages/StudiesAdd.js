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
      <div id='body_center_name' style={{ height: '120px', }}></div>

      <div style={{ width: '60%', height: '810px', display: 'inline-block', }}>
        <div style={{ width: 'auto', height: '50px', }}>
          <div style={{ width: '6.5%', height: '60px',  display: 'flex', float: 'left', }}></div>
          <div style={{ width: '225px', margin: '10px 10px', display: 'flex', float: 'right', }}>
            <div id ='studiesAdd_peeple'>모집인원수&nbsp;<input id='studiesAdd_max' type='number' min='2'/>&nbsp;/&nbsp;<input id='studiesAdd_min' type='number'  min='1'/>
            </div>
          </div>

          <div style={{ width: '38px', height: '50px', margin: '11px 0px 0px 0px', display: 'flex', float: 'left', }}>
            
            <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              <select id='studiesAdd_locationInput' className='studiesAdd_input'>
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
              </select>
            </div>
            <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              <select id='studiesAdd_categoryInput' className='studiesAdd_input'>
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

        <div id="studiesAdd_title">제목 <input id="studiesAdd_titleInput" /></div>
        <div id="studiesAdd_description">내용 <textarea id="studiesAdd_descriptionInput" /></div>

        <div style={{ width: '98%', margin: '10px 15px', textAlign: 'right', }}>
          <button style={{ margin: '10px 0px', color: 'white', borderRadius: '5px', backgroundColor: '#17173D', }} onClick={() => {
            if ($('#studiesAdd_max').val() < $('#studiesAdd_min').val()) {
              alert('모집 최대인원이 모집 최소인원보다 작을 수 없습니다')
              return
            }
            if ($('#studiesAdd_titleInput').val()==='' || $('#studiesAdd_descriptionInput').val()==='' || $('#studies_locationSearch').val()==='지역' || $('#studiesAdd_categoryInput').val()==='카테고리' || $('#studiesAdd_max').val()==='' || $('#studiesAdd_min').val()==='') {
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
        <div id='body_height'></div>
    </div>
      
    </div>
  );
}

export default StudiesAdd;