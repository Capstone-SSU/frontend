import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Studies.css';
import search from '../search.png';
import write from '../write.png';
import like from '../like.png';
import allowB from '../allowB.png';
import allowT from '../allowT.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function StudiesF(list) {
  var studies = ''; var length = list.length;
  var togetherTrue = document.getElementById('studies_togetherTrue');

  for (var i = 0; i < list.length; i++) {
    if ($(togetherTrue).prop("checked") && list[i].studyRecruitState !== "모집중") {
      length--; continue;
    }
    studies +=
    "<a href='/studies/"+ list[i].studyPostId +"'>" +
      "<div id='studies_individe1'>" +
        "<div id='body_flex' >" +
          "<div id='studies_profill'>" + list[i].studyPostWriter.userProfileImg + "</div>" +
          "<div id='studies_title'>" + list[i].studyTitle + "</div>" +
          // "<img src={" + like + "}/>" +

          "<div id='studies_like'>좋아요 " + list[i].studyLikeCount + "</div>" +
        "</div>" +
        "<div id='body_height'></div>" + 
        "<div id='studies_together'>" + list[i].studyRecruitState + "</div>" + 
        "<div id='studies_location'>" + list[i].studyLocation + "</div>" +
        "<div id='studies_hashtag'>" + list[i].studyCategoryName + "</div>" +
        "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
    "</div><hr/>" +
  "</a>"    
  }
  const element2 = document.getElementById('studies_count')
  element2.innerHTML = "스터디 총 " + length + "개"

  return studies;
}

function SearchF() {
  var link = '?'
  if ($('#studies_catagorySearch').val() != '카테고리') 
    link += 'category='+ $('#studies_catagorySearch').val() +'&'
  if ($('#studies_searchSearch').val() != '') {
    var search = $('#studies_searchSearch').val().split(" ");
    link += "keyword="+ search[0] +"%20"

    for (var i = 1; i < search.length; i++) {
      link += "" + search[i] + "%20"
    }
    link = link.slice(0, -1); link = link.slice(0, -1); link = link.slice(0, -1);
    link += "&"
  }
  if ($('#studies_locationSearch').val() != '지역')
    link += "location="+ $('#studies_locationSearch').val() +"&"
  link = link.slice(0, -1)
  console.log(link)
  
  axios.get('http://54.180.150.167:8080/studies' + link, {

  }).then((response)=>{
    console.log(response)
      const element = document.getElementById('studies_list')
      element.innerHTML = StudiesF(response.data.data)
  }).catch((error) => { alert('스터디 조회 실패했습니다.') })
}

const Studies = () => {
  var navigate = useNavigate();
  axios.get('http://54.180.150.167:8080/studies', {

  }).then((response)=>{
      const element = document.getElementById('studies_list')
      element.innerHTML = StudiesF(response.data.data)
  }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })

  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red'}}>
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'left', }}></div>
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              {/* <img id='studies_imgL' src={allowB} onClick={AllowLF}/> */}
              <select id='studies_locationSearch' className='studies_search'>
                <option>지역</option>
                <option value='서울'>서울</option>
                <option value='경기도'>경기도</option>
                <option value='인천'>인천</option>
              </select>
          </div>

          <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <select id='studies_catagorySearch' className='studies_search'>
              <option>카테고리</option>
              <option value='모각코'>모각코</option>
              <option value='프로그래밍언어'>프로그래밍언어</option>
            </select>
            {/* <Link to=''>
              카테고리
              <img id='studies_imgC' src={allowB} onClick={AllowCF}/>
            </Link> */}
          </div>
          
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'right', }}></div>
          
          <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div style={{ height: '4px'}}></div>
            <div className="studies_searchCatagory">
              <input id='studies_searchSearch' style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='스터디를 입력하세요' />
              <div>
                <div style={{ height: '2px'}}></div>
                <img src={search} style={{ width:'30px', height: '30px',}} onClick={SearchF}/>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
          <div style={{ display: 'flex', }}>
            <img src={write} style={{ margin: '16px 0px 30px 330px', height: '30px', }}/>
            <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
              if(!localStorage.getItem('token')) navigate('/signin')
              else navigate('/studiesAdd')
            }}>
              스터디글 작성하기
            </div>
          </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: '150px',  }}>스터디 개수</div>
            <div style={{ width: '110px', display: 'flex', }}>
              최신순
              <img id='studies_imgN' src={allowB} style={{ width: '20px', height: '20px', }}/>
            </div>
            <div style={{ width: '720px', }}></div>
            
            <label className="switch-button">
              <input id='studies_togetherTrue' type='checkbox' onClick={() => {
                axios.get('http://54.180.150.167:8080/studies', {
                }).then((response)=>{
                    const element = document.getElementById('studies_list')
                    element.innerHTML = StudiesF(response.data.data)
                    const element2 = document.getElementById('studies_count')
                    element2.innerHTML = "스터디 총 " + response.data.data.length + "개"
                }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })
              }}/>
            <span className="onoff-switch"></span>
          </label>

            <div style={{ width: '20px', height: '10px', }}></div><div style={{ width:'220px', }}>모집중인 스터디만 보기</div>
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