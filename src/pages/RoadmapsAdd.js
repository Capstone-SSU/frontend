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
  $("#roadmapsUpdate_mainDescriptionInput").on('keydown keyup', function () {
    $(this).height(1).height( $(this).prop('scrollHeight')+12 );	
  });

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

    axios.get('http://54.180.150.167:8080/roadmaps/' + $('#header_login').val() + '/company', {
    }).then((response)=>{
      console.log(response.data.message)
      if (response.data.message == '소속인증 요청 필요') {
        $('.roadmapsAdd_modal1').show()
      } else {
        $('.roadmapsAdd_modal1').hide()
      }
    }).catch((error) => { alert('소속인증 가져오기 실패') })
  });

  return (
    <div id='body_main'>
      <div class="roadmapsAdd_modal1">
        <div style={{ width: '100%', height: '130px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}>
          로드맵 작성 시 소속인증 표시가 가능한데
        </div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          하러가실래요?
        </div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => {
          navigate('/users')
          $('.roadmapsAdd_modal1').hide()
        }}>확인</button>
        <button class="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => {
          if ($('input:radio[name="no"]').is(':checked')) {
            axios.post('http://54.180.150.167:8080/roadmaps/' + $('#header_login').val() + '/company', {
            }).then((response)=>{
            }).catch((error) => { alert('소속인증 거부 실패') })
          }
          $('.roadmapsAdd_modal1').hide()
          }}>취소</button>
        <div style={{ margin: '15px 0px 0px 0px', }}><input type='radio' name='no'/>더 이상 보지 않기</div>
      </div>

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
                axios.post('http://54.180.150.167:8080/roadmaps',  {
                  "lectureIds": $('#roadmapsUpdate_lecturesId').val(),
                  "roadmapRecommendation": $('#roadmapsUpdate_mainDescriptionInput').val(),
                  "roadmapTitle": $('#roadmapsUpdate_mainTitleInput').val(),
                }, localStorage.getItem('token'),).then((response)=>{
                    navigate('/roadmaps')
                }).catch((error) => { alert('로드맵 글추가 실패') })
            }} style={{ margin: '6px 0px 0px 0px', display: 'flex', float: 'right', alignItems: 'center', borderRadius: '5px', color: 'white', backgroundColor: '#17173D', }}>&nbsp;&nbsp;&nbsp;글추가</button>
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
        <div style={{ width: '100%', margin: '10px 0px 50px 0px', textAlign: 'right', borderRadius: '5px', }}></div>
      </div>
    </div>
  );
}

export default RoadmapsAdd;