import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Lectures.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
import LecturesElements from "./LecturesElements";
window.$ = $;

function ReviewUpdateF(lecturesId, r, navigate) {
    navigate('/lecturesReviewUpdate/' + lecturesId + "/" + parseInt(r))
}
function ReviewDeleteF(lecturesId, r, navigate) {
    axios.delete('http://54.180.150.167:8080/reviews/' + parseInt(r), {
    }, localStorage.getItem('token'),).then((response)=>{
        navigate("/")
        navigate("/lectures/" + lecturesId)
    }).catch((error) => { alert('강의평 삭제 실패') })
}
function ReviewReportsF(r) {
    $('.lecturesList_modal2').show()
    $('#lecturesList_reviewId').val(r)
}

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
        </div>
    );
    return result;
}

function LeturesListF (list, lecturesId, navigate) {
    const result1 = []; const result2 = [];
    const resultM = [];
    for (var i = 0; i < list.length; i++) {
        var r = list[i].reviewId
        result1.push(
            <div id='lecturesList_boxReviewAA' key={list[i].reviewId}>
                {list[i].commentTitle!=null ? <div id='lecturesList_titleReview'>{list[i].commentTitle}</div> : <div id='lecturesList_titleReview'>null</div> }
                <div id='lecturesList_titleReports'>
                    {list[i].writerStatus ? 
                    <div id="body_flex">
                        <div id="lecturesList_reviewUpdate" onClick={()=>{ ReviewUpdateF(lecturesId, r, navigate)}} >수정</div>
                        <div id="lecturesList_bar2"></div><div id="lecturesList_reviewDelete" onClick={()=> { ReviewDeleteF(lecturesId, r, navigate)} }>삭제</div>
                    </div> : <></>}
                    {!list[i].writerStatus ? <div id='' onClick={() => { ReviewReportsF(r) }}>신고</div>: <></>}
                </div>
                
                <form class="mb-3" name="myform" id="myform" method="post">
                    <div id="body_flex"><fieldset >
                        {startsF(list[i].rate)}
                    </fieldset></div>
                </form>
                <div id='body_flex'>
                    {list[i].nickname!=null ? <div id='lecturesList_nicknameReview'>{list[i].nickname}</div> : <div id='lecturesList_nicknameReview'>null</div> }
                    <div id='lecturesList_dateReview'>{list[i].createdDate.slice(0, 10)}</div>
                </div>
                <div id='lecturesList_commentReview'>{list[i].comment}</div>
            <hr id='lecturesList_hrReview'/></div>
        
        );
    }
    resultM.push(<div id='lecturesList_boxA'>{result1}</div>);
    return resultM;
  };

const LecturesListElements = ({ listcomments }) => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    return (
        <>
            {LeturesListF(listcomments, parseInt(current.split("/")[6]), navigate)}
        </>
    );
};

export default LecturesListElements;