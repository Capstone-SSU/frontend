import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Study.css';
import logo from '../logo.png';
import search from '../search.png';

const Study = () => {
  return (
    <div id="body_main">
      <div id='body_center_top'></div>
      <div id='body_center_name'><Link to="/study">스터디</Link></div>

      <div id="study_body_center_inner">
        
        <div id='study_body_center_inner_search'>
          <div id="study_body_center_inner_search_search" className="study_class_body_center_inner_search_searchCatagory">
            <input href='' />
            <img src={search}/>
          </div>
          <div className="study_class_body_center_inner_search_searchCatagory"><a href=''>카테고리</a></div>
          <div id="study_body_center_inner_search_location"><a href=''>지역</a></div>
        </div><hr/>

        <div id='study_body_center_hashtag'>
          해시태그
        </div><hr/>

        <div id='study_body_center_inner_list'>
          <Link to="/studyList">
            <div id='study_body_center_inner_list_individe1'>
              <div style={{ display: 'flex', }}>

                <div style={{ width: '50px', height: '50px', lineHeight: '50px', fontSize: '22px', borderRadius: '50%', color: '#17173D', backgroundColor: '#45AFBE', }}>온</div>
                <div>

                  <div style={{ height: '50px', display: 'flex', }}>
                    <div style={{ width: '1080px', height: '50px', lineHeight: '50px', fontSize: '22px', color: '#17173D', textAlign: 'left', }}>&nbsp;&nbsp;&nbsp;해시태그</div>
                    <div style={{  }}>
                      <div style={{ fontSize: '22px', color: '#17173D', }}>5/3</div>
                    </div>
                  </div>

                  <div style={{ width: '100%', margin: '10px', textAlign: 'left', }}>
                    <div style={{ fontSize: '30px', fontWeight: 'bolder', color: '#17173D' }}>이것은 제목입니다.</div>
                    <div style={{ width: '100%', height: '20px'}}></div>
                    <div style={{ fontSize: '22px', color: '#17173D' }}>
                        개천재가 쓴 내용입니다.<br/>
                        나는야 개천재.
                    </div>
                  </div>

                </div>

              </div>
            </div><hr/>
            <div id='study_body_center_inner_list_individe1'>

            </div><hr/>
            <div id='study_body_center_inner_list_individe1'>

</div><hr/>
<div id='study_body_center_inner_list_individe1'>

</div><hr/>
<div id='study_body_center_inner_list_individe1'>

</div><hr/>
          </Link>
        </div><hr/>

        <div id='study_body_center_add'>
          <Link to="/studyAdd"><div id='study_body_center_add_circle'></div></Link>
        </div>

        <div style={{ height: '100px', textAlign: 'center', }}></div>
        <div style={{ height: '100px', textAlign: 'center', }}>
          <div style={{ textAlign: 'center', display: 'inline-block', }}>
            <div style={{ display: 'flex', }}>
              <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }}>

              </div>
              <div id='study_body_center_bottom_number1'>1</div>
              {/* <div id='study_body_center_bottom_number2'>2</div> */}
              <div style={{ width: '40px', height: '40px', margin: '5px', backgroundColor: '#45AFBE', }}>
                
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Study;