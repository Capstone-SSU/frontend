import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Roadmaps.css';
import search from '../search.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapF(list) {
  var roadmaps = '';

  console.log(list)
  for (var i = 0; i < list.length; i++) {
    roadmaps +=
    "<a href='/studies/"+ list[i].studyPostId +"'>" +
    "<div id='studies_individe1'>" +
      "<div id='body_flex' >" +
        "<div id='studies_profill'>" + list[i].studyPostWriter.userProfileImg + "</div>" +
        "<div id='studies_title'>" + list[i].studyTitle + "</div>" +
        "<div id='studies_like'>" + list[i].studyLikeCount + "</div>" +
      "</div>" +
      "<div id='body_height'></div>" + 
      "<div id='body_flex' >" +
        "<div id='studies_together'>" + list[i].studyRecruitState + "</div>" + 
        "<div id='studies_location'>" + list[i].studyLocation + "</div>" +
        "<div id='studies_hashtag'>" + list[i].studyCategoryName + "</div>" +
        "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
      "</div>" +
  "</div><hr/>" +
  "</a>"

    
  }

  return roadmaps;
}

const Roadmaps = () => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
    }
    axios.get('http://54.180.150.167:8080/roadmaps', {

    }, localStorage.getItem('token'),).then((response)=>{
      console.log(response)
        // const element = document.getElementById('studies_list')
        // element.innerHTML = RoadmapF(response.data.data)
        // const element2 = document.getElementById('studies_count')
        // element2.innerHTML = "스터디 총 " + response.data.data.length + "개"
    }).catch((error) => { alert('로드맵페이지에 오류가 있습니다.') })
    
  });

  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/roadmaps">로드맵</Link></div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
        
        <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red'}}>
          <div style={{ width: '500px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div className="roadmap_searchCatagory">
              <input style={{ border: '0', }} placeholder='스터디를 입력하세요' />
              <img src={search}/>
            </div>
          </div>
        </div>
        
      </div>

          <div id='roadmap_list'>
          </div><hr/>

          <div style={{ height: '100px', textAlign: 'center', }}></div>
          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }}>

                </div>
                <div id='roadmap_number1'>1</div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }}>
                  
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Roadmaps;