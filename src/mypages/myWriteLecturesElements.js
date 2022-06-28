import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../mypages_css/myWriteReviews.css';

import like from '../like.png';
import likeFill from '../likeFill.png';
import MyWriteLectures from './myWriteLectures';

function UrlF(list, a, navigate) {
    const result = [];
    for (var i = 0; i < list.length; i++) {
        var requesturl = list[i].lectureId;
        if (list[i].status == "완료" && a == "등록 완료") {
            result.push(
            <Link to={'/lectures/' + requesturl}>
            <div id='myWriteLectures_box'>
                <div id='body_flex'>
                    <div>
                        {list[i].url}
                    </div>
                </div>
            </div>
            </Link>
        );
        }
        if (list[i].status == "대기중" && a == "등록 대기중") {
            result.push(
                <div id='myWriteLectures_box'>
                <div id='body_flex'>
                    <div>
                        {list[i].url}
                    </div>
                </div>
            </div>
            );
        }
        if (list[i].status == "잘못된 url" && a == "등록 실패") {
            result.push(
                <div id='myWriteLectures_box'>
                <div id='body_flex'>
                    <div>
                        {list[i].url}
                    </div>
                </div>
            </div>
            );
        }
    }

    return result;
}

function Letures2F (list, navigate) {
    const result = []; const result2 = []; const result3 = []; const result4 = [];
    result.push(
        <>
            <div id='myLikeReviews_boxAAA'>등록 완료</div>
            {UrlF(list, "등록 완료", navigate)}
            <div id='myLikeReviews_boxAA'>등록 대기중</div>
            {UrlF(list, "등록 대기중", navigate)}
            <div id='myLikeReviews_boxAA'>등록 실패</div>
            {UrlF(list, "등록 실패", navigate)}
        </>
    );
    return result;
}

function LeturesF (list, navigate) {
    const resultM = [];

    resultM.push(
    <div id='myLikeReviews_boxA'>
        <div id='body_flex'>
            <div id='myProfile_first'>강의 요청 내역</div>
        </div>
        {Letures2F(list, navigate)}
    </div>
    );
    return resultM;
  };

const MyWriteLecturesElements = ({ list }) => {
    var navigate = useNavigate();
    return (
        <div key={list.requestedId}>
            {LeturesF(list, navigate)}
        </div>
    );
};

export default MyWriteLecturesElements;