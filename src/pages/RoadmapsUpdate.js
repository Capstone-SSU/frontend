import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsUpdate.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapListF(list) {
  var string = '';
  var roadmaps = ''
  for (var i = 0; i < list.length; i++) {
    for(var k = 0; k < $('#roadmapsUpdate_lecturesId').val().length; k++) {
      if ($('#roadmapsUpdate_lecturesId').val()[k] === String(list[i].lectureId)) {
        string = '1'; break;
      }
    }
      roadmaps += 
      "<div id='roadmapsUpdate_individe" + string + "'"
      if (string === '') {
        roadmaps += " onClick='RoadmapsUpdateAddF(" + list[i].lectureId + ",\"" + list[i].lectureTitle +"\""  + ",\"" + list[i].hashTags +"\");'>"
      } else {
        roadmaps +=">"
      }
      roadmaps += 
      "<div id='roadmapsUpdate_lectureId'>" + list[i].lectureId + "</div>" +
      "<div id='roadmapsUpdate_box1'>" +
        "<div id='roadmapsUpdate_picture'></div>" +
        "<div id='roadmapsUpdate_box2'><div id='roadmapsUpdate_hashtagBox'>"

      for (var j = 0; j < list[i].hashTags.length; j++) {
          roadmaps +=
          "<div id='roadmapsUpdate_hashtag'>" + list[i].hashTags[j] + "</div>"
      }
          
      roadmaps +=
          "</div><div id='roadmapsUpdate_title'>" + list[i].lectureTitle + "</div>" +
        "</div>" +
      "</div>" +
    "</div><hr/>"
  }
  return roadmaps;
}
function RoadmapList2F(list) {
  var lecturesId = []
  var roadmaps = ''
  for (var i = 0; i < list.length; i++) {
    lecturesId[i] = list[i].lectureId
    roadmaps += 
    "<div id='roadmapsUpdate_individe3' onClick='RoadmapsUpdateRemoveF(" + list[i].lectureId + ");'>" +
    "<div id='" + list[i].lectureId + "'>" +
      "<div id='roadmapsUpdate_box1'>" +
        "<div id='roadmapsUpdate_picture'></div>" +
        "<div id='roadmapsUpdate_box2'><div id='roadmapsUpdate_hashtagBox'>"

    for (var j = 0; j < list[i].lectureHashtags.length; j++) {
        roadmaps +=
        "<div id='roadmapsUpdate_hashtag'>" + list[i].lectureHashtags[j] + "</div>"
    }
        
    roadmaps +=
          "</div><div id='roadmapsUpdate_title'>" + list[i].lectureTitle + "</div>" +
        "</div>" +
      "</div>" +
    "<hr/></div>" +
  "</div>"
  }
  $('#roadmapsUpdate_lecturesId').val(lecturesId)
  return roadmaps;
}

const RoadmapsUpdate = () => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
      if (localStorage.getItem('token')) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
      }
      axios.get('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[4]), {

      }, localStorage.getItem('token'),).then((response)=>{
          $('#roadmapsUpdate_mainTitleInput').val(response.data.data.roadmapTitle)
          $('#roadmapsUpdate_mainDescriptionInput').val(response.data.data.roadmapRecommendation)

          document.getElementById('roadmapsUpdate_list2').innerHTML = RoadmapList2F(response.data.data.lectures)

          axios.get('http://54.180.150.167:8080/roadmaps/lectures/' + $('#header_login').val(), {
          }, localStorage.getItem('token'),).then((response2)=>{
              document.getElementById('roadmapsUpdate_list').innerHTML = RoadmapListF(response2.data.data)
          }).catch((error) => {
              alert('로그인 해주세요')
              navigate('/roadmaps')
          })
          
      }).catch((error) => {
          alert('로그인 해주세요')
          navigate('/roadmaps')
      })
    });
  return (
    <div id='body_main'>
      <div style={{ width: '1400px', height: '70px', backgroundColor: 'red',}}></div>
        <div id='body_center_name' style={{ height: '70px', }}></div>

        <div style={{ width: '1400px', height: '1050px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(219, 219, 219)', }}>

            <div style={{ display: 'inline-block'}}>
                <div id="roadmapsUpdate_mainTitle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제목<input id="roadmapsUpdate_mainTitleInput" style={{ width: '1100px', borderRadius: '10px', backgroundColor: 'white', }}/></div>
                <div id="roadmapsUpdate_mainDescription">추천대상<input id="roadmapsUpdate_mainDescriptionInput" style={{ width: '1100px', borderRadius: '10px', backgroundColor: 'white', }}/></div>
            </div>
        
            <div style={{ display: 'flex', }}>

            {/* 첫 박스 */}
            <div style={{ width: '100px', height: '680px', textAlign: 'center', backgroundColor: 'rgb(219, 219, 219)', }}></div>
            
            {/* 처음 박스 */}
            <div className="roadmapsUpdate_box" style={{ overflow: 'scroll', overflowX: 'hidden', width: '500px', height: '680px', borderRadius: '10px', backgroundColor: 'white', }}>
                <div id='roadmapsUpdate_list'></div>
            </div>

            {/* 중간 박스 */}
            <div style={{ width: '200px', height: '680px', textAlign: 'center', backgroundColor: 'rgb(219, 219, 219)', }}>
              <div style={{ width: '80px', height: '80px', margin: '330px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&gt;</div>
              <div style={{ width: '80px', height: '80px', margin: '0px 60px 20px 60px', fontSize: '48px', fontWeight: 'bolder', borderRadius: '10px', color: 'white', backgroundColor: '#17173D', }}>&lt;</div>
            </div>

            {/* 마지막 박스 */}
            <div className= "roadmapsUpdate_box" style={{ overflow: 'scroll', overflowX: 'hidden', width: '500px', height: '680px', borderRadius: '10px', backgroundColor: 'white', }}>
                <div id='roadmapsUpdate_list2'></div>
            </div>
          
          <div id='roadmapsUpdate_lecturesId'></div>
          </div>
      </div>

        <div style={{ width: '1650px', margin: '10px 0px 50px 0px', textAlign: 'right', }}>
            <button onClick={() => {
              if ($('#roadmapsUpdate_lecturesId').val() === [] || $('#roadmapsUpdate_mainTitleInput').val() === '' || $('#roadmapsUpdate_mainDescriptionInput').val() === '') {
                alert('빈 칸이 있습니다')
                return
              }
              if (localStorage.getItem('token')) {
                  axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
              }
              axios.patch('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[4]),  {
                  "lectureIds": $('#roadmapsUpdate_lecturesId').val(),
                    "roadmapRecommendation": $('#roadmapsUpdate_mainDescriptionInput').val(),
                    "roadmapTitle": $('#roadmapsUpdate_mainTitleInput').val(),
              }, localStorage.getItem('token'),).then((response)=>{
                  navigate('/roadmaps/'+ parseInt(current.split("/")[4]))
              }).catch((error) => { alert('로드맵 글수정 실패') })
            }} style={{ borderRadius: '5px', color: 'white', backgroundColor: '#17173D', }}>글수정</button>
        </div>
    </div>
  );
}

export default RoadmapsUpdate;