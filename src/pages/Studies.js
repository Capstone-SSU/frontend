import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Studies.css';
import logo from '../logo.png';
import search from '../search.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function studiesF(list) {
  var studies = '';

  console.log(list)
  for (var i = 0; i < list.length; i++) {
    studies +=
    "<Link to='/studies/studyId'>" +
    "<div id='  #studies_individe1'>" +
    "<div style={{ display: 'flex', }}>" +
      "<div id='studies_onoff'>온</div>" +
      "<div>" +
        "<div style={{ height: '50px', display: 'flex', }}>" +
          "<div id='studies_hashtag'>&nbsp;&nbsp;&nbsp;해시태그</div>" +
          "<div>" +
            "<div id='studies_peaple'>5/3</div>" +
          "</div>" +
        "</div>" +
        "<div style={{ width: '100%', margin: '10px', textAlign: 'left', }}>" +
          "<div id='studies_title'>이것은 제목입니다.</div>" +
          "<div style={{ width: '100%', height: '20px'}}></div>" +
          "<div id='studies_description'>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</div><hr/>" +
    "</Link>"
    
  }
  console.log(studies)
  return studies;
}

const Studies = () => {
  axios.get('http://54.180.150.167:8080/studies', {
    email: $('#signin_email').val(),
    password: $('#signin_password').val(),
  }).then((response)=>{
      const element = document.getElementById('studies_list')
      element.innerHTML = studiesF(response.data.data)
  }).catch((error) => { alert('스터디페이지에 오류가 있습니다.') })

  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/studis">스터디</Link></div>
      
      <div style={{ width: '1200px', height: 'auto', display: 'inline-block', }}>
        
        <div style={{ width: '100%', height: '50px', lineHeight: '50px', color: '#17173D', fontSize: '30px', }}>
          <div className="studies_searchCatagory">
            <input href='' />
            <img src={search}/>
          </div>
          <div className="studies_searchCatagory"><a href=''>카테고리</a></div>
          <div style={{ width: '150px', height: '50px', margin: '0 20px', display: 'flex', float: 'right', }}><a href=''>지역</a></div>
        </div><hr/>

        <div style={{width: '100%', height: '50px', textAlign: 'left', color: '#17173D', fontSize: '30px', fontWeight: 'bolder', }}>
          해시태그
        </div><hr/>

        <div id='studies_list'>
          
            {/* <div id='  #studies_individe1'>
              <div style={{ display: 'flex', }}>

                <div id='studies_onoff'>온</div>
                <div>

                  <div style={{ height: '50px', display: 'flex', }}>
                    <div id='studies_hashtag'>&nbsp;&nbsp;&nbsp;해시태그</div>
                    <div>
                      <div id='studies_peaple'>5/3</div>
                    </div>
                  </div>

                  <div style={{ width: '100%', margin: '10px', textAlign: 'left', }}>
                    <div id='studies_title'>이것은 제목입니다.</div>
                    <div style={{ width: '100%', height: '20px'}}></div>
                    <div id='studies_description'>
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                  </div>

                </div>

              </div>
            </div><hr/> */}
        </div><hr/>

        <div>
          <Link to="/studiesAdd">
            <div style={{ width: '100px', height: '100px', position: 'absolute', right: '0px', bottom: '0px', borderRadius: '50%', backgroundColor: '#45AFBE', }}>
            </div>
          </Link>
        </div>

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
  );
}

export default Studies;