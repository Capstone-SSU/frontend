import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/roadmaps/RoadmapsUpdate.css';

import axios from 'axios';
import $ from 'jquery';
import pathnameId from "../../utils/pathnameId";
import RoadmapsBox2 from "../../components/roadmaps/RoadmapsBox2";
import RoadmapsBox from "../../components/roadmaps/RoadmapsBox";

const RoadmapsUpdate = ({ session, auth }) => {
  const [num, setNum] = useState(0);
  const NumF = () => {
    setNum(num+1);
  }

  const UpdateF = () => {
    console.log(lectureId);
    if (lectureId == []) {
      alert('빈 칸이 있습니다')
      return
    }
    if ($('#roadmapsUpdate_mainTitleInput').val() === '' || $('#roadmapsUpdate_mainDescriptionInput').val() === '') {
      alert('빈 칸이 있습니다')
      return
    }

    if ($('#roadmapsUpdate_mainTitleInput').val().split('').length > 17) {
      alert('제목은 17자를 초과할 수 없습니다')
      return
    }
    if ($('#roadmapsUpdate_mainDescriptionInput').val().split('').length > 255) {
      alert('추천 대상 내용은 255자를 초과할 수 없습니다')
      return
    }

    axios({
        url: '/api/roadmap/'+pathnameId(current)+'/update',
        method: 'POST',
        data: {
          thumbnail: lectureId,
          roadmapcontent: $('#roadmapsUpdate_mainDescriptionInput').val(),
          roadmaptitle: $('#roadmapsUpdate_mainTitleInput').val(),
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : localStorage.jwToken,
        },
      }).then((res)=>{
        console.log(res);
        // if (res.data.isSuccess)
          navigate('/roadmaps/'+pathnameId(current));
      })
      .catch((err)=>{
        console.log(err);
      })
  }

  $("#roadmapsUpdate_mainDescriptionInput").on('keydown keyup', function () {
    $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
  });
  
  const navigate = useNavigate();
  var current = ''
  current += String(decodeURI(window.location.href));

  const [data, setData] = useState([]);
  let [lectureId, setLectureId] = useState([]);
  useEffect(() => {
    let isComponentMounted = true
    axios({
        url: '/api/roadmaps/detail/'+pathnameId(current),
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : localStorage.jwToken,
        },
      }).then((res)=>{
        if (res.data) {
          if (isComponentMounted) {
            console.log(res);
            setLectureId(res.data.data.thumbnail);
            $('#roadmapsUpdate_mainTitleInput').val(res.data.data.roadmaptitle)
            $('#roadmapsUpdate_mainDescriptionInput').val(res.data.data.roadmapcontent)
          }
        }
      })
      .catch((err)=>{
        console.log(err);
        if (session) {
            alert('로그인 해주세요')
            navigate('/roadmaps')
        } else {
            alert('오류가 났습니다')
            navigate('/roadmaps')
        }
      })

    axios({
        url: '/api/myreviews/'+auth.nickname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization' : localStorage.jwToken,
        },
      }).then((res)=>{
        if (res.data) {
            if (isComponentMounted) {
                console.log(res);
                setData(res.data.data);
            }
        }
      }).catch((err)=>{
        console.log(err);
      })
    return () => {
        isComponentMounted = false
    }
  }, []);
  return (
    <div id='body_main'>
      <div style={{ width: 'auto', height: '70px',}}></div>
        <div id='body_center_name' style={{ height: '70px', }}></div>

        <div style={{ width: '75%', height: '50px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', }}>
          <div id="roadmapsUpdate_mainTitle">
            <input id="roadmapsUpdate_mainTitleInput" placeholder="로드맵 제목"/>
            <button onClick={() => UpdateF()} style={{ margin: '6px 0px 0px 0px', display: 'flex', float: 'right', alignItems: 'center', borderRadius: '5px', color: 'white', backgroundColor: '#17173D', }}>&nbsp;&nbsp;&nbsp;글수정</button>
          </div>
        </div>

        <div style={{ width: '75%', height: '1050px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(219, 219, 219)', }}>
            {/* <div> */}
            <div id="roadmapsUpdate_mainDescription"><textarea id="roadmapsUpdate_mainDescriptionInput" placeholder="추천할 대상을 입력하세요."/></div>
          {/* <div id="roadmapsUpdate_mainTitle">제목<input id="roadmapsUpdate_mainTitleInput" /></div>
          <div id="roadmapsUpdate_mainDescription">추천대상<textarea id="roadmapsUpdate_mainDescriptionInput" /></div> */}
            {/* </div> */}
        
          <div style={{ display: 'flex', }}>

            {/* 첫 박스 */}
            <div style={{ width: '5%', height: '680px', textAlign: 'center', backgroundColor: 'rgb(219, 219, 219)', }}></div>
            
            {/* 처음 박스 */}
            <div className="roadmapsUpdate_box" style={{ overflow: 'scroll', width: '40%', height: '680px', borderRadius: '10px', backgroundColor: 'white', }}>
                <div id='roadmapsUpdate_list'>
                  <RoadmapsBox getData={data} lectureId={lectureId} NumF={NumF} />
                </div>
            </div>

            {/* 중간 박스 */}
            <div style={{ width: '10%', height: '680px', textAlign: 'center', backgroundColor: 'rgb(219, 219, 219)', }}>
              {/* <div style={{ width: '80px', height: '80px', margin: '330px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&gt;</div>
              <div style={{ width: '80px', height: '80px', margin: '0px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&lt;</div> */}
            </div>

            {/* 마지막 박스 */}
            <div className= "roadmapsUpdate_box" style={{ overflow: 'scroll', width: '40%', height: '680px', borderRadius: '10px', backgroundColor: 'white', }}>
                <div id='roadmapsUpdate_list2'>
                  <RoadmapsBox2 getData={data} lectureId={lectureId} NumF={NumF} />
                </div>
            </div>
          
          <div id='roadmapsUpdate_lecturesId'></div>
        </div>
      </div>

      <div style={{ width: '75%', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
        <div style={{ width: '100%', margin: '10px 0px 50px 0px', textAlign: 'right', borderRadius: '5px', }}>
        </div>
      </div>
    </div>
  );
}

export default RoadmapsUpdate;