import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsUpdate.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapListF(list) {
  var string = ''
  var roadmaps = ''
  for (var i = 0; i < list.length; i++) {
    for(var k = 0; k < $('#roadmapsUpdate_lecturesId').val().length; k++) {
      if ($('#roadmapsUpdate_lecturesId').val()[k] === String(list[i].lectureId)) {
        string = '1'; break;
      }
    }
      roadmaps += 
      "<div id='list_" + list[i].lectureId + "'>" +
        "<div id='roadmapsUpdate_individe" + string + "'"
        if (string === '') {
          roadmaps += " onClick='RoadmapsUpdateAddF(" + list[i].lectureId + ",\"" + list[i].lectureTitle +"\""  + ",\"" + list[i].hashTags +"\",\"" + list[i].thumbnailUrl + "\");'>"
        } else {
          roadmaps +=">"
        }
      roadmaps += 
          "<div id='roadmapsUpdate_box1'>" +
          "<div id='roadmapsUpdate_picture'><img id='roadmapsUpdate_picture2' src='" + list[i].thumbnailUrl + "'/></div>" +
            "<div id='roadmapsUpdate_box2'>" + 
              "<div id='roadmapsUpdate_hashtagBox'>"

      for (var j = 0; j < list[i].hashTags.length; j++) {
          roadmaps +=
                "<div id='roadmapsUpdate_hashtag'>" + list[i].hashTags[j] + "</div>"
      }
          
      roadmaps +=
            "</div><div id='roadmapsUpdate_title'>" + list[i].lectureTitle + "</div>" +
          "</div>" +
        "</div>" +
      "</div>" + 
    "</div>"
    string = ''
  }
  return roadmaps;
}
function RoadmapList2F(list) {
  var lecturesId = []
  var roadmaps = ''
  for (var i = 0; i < list.length; i++) {
    lecturesId[i] = list[i].lectureId
    roadmaps += 
    "<div id='" + list[i].lectureId + "'>" +
    "<div id='roadmapsUpdate_individe3' onClick='RoadmapsUpdateRemoveF(" + list[i].lectureId + ",\"" + list[i].lectureTitle + "\",\"" + list[i].lectureHashtags + "\",\"" + list[i].thumbnailUrl + "\");'>" +
      "<div id='roadmapsUpdate_box1'>" +
      "<div id='roadmapsUpdate_picture'><img id='roadmapsUpdate_picture2' src='" + list[i].thumbnailUrl + "'/></div>" +
        "<div id='roadmapsUpdate_box2'>" + 
          "<div id='roadmapsUpdate_hashtagBox'>"

    for (var j = 0; j < list[i].lectureHashtags.length; j++) {
        roadmaps +=
            "<div id='roadmapsUpdate_hashtag'>" + list[i].lectureHashtags[j] + "</div>"
    }
    roadmaps +=
          "</div><div id='roadmapsUpdate_title'>" + list[i].lectureTitle + "</div>" +
        "</div>" +
      "</div>" +
    "</div>" +
    "</div>"
  }
  $('#roadmapsUpdate_lecturesId').val(lecturesId)
  return roadmaps;
}

const RoadmapsUpdate = () => {
  $("#roadmapsUpdate_mainDescriptionInput").on('keydown keyup', function () {
    $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
  });
  
  const navigate = useNavigate();
  var current = ''
  current += String(decodeURI(window.location.href));
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
    }
    axios.get('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[6]), {

    }, localStorage.getItem('token'),).then((response)=>{
      $('#roadmapsUpdate_mainTitleInput').val(response.data.data.roadmapTitle)
      $('#roadmapsUpdate_mainDescriptionInput').val(response.data.data.roadmapRecommendation)

      document.getElementById('roadmapsUpdate_list2').innerHTML = RoadmapList2F(response.data.data.lectures)

      axios.get('http://54.180.150.167:8080/roadmaps/lectures/' + $('#header_login').val(), {
      }, localStorage.getItem('token'),).then((response2)=>{
        document.getElementById('roadmapsUpdate_list').innerHTML = RoadmapListF(response2.data.data)
      }).catch((error) => {
        if ($('header_login').val() == '') {
          alert('로그인 해주세요')
          navigate('/roadmaps')
        } else {
          alert('오류가 났습니다')
          navigate('/roadmaps')
        }
      })
        
    }).catch((error) => {
      if ($('header_login').val() == '') {
        alert('로그인 해주세요')
        navigate('/roadmaps')
      } else {
        alert('오류가 났습니다')
        navigate('/roadmaps')
      }
    })
  });
  return (
    <div id='body_main'>
      <div style={{ width: 'auto', height: '70px',}}></div>
        <div id='body_center_name' style={{ height: '70px', }}></div>

        <div style={{ width: '75%', height: '50px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', }}>
          <div id="roadmapsUpdate_mainTitle">
            <input id="roadmapsUpdate_mainTitleInput" placeholder="로드맵 제목"/>
            <button onClick={() => {
              if ($('#roadmapsUpdate_lecturesId').val().length === 0 || $('#roadmapsUpdate_mainTitleInput').val() === '' || $('#roadmapsUpdate_mainDescriptionInput').val() === '') {
                alert('빈 칸이 있습니다')
                return
              }
              axios.patch('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[6]),  {
                "lectureIds": $('#roadmapsUpdate_lecturesId').val(),
                "roadmapRecommendation": $('#roadmapsUpdate_mainDescriptionInput').val(),
                "roadmapTitle": $('#roadmapsUpdate_mainTitleInput').val(),
              }, localStorage.getItem('token'),).then((response)=>{
                  navigate('/roadmaps/'+ parseInt(current.split("/")[6]))
              }).catch((error) => { alert('로드맵 글수정 실패') })
            }} style={{ margin: '6px 0px 0px 0px', display: 'flex', float: 'right', alignItems: 'center', borderRadius: '5px', color: 'white', backgroundColor: '#17173D', }}>&nbsp;&nbsp;&nbsp;글수정</button>
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
                <div id='roadmapsUpdate_list'></div>
            </div>

            {/* 중간 박스 */}
            <div style={{ width: '10%', height: '680px', textAlign: 'center', backgroundColor: 'rgb(219, 219, 219)', }}>
              {/* <div style={{ width: '80px', height: '80px', margin: '330px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&gt;</div>
              <div style={{ width: '80px', height: '80px', margin: '0px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&lt;</div> */}
            </div>

            {/* 마지막 박스 */}
            <div className= "roadmapsUpdate_box" style={{ overflow: 'scroll', width: '40%', height: '680px', borderRadius: '10px', backgroundColor: 'white', }}>
                <div id='roadmapsUpdate_list2'></div>
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