import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Studies.css';
import StudiesElements from './StudiesElements';

import search from '../search.png';
import write from '../write.png';
import like from '../like.png';
import allowB from '../allowB.png';
import allowT from '../allowT.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

var list1 = []; var list2 = []; var list3 = []; var list4 = []; var list5 = []; var list6 = []; var list7 = []; var list8 = []; var list9 = [];

function NumberF(list, box) {
  var numbers = ''

  for (var i = 8*(box-1); i < 8*box; i++) {
    if (Math.ceil(list.length/8) === i) break;
    numbers += 
    "<div id='studies_numberInner' onClick='$(\"#studies_number\").val(" + (i+1) + ")'>" + (i+1) + "</div>"
  }
  return numbers
}

function StudiesF(list, page) {
  var length = list.length;
  var togetherTrue = document.getElementById('studies_togetherTrue');

  document.getElementById('studies_Box').innerHTML = NumberF(list, $('#studies_Box').val())

  // for (var i = 8*(page-1); i < 8*page; i++) {
  //   if (list.length === i) break
  //   if ($(togetherTrue).prop("checked") && list[i].studyRecruitState !== "모집중") {
  //     length--; continue;
  //   }
  //   studies +=
  //   "<a href='/pickit/studies/"+ list[i].studyPostId +"'>" +
  //     "<div id='studies_individe'>" +
  //       "<div class='studies_individeBox'>" +
  //         '<div id="studies_image"><img id="studies_profill" src="' + list[i].studyPostWriter.userProfileImg + '"/></div>' +
  //         "<div id='studies_title'>" + list[i].studyTitle + "</div>" +
  //         '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].studyLikeCount + '</div>' +
  //       "</div>" +
  //       "<div class='studies_individeBox'>" +
  //         "<div id='body_height'></div>" + 
  //         "<div id='studies_together'>" + list[i].studyRecruitState + "</div>" + 
  //         "<div id='studies_location'>" + list[i].studyLocation + "</div>" +
  //         "<div id='studies_hashtag'>" + list[i].studyCategoryName + "</div>" +
  //         "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
  //         "<div id='studies_date'>" + list[i].studyPostWriter.userNickname + "</div>" +
  //       "</div>" +
  //     "</div><hr/>" +
  //   "</a>" 
  // }
  document.getElementById('studies_count').innerHTML = "스터디 총 " + length + "개"
}

function SearchF(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9) {
  var link = '&'
  if ($('#studies_categorySearch').val() != '카테고리') 
    link += 'category='+ $('#studies_categorySearch').val() +'&'
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
  
  $('#studies_searchLinkCenter').val(link)
  axios.get('http://54.180.150.167:8080/studies' + $('#studies_searchLinkFirst').val() + $('#studies_searchLinkCenter').val() + $('#studies_searchLinkLast').val(), {
  }).then((response)=>{
    if (response.data.data === null) {
      alert('스터디가 없습니다.'); return;
    }
    $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/8)/8));
    for(var i = 0; i < response.data.data.length; i++) {
      list1.push(response.data.data[i].studyPostId);
      list2.push(response.data.data[i].studyPostWriter.userProfileImg);
      list3.push(response.data.data[i].studyTitle);
      list4.push(response.data.data[i].studyLikeCount);
      list5.push(response.data.data[i].studyRecruitState);
      list6.push(response.data.data[i].studyLocation);
      list7.push(response.data.data[i].studyCategoryName);
      list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
      list9.push(response.data.data[i].studyPostWriter.userNickname);
    }
    StudiesF(response.data.data, 1)
    setStudies1(list1); setStudies2(list2); setStudies3(list3); setStudies4(list4); setStudies5(list5); setStudies6(list6); setStudies7(list7); setStudies8(list8); setStudies9(list9);
    list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
  }).catch((error) => { alert('스터디 조회 실패했습니다.') })
}
function Search2F(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9) {
  var link = '&'
  if ($('#studies_categorySearch').val() != '카테고리') 
    link += 'category='+ $('#studies_categorySearch').val() +'&'
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
  
  $('#studies_searchLinkCenter').val(link)
  axios.get('http://54.180.150.167:8080/studies' + $('#studies_searchLinkFirst').val() + $('#studies_searchLinkCenter').val() + $('#studies_searchLinkLast').val(), {
  }).then((response)=>{
    if (response.data.data === null) {
      alert('스터디가 없습니다.'); return;
    }
    for(var i = 0; i < response.data.data.length; i++) {
      list1.push(response.data.data[i].studyPostId);
      list2.push(response.data.data[i].studyPostWriter.userProfileImg);
      list3.push(response.data.data[i].studyTitle);
      list4.push(response.data.data[i].studyLikeCount);
      list5.push(response.data.data[i].studyRecruitState);
      list6.push(response.data.data[i].studyLocation);
      list7.push(response.data.data[i].studyCategoryName);
      list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
      list9.push(response.data.data[i].studyPostWriter.userNickname);
    }
    StudiesF(response.data.data, 1)
    setStudies1(list1); setStudies2(list2); setStudies3(list3); setStudies4(list4); setStudies5(list5); setStudies6(list6); setStudies7(list7); setStudies8(list8); setStudies9(list9);
    list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
  }).catch((error) => { alert('스터디 조회 실패했습니다.') })
}

$('#studies_sort').val('desc').prop("selected", true)
$('#studies_locationSearch').val('지역').prop("selected", true)
$('#studies_categorySearch').val('카테고리').prop("selected", true)
$('#studies_searchSearch').val('')
$('#studies_togetherTrue').prop('checked', false)
const Studies = () => {

  const [studies1, setStudies1] = useState([]); const [studies2, setStudies2] = useState([]); const [studies3, setStudies3] = useState([]); const [studies4, setStudies4] = useState([]); const [studies5, setStudies5] = useState([]); const [studies6, setStudies6] = useState([]); const [studies7, setStudies7] = useState([]); const [studies8, setStudies8] = useState([]); const [studies9, setStudies9] = useState([]);

  var navigate = useNavigate();
  useEffect(() => {
    axios.get('http://54.180.150.167:8080/studies?sort=desc', {
    }).then((response)=>{
      $('#studies_searchLinkFirst').val('?sort=desc')
      $('#studies_searchLinkCenter').val('')
      $('#studies_searchLinkLast').val('')
      if (response.data.data === null) {
        alert('스터디가 없습니다.'); return;
      }
      $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/8)/8));
      for(var i = 0; i < response.data.data.length; i++) {
        list1.push(response.data.data[i].studyPostId);
        list2.push(response.data.data[i].studyPostWriter.userProfileImg);
        list3.push(response.data.data[i].studyTitle);
        list4.push(response.data.data[i].studyLikeCount);
        list5.push(response.data.data[i].studyRecruitState);
        list6.push(response.data.data[i].studyLocation);
        list7.push(response.data.data[i].studyCategoryName);
        list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
        list9.push(response.data.data[i].studyPostWriter.userNickname);
      }
      StudiesF(response.data.data, 1)
      setStudies1(list1); setStudies2(list2); setStudies3(list3); setStudies4(list4); setStudies5(list5); setStudies6(list6); setStudies7(list7); setStudies8(list8); setStudies9(list9);
      list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
    }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })
  }, []);

  return (
    <div id="body_main">
      <div id="studies_searchLinkFirst"></div>
      <div id="studies_searchLinkCenter"></div>
      <div id="studies_searchLinkLast"></div>
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>

        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'left', }}></div>
        <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <select id='studies_locationSearch' className='studies_search'>
              <option value='지역'>지역</option>
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
              <option value='온라인'>온라인</option>
            </select>
        </div>

        <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
          <select id='studies_categorySearch' className='studies_search'>
            <option value='카테고리'>카테고리</option>
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
          
        <div style={{ width: '15%', height: '50px', display: 'flex', float: 'right', }}></div>
        
        <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
          <div style={{ height: '4px'}}></div>
          <div className="studies_searchCatagory">
            <input id='studies_searchSearch' style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='스터디를 입력하세요' />
            <div>
              <div style={{ height: '2px'}}></div>
              <img src={search} style={{ width:'30px', height: '30px',}} onClick={() => {SearchF(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9)}}/>
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
            if(!localStorage.getItem('token')) {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
            else navigate('/studiesAdd')
          }}>
            스터디 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ width: '100%', height: '25px', margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>스터디 개수</div>
            <div style={{ width: 'auto', margin: '0px 0px 0px 25px', display: 'flex', float: 'left', }}>
              <select id='studies_sort' className='studies_search' style={{ background: 'rgb(240, 240, 240)', }} onClick={() => {
                $('#studies_searchLinkFirst').val('?sort=' + $('#studies_sort').val())
                axios.get('http://54.180.150.167:8080/studies' + $('#studies_searchLinkFirst').val() + $('#studies_searchLinkCenter').val() + $('#studies_searchLinkLast').val(), {
                }).then((response)=>{
                  if (response.data.data === null) {
                    alert('스터디가 없습니다.'); return;
                  }
                  for(var i = 0; i < response.data.data.length; i++) {
                    list1.push(response.data.data[i].studyPostId);
                    list2.push(response.data.data[i].studyPostWriter.userProfileImg);
                    list3.push(response.data.data[i].studyTitle);
                    list4.push(response.data.data[i].studyLikeCount);
                    list5.push(response.data.data[i].studyRecruitState);
                    list6.push(response.data.data[i].studyLocation);
                    list7.push(response.data.data[i].studyCategoryName);
                    list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
                    list9.push(response.data.data[i].studyPostWriter.userNickname);
                  }
                  StudiesF(response.data.data, 1)
                  setStudies1(list1); setStudies2(list2); setStudies3(list3); setStudies4(list4); setStudies5(list5); setStudies6(list6); setStudies7(list7); setStudies8(list8); setStudies9(list9);
                  list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
                  document.getElementById('studies_count').innerHTML = "스터디 총 " + response.data.data.length + "개"
                  
                }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })
              }}>
                <option value='desc'>최신 순</option>
                <option value='asc'>오래된 순</option>
                <option value='likes'>좋아요 순</option>
              </select>
            </div>
            
            <div style={{ width:'auto', margin: '0px 0px 0px 10px', display: 'flex', float: 'right', }}>모집중인 스터디만 보기</div>
            <label className="switch-button">
              <input id='studies_togetherTrue' type='checkbox' onClick={() => {
                if ($('#studies_togetherTrue').is(':checked'))
                  $('#studies_searchLinkLast').val('&recruitStauts=1')
                else
                  $('#studies_searchLinkLast').val('')

                axios.get('http://54.180.150.167:8080/studies?sort=' + $('#studies_searchLinkFirst').val() + $('#studies_searchLinkCenter').val() + $('#studies_searchLinkLast').val(), {
                }).then((response)=>{
                  if (response.data.data === null) {
                    alert('스터디가 없습니다.'); return;
                  }
                  for(var i = 0; i < response.data.data.length; i++) {
                    list1.push(response.data.data[i].studyPostId);
                    list2.push(response.data.data[i].studyPostWriter.userProfileImg);
                    list3.push(response.data.data[i].studyTitle);
                    list4.push(response.data.data[i].studyLikeCount);
                    list5.push(response.data.data[i].studyRecruitState);
                    list6.push(response.data.data[i].studyLocation);
                    list7.push(response.data.data[i].studyCategoryName);
                    list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
                    list9.push(response.data.data[i].studyPostWriter.userNickname);
                  }
                  StudiesF(response.data.data, 1)
                  setStudies1(list1.reverse()); setStudies2(list2.reverse()); setStudies3(list3.reverse()); setStudies4(list4.reverse()); setStudies5(list5.reverse()); setStudies6(list6.reverse()); setStudies7(list7.reverse()); setStudies8(list8.reverse()); setStudies9(list9.reverse());
                  list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
                  document.getElementById('studies_count').innerHTML = "스터디 총 " + response.data.data.length + "개"
                  
                }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })
              }}/>
              <span className="onoff-switch"></span>
            </label>
          </div>

          {/* <div id='studies_list'></div> */}
          <StudiesElements list={[studies1, studies2, studies3, studies4, studies5, studies6, studies7, studies8, studies9, $('#studies_number').val()]}/>

          <div style={{ height: '100px', textAlign: 'center', }}></div>
          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>

                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === '1') return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)-1)
                  
                  Search2F(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9)
                }}>
                </div>
                <div id='studies_number' onClick={() => {
                  Search2F(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9)
                }}><div id='studies_Box'></div></div>
                <div id='studies_max'></div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if ($('#studies_Box').val() === $('#studies_max').val()) return
                  var i = $('#studies_Box').val()
                  $('#studies_Box').val(parseInt(i)+1)
                  
                  Search2F(setStudies1, setStudies2, setStudies3, setStudies4, setStudies5, setStudies6, setStudies7, setStudies8, setStudies9)
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

export default Studies;