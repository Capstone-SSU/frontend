import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsAdd.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapListF(list) {
  var string = ''
  var roadmaps = ''
  for (var i = 0; i < list.length; i++) {
      roadmaps += 
      "<div id='list_" + list[i].lectureId + "'>" +
        "<div id='roadmapsUpdate_individe" + string + "'"
        if (string === '') {
          roadmaps += " onClick='RoadmapsUpdateAddF(" + list[i].lectureId + ",\"" + list[i].lectureTitle +"\""  + ",\"" + list[i].hashTags +"\");'>"
        } else {
          roadmaps +=">"
        }
      roadmaps += 
          "<div id='roadmapsUpdate_box1'>" +
            "<div id='roadmapsUpdate_picture'></div>" +
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

const RoadmapsAdd = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://54.180.150.167:8080/roadmaps/lectures/' + $('#header_login').val(), {
    }, localStorage.getItem('token'),).then((response2)=>{
      $('#roadmapsUpdate_lecturesId').val([])
      $('#roadmapsUpdate_mainTitleInput').val('')
      $('#roadmapsUpdate_mainDescriptionInput').val('')
      document.getElementById('roadmapsUpdate_list').innerHTML = RoadmapListF(response2.data.data)
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
              console.log($('#roadmapsUpdate_lecturesId').val())
              console.log($('#roadmapsUpdate_mainTitleInput').val())
              console.log($('#roadmapsUpdate_mainDescriptionInput').val())
              if ($('#roadmapsUpdate_lecturesId').val().length === 0 || $('#roadmapsUpdate_mainTitleInput').val() === '' || $('#roadmapsUpdate_mainDescriptionInput').val() === '') {
                alert('빈 칸이 있습니다')
                return
              }
              axios.post('http://54.180.150.167:8080/roadmaps',  {
                "lectureIds": $('#roadmapsUpdate_lecturesId').val(),
                "roadmapRecommendation": $('#roadmapsUpdate_mainDescriptionInput').val(),
                "roadmapTitle": $('#roadmapsUpdate_mainTitleInput').val(),
              }, localStorage.getItem('token'),).then((response)=>{
                  navigate('/roadmaps')
              }).catch((error) => { alert('로드맵 글추가 실패') })
            }} style={{ borderRadius: '5px', color: 'white', backgroundColor: '#17173D', }}>글추가</button>
        </div>
    </div>
  );
}

export default RoadmapsAdd;