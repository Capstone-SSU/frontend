import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Lectures.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

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

function LeturesF (lectureId, likeCnt, thumbnailUrl, lectureTitle, avgRate, page) {
    const result1 = []; const result2 = []; const result3 = []; const result4 = [];
    const resultM = [];
    for (var j = (page-1)*20; j < page*20; j++) {
        if (lectureId.length === j) break;
        // if (j % 5 === 0) result += "<div id='body_flex'>"
        if (j < 5+(page-1)*20) {
            result1.push(
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
            );
            // if (list.length === j+1) { result += "</div>"; break;  }
            // if (j % 5 === 4) result += "</div>"
            if (result1.length == 5) { resultM.push(<div id='body_flex'>{result1}</div>); continue; }
            if (lectureId.length-1 === j) { resultM.push(<div id='body_flex'>{result1}</div>); }
        } else if (j < 10+(page-1)*20) {
            result2.push(
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
            );
            // if (list.length === j+1) { result += "</div>"; break;  }
            // if (j % 5 === 4) result += "</div>"
            if (result2.length == 5) { resultM.push(<div id='body_flex'>{result2}</div>); continue; }
            if (lectureId.length-1 === j) { resultM.push(<div id='body_flex'>{result2}</div>); }
        } else if (j < 15+(page-1)*20) {
            result3.push(
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
            );
            // if (list.length === j+1) { result += "</div>"; break;  }
            // if (j % 5 === 4) result += "</div>"
            if (result3.length == 5) { resultM.push(<div id='body_flex'>{result3}</div>); continue; }
            if (lectureId.length-1 === j) { resultM.push(<div id='body_flex'>{result3}</div>); }
        } else if (j < 20+(page-1)*20) {
            result4.push(
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
            );
            // if (list.length === j+1) { break; }
            // if (j % 5 === 4) result += "</div>"
            if (result4.length == 5) { resultM.push(<div id='body_flex'>{result4}</div>); continue; }
            if (lectureId.length-1 === j) { resultM.push(<div id='body_flex'>{result4}</div>); }
        }
    }
    return resultM;
  };

const LecturesElements = ({ list }) => {
    return (
        <div key={list[0]}>
            {LeturesF(list[0], list[1], list[2], list[3], list[4], list[5])}
        </div>
    );
};

export default LecturesElements;