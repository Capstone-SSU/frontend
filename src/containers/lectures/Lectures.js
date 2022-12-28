import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../../styles/lectures/Lectures.css';
import LecturesElements from '../../components/lectures/LecturesElements';

import tempImg from '../../assets/mainCoding.png';
import write from '../../assets/write.png';
import search from '../../assets/search.png';
import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

import axios from 'axios';
import $ from 'jquery';
import Backend from "../../utils/Backend";
import HashTagsElements from "../../components/lectures/HashTagsElements";
window.$ = $;

function Lectures ( session, ) {
  const [num, setNum] = useState(0);
  const NumF = () => {
    setNum(num+1);
  }



  const [hashtags, setHashTags] = useState([]);
  const HashTagsF = (isComponentMounted) => {
    // lectures_hashtagSelection2
    axios({
      url: '/api/hashtags',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res)=>{
      console.log(res);
      if (res.data) {
        if (isComponentMounted) {
          setHashTags(res.data.data);
        }
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  const [lecture, setLecture] = useState([]);
  const [lectureCnt, setLectureCnt] = useState(0);
  const LectureF = (page, isComponentMounted) => {
    axios({
      url: '/api/lectures/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        if (res.data) {
          if (isComponentMounted) {
            setLecture(res.data.data);
            setLectureCnt(res.data.lectureCnt);
          }
        }
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  let [lecturePageList, setLecturePageList] = useState(0);
  const [lecturePage, setLecturePage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchAll, setSearchAll] = useState([]);
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const SearchF = (page) => {
    console.log(searchInput);
    console.log(searchAll);
    setLecturePage(0);
    axios({
      url: '/api/lectures/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        setLecture(res.data.data);
        setLectureCnt(res.data.lectureCnt);
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

  let navigate = useNavigate();
  useEffect(() => {
    let isComponentMounted = true;
    LectureF(0, isComponentMounted);
    HashTagsF(isComponentMounted)

    return () => {
      isComponentMounted = false;
    }
  }, []);

  return (
    <div className="App">
    <div id="body_main">
      <div id="lectures_searchLinkCenter"></div>

      <div className="lecturesReviewAdd_modal2">
        <div style={{ width: '100%', height: '93px', lineHeight: '100px', fontSize: '25px', fontWeight: '600', }}>
          등록하고 싶은 강의 링크를 남겨주세요.
        </div>
        <div><input id='lecturesReviewAdd_link'/></div>
        <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => {
          var oriSiteUrl = $('#lecturesReviewAdd_link').val();
          var siteurl = "";
          for (var i=0; i<oriSiteUrl.split("/").length-1; i++) {
            siteurl += oriSiteUrl.split("/")[i]+"/";
          }
          siteurl += decodeURI(decodeURIComponent(oriSiteUrl.split("/")[oriSiteUrl.split("/").length-1]));

          axios({
            url: '/api/lectures/request',
            data: {
              siteurl : siteurl,
            },
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            if (res.data.msg == "링크가 존재") {
              $('.lecturesReviewAdd_modal5').show()
              document.getElementById('lecturesReviewAdd_lecture').innerHTML = 
                "<div>" + res.data.data.lecturetitle + "</div>"
            } else {
              if (res.data.msg == "링크 신청 성공") {
                $('#lecturesReviewAdd_link').val('');
                $('.lecturesReviewAdd_modal3').show()
              } else if (res.data.msg == "이미 신청된 링크")
                $('.lecturesReviewAdd_modal4').show();
            }
          })
          .catch((err)=>{
            console.log(err);
          })

          $('.lecturesReviewAdd_modal2').hide();
        }}>등록</button>
        <button className="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('#lecturesReviewAdd_link').val(''); $('.lecturesReviewAdd_modal2').hide() }}>취소</button>
      </div>

      <div className="lecturesReviewAdd_modal3">
        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          요청이 등록되었습니다.
        </div>
        <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal3').hide() }}>확인</button>
      </div>

      <div className="lecturesReviewAdd_modal4">
        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
          이미 등록 요청된 강의입니다.
        </div>
        <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal4').hide() }}>확인</button>
      </div>

      <div className="lecturesReviewAdd_modal5">
        <div style={{ width: '100%', height: '93px', lineHeight: '100px', fontSize: '25px', fontWeight: '600', }}>
          이미 등록된 강의입니다.
        </div>
        <div id='lecturesReviewAdd_lecture'>
        </div>
        <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.lecturesReviewAdd_modal5').hide() }}>확인</button>
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
            <input 
              id='studies_searchSearch' 
              style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} 
              placeholder='강의평을 입력하세요'
              onChange={handleSearch}
            />
            <div>
              <div style={{ height: '2px'}}></div>
              <img 
                src={search} 
                style={{ width:'30px', height: '30px',}} 
                onClick={()=>SearchF(0)}
              />
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
        <div style={{ height: '10px', }}></div>
        <hr className='lectures_hr'/>
          
          <div id='lectures_hashtagSearch'>
            <div id='body_flex'>
              <div id='lectures_hashtagSelection3'>
                {searchAll.map((data, idx)=>{
                  return (
                    <div key={idx} className='lectures_hashtagBox'>
                      <div>{data}</div>
                    </div>
                  );
                })}
              </div>
              <div id='lectures_hashtagSelection' onClick={() => {
                if ($('#lectures_hashtagSelection2').css("display") === "none")
                  $('#lectures_hashtagSelection2').show()
                else {
                  $('#lectures_hashtagSelection2').hide()
                }
              }}>.&nbsp;.&nbsp;.</div>
            </div>
           
            <div className='lectures_section' id='lectures_hashtagSelection2'>
              <div className='lectures_hashtags'>
                <HashTagsElements 
                  getData={hashtags} 
                  searchAll={searchAll}
                  NumF={NumF}
                />
              </div>
              <div
                id='lectures_hashtagRemoveAll'
                onClick={()=>{
                  setSearchAll([]);
                }}>
                전체취소
              </div>
            </div>
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
          {/* <div id='body_flex'>
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
          </div> */}
        </div>
        <div style={{ width: '67%', height: 'auto', display: 'inline-block', }}>
          <hr className='lectures_hr'/>
        </div>
        <div id='studiesR_number'></div>
        <div id='studiesR_max'></div>

        <div style={{ display: 'flex', }}>
          <div style={{ width: '17%', }}></div>
          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(session)
              $('.lecturesReviewAdd_modal2').show();
            else {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
          }}>
            강의 추가하기
          </div>

          <img src={write} style={{ margin: '16px 0px 30px 0px', height: '30px', }}/>
          <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }} onClick={() => {
            if(session)
              navigate('/lecturesReviewAdd');
            else {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
          }}>
            강의평 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='lectures_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>강의평 총 {lectureCnt}개</div>
          </div>

          <div className="lecture_list">
            <LecturesElements getData={lecture}/>
          </div>

          <div style={{ height: '100px', textAlign: 'center', }}></div>
          <div style={{ height: '100px', textAlign: 'center', }}>
            <div style={{ textAlign: 'center', display: 'inline-block', }}>
              <div style={{ display: 'flex', }}>

                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if (0 < lecturePageList) {
                    lecturePageList -= 1;
                    setLecturePageList(lecturePageList);
                    NumF();
                  }
                }}>
                </div>
                <div id='studies_number'>
                  {[...Array(Math.ceil(lectureCnt/20))].slice(lecturePageList*10, (lecturePageList+1)*10).map((data, idx)=>{ //lectureCnt
                    return (
                      <div
                        key={idx}
                        id='studies_numberInner'
                        onClick={()=>{
                          setLecturePage(idx + lecturePageList*10);
                          SearchF(idx + lecturePageList*10);
                        }}>
                        {idx+1+lecturePageList*10}
                      </div>
                    );
                  })}
                </div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if (Math.ceil(lectureCnt/20/10)-1 > lecturePageList) {
                    lecturePageList += 1;
                    setLecturePageList(lecturePageList);
                    NumF();
                  }
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