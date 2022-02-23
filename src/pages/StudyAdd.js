import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/StudyAdd.css';

const StudyAdd = () => {
  return (
    <div id='body_center'>
        <div id='body_center_top'></div>
        <div id='body_center_name'><Link to="/study">스터디</Link></div>
        <div id="body_center_write_inner">
            <div id ='body_center_write_inner_hashtag_peeple'><div id ='body_center_write_inner_hashtag'>해시태그</div><div id ='body_center_write_inner_peeple'>모집인원수 <input /></div></div>
            <div id='body_center_write_inner_onoff_location'><div id='body_center_write_inner_onoff'><div id='body_center_write_inner_onoff_circle'>온</div></div><div id='body_center_write_inner_location'>지역 <input /></div><div id='body_center_write_inner_location'>스터디 <input /></div></div>
            <div id="body_center_write_inner_title">제목 <input /></div>
            <div id="body_center_write_inner_description">내용 <input /></div>
            <div id='body_center_write_inner_add'><button>글추가</button></div>
        </div>
    </div>
  );
}

export default StudyAdd;