import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Lectures.css';
import tempImg from '../mainCoding.png';

import write from '../write.png';
import search from '../search.png';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function NumberF(list, box) {
  var numbers = ''

  for (var i = 8*(box-1); i < 8*box; i++) {
    if (Math.ceil(list.length/25) === i) break;
    numbers += 
    "<div id='studies_numberInner' onClick='$(\"#studies_number\").val(" + (i+1) + ")'>" + (i+1) + "</div>"
  }
  return numbers
}

function LecturesF(list, page) {
  var lectures = ''; var length = list.length;
  document.getElementById('studies_Box').innerHTML = NumberF(list, $('#studies_Box').val())

  for (var j = (page-1)*25; j < page*25; j++) {
    if (list.length === j) break;
    if (j % 5 === 0) lectures += "<div id='body_flex'>"
    lectures +=
    "<a  id='lectures_individeA' href='/lectures/" + list[j].lectureId + "'>" +
      "<div id='lectures_individe'>" +
        "<div id='lectures_imageBox'>" +
          "<div id='lectures_likeBox'></div>" +
          ( list[j].likeCnt != 0 ? "<img class='lectures_img' src='" + likeFill + "'/>" : "<img class='lectures_img' src='" + like + "'/>" ) +
          "<div class='lectures_img'>" + list[j].likeCnt + "</div>" +
        "</div>" +
        "<img id='lectures_box' src='" + list[j].thumbnailUrl + "'/>" +
        "<div id='lectures_title'>" + list[j].lectureTitle + "</div>" +
        '<form class="mb-3" name="myform" id="myform" method="post">' +
        '<div id="body_flex"><fieldset>'

        for (var s = 0; s < Math.round(list[j].avgRate); s++)
          lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
        for (var s = Math.round(list[j].avgRate); s < 5; s++)
          lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
        
        lectures += 
          '<input type="radio" name="reviewStar" />(' + list[j].avgRate + ')</fieldset></div>' +
        '</form>' +
      "</div>" +
    "</a>"
    if (length === j+1) { lectures += "</div>"; break;  }
    if (j % 5 === 4) lectures += "</div>"
  }

  document.getElementById('lectures_count').innerHTML = "강의평 총 " + length + "개";
  return lectures;
}

function HashTagsF(list) {
  var hashtags = ''; var num = 0;
  hashtags += "<div id='body_flex'>"
  for (var i = 0; i < list.length; i++) {
    num++;
    if (num === 1) hashtags += "<div>"
    hashtags += 
    "<div>" +
      '<input type="checkbox" name="hashtag" value="' + list[i].hashtag + '" onClick="LecturesHashtagsF(\'' + list[i].hashtag + '\')"/>' + list[i].hashtag +
    "</div>"
    if (num === 13){ hashtags += "</div>"; num = 0} //13~26
    if (i === list.length-1) hashtags += "<div><div id='lectures_hashtagRemoveAll' onClick='LecturesRemoveF()'>전체취소</div></div></div>";
  }
  return hashtags
}

const Lectures = () => {
  var navigate = useNavigate();
  function SearchF() {
    var length = document.getElementsByName('hashtag').length
    var link = '?'
    if ($('#studies_searchSearch').val() != '') {
      var search = $('#studies_searchSearch').val().split(" ");
      link += "keyword="+ search[0] +"%20"
  
      for (var i = 1; i < search.length; i++) {
        link += "" + search[i] + "%20"
      }
      link = link.slice(0, -1); link = link.slice(0, -1); link = link.slice(0, -1);
      link += "&"
    }
  
    if ($('input[name=hashtag]:checked').val() != undefined) {
      link += 'category='
      for (var i = 0; i < length; i++) {
        if (document.getElementsByName('hashtag')[i].checked === true)
          link += document.getElementsByName('hashtag')[i].value + ","
      }
      link = link.slice(0, -1);
      link += "&"
    }
  
    link = link.slice(0, -1)
    $('#lectures_hashtagSelection2').hide()
    
    axios.get('http://54.180.150.167:8080/lectures' + link, {
  
    }).then((response)=>{
      if (response.data.data === null) {
        alert('강의평이 없습니다.'); return;
      }
      $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/25)/8));
      document.getElementById('lectures_list').innerHTML = LecturesF(response.data.data,1)
      document.getElementById('lectures_count').innerHTML = "로드맵 총 " + response.data.data.length + "개"
    }).catch((error) => { 
      $(':checkbox:checked').prop('checked',false);
      $('.lectures_hashtag').remove();
      navigate('/lectures'); 
      alert('강의평 조회 실패했습니다.'); 
    })
  }
  function Search2F() {
    var length = document.getElementsByName('hashtag').length
    var link = '?'
    if ($('#studies_searchSearch').val() != '') {
      var search = $('#studies_searchSearch').val().split(" ");
      link += "keyword="+ search[0] +"%20"
  
      for (var i = 1; i < search.length; i++) {
        link += "" + search[i] + "%20"
      }
      link = link.slice(0, -1); link = link.slice(0, -1); link = link.slice(0, -1);
      link += "&"
    }
  
    if ($('input[name=hashtag]:checked').val() != undefined) {
      link += 'category='
      for (var i = 0; i < length; i++) {
        if (document.getElementsByName('hashtag')[i].checked === true)
          link += document.getElementsByName('hashtag')[i].value + ","
      }
      link = link.slice(0, -1);
      link += "&"
    }
  
    link = link.slice(0, -1)
    $('#lectures_hashtagSelection2').hide()
    
    axios.get('http://54.180.150.167:8080/lectures' + link, {
  
    }).then((response)=>{
      if (response.data.data === null) {
        alert('강의평이 없습니다.'); return;
      }
      document.getElementById('lectures_list').innerHTML = LecturesF(response.data.data, $('#studies_number').val())
    }).catch((error) => { 
      $(':checkbox:checked').prop('checked',false);
      $('.lectures_hashtag').remove();
      navigate('/lectures'); 
      alert('강의평 조회 실패했습니다.'); 
    })
  }

  axios.get('http://54.180.150.167:8080/lectures', {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('강의평이 없습니다.'); return;
    }
    $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/25)/5));
    document.getElementById('lectures_list').innerHTML = LecturesF(response.data.data, 1)
      
  }).catch((error) => { console.log(error); alert('강의평 페이지에 오류가 있습니다.'); })

  axios.get('http://54.180.150.167:8080/hashtags', {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('강의평이 없습니다.'); return;
    }
    document.getElementById('lectures_hashtagSelection2').innerHTML = HashTagsF(response.data.data)
  }).catch((error) => { alert('해시태그에 오류가 있습니다.'); })

  return (
    <div id="body_main">
      {/* <div class="lecturesReviewAdd_modal1">
        <div style={{ width: '100%', height: '130px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}>
          등록되지 않은 강의입니다.
        </div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          관리자에게 강의를 요청하시겠습니까?
        </div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('#lecturesReviewAdd_link').val(''); $('.lecturesReviewAdd_modal2').show(); $('.lecturesReviewAdd_modal1').hide(); }}>요청하기</button>
        <button class="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('#lecturesReviewAdd_link').val(''); $('.lecturesReviewAdd_modal1').hide() }}>취소</button>
      </div> */}

      <div class="lecturesReviewAdd_modal2">
        <div style={{ width: '100%', height: '93px', lineHeight: '100px', fontSize: '25px', fontWeight: '600', }}>
          등록하고 싶은 강의 링크를 남겨주세요.
        </div>
        <div><input id='lecturesReviewAdd_link'/></div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => {
          
          axios.post('http://54.180.150.167:8080/lectures/request', {
            "lectureUrl" : $('#lecturesReviewAdd_link').val(),
          }).then((response)=>{
            console.log(response)
            $('.lecturesReviewAdd_modal3').show();
          }).catch((error) => {
            $('.lecturesReviewAdd_modal4').show();
          })

          $('.lecturesReviewAdd_modal2').hide();
          $('#lecturesReviewAdd_link').val('');
        }}>등록</button>
        <button class="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('#lecturesReviewAdd_link').val(''); $('.lecturesReviewAdd_modal2').hide() }}>취소</button>
      </div>

      <div class="lecturesReviewAdd_modal3">
        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          관리자에게 요청사항이 전달되었습니다.
        </div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal3').hide() }}>확인</button>
      </div>

      <div class="lecturesReviewAdd_modal4">
        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          이미 등록 요청된 강의입니다.
        </div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal4').hide() }}>확인</button>
      </div>

      <div class="lecturesReviewAdd_modal5">
        <div style={{ width: '100%', height: '93px', lineHeight: '100px', fontSize: '25px', fontWeight: '600', }}>
          이미 등록된 강의입니다.
        </div>
        <div id='lecturesReviewAdd_lecture'></div>
        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal5').hide() }}>확인</button>
      </div>
      
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>

        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'left',}}></div>
        
        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'right', }}></div>
        
        {/* 검색창 담당 */}
        <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px',}}>
          <div style={{ height: '4px', }}></div>
          <div className="studies_searchCatagory">
            <input id='studies_searchSearch' style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='강의평을 입력하세요' />
            <div>
              <div style={{ height: '2px'}}></div>
              <img src={search} style={{ width:'30px', height: '30px',}} onClick={SearchF}/>
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
        <div style={{ height: '10px', }}></div>
        <hr className='lectures_hr'/>
          
          <div id='lectures_hashtagSearch'>
            <div id='body_flex'>
              <div id='lectures_hashtagSelection3'></div>
              <div id='lectures_hashtagSelection' onClick={() => {
                if ($('#lectures_hashtagSelection2').css("display") === "none")
                  $('#lectures_hashtagSelection2').show()
                else {
                  $('#lectures_hashtagSelection2').hide()
                  // $(':checkbox:checked').prop('checked',false);
                  // $('.lectures_hashtag').remove()
                }
              }}>.&nbsp;.&nbsp;.</div>
            </div>
           
            <div id='lectures_hashtagSelection2'>
            </div>
          </div>
          
        <hr className='lectures_hr'/>
        <div style={{ height: '10px', }}></div>
      </div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        {/* <div style={{ margin: '16px 0px 8px 0px', height: '30px', }}></div> */}
        <div style={{ display: 'flex', }}>
          <div style={{ width: '17%', }}></div>
          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            $('.lecturesReviewAdd_modal2').show();
          }}>
            강의 추가하기
          </div>

          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(!localStorage.getItem('token')) navigate('/signin')
            else navigate('/lecturesReviewAdd/0')
          }}>
            강의평 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='lectures_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>강의평 개수</div>
          </div>

          <div id='lectures_list'></div>

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


export default Lectures;