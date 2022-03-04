import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Studies.css';
import search from '../search.png';
import write from '../write.png';
import like from '../like.png';
import allowB from '../allowB.png';
import allowT from '../allowT.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function studiesF(list) {
  var studies = ''; var length = list.length;
  var togetherTrue = document.getElementById('studies_togetherTrue');

  console.log($(togetherTrue).prop("checked"))
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

function AllowLF() {
  if ($("#studies_imgL").attr("src") === allowT)
    $("#studies_imgL").attr("src", allowB);
  else
    $("#studies_imgL").attr("src", allowT);
}
function AllowCF() {
  if ($("#studies_imgC").attr("src") === allowT)
    $("#studies_imgC").attr("src", allowB);
  else
    $("#studies_imgC").attr("src", allowT);
}

const Studies = () => {
  axios.get('http://54.180.150.167:8080/studies', {

  }).then((response)=>{
      const element = document.getElementById('studies_list')
      element.innerHTML = studiesF(response.data.data)
  }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })

  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name' style={{ height: '130px', }}></div>
      
      <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '22px', }}>
        
        <div style={{ width: '100%', backgroundColor: 'red'}}>
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'left', }}></div>
          <div style={{ width: 'auto', height: '50px', margin: '0px 20px', padding: '0px 20px', display: 'flex', float: 'left', border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <Link to=''>
              지역
              <img id='studies_imgL' src={allowB} onClick={AllowLF}/>
            </Link>
          </div>

          <div style={{ width: 'auto', height: '50px', margin: '0 20px', padding: '0px 20px', display: 'flex', float: 'left',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <Link to=''>
              카테고리
              <img id='studies_imgC' src={allowB} onClick={AllowCF}/>
            </Link>
          </div>
          
          <div style={{ width: 'auto', height: '50px', margin: '0px 120px', padding: '0px 20px', display: 'flex', float: 'right', }}></div>
          
          <div style={{ width: '400px', height: '50px', margin: '0 20px', padding: '0px 20px', float: 'right',  border: '1px solid rgb(190, 190, 190)', borderRadius: '10px', }}>
            <div style={{ height: '4px'}}></div>
            <div className="studies_searchCatagory">
              <input style={{ width: '480px', height: '40px', margin: '0px 15px 0px 0px', border: '0', }} placeholder='스터디를 입력하세요' />
              <div>
                <div style={{ height: '2px'}}></div>
                <Link to=''><img src={search} style={{ width:'30px', height: '30px',}} /></Link>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <div style={{ height: '30px', }}></div>

      <div style={{ width: '100%', height: 'auto', backgroundColor: 'rgb(240, 240, 240)', }}>
        <Link to="/studiesAdd">
          <div style={{ display: 'flex', }}>
            <img src={write} style={{ margin: '16px 0px 30px 330px', height: '30px', }}/>
            <div style={{ width: '150px', height: '25px', margin: '20px 0px 30px 0px', textAlign: 'left', fontSize: '18px', fontWeight: 'bolder', }}>스터디글 작성하기</div>
          </div>
        </Link>
        
        <div style={{ width: '60%', height: 'auto', display: 'inline-block', }}>
          
          <div style={{ textAlign: 'left', display: 'flex', fontSize: '18px', fontWeight: 'bolder', }}>
            <div id='studies_count' style={{ width: '150px',  }}>스터디 개수</div>
            <div style={{ width: '110px', display: 'flex', }}>
              최신순
              <img id='studies_imgN' src={allowB} style={{ width: '20px', height: '20px', }}/>
            </div>
            <div style={{ width: '720px', }}></div>
            
            <label class="switch-button">
              <input id='studies_togetherTrue' type='checkbox' onClick={() => {
                axios.get('http://54.180.150.167:8080/studies', {
                }).then((response)=>{
                    const element = document.getElementById('studies_list')
                    element.innerHTML = studiesF(response.data.data)
                    const element2 = document.getElementById('studies_count')
                    element2.innerHTML = "스터디 총 " + response.data.data.length + "개"
                }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })
              }}/>
            <span class="onoff-switch"></span>
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