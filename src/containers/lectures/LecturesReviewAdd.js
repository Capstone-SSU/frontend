import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/lectures/LecturesReviewAdd.css';

import like from '../../assets/like.png';

import axios from 'axios';
import $ from 'jquery';
import pathnameId from "../../utils/pathnameId";
window.$ = $;

const LecturesReviewAdd = () => {
  const navigate = useNavigate();
  var current = ''
  current += String(decodeURI(window.location.href));

  const [linkTF, setLinkTF] = useState(false);
  const [starNum, setStarNum] = useState(0);
  useEffect(()=>{
    axios({
      url: '/api/lecture/'+pathnameId(current)+'/review',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      $('#lecturesAdd_linkInput').val(res.data.data.siteurl)
      $('#lecturesAdd_linkT').show()
      $('#lecturesAdd_mainTitleInput').val(res.data.data.lecturetitle)
      $('#lecturesAdd_teacherInput').val(res.data.data.lecturer)
      $('#lecturesAdd_siteInput').val(res.data.data.sitename)
      for (var i = 0; i < res.data.data.hashtags.length; i++) {
        $('#lecturesAdd_hashtagInput' + (i+1)).val(res.data.data.hashtags[i])
      }

      if (res.data.data.review !== undefined) {
        alert('이미 작성한 강의 리뷰 입니다');
        navigate('/lectures/'+pathnameId(current));
      }
    })
   .catch((err)=>{
      console.log(err);
      // setSession(false);
    })
  
    $('#lecturesAdd_linkInput').val('')
    $('#lecturesAdd_mainTitleInput').val('')
    $('#lecturesAdd_teacherInput').val('')
    $('#lecturesAdd_siteInput').val('')
    for (var i = 0; i < 3; i++) {
      $('#lecturesAdd_hashtagInput' + (i+1)).val('')
    }
  },[]);

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
              <input id='lecturesAdd_linkInput' /> {/* disabled */}
            </div>
          </div>
          <div style={{ width: '300px', height: '7px', padding: '0px 0px 0px 5px', }}>
            <div style={{ fontSize: '12px', color: 'blue', }}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능한 링크 입니다
            </div>
          </div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_mainTitleInput' /></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>강의자&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_teacherInput' /></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>사이트명 <input id='lecturesAdd_siteInput' /></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>해시태그&nbsp; 
          <div style={{ width: '80%', textAlign: 'left', }}>
            <input id='lecturesAdd_hashtagInput1' />
            <input id='lecturesAdd_hashtagInput2' />
            <input id='lecturesAdd_hashtagInput3' />
            <input id='lecturesAdd_hashtagInput4' style={{display:'none'}}/></div></div>
        </div>

        <div style={{ width: '60%', margin: '60px 0px 20px 0px', textAlign: 'left', display: 'inline-block', fontSize: '22px', fontWeight: 'bolder', }}>나의 리뷰</div>
        <div style={{ width: '60%', height: '410px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>
            
      
          <form className="mb-3" name="myformA" id="myformA" method="post">
            <fieldset className="lecturesList_star">
              <div id="body_flex" style={{ width: "100%", }}>
                  {[0, 1, 2, 3, 4].map((d)=>{
                      return (
                          <div key={d}>
                              {d > 4-starNum?
                                  <>
                                    <input type="radio" name="reviewStar" value={d+1} id={"rate" + (d+1)} />
                                    <label className="lecture_update_reviewStar" htmlFor={"rate" + (d+1)} onClick={()=>setStarNum(5-d)}>⭐</label>
                                  </>:
                                  <>
                                    <input type="radio" name="reviewStar" value={d+1} id={"rate" + (d+1)} />
                                    <label className="reviewStarA" htmlFor={"rate" + (d+1)} onClick={()=>setStarNum(5-d)}>⭐</label>
                                  </>
                              }
                          </div>
                      );
                  })}
              </div>
            </fieldset>
          </form>	
          
          </div>
          <div style={{ margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>글 제목 <input id='lecturesAdd_titleInput'/></div>
          <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>내용&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea id='lecturesAdd_descriptionInput'/></div>
        </div>
        
        <div style={{ width: '60%', margin: '10px 0px 0px 0px', display: 'inline-block', textAlign: 'right', }}>
          <button style={{  color: 'white', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={() => {
            if ($('#lecturesAdd_linkInput').val() === '' || $('#lecturesAdd_titleInput').val() === '' || $('#lecturesAdd_descriptionInput').val() === '' || starNum == 0) {
              alert('빈 칸이 있습니다'); return;
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
                "lecture_id": pathnameId(current).toString(),
                "reviewtitle": $('#lecturesAdd_titleInput').val(),
                "reviewcontent": $('#lecturesAdd_descriptionInput').val(),
                "reviewrate": starNum.toString(),
              },
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : localStorage.jwToken,
              },
            }).then((res)=>{
              console.log(res);
              // if (res.data.isSuccess)
                navigate('/lectures/'+pathnameId(current));
            })
           .catch((err)=>{
              console.log(err);
            })

          }}>글추가</button></div>

      </div>
    </div>
  );
}

export default LecturesReviewAdd;