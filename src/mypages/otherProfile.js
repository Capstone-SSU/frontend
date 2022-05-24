import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Mypage from '../pages/Mypage';
import * as MyLikeReviews from '../mypages/myLikeReviews.js';
import * as MyLikeRoadmaps from '../mypages/myLikeRoadmaps.js';
import * as MyLikeStudies from '../mypages/myLikeStudies.js';
import * as MyWriteReviews from '../mypages/myWriteReviews.js';
import * as MyWriteRoadmaps from '../mypages/myWriteRoadmaps.js';
import * as MyWriteStudies from '../mypages/myWriteStudies.js';
import '../mypages_css/otherProfile.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage = ''
    mypage +=
    "<div id='otherProfile_boxAA'>" +
    "<div id='otherProfile_boxA'>" +
        "<div id='otherProfile_boxB'>" +
            "<div id='otherProfile_profile'></div>" +
            "<div id='otherProfile_image'><img src='" + list.userProfileImg + "'/></div>" +
        "</div>" +
        "<div id='myProfile_boxC'>" +
            // "<div id='myProfile_inputs'>" +
            "<div class='myProfile_input'>nickname<div class='otherProfile_title'>" + list.userNickname + "</div></div>" +
            (list.githubUrlName == null ? "<div class='myProfile_input'>github<div class='otherProfile_title'>등록된 깃허브 링크가 없음</div></div>" : "<div class='myProfile_input'>깃허브&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div class='otherProfile_title'>" + list.githubUrlName + "</div></div>") +
            "<div class='myProfile_input'>company<div class='otherProfile_title'>" + "등록된 회사가 없음" + "</div></div>" +
            // "</div>" +
        "</div>" +
    "</div>" +
    "</div>"
    return mypage;
}

function OtherProfileLastF(current, f, b) {
    console.log('http://54.180.150.167:8080/users/' + current + "/" + f + b)
    axios.get('http://54.180.150.167:8080/users/' + current + "/" + f + b, {

    }, localStorage.getItem('token'),).then((response)=>{
        if (f=='liked-' && b == 'lectures')
            document.getElementById('otherProfile_last').innerHTML = MyLikeReviews.MyProfileContentF(response.data.data)
        else if (f=='liked-' && b == 'studies')
            document.getElementById('otherProfile_last').innerHTML = MyLikeStudies.MyProfileContentF(response.data.data)
        else if (f=='liked-' && b == 'roadmaps')
            document.getElementById('otherProfile_last').innerHTML = MyLikeRoadmaps.MyProfileContentF(response.data.data)
        else if (f=='' && b == 'lectures')
            document.getElementById('otherProfile_last').innerHTML = MyWriteReviews.MyProfileContentF(response.data.data)
        else if (f=='' && b == 'studies')
            document.getElementById('otherProfile_last').innerHTML = MyWriteStudies.MyProfileContentF(response.data.data)
        else if (f=='' && b == 'roadmaps')
            document.getElementById('otherProfile_last').innerHTML = MyWriteRoadmaps.MyProfileContentF(response.data.data)
    }).catch((error) => {

    })
}

const OtherProfile = () => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));

    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/users/' + parseInt(current.split("/")[4]), {

        }, localStorage.getItem('token'),).then((response)=>{
            document.getElementById('otherProfile_main').innerHTML = MyProfileContentF(response.data.data)
        }).catch((error) => {

        })
        $('#otherProfile_f').val('liked-'); $('#otherProfile_b').val('lectures');
        OtherProfileLastF(parseInt(current.split("/")[4]), $('#otherProfile_f').val(), $('#otherProfile_b').val());
    });

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', height: '100%', background: 'rgb(240, 240, 240)' }}>
                <div id="otherProfile_f" style={{ display: 'none', }}></div>
                <div id="otherProfile_b" style={{ display: 'none', }}></div>
                <div id='otherProfile_body2'>
                    <div id='otherProfile_top'></div>
                    <div id='otherProfile_top'></div>

                    <div id="otherProfile_main"></div>
                    <div id="otherProfile_center">
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div class="otherProfile_click" onClick={() => {$('#otherProfile_b').val('lectures'); OtherProfileLastF(parseInt(current.split("/")[4]), $('#otherProfile_f').val(), 'lectures')}}>강의리뷰</div>
                                <div class="otherProfile_click" onClick={() => {$('#otherProfile_b').val('studies'); OtherProfileLastF(parseInt(current.split("/")[4]), $('#otherProfile_f').val(), 'studies')}}>스터디</div>
                                <div class="otherProfile_click" onClick={() => {$('#otherProfile_b').val('roadmaps'); OtherProfileLastF(parseInt(current.split("/")[4]), $('#otherProfile_f').val(), 'roadmaps')}}>로드맵</div>
                            </div>
                        </div></div>
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div class="otherProfile_click" onClick={() => {$('#otherProfile_f').val('liked-'); OtherProfileLastF(parseInt(current.split("/")[4]), 'liked-', $('#otherProfile_b').val())}}>좋아요</div>
                                <div class="otherProfile_click">|</div>
                                <div class="otherProfile_click" onClick={() => {$('#otherProfile_f').val(''); OtherProfileLastF(parseInt(current.split("/")[4]), '', $('#otherProfile_b').val())}}>작성한</div>
                            </div>
                        </div></div>
                    </div>
                    <div id="otherProfile_last"></div>
                    <div id='otherProfile_top'></div>
                </div>
            </div>
            <div id='header_login'></div>
        </>
    );
}

export default OtherProfile;