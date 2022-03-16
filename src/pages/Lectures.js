import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Lectures.css';
import tempImg from '../mainCoding.png';
<<<<<<< HEAD
import write from '../write.png';
import search from '../search.png';
import like from '../like.png';
import likeFill from '../likeFill.png';
=======
import axios from "axios";
>>>>>>> 0b4086ce26e5adeea658072a7f451e16de3df3a5

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function NumberF(list, box) {
  var numbers = ''

<<<<<<< HEAD
  for (var i = 25*(box-1); i < 25*box; i++) {
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
    if (j % 5 === 0) lectures += "<div id='body_flex'>"
    lectures +=
    "<a href='/lectures/" + list[j].lectureId + "'>" +
      "<div id='lectures_individual'>" +
      "<div id='lectures_imageBox'>" +
        ( list[j].likeCnt != 0 ? "<img src='" + likeFill + "'/>" : "<img src='" + like + "'/>" ) +
        "<div>" + list[j].likeCnt + "</div>" +
      "</div>" +
      "<div id='lectures_box'></div>" +
      "<div id='lectures_title'>" + list[j].lectureTitle + "</div>" +
      "<div id='lectures_rate'>" + list[j].avgRate + "</div>" +
    "</div>" +
    "</a>"
    if (length === j+1) { lectures += "</div>"; break;  }
    if (j % 5 === 4) lectures += "</div>"
  }

  document.getElementById('lectures_count').innerHTML = "강의평 총 " + length + "개";
  return lectures;
=======
const Try = () => {
  axios.get('http://54.180.150.167:8080/lectures')
    .then(response => {
      console.log(response);
    });
}

const SearchBar = () => {
  return (
    <div className="search_bar">
      <form>
        <input type="text"></input>
        <button type="submit">검색</button>
      </form>
    </div>
  );
}

const WriteButton = () => {
  return (
    <div className="write_button">
      <button id="writeLectureButton">글쓰기</button>
    </div>
  );
>>>>>>> 0b4086ce26e5adeea658072a7f451e16de3df3a5
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
      $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/5)/8));
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
          link += "'" + document.getElementsByName('hashtag')[i].value + "',"
      }
      link = link.slice(0, -1);
      link += "&"
    }
  
    link = link.slice(0, -1)
    $('#lectures_hashtagSelection2').hide()
    
    axios.get('http://54.180.150.167:8080/lectures' + link, {
  
    }).then((response)=>{
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
    $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(response.data.data.length/25)/5));
    document.getElementById('lectures_list').innerHTML = LecturesF(response.data.data, 1)
      
  }).catch((error) => { alert('강의평 페이지에 오류가 있습니다.'); })

  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red', }}>
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'left', }}></div>
          
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'right', }}></div>
          
          <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div style={{ height: '4px'}}></div>
            <div className="studies_searchCatagory">
              <input id='studies_searchSearch' style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='강의평을 입력하세요' />
              <div>
                <div style={{ height: '2px'}}></div>
                <img src={search} style={{ width:'30px', height: '30px',}} onClick={SearchF}/>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ width: '1900px', height: '60px', margin: '30px 0px 0px 0px', textAlign: 'center', }}>
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
              <input type='checkbox' name='hashtag' value='Java' onClick={()=>{
                document.getElementById('lectures_hashtagSelection3').innerHTML += "<div class='lectures_hashtag'>Java</div>"}}/>Java
              <input type='checkbox' name='hashtag' value='C++' onClick={()=>{
                document.getElementById('lectures_hashtagSelection3').innerHTML += "<div class='lectures_hashtag'>C++</div>"}}/>C++
              <input type='checkbox' name='hashtag' value='파이썬' onClick={()=>{
                document.getElementById('lectures_hashtagSelection3').innerHTML += "<div class='lectures_hashtag'>파이썬</div>"}}/>파이썬
              <input type='checkbox' name='hashtag' value='스프링' onClick={()=>{
                document.getElementById('lectures_hashtagSelection3').innerHTML += "<div class='lectures_hashtag'>스프링</div>"}}/>스프링
            </div>
           
          </div>
        <hr className='lectures_hr'/>
      </div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'white', }}> {/*rgb(240, 240, 240)*/}
        <div style={{ display: 'flex', }}>
          <img src={write} style={{ margin: '16px 0px 30px 330px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(!localStorage.getItem('token')) navigate('/signin')
            else navigate('/studiesAdd')
          }}>
            강의평 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='lectures_count' style={{ width: '150px',  }}>강의평 개수</div>
            {/* <div style={{ width: '110px', display: 'flex', }}>
              최신순
              <img id='studies_imgN' src={allowB} style={{ width: '20px', height: '20px', }}/>
            </div> */}
            <div style={{ width: '720px', }}></div>
            
            {/* <label className="switch-button">
              <input id='studies_togetherTrue' type='checkbox' onClick={() => {
                  axios.get('http://54.180.150.167:8080/lectures', {
                  }).then((response)=>{
                    // document.getElementById('studies_list').innerHTML = StudiesF(response.data.data, 1)
                    document.getElementById('studies_count').innerHTML = "스터디 총 " + response.data.data.length + "개"
                  }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })
                }}/>
              <span className="onoff-switch"></span>
            </label> */}
            {/* <div style={{ width: '20px', height: '10px', }}></div><div style={{ width:'220px', }}>모집중인 스터디만 보기</div> */}
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
    // <div>
    //   <div className="body-box">
    //     <div className="top_search_write_box">
    //       <SearchBar></SearchBar>
    //       <WriteButton></WriteButton>
    //     </div>
    //     <hr></hr>
    //     <Hashtag></Hashtag>
    //     <hr></hr>
    //     <div className="menu_name_box">
    //       <h2>추천강의</h2>
    //     </div>
    //     <div className="recommend_box">
    //       <img id="arrow" src={tempImg}></img>
    //       <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
    //         star={5} review={67}></RecommendLecture>
    //       <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
    //         star={5} review={67}></RecommendLecture>
    //       <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
    //         star={5} review={67}></RecommendLecture>
    //       <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
    //         star={5} review={67}></RecommendLecture>
    //       <RecommendLecture img={tempImg} title="강의제목 자바 알고리즘 문제풀이 : 코딩테스트 대비"
    //         star={5} review={67}></RecommendLecture>
    //       <img id="arrow" src={tempImg}></img>
    //     </div>

    //     <hr></hr>
    //     <Lecture img={tempImg}></Lecture>
    //   </div>
    // </div>
  );
}

// const SearchBar = () => {
//   return (
//     <div className="search_bar">
//       <form>
//         <input type="text"></input>
//         <button type="submit">검색</button>
//       </form>
//     </div>
//   );
// }

// const WriteButton = () => {
//   return (
//     <div className="write_button">
//       <buttton id="writeLectureButton">글쓰기</buttton>
//     </div>
//   );
// }

// const RecommendLecture = (props) => {
//   return (
//     <div className="recommend_lecture_box">
//       <img id="lectureImage" src={props.img}></img>
//       <p className="lecture_title">{props.title}</p>
//       <div className="recommend_lecture_star">
//         <p>⭐️⭐️⭐️⭐️⭐️</p>
//         <p>({props.review})</p>
//       </div>
//     </div>
//   );
// }

// const Lecture = (props) => {
//   return (
//     <div className="lecture_box">
//       <img id="lectureImage" src={props.img}></img>
//       <p class_name="lecture_title">개발자 강의 추천합니다 하하하하하하</p>
//       <div className="lecture_sub_info">
//         <p>코딩왕이될테야</p>
//         <p>2022-02-17 19:44</p>
//       </div>
//     </div>
//   );
// }

// const Hashtag = () => {
//   return (
//     <div className="hashtag">
//       <p className="hashtag_text">Python</p>
//     </div>
//   );
// }

// const HashtagBox = () => {

// }

export default Lectures;