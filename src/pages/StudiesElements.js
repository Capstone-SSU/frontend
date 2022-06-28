import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Studies.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function StudiesF (studyPostId, userProfileImg, studyTitle, studyLikeCount, studyRecruitState, studyLocation, studyCategoryName, studyCreatedDate, userNickname, page) {
    const result1 = []; const result2 = []; const result3 = []; const result4 = [];
    const resultM = [];
    var length = studyPostId.length;
    var togetherTrue = document.getElementById('studies_togetherTrue');
    for (var i = 8*(page-1); i < 8*page; i++) {
        if (studyPostId.length === i) break
        if ($(togetherTrue).prop("checked") && studyRecruitState[i] !== "모집중") {
          length--; continue;
        }
        result1.push(
        <Link to={"/studies/"+ studyPostId[i]}>
          <div id='studies_individe'>
            <div class='studies_individeBox'>
              <div id="studies_profill"><img id="studies_profill" src={userProfileImg[i]}/></div>
              <div id='studies_title'>{studyTitle[i]}</div>
              <div id="studies_like"><img id="studies_like1" src={like}/>{studyLikeCount[i]}</div>
            </div>
            <div class='studies_individeBox'>
              <div id='body_height'></div>
              <div id='studies_together'>{studyRecruitState[i]}</div>
              <div id='studies_location'>{studyLocation[i]}</div>
              <div id='studies_hashtag'>{studyCategoryName[i]}</div>
              <div id='studies_date'>{studyCreatedDate[i]}</div>
              <div id='studies_date'>{userNickname[i]}</div>
            </div>
          </div><hr/>
        </Link>
        );
      }
    return result1;
  };

const StudiesElements = ({ list }) => {
    return (
        <div key={list[0].roadmapId}>
            {StudiesF(list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9], list[10])}
        </div>
    );
};

export default StudiesElements;