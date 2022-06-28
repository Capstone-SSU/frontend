import React from "react";
import Mypage from '../pages/Mypage';
import { useNavigate } from "react-router-dom";
import '../mypages_css/myWriteStudies.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

export function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
        "<div id='body_flex'>" +
            "<div id='myProfile_first'>작성한" + "</div>" +
            "<div id='myProfile_second'>스터디" + "</div>" +
        "</div>"

    for (var i = 0; i < list.length; i++) {
    mypage +=
    "<a href='/pickit/#/studies/" + list[i].studyPostId + "'>" +
    "<div id='studies_individe'>" +
        "<div class='studies_individeBox'>" +
            "<img id='studies_profill' src='" + list[i].profileImage + "'/>" +
            "<div id='studies_title'>" + list[i].studyLocation + "</div>" +
        "</div>" +
        "<div class='studies_individeBox'>" +
            "<div id='body_height'></div>" + 
            "<div id='studies_together'>" + list[i].studyRecruitStatus + "</div>" + 
            "<div id='studies_location'>" + list[i].studyCategoryName + "</div>" +
            "<div id='studies_hashtag'>" + list[i].studyTitle + "</div>" +
            "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
            "<div id='studies_date'>" + list[i].writerNickname + "</div>" +
        "</div>" +
    "</div>" +
    "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyWriteStudies = () => {
    var navigate = useNavigate();
    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response2) => {
        axios.get('http://54.180.150.167:8080/users/' + response2.data.data.userId + '/studies', {
        }, localStorage.getItem('token')).then((response) => {
            document.getElementById('myWriteStudies_main').innerHTML = MyProfileContentF(response.data.data)
        }).catch();
    }).catch(()=>{alert('오류가 발생했습니다.'); navigate('/signin');});

  return (
    <>
        <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
            <Mypage/>
            <div id='myProfile_body'>
                <div id='myProfile_top'></div>
                <div id="myWriteStudies_main"></div>
            </div>
        </div>
    </>

  );
}

export default MyWriteStudies;