import '../../styles/roadmaps/Roadmaps.css';
import RoadmapsElements from '../../components/roadmaps/RoadmapsElements';

import like from '../../assets/like.png';
import search from '../../assets/search.png';
import write from '../../assets/write.png';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';

const Roadmaps = ( session, ) => {
  const [num, setNum] = useState(0);
  const NumF = () => {
    setNum(num+1);
  }

  const [roadmaps, setRoadmaps] = useState([]);
  const [roadmapsCnt, setRoadmapsCnt] = useState(0);
  const RoadmapsF = (page) => {
    axios({
      url: '/api/roadmaps/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        setRoadmaps(res.data.data);
        setRoadmapsCnt(res.data.roadmapsCnt);
      }
      // $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(res.data.data.length/20)/8));
    })
   .catch((err)=>{
      console.log(err);
      // setSession(false);
    })
  }

  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  }
  const SearchF = (page) => {
    console.log(searchInput);
    axios({
      url: '/api/roadmaps/'+page,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization' : localStorage.jwToken,
      },
    }).then((res)=>{
      console.log(res);
      if (res.data.isSuccess) {
        setRoadmaps(res.data.data);
        setRoadmapsCnt(res.data.roadmapsCnt);
      }
      // $('#studies_number').val('1'); $('#studies_Box').val('1'); $('#studies_max').val(Math.ceil(Math.ceil(res.data.data.length/20)/8));
    })
   .catch((err)=>{
      console.log(err);
      // setSession(false);
    })
  }

  let [lecturePageList, setLecturePageList] = useState(0);
  const [lecturePage, setLecturePage] = useState(0);
  var navigate = useNavigate();
  useEffect(() => {
    RoadmapsF(0);
  }, []);

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
            <input 
              id='studies_searchSearch' 
              style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} 
              placeholder='로드맵을 입력하세요' 
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
              navigate('/roadmapsAdd');
            else {
              alert('로그인 해주세요');
              navigate('/signin');
            }
          }}>
            로드맵 작성하기
          </div>
        </div>

        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>

          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: 'auto', display: 'flex', float: 'left',  }}>{"로드맵 총 "+roadmapsCnt+"개"}</div>
          </div>

          {/* <div id='roadmaps_list'></div> */}
          <RoadmapsElements getData={roadmaps} />

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
                  {[...Array(Math.ceil(roadmapsCnt/6))].slice(lecturePageList*10, (lecturePageList+1)*10).map((data, idx)=>{
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
                  if (Math.ceil(roadmapsCnt/6/10)-1 > lecturePageList) {
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

export default Roadmaps;