import '../../styles/studies/Studies.css';

import StudiesElements from '../../components/studies/StudiesElements';

import search from '../../assets/search.png';
import write from '../../assets/write.png';
import like from '../../assets/like.png';
import allowB from '../../assets/allowB.png';
import allowT from '../../assets/allowT.png';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

$('#studies_sort').val('desc').prop("selected", true)
$('#studies_locationSearch').val('지역').prop("selected", true)
$('#studies_categorySearch').val('카테고리').prop("selected", true)
$('#studies_searchSearch').val('')
$('#studies_togetherTrue').prop('checked', false)

const Studies = ( session, ) => {
  const [num, setNum] = useState(0);
  const NumF = () => {
    setNum(num+1);
  }

  const [studies, setStudies] = useState([]);
  const [studiesCnt, setStudiesCnt] = useState(0);
  const StudiesF = (page) => {
    axios({
      url: '/api/studies/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        setStudies(res.data.data);
        setStudiesCnt(res.data.studiesCnt);
      }
      // $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(res.data.data.length/20)/8));
    })
   .catch((err)=>{
      console.log(err);
      // setSession(false);
    })
  }

  let [sort, setSort] = useState("desc");
  const [location, setLocation] = useState("");
  const handleLocation = (e) => {
    setLocation(e.target.value);
  }
  const [category, setCategory] = useState("");
  const handleCategory = (e) => {
    setCategory(e.target.value);
  }
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const SearchF = (page) => {
    console.log(location);
    console.log(category);
    console.log(sort);
    console.log(searchInput);
    axios({
      url: '/api/studies/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        setStudies(res.data.data);
        setStudiesCnt(res.data.studiesCnt);
      }
    })
   .catch((err)=>{
      console.log(err);
    })
  }

  let [lecturePageList, setLecturePageList] = useState(0);
  const [lecturePage, setLecturePage] = useState(0);
  var navigate = useNavigate();
  useEffect(() => {
    StudiesF(0);

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
            <select 
              id='studies_locationSearch' 
              className='studies_search'
              onChange={handleLocation}>
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
          <select 
            id='studies_categorySearch' 
            className='studies_search'
            onChange={handleCategory}>
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
            <input 
              id='studies_searchSearch' 
              style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} 
              placeholder='스터디를 입력하세요' 
              onChange={handleSearch}
            />
            <div>
              <div style={{ height: '2px'}}></div>
              <img src={search} style={{ width:'30px', height: '30px',}} onClick={() => {SearchF(0)}}/>
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
            if(session)
              navigate('/studiesAdd');
            else {
              alert('로그인 해주세요')
              navigate('/signin') 
            }
          }}>
            스터디 작성하기
          </div>
        </div>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ width: '100%', height: '25px', margin: '0px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>{"스터디 총 "+studiesCnt+"개"}</div>
            <div style={{ width: 'auto', margin: '0px 0px 0px 25px', display: 'flex', float: 'left', }}>
              <select 
                id='studies_sort' 
                className='studies_search' 
                style={{ background: 'rgb(240, 240, 240)', }}
                onChange={(e)=>{
                  sort = e.target.value;
                  setSort(sort);
                  SearchF(0)
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

                // axios.get('http://54.180.150.167:8080/studies?sort=' + $('#studies_searchLinkFirst').val() + $('#studies_searchLinkCenter').val() + $('#studies_searchLinkLast').val(), {
                // }).then((response)=>{
                //   if (response.data.data === null) {
                //     alert('스터디가 없습니다.'); return;
                //   }
                //   for(var i = 0; i < response.data.data.length; i++) {
                //     list1.push(response.data.data[i].studyPostId);
                //     list2.push(response.data.data[i].studyPostWriter.userProfileImg);
                //     list3.push(response.data.data[i].studyTitle);
                //     list4.push(response.data.data[i].studyLikeCount);
                //     list5.push(response.data.data[i].studyRecruitState);
                //     list6.push(response.data.data[i].studyLocation);
                //     list7.push(response.data.data[i].studyCategoryName);
                //     list8.push(response.data.data[i].studyCreatedDate.slice(0, 10));
                //     list9.push(response.data.data[i].studyPostWriter.userNickname);
                //   }
                //   // StudiesF(response.data.data, 1)
                //   setStudies1(list1.reverse()); setStudies2(list2.reverse()); setStudies3(list3.reverse()); setStudies4(list4.reverse()); setStudies5(list5.reverse()); setStudies6(list6.reverse()); setStudies7(list7.reverse()); setStudies8(list8.reverse()); setStudies9(list9.reverse());
                //   list1 = list1.slice(0,0); list2 = list2.slice(0,0); list3 = list3.slice(0,0); list4 = list4.slice(0,0); list5 = list5.slice(0,0); list6 = list6.slice(0,0); list7 = list7.slice(0,0); list8 = list8.slice(0,0); list9 = list9.slice(0,0);
                //   document.getElementById('studies_count').innerHTML = "스터디 총 " + response.data.data.length + "개"
                  
                // }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })
              }}/>
              <span className="onoff-switch"></span>
            </label>
          </div>

          {/* <div id='studies_list'></div> */}
          <StudiesElements getData={studies} />

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
                  {[...Array(Math.ceil(studiesCnt/8))].slice(lecturePageList*10, (lecturePageList+1)*10).map((data, idx)=>{
                    return (
                      <div
                        id='studies_numberInner'
                        onClick={()=>{
                          setLecturePage(idx + lecturePageList*10);
                          SearchF(idx + lecturePageList*10);
                        }}
                        key={idx}>
                        {idx+1 + lecturePageList*10}
                      </div>
                    );
                  })}
                </div>
                <div id='studies_max'></div>
                <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }} onClick={() => {
                  if (Math.ceil(studiesCnt/8/10)-1 > lecturePageList) {
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
  );
}

export default Studies;