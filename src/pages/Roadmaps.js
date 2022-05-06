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
  var roadmaps = ''; var length = list.length;

  document.getElementById('studies_Box').innerHTML = NumberF(list, $('#studies_Box').val())

  for (var i = 5*(page-1); i < 5*page; i++) {
    if (list.length === i) break
    roadmaps +=
    "<a href='/roadmaps/"+ list[i].roadmapId +"'>" +
    "<div id='roadmaps_individe1'>" +
      "<div id='body_flex' >" +
        "<div id='roadmaps_title'>" + list[i].roadmapTitle + "<div id='roadmaps_company'>" + list[i].roadmapWriterCompany + "</div></div>" +
      "</div>" +
      "<div id='body_height'></div>" + 
      "<div id='roadmaps_Box1' >"

      for (var j = 0; j < list[i].lectureThumbnails.length; j++) {
        roadmaps += 
          "<img id='roadmaps_lectureThumbnails' src='" + list[i].lectureThumbnails[j] + "'/>"
      }

      roadmaps += "</div>" +
      "<div id='body_height'></div>" + 
      // "<div id='body_flex'>" +
        "<div id='roadmaps_nickname'>" + list[i].roadmapWriterNickname + "</div>" + 
        "<div id='roadmaps_date'>" + list[i].roadmapCreatedDate.slice(0, 10)  + "</div>" +
        '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].roadmapLikeCount + '</div>' +
      // "</div>" +
   "</div><hr/>" +
   "</a>"
  }
  document.getElementById('studies_count').innerHTML = "로드맵 총 " + length + "개"

  return roadmaps;
}

function SearchF() {
  var link = '?'
  if ($('#studies_searchSearch').val() != '') {
    var search = $('#studies_searchSearch').val().split(" ");
    link += "keyword="+ search[0] +"%20"

    for (var i = 1; i < search.length; i++) {
      link += "" + search[i] + "%20"
    }
    link = link.slice(0, -1); link = link.slice(0, -1); link = link.slice(0, -1);
  }
  
  axios.get('http://54.180.150.167:8080/roadmaps' + link, {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('로드맵이 없습니다.'); return;
    }
    $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/5)/8));
    document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data,1)
    document.getElementById('studies_count').innerHTML = "로드맵 총 " + response.data.data.length + "개"
  }).catch((error) => { alert('로드맵 조회 실패했습니다.') })
}
function Search2F() {
  var link = '?'
  if ($('#studies_searchSearch').val() != '') {
    var search = $('#studies_searchSearch').val().split(" ");
    link += "keyword="+ search[0] +"%20"

    for (var i = 1; i < search.length; i++) {
      link += "" + search[i] + "%20"
    }
    link = link.slice(0, -1); link = link.slice(0, -1); link = link.slice(0, -1);
  }
  
  axios.get('http://54.180.150.167:8080/roadmaps' + link, {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('로드맵이 없습니다.'); return;
    }
    document.getElementById('roadmaps_list').innerHTML = RoadmapF(response.data.data,$('#studies_number').val())
  }).catch((error) => { alert('로드맵 조회 실패했습니다.') })
}

const Roadmaps = () => {
  var navigate = useNavigate();
  useEffect(() => {
    axios.get('http://54.180.150.167:8080/roadmaps', {

    },).then((response)=>{
      if (response.data.data === null) {
        alert('로드맵이 없습니다.'); return;
      }
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
                
        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'left',}}></div>
        
        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'right', }}></div>
        
        {/* 검색창 담당 */}
        <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px',}}>
          <div style={{ height: '4px', }}></div>
          <div className="studies_searchCatagory">
            <input id='studies_searchSearch' style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='로드맵을 입력하세요' />
            <div>
              <div style={{ height: '2px'}}></div>
              <img src={search} style={{ width:'30px', height: '30px',}} onClick={SearchF}/>
            </div>
          </div>
        </div>
        
        
      </div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        <div style={{ display: 'flex', }}>
          <div style={{ width: '17%', }}></div>
          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(!localStorage.getItem('token')) navigate('/signin')
            else navigate('/roadmapsAdd')
          }}>
            로드맵 작성하기
          </div>
        </div>

        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>

          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>로드맵 개수</div>
          </div>

          <div id='roadmaps_list'></div>

          <div style={{ height: '100px', textAlign: 'center', }}></div>

          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>

              <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === '1') return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)-1)
                  
                  Search2F()
                }}>
                </div>
                <div id='studies_number' onClick={() => {
                  Search2F()
                }}><div id='studies_Box'></div></div>
                <div id='studies_max'></div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === $('#studies_max').val()) return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)+1)

                  Search2F()
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