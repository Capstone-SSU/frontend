import React from "react";
import { Link } from 'react-router-dom';
import '../pages_css/Study.css';
import logo from '../logo.png';
import search from '../search.png';

const Study = () => {
  return (
    <div className="App">
        <body>
            <div className="body_center">
              <div className="body_center_main">
                  <div id='body_center_top'></div>
                  <div id='body_center_name'><Link to="/study">스터디</Link></div>
                  <div id='body_center_search'>
                    <div id="body_center_inner_search1" className="body_center_inner_search">
                        <input href='' />
                        <img id="search" name="search" src={search}/>
                    </div>
                    <div className="body_center_inner_search"><a href=''>카테고리</a></div>
                    <div className="body_center_inner_search1"><a href=''>지역</a></div>
                  </div><hr/>
                  <div id='body_center_hashtag'>

                  </div><hr/>
                  <div id='body_center_list'>
                    <Link to="/studyList"><div id='body_center_list2'></div></Link>
                  </div>
                  <div id='body_center_add'>
                    <Link to="/studyAdd"><div id='body_center_add_circle'></div></Link>
                  </div>
                  <div id='body_center_bottom'>

                  </div>
              </div>
            </div>
        </body>
    </div>
  );
}

export default Study;