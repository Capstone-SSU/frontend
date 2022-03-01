import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/StudiesAdd.css';

const StudiesAdd = () => {
  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/studies">스터디</Link></div>

      <div style={{ width: '1200px', height: '810px', display: 'inline-block', }}>
          <div style={{ width: '100%', margin: '10px 10px', display: 'flex', alignItems: 'center', }}>
            <div id ='studiesAdd_hashtag'>해시태그</div>
            <div id ='studiesAdd_peeple'>모집인원수 <input /> / <input/>
            </div>
          </div>
          
          <div style={{ width: '100%', margin: '20px 10px', display: 'flex', alignItems: 'center', }}>
            <div style={{ width: '5%', }}>
              <div id='studiesAdd_onoff'>온</div>
            </div>

              <div id='studiesAdd_location' class='studiesAdd_locationStudy'>지역 <input /></div>
              <div id='studiesAdd_study' class='studiesAdd_locationStudy'>스터디 <input /></div>
          </div>

          <div id="studiesAdd_title">제목 <input /></div>

          <div id="studiesAdd_description">내용 <input /></div>

          <div style={{ width: '98%', margin: '10px 10px', textAlign: 'right', }}><button className="button">글추가</button></div>
      </div>
    </div>
  );
}

export default StudiesAdd;