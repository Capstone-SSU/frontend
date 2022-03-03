import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Studies.css';
import logo from '../logo.png';
import search from '../search.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function studiesF(list) {
  var studies = '';

  console.log(list)
  for (var i = 0; i < list.length; i++) {
    studies +=
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

  return studies;
}

const Studies = () => {
  axios.get('http://54.180.150.167:8080/studies', {

  }).then((response)=>{
      const element = document.getElementById('studies_list')
      element.innerHTML = studiesF(response.data.data)
      const element2 = document.getElementById('studies_count')
      element2.innerHTML = "스터디 총 " + response.data.data.length + "개"
  }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })

  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red'}}>
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', }}></div>
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}><a href=''>지역^</a></div>
          <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}><a href=''>카테고리^</a></div>
          
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'right', }}></div>
          <div style={{ width: '500px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div className="studies_searchCatagory">
              <input style={{ border: '0', }} placeholder='스터디를 입력하세요' />
              <img src={search}/>
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          <Link to="/studiesAdd"><div style={{ height: '70px', lineHeight: '60px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }}>스터디글 작성하기</div></Link>
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: '150px',  }}>스터디 개수</div>
            <div style={{ width:'70px', }}>최신순^</div>
            <div style={{ width:'200px', }}>모집 중인 스터디만 보기</div>
          </div>

          <div id='studies_list'>
          </div><hr/>

          <div style={{ height: '100px', textAlign: 'center', }}></div>
          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }}>

                </div>
                <div id='studies_number1'>1</div>
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

export default Studies;