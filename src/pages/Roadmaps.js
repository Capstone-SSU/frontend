import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Roadmaps.css';
import like from '../like.png';
import search from '../search.png';
import write from '../write.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function NumberF(list, box) {
  var numbers = ''

  for (var i = 8*(box-1); i < 8*box; i++) {
    if (Math.ceil(list.length/5) === i) break;
    numbers += 
    "<div id='studies_numberInner' onClick='$(\"#studies_number\").val(" + (i+1) + ")'>" + (i+1) + "</div>"
  }
  return numbers
}

function RoadmapF(list, page) {
  var roadmaps = '';

  document.getElementById('studies_Box').innerHTML = NumberF(list, $('#studies_Box').val())

  for (var i = 5*(page-1); i < 5*page; i++) {
    if (list.length === i) break
    roadmaps +=
    "<a href='/roadmaps/"+ list[i].roadmapId +"'>" +
    "<div id='roadmaps_individe1'>" +
      "<div id='body_flex' >" +
        "<div id='roadmaps_title'>" + list[i].roadmapTitle + "<div id='roadmaps_company'>" + list[i].roadmapWriterCompany + "</div></div>" +
        '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].roadmapLikeCount + '</div>' +
        "</div>" +
      "<div id='body_height'></div>" + 
      "<div id='body_flex' >"

      for (var j = 0; j < list[i].lectureThumbnails.length; j++) {
        roadmaps += 
          "<div id='roadmaps_lectureThumbnails'>" + list[i].lectureThumbnails[j] + "</div>"
      }

      roadmaps += "</div>" +
      "<div id='body_height'></div>" + 
      "<div id='body_flex' >" +
        "<div id='roadmaps_nickname'>" + list[i].roadmapWriterNickname + "</div>" + 
        "<div id='roadmaps_date'>" + list[i].roadmapCreatedDate.slice(0, 10)  + "</div>" +
        "</div>" +
   "</div><hr/>" +
   "</a>"
  }

  return roadmaps;
}

function SearchF() {
  
}

const Roadmaps = () => {
  var navigate = useNavigate();
  useEffect(() => {
    axios.get('http://54.180.150.167:8080/roadmaps', {

    }, localStorage.getItem('token'),).then((response)=>{
      $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/5)/8));
      document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data,1)
    }).catch((error) => { alert('로드맵페이지에 오류가 있습니다.') })
    
  });

  return (
    <div id='body_main'>
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      {/* <div id='body_center_name' style={{ textAlign: 'left', }}>로드맵</div> */}

      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red'}}>
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'left', }}></div>
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
              <select id='studies_locationSearch' className='studies_search'>
                <option>지역</option>
                <option value='서울'>서울</option>
                <option value='경기'>경기</option>
                <option value='인천'>인천</option>
                <option value='대구'>대구</option>
                <option value='광주'>광주</option>
                <option value='대전'>대전</option>
                <option value='울산'>울산</option>
                <option value='세종'>세종</option>
                <option value='강원'>강원</option>
                <option value='충북'>충북</option>
                <option value='충남'>충남</option>
                <option value='전북'>전북</option>
                <option value='전남'>전남</option>
                <option value='경북'>경북</option>
                <option value='경남'>경남</option>
                <option value='부산'>부산</option>
                <option value='제주'>제주</option>
              </select>
          </div>

          <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <select id='studies_categorySearch' className='studies_search'>
              <option>카테고리</option>
              <option value='모각코'>모각코</option>
              <option value='코딩테스트'>코딩테스트</option>
              <option value='사이드 프로젝트'>사이드 프로젝트</option>
              <option value='공모전'>공모전</option>
              <option value='프로그래밍언어'>프로그래밍언어</option>
              <option value='강의완독'>강의완독</option>
              <option value='로드맵공략'>로드맵공략</option>
              <option value='자격증'>자격증</option>
            </select>
          </div>
          
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'right', }}></div>
          
          <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div style={{ height: '4px'}}></div>
            <div className="roadmaps_searchCatagory">
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
              else navigate('/roadmapsAdd')
            }}>
              로드맵글 작성하기
            </div>
          </div>
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>


          <div id='roadmaps_list'>
          </div>

          <div style={{ height: '100px', textAlign: 'center', }}></div>

          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>

              <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === '1') return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)-1)
                  axios.get('http://54.180.150.167:8080/roadmaps', {

                  }, localStorage.getItem('token'),).then((response)=>{
                      document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data, $('#studies_number').val())
                  }).catch((error) => { alert('로드맵페이지에 오류가 있습니다.') })
                }}>
                </div>
                <div id='studies_number' onClick={() => {
                  axios.get('http://54.180.150.167:8080/roadmaps', {

                  }, localStorage.getItem('token'),).then((response)=>{
                      document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data, $('#studies_number').val())
                  }).catch((error) => { alert('로드맵페이지에 오류가 있습니다.') })
                }}><div id='studies_Box'></div></div>
                <div id='studies_max'></div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === $('#studies_max').val()) return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)+1)
                  axios.get('http://54.180.150.167:8080/roadmaps', {

                  }, localStorage.getItem('token'),).then((response)=>{
                      document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data, $('#studies_number').val())
                  }).catch((error) => { alert('로드맵페이지에 오류가 있습니다.') })
                }}>
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