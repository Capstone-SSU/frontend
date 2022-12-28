import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/LecturesAdd.css';
import tempImg from '../mainCoding.png';

import like from '../like.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const LecturesAdd = () => {
  const navigate = useNavigate();
  var current = ''
  current += String(decodeURI(window.location.href));
  var linkR = false;

  return (
    <div id='body_main'>
      <div style={{ width: 'auto', height: '70px',}}></div>
      <div style={{ width: '100%', height: '1150px', backgroundColor: 'rgb(240, 240, 240)', }}>
        <div id='body_center_name' style={{ height: '70px', }}></div>
        
        <div style={{ width: '60%', margin: '0px 0px 20px 0px', textAlign: 'left', display: 'inline-block', fontSize: '22px', fontWeight: 'bolder', }}>강의 정보</div>
        <div style={{ width: '60%', height: '360px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
          <div style={{ margin: '30px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>
            링크&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{ width: '80%', display: 'flex', textAlign: 'left', }}>
              <input id='lecturesAdd_linkInput'/>
              <div style={{ width: '14%', textAlign: 'right', }}><button style={{ width: '80px', margin: '0px 0px 0px 5px', color: 'white', fontSize: '15px', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={() => {
                  axios.post('http://54.180.150.167:8080/lectures/urls', {
                    "additionalProp1" : $('#lecturesAdd_linkInput').val(),
                  }).then((response)=>{
                    if (response.data.message === "중복된 링크가 없습니다.") {
                      $('#lecturesAdd_linkT').show()
                      linkR = true
                    }
                    else 
                      $('#lecturesAdd_linkF').show()
                  }).catch((error) => { alert('강의 링크 확인에 오류가 있습니다.') })
              }}>링크확인</button></div>
            </div>
          </div>
          <div style={{ width: '300px', height: '7px', padding: '0px 0px 0px 5px', }}>
            <div id='lecturesAdd_linkF' style={{ display: 'none', fontSize: '12px', color: 'red', }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 불가능한 링크 입니다</div>
            <div id='lecturesAdd_linkT' style={{ display: 'none', fontSize: '12px', color: 'blue', }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능한 링크 입니다</div>
          </div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_mainTitleInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>강의자&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_teacherInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>사이트명 <input id='lecturesAdd_siteInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>해시태그&nbsp; <div style={{ width: '80%', textAlign: 'left', }}><input id='lecturesAdd_hashtagInput1'/><input id='lecturesAdd_hashtagInput2'/><input id='lecturesAdd_hashtagInput3'/><input id='lecturesAdd_hashtagInput4'/></div></div>
        </div>

        <div style={{ width: '60%', margin: '60px 0px 20px 0px', textAlign: 'left', display: 'inline-block', fontSize: '22px', fontWeight: 'bolder', }}>나의 리뷰</div>
        <div style={{ width: '60%', height: '410px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>
            
      
          <form class="mb-3" name="myform" id="myformA" method="post">
            <fieldset style={{ }}>
              {/* <input type="radio" name="reviewStar" value="5" id="rate5" /><div class='star-five'/>
              <input type="radio" name="reviewStar" value="4" id="rate4" /><div class='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="3" id="rate3" /><div class='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="2" id="rate2" /><div class='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="1" id="rate1" /><div class='star-five' style={{ width: '10px', height: '10px', }} /> */}
              
              <input type="radio" name="reviewStar" value="5" id="rate1" /><label class='reviewStarA' for="rate1" onClick={() => {$('#lecturesAdd_startNum').val('5')}}>⭐</label>
              <input type="radio" name="reviewStar" value="4" id="rate2" /><label class='reviewStarA' for="rate2" onClick={() => {$('#lecturesAdd_startNum').val('4')}}>⭐</label>
              <input type="radio" name="reviewStar" value="3" id="rate3" /><label class='reviewStarA' for="rate3" onClick={() => {$('#lecturesAdd_startNum').val('3')}}>⭐</label>
              <input type="radio" name="reviewStar" value="2" id="rate4" /><label class='reviewStarA' for="rate4" onClick={() => {$('#lecturesAdd_startNum').val('2')}}>⭐</label>
              <input type="radio" name="reviewStar" value="1" id="rate5" /><label class='reviewStarA' for="rate5" onClick={() => {$('#lecturesAdd_startNum').val('1')}}>⭐</label>
              <input id="lecturesAdd_startNum" style={{ display: 'none', }}/>
            </fieldset>
          </form>	
          
          </div>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>글 제목 <input id='lecturesAdd_titleInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>내용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id='lecturesAdd_descriptionInput'/></div>
        </div>
        
        <div style={{ width: '60%', margin: '10px 0px 0px 0px', display: 'inline-block', textAlign: 'right', }}>
          <button style={{  color: 'white', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={() => {
            if ($('#lecturesAdd_linkInput').val() === '' || $('#lecturesAdd_mainTitleInput').val() === '' || $('#lecturesAdd_teacherInput').val() === '' || $('#lecturesAdd_siteInput').val() === '' || ($('#lecturesAdd_hashtagInput1').val() === '' && $('#lecturesAdd_hashtagInput2').val() === '' && $('#lecturesAdd_hashtagInput3').val() === '' && $('#lecturesAdd_hashtagInput4').val() === '') || $('#lecturesAdd_titleInput').val() === '' || $('#lecturesAdd_descriptionInput').val() === '' || $('#lecturesAdd_startNum').val() === '') {
              alert('빈 칸이 있습니다'); return;
            }
            if (!linkR) {
              alert('링크확인을 체크해주세요'); return;
            }
            
            axios
              .post(
                '/api/lectures/' + parseInt(current.split("/")[5]), 
                {
                  "lectureUrl": lectureUrl,
                  "lectureTitle": lectureTitle,
                  "lecturer": lecturer,
                  "siteName": siteName,
                  "hashtags": [
                    hashtags[0],
                    hashtags[1],
                    hashtags[2],
                  ],
                  "rate": rate,
                  "comment": comment,
                  "commentTitle": commentTitle,
                }, 
                localStorage.getItem('token'),)
              .then((response)=>{
                alert('강의평 글추가 성공')
              }).catch((error) => {
                alert('강의평 글추가 실패')
              })

          }}>글추가</button></div>

      </div>
    </div>
  );
}

export default LecturesAdd;