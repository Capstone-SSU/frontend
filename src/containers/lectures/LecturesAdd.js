import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/lectures/LecturesAdd.css';

import axios from 'axios';
import $ from 'jquery';

const LecturesAdd = () => {
  const navigate = useNavigate();
  let current = ''
  current += String(decodeURI(window.location.href));

  
  const SiteLinkF = () => {
    var oriSiteUrl = $('#lecturesAdd_linkInput').val();
    var siteurl = "";
    for (var i=0; i<oriSiteUrl.split("/").length-1; i++) {
      siteurl += oriSiteUrl.split("/")[i]+"/";
    }
    siteurl += decodeURI(decodeURIComponent(oriSiteUrl.split("/")[oriSiteUrl.split("/").length-1]));
    console.log(siteurl);

    axios({
      url: '/api/lectures/request',
      data: {
        siteurl : siteurl,
      },
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      // https://www.inflearn.com/course/알고리즘-강좌
      console.log(res);
      if (res.data.msg == "링크가 존재" || res.data.msg == "이미 신청된 링크") {
        setLinkTF(true);
        setLinkR(true);
        setLectureId(res.data.data.lecture_id);
        $('#lecturesAdd_linkInput').val(res.data.data.siteurl)
        $('#lecturesAdd_mainTitleInput').val(res.data.data.lecturetitle)
        $('#lecturesAdd_teacherInput').val(res.data.data.lecturer)
        $('#lecturesAdd_siteInput').val(res.data.data.sitename)
        for (var i = 0; i < res.data.data.hashtags.length; i++) {
          $('#lecturesAdd_hashtagInput' + (i+1)).val(res.data.data.hashtags[i])
        }

        axios({
          url: '/api/lecture/'+res.data.data.lecture_id+'/review',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization' : localStorage.jwToken,
          },
        }).then((res)=>{
          console.log(res);
          if (res.data.data.review !== undefined) {
            alert('이미 작성한 강의 리뷰 입니다');
            navigate('/lectures/'+res.data.data.lecture_id);
          }
        })
        .catch((err)=>{
          console.log(err);
          // setSession(false);
        })
      } else {
        setLinkTF(false);
        setLinkR(false);
        $('#lecturesAdd_mainTitleInput').val("")
        $('#lecturesAdd_teacherInput').val("")
        $('#lecturesAdd_siteInput').val("")
        for (var i = 0; i < 4; i++) {
          $('#lecturesAdd_hashtagInput' + (i+1)).val("")
        }
      }
    })
    .catch((err)=>{
      console.log(err);
      setLinkTF(false);
      setLinkR(false);
      $('#lecturesAdd_mainTitleInput').val("")
      $('#lecturesAdd_teacherInput').val("")
      $('#lecturesAdd_siteInput').val("")
      for (var i = 0; i < 3; i++) {
        $('#lecturesAdd_hashtagInput' + (i+1)).val("")
      }
    })
  }

  const [linkR, setLinkR] = useState(false);
  const [linkTF, setLinkTF] = useState(false);
  const [lectureId, setLectureId] = useState(0);

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
              <input 
                id='lecturesAdd_linkInput'
                onClick={()=>{
                  setLinkTF(false);
                  setLinkR(false);
                  setLectureId(0);
                  $('#lecturesAdd_mainTitleInput').val("")
                  $('#lecturesAdd_teacherInput').val("")
                  $('#lecturesAdd_siteInput').val("")
                  for (var i = 0; i < 4; i++) {
                    $('#lecturesAdd_hashtagInput' + (i+1)).val("")
                  }
                }}/>
              <div style={{ width: '14%', textAlign: 'right', }}>
                <button style={{ width: '80px', margin: '0px 0px 0px 5px', color: 'white', fontSize: '15px', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={SiteLinkF}>
                  링크확인
                </button>
              </div>
            </div>
          </div>
          <div style={{ width: '300px', height: '7px', padding: '0px 0px 0px 5px', }}>
            {linkTF?
              <div style={{ fontSize: '12px', color: 'blue', }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능한 링크 입니다</div>:
              <div style={{ fontSize: '12px', color: 'red', }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 불가능한 링크 입니다</div>
            }
          </div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_mainTitleInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>강의자&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_teacherInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>사이트명 <input id='lecturesAdd_siteInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>해시태그&nbsp; <div style={{ width: '80%', textAlign: 'left', }}><input id='lecturesAdd_hashtagInput1'/><input id='lecturesAdd_hashtagInput2'/><input id='lecturesAdd_hashtagInput3'/><input id='lecturesAdd_hashtagInput4'/></div></div>
        </div>

        <div style={{ width: '60%', margin: '60px 0px 20px 0px', textAlign: 'left', display: 'inline-block', fontSize: '22px', fontWeight: 'bolder', }}>나의 리뷰</div>
        <div style={{ width: '60%', height: '410px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>
            
      
          <form className="mb-3" name="myform" id="myformA" method="post">
            <fieldset style={{ }}>
              {/* <input type="radio" name="reviewStar" value="5" id="rate5" /><div className='star-five'/>
              <input type="radio" name="reviewStar" value="4" id="rate4" /><div className='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="3" id="rate3" /><div className='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="2" id="rate2" /><div className='star-five' style={{ width: '10px', height: '10px', }} />
              <input type="radio" name="reviewStar" value="1" id="rate1" /><div className='star-five' style={{ width: '10px', height: '10px', }} /> */}
              
              <input type="radio" name="reviewStar" value="5" id="rate1" /><label className='reviewStarA' htmlFor="rate1" onClick={() => {$('#lecturesAdd_startNum').val('5')}}>⭐</label>
              <input type="radio" name="reviewStar" value="4" id="rate2" /><label className='reviewStarA' htmlFor="rate2" onClick={() => {$('#lecturesAdd_startNum').val('4')}}>⭐</label>
              <input type="radio" name="reviewStar" value="3" id="rate3" /><label className='reviewStarA' htmlFor="rate3" onClick={() => {$('#lecturesAdd_startNum').val('3')}}>⭐</label>
              <input type="radio" name="reviewStar" value="2" id="rate4" /><label className='reviewStarA' htmlFor="rate4" onClick={() => {$('#lecturesAdd_startNum').val('2')}}>⭐</label>
              <input type="radio" name="reviewStar" value="1" id="rate5" /><label className='reviewStarA' htmlFor="rate5" onClick={() => {$('#lecturesAdd_startNum').val('1')}}>⭐</label>
              <input id="lecturesAdd_startNum" style={{ display: 'none', }}/>
            </fieldset>
          </form>	
          
          </div>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>글 제목 <input id='lecturesAdd_titleInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>내용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id='lecturesAdd_descriptionInput'/></div>
        </div>
        
        <div style={{ width: '60%', margin: '10px 0px 0px 0px', display: 'inline-block', textAlign: 'right', }}>
          <button style={{  color: 'white', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={() => {
            if ($('#lecturesAdd_linkInput').val() === '' || $('#lecturesAdd_titleInput').val() === '' || $('#lecturesAdd_descriptionInput').val() === '' || $('#lecturesAdd_startNum').val() === '') {
              alert('빈 칸이 있습니다'); return;
            }
            if (!linkR) {
              alert('링크확인을 체크해주세요'); return;
            }

            if ($('#lecturesAdd_titleInput').val().split('').length > 255) {
              alert('제목은 255자를 초과할 수 없습니다')
              return
            }
            if ($('#lecturesAdd_descriptionInput').val().split('').length > 255) {
              alert('내용은 255자를 초과할 수 없습니다')
              return
            }

            axios({
              url: '/api/reviews/add',
              method: 'POST',
              data: {
                "lecture_id": lectureId.toString(),
                "reviewtitle": $('#lecturesAdd_titleInput').val(),
                "reviewcontent": $('#lecturesAdd_descriptionInput').val(),
                "reviewrate": $('#lecturesAdd_startNum').val(),
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : localStorage.jwToken,
              },
            }).then((res)=>{
              console.log(res);
              // if (res.data.isSuccess)
                navigate('/lectures/'+lectureId);
            })
           .catch((err)=>{
              console.log(err);
            })

          }}>글추가</button></div>

      </div>
    </div>
  );
}

export default LecturesAdd;