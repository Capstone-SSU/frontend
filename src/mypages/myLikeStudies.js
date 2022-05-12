import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myLikeStudies.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
        "<div id='body_flex'>" +
            "<div id='myProfile_first'>좋아요" + "</div>" +
            "<div id='myProfile_second'>스터디" + "</div>" +
        "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
            "<div id='studies_individe'>" +
                "<div class='studies_individeBox'>" +
                    "<img id='studies_profill' src='" + list[i].profileImage + "'/>" +
                    "<div id='studies_title'>" + list[i].studyTitle + "</div>" +
                    // '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].studyLikeCount + '</div>' +
                "</div>" +
                "<div class='studies_individeBox'>" +
                    "<div id='body_height'></div>" + 
                    "<div id='studies_together'>" + list[i].studyRecruitState + "</div>" + 
                    "<div id='studies_location'>" + list[i].studyLocation + "</div>" +
                    "<div id='studies_hashtag'>" + list[i].studyCategoryName + "</div>" +
                    "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
                    "<div id='studies_date'>" + list[i].nickname + "</div>" +
                "</div>" +
            "</div><hr/>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyLikeStudies = () => {

    axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/liked-studies', {
    }, localStorage.getItem('token')).then((response) => {
        console.log(response)
        document.getElementById('myLikeStudies_main').innerHTML = MyProfileContentF(response.data.data)
    }).catch();

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', }}>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    <div id="myLikeStudies_main"></div>
                </div>
            </div>
        </>

    );
}

export default MyLikeStudies;