import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Lectures.css';

import like from '../like.png';
import likeFill from '../likeFill.png';
import { css } from 'jquery';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function startsF(num) {
    const result = [];
    var lectures1 = ''; var lectures2 = '';

    for (var s = 0; s < Math.round(num); s++)
    lectures1 += '⭐'
    for (var s = Math.round(num); s < 5; s++)
    lectures2 += '⭐'
    
    result.push(
        <div id='body_flex' class='lectures_starsBox'>
            <div class='lectures_avgRate'>{lectures1}</div>
            <div id="grayStars" class="lectures_avgRate">{lectures2}</div>
            <div class="lectures_avgRate">{Math.ceil(num*10)/10}</div> 
        </div>
    );
    return result;
}

function LeturesRF (lectureId, likeCnt, thumbnailUrl, lectureTitle, avgRate, page) {
    const result1 = [];
    const resultM = [];
    if (lectureId.length == 0) {
        resultM.push(<><div style={{ color: 'rgb(190, 190, 190)', }}>추천 강의가 없습니다.</div></>); 
        $('#lectures_allow1').css('display', 'none'); 
        $('#lectures_allow2').css('display', 'none'); 
        return resultM; 
    }
    for (var j = (page-1)*5; j < page*5; j++) {
        if (lectureId.length === j) break;
        result1.push(
            <>
                <Link id='lectures_individe' to={'/lectures/' + lectureId[j]}>
                    <div id='lectures_imageBox'>
                        <div id='lectures_likeBox'></div>
                        <img class='lectures_img' src={like}/>
                        <div class='lectures_img'>{likeCnt[j]}</div>
                    </div>
                    <img id='lectures_box' src={thumbnailUrl[j]}/>
                    <div id='lectures_title'>{lectureTitle[j]}</div>
                    <div id='body_flex' class='lectures_starsBox'>
                        <div class='lectures_avgRate'>
                            {startsF(avgRate[j])}
                        </div>
                    </div>
                </Link>
            </>
        );
        // if (list.length === j+1) { result += "</div>"; break;  }
        // if (j % 5 === 4) result += "</div>"
        if (result1.length == 5) { resultM.push(<div id='body_flex'>{result1}</div>); continue; }
        if (lectureId.length-1 === j) { resultM.push(<div id='body_flex'>{result1}</div>); }
    }
    return resultM;
  };

const LecturesRElements = ({ list }) => {
    return (
        <div key={list[0]}>
            {LeturesRF(list[0], list[1], list[2], list[3], list[4], list[5])}
        </div>
    );
};

export default LecturesRElements;