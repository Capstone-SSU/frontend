import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Lectures.css';
import LecturesElements from './LecturesElements';
import LecturesRElements from "./LecturesRElements";

import tempImg from '../mainCoding.png';
import write from '../write.png';
import search from '../search.png';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

var list1 = []; var list2 = []; var list3 = []; var list4 = []; var list5 = [];
var listR1 = []; var listR2 = []; var listR3 = []; var listR4 = []; var listR5 = [];

function NumberF(list, box) {
  var numbers = ''

  for (var i = 8*(box-1); i < 8*box; i++) {
    if (Math.ceil(list.length/20) === i) break;
    numbers += 
    "<div id='studies_numberInner' onClick='$(\"#studies_number\").val(" + (i+1) + ")'>" + (i+1) + "</div>"
  }
  return numbers
}

function LecturesF(list, page) {
  var length = list.length;
  document.getElementById('studies_Box').innerHTML = NumberF(list, $('#studies_Box').val())
  document.getElementById('lectures_count').innerHTML = "강의 총 " + length + "개";

}

function HashTagsF(list) {
  var hashtags = ''; var num = 0;
  hashtags += "<div id='body_flex'>"
  for (var i = 0; i < list.length; i++) {
    num++;
    if (num === 1) hashtags += "<div>"
    hashtags += 
    "<div class='lectures_hashtagElements'>" +
      '<input type="checkbox" name="hashtag" value="' + list[i].hashtag + '" onClick="LecturesHashtagsF(\'' + list[i].hashtag + '\')"/>' + list[i].hashtag +
    "</div>"
    if (num === 24){ hashtags += "</div>"; num = 0} //13~26
    if (i === list.length-1) hashtags += "<div><div id='lectures_hashtagRemoveAll' onClick='LecturesRemoveF()'>전체취소</div></div></div>";
  }
  return hashtags
}

function SearchF(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5) {
  var length = document.getElementsByName('hashtag').length
  var link = ''
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
  
  $('#lectures_searchLinkCenter').val(link)
  axios.get('http://54.180.150.167:8080/lectures?' + $('#lectures_searchLinkCenter').val(), {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('강의평이 없습니다.'); return;
    }
    $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/20)/8));
    for (var i = 0; i < response.data.data.length; i++) {
      list1.push(response.data.data[i].lectureId);
      list2.push(response.data.data[i].likeCnt);
      list3.push(response.data.data[i].thumbnailUrl);
      list4.push(response.data.data[i].lectureTitle);
      list5.push(response.data.data[i].avgRate);
    }

    LecturesF(response.data.data, 1)
    setLectures1(list1.reverse()); setLectures2(list2.reverse()); setLectures3(list3.reverse()); setLectures4(list4.reverse()); setLectures5(list5.reverse());
    list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0);
    document.getElementById('lectures_count').innerHTML = "강의 총 " + response.data.data.length + "개"
    
  }).catch((error) => { 
    $(':checkbox:checked').prop('checked',false);
    $('.lectures_hashtag').remove();
    // navigate('/lectures'); 
    alert('강의평 조회 실패했습니다.'); 
  })
}
function Search2F(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5) {
  var length = document.getElementsByName('hashtag').length
  var link = '&'
  if ($('#studies_searchSearch').val() != '') {
    var search = $('#studies_searchSearch').val().split(" ");
    link += "keyword="+ search[0] +"%20"

    for (var i = 1; i < search.length; i++) {
      link += "" + search[i] + "%20"
    }
    link = link.slice(0, -1); link = link.slice(0, -1);
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
  
  axios.get('http://54.180.150.167:8080/lectures?' + $('#lectures_searchLinkCenter').val(), {

  }).then((response)=>{
    if (response.data.data === null) {
      alert('강의평이 없습니다.'); return;
    }
    for (var i = 0; i < response.data.data.length; i++) {
      list1.push(response.data.data[i].lectureId);
      list2.push(response.data.data[i].likeCnt);
      list3.push(response.data.data[i].thumbnailUrl);
      list4.push(response.data.data[i].lectureTitle);
      list5.push(response.data.data[i].avgRate);
    }

    LecturesF(response.data.data, 1)
    setLectures1(list1.reverse()); setLectures2(list2.reverse()); setLectures3(list3.reverse()); setLectures4(list4.reverse()); setLectures5(list5.reverse());
    list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0);
  }).catch((error) => { 
    $(':checkbox:checked').prop('checked',false);
    $('.lectures_hashtag').remove();
    // navigate('/lectures'); 
    alert('강의평 조회 실패했습니다.'); 
  })
}

function Lectures () {
  const [lectures1, setLectures1] = useState([]); const [lectures2, setLectures2] = useState([]); const [lectures3, setLectures3] = useState([]); const [lectures4, setLectures4] = useState([]); const [lectures5, setLectures5] = useState([]);
  const [lecturesR, setLecturesR] = useState([]);
  const [lecturesRlist1, setLecturesRlist1] = useState([]); const [lecturesRlist2, setLecturesRlist2] = useState([]); const [lecturesRlist3, setLecturesRlist3] = useState([]); const [lecturesRlist4, setLecturesRlist4] = useState([]); const [lecturesRlist5, setLecturesRlist5] = useState([]);

  var navigate = useNavigate();
  useEffect(() => {
    axios.get('http://54.180.150.167:8080/lectures', {
    }).then((response)=>{
      if (response.data.data === null) {
        alert('강의평이 없습니다.'); return;
      }
      $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/20)/8));
      for (var i = 0; i < response.data.data.length; i++) {
        list1.push(response.data.data[i].lectureId);
        list2.push(response.data.data[i].likeCnt);
        list3.push(response.data.data[i].thumbnailUrl);
        list4.push(response.data.data[i].lectureTitle);
        list5.push(response.data.data[i].avgRate);
      }

      LecturesF(response.data.data, 1)
      setLectures1(list1.reverse()); setLectures2(list2.reverse()); setLectures3(list3.reverse()); setLectures4(list4.reverse()); setLectures5(list5.reverse());
      list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0);

    }).catch((error) => { alert('강의평 페이지에 오류가 있습니다.'); })

    axios.get('http://54.180.150.167:8080/recommended-lectures', {
    }, localStorage.getItem('token'),).then((response)=>{
      if (response.data.data === null) {
        // alert('추천 강의평이 없습니다.'); 
        return;
      }
      for (var i = 0; i < response.data.data.length; i++) {
        listR1.push(response.data.data[i].lectureId)
        listR2.push(response.data.data[i].likeCnt)
        listR3.push(response.data.data[i].thumbnailUrl)
        listR4.push(response.data.data[i].lectureTitle)
        listR5.push(response.data.data[i].avgRate)
      }
      $('#studiesR_number').val('1'); $('#studiesR_max').val(Math.ceil(response.data.data.length/5));
      setLecturesRlist1(listR1); setLecturesRlist2(listR2); setLecturesRlist3(listR3); setLecturesRlist4(listR4); setLecturesRlist5(listR5);
      listR1 = listR1.slice(0,0); listR2 = listR2.slice(0,0); listR3 = listR3.slice(0,0); listR4 = listR4.slice(0,0); listR5 = listR5.slice(0,0);
    }).catch((error) => { 
      $('#studiesR_number').val('0'); 
      if (error == 'Error: Request failed with status code 500') {
        return;
      } else if (error == 'Error: Request failed with status code 401') {
        return;
      } else {
        alert('강의평 페이지에 오류가 있습니다.'); 
      }
    })

    axios.get('http://54.180.150.167:8080/hashtags', {
    }).then((response)=>{
      if (response.data.data === null) {
        alert('강의평이 없습니다.'); return;
      }
      document.getElementById('lectures_hashtagSelection2').innerHTML = HashTagsF(response.data.data)
    }).catch((error) => { alert('해시태그에 오류가 있습니다.'); })
  }, []);

  return (
    <div className="App">
    <div id="body_main">
      <div id="lectures_searchLinkCenter"></div>
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
            $('.lecturesReviewAdd_modal3').show();
            $('#lecturesReviewAdd_link').val('');
          }).catch((error) => {
            if (error == 'Error: Request failed with status code 409') {
              axios.post('http://54.180.150.167:8080/lectures/url', {
                "lectureUrl" : $('#lecturesReviewAdd_link').val(),
              }).then((response)=>{
                if (response.data.message == "중복된 링크가 없습니다.")
                  $('.lecturesReviewAdd_modal4').show()
                else {
                  $('.lecturesReviewAdd_modal5').show()
                  document.getElementById('lecturesReviewAdd_lecture').innerHTML = 
                    "<div>" + response.data.data.lectureTitle + "</div>"
                }
              }).catch((error) => {
              })
            }
            $('#lecturesReviewAdd_link').val('');
          })

          $('.lecturesReviewAdd_modal2').hide();
          // $('#lecturesReviewAdd_link').val('');
        }}>등록</button>
        <button class="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('#lecturesReviewAdd_link').val(''); $('.lecturesReviewAdd_modal2').hide() }}>취소</button>
      </div>

      <div class="lecturesReviewAdd_modal3">
        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          요청이 등록되었습니다.
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
        <div id='lecturesReviewAdd_lecture'>
        </div>
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
              <img src={search} style={{ width:'30px', height: '30px',}} onClick={() => { SearchF(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5) }}/>
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
           
            <div class='lectures_section' id='lectures_hashtagSelection2'></div>
          </div>
          
        <hr className='lectures_hr'/>
        <div style={{ height: '10px', }}></div>
      </div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        <div style={{ display: 'flex', }}>
          <div style={{ width: '17%', }}></div>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }}>추천 강의</div>
        </div>
        <div style={{ width: '67%', height: 'auto', display: 'inline-block', }}>
          <div id='body_flex'>
            <div id='lectures_allow1' style={{ height: '215px', lineHeight: '215px', color: 'rgb(190, 190, 190)', fontSize: '60px', fontWeight: '700', }} onClick={()=>{
              if($('#studiesR_number').val() == 1) return;
              $('#studiesR_number').val($('#studiesR_number').val()-1)
              axios.get('http://54.180.150.167:8080/recommended-lectures', {

              }, localStorage.getItem('token'),).then((response)=>{
                if (response.data.data === null) {
                  alert('추천 강의평이 없습니다.'); return;
                }
                for (var i = 0; i < response.data.data.length; i++) {
                  listR1.push(response.data.data[i].lectureId)
                  listR2.push(response.data.data[i].likeCnt)
                  listR3.push(response.data.data[i].thumbnailUrl)
                  listR4.push(response.data.data[i].lectureTitle)
                  listR5.push(response.data.data[i].avgRate)
                }
                setLecturesRlist1(listR1); setLecturesRlist2(listR2); setLecturesRlist3(listR3); setLecturesRlist4(listR4); setLecturesRlist5(listR5);
                listR1 = listR1.slice(0,0); listR2 = listR2.slice(0,0); listR3 = listR3.slice(0,0); listR4 = listR4.slice(0,0); listR5 = listR5.slice(0,0);
              }).catch((error) => { 
                if (error == 'Error: Request failed with status code 500') {
                  return;
                } else if (error == 'Error: Request failed with status code 401') {
                  return;
                } else {
                  alert('강의평 페이지에 오류가 있습니다.'); 
                }
              })
            }}>&lt;</div>
            <LecturesRElements list={[lecturesRlist1, lecturesRlist2, lecturesRlist3, lecturesRlist4, lecturesRlist5, $('#studiesR_number').val()]}/>
            <div id='lectures_allow2' style={{ height: '215px', lineHeight: '215px', color: 'rgb(190, 190, 190)', fontSize: '60px', fontWeight: '700', }} onClick={()=>{
              if($('#studiesR_number').val() == $('#studiesR_max').val()) return;
              $('#studiesR_number').val(parseInt($('#studiesR_number').val())+1)
              axios.get('http://54.180.150.167:8080/recommended-lectures', {

              }, localStorage.getItem('token'),).then((response)=>{
                if (response.data.data === null) {
                  alert('추천 강의평이 없습니다.'); return;
                }
                for (var i = 0; i < response.data.data.length; i++) {
                  listR1.push(response.data.data[i].lectureId)
                  listR2.push(response.data.data[i].likeCnt)
                  listR3.push(response.data.data[i].thumbnailUrl)
                  listR4.push(response.data.data[i].lectureTitle)
                  listR5.push(response.data.data[i].avgRate)
                }
                setLecturesRlist1(listR1); setLecturesRlist2(listR2); setLecturesRlist3(listR3); setLecturesRlist4(listR4); setLecturesRlist5(listR5);
                listR1 = listR1.slice(0,0); listR2 = listR2.slice(0,0); listR3 = listR3.slice(0,0); listR4 = listR4.slice(0,0); listR5 = listR5.slice(0,0);
              }).catch((error) => { 
                if (error == 'Error: Request failed with status code 500') {
                  return;
                } else if (error == 'Error: Request failed with status code 401') {
                  return;
                } else {
                  alert('강의평 페이지에 오류가 있습니다.'); 
                }
              })
            }}>&gt;</div>
          </div>
        </div>
        <div style={{ width: '67%', height: 'auto', display: 'inline-block', }}>
          <hr class='lectures_hr'/>
        </div>
        <div id='studiesR_number'></div>
        <div id='studiesR_max'></div>

        <div style={{ display: 'flex', }}>
          <div style={{ width: '17%', }}></div>
          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(!localStorage.getItem('token')) {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
            else $('.lecturesReviewAdd_modal2').show();
          }}>
            강의 추가하기
          </div>

          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(!localStorage.getItem('token')) {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
            else navigate('/lecturesReviewAdd/0')
          }}>
            강의평 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='lectures_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>강의평 개수</div>
          </div>

          {/* <div id='lectures_list'></div> */}
          <LecturesElements list={[lectures1, lectures2, lectures3, lectures4, lectures5, $('#studies_number').val()]}/>

          <div style={{ height: '100px', textAlign: 'center', }}></div>
          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>

                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === '1') return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)-1)
                  
                  Search2F(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5)
                }}>
                </div>
                <div id='studies_number' onClick={() => {
                  Search2F(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5)
                }}><div id='studies_Box'></div></div>
                <div id='studies_max'></div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === $('#studies_max').val()) return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)+1)

                  Search2F(setLectures1, setLectures2, setLectures3, setLectures4, setLectures5)
                }}>
                  
                </div>
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