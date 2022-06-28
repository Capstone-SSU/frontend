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

function ColorF(f, b) {
    if (b == 'lectures' || b == 'reviews') {
        $('#lectures').css('background', '#17173D')
        $('#lectures').css('color', 'white')
        $('#studies').css('background', 'white')
        $('#studies').css('color', '#17173D')
        $('#roadmaps').css('background', 'white')
        $('#roadmaps').css('color', '#17173D')
    } else if(b == 'studies') {
        $('#studies').css('background', '#17173D')
        $('#studies').css('color', 'white')
        $('#lectures').css('background', 'white')
        $('#lectures').css('color', '#17173D')
        $('#roadmaps').css('background', 'white')
        $('#roadmaps').css('color', '#17173D')
    } else {
        $('#roadmaps').css('background', '#17173D')
        $('#roadmaps').css('color', 'white')
        $('#studies').css('background', 'white')
        $('#studies').css('color', '#17173D')
        $('#lectures').css('background', 'white')
        $('#lectures').css('color', '#17173D')
    }

    if (f == 'liked-') {
        $('#liked').css('background', '#17173D')
        $('#liked').css('color', 'white')
        $('#write').css('background', 'white')
        $('#write').css('color', '#17173D')
    } else {
        $('#write').css('background', '#17173D')
        $('#write').css('color', 'white')
        $('#liked').css('background', 'white')
        $('#liked').css('color', '#17173D')
    }
}

function MyProfileContentF(list) {
    var mypage = ''
    mypage +=
    "<div id='otherProfile_boxAA'>" +
    "<div id='otherProfile_boxA'>" +
        "<div id='otherProfile_boxB'>" +
            "<div id='otherProfile_profile'></div>" +
            "<div id='otherProfile_image'><img id='otherProfile_image' src='" + list.userProfileImg + "'/></div>" +
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
    //볼 수 있게 허락하는 함수
    
    axios.get('http://54.180.150.167:8080/users/' + current, {

    }, localStorage.getItem('token'),).then((response)=>{
    }).catch((error) => {
        $('.myOtherList_modal1').show()
    })

    axios.get('http://54.180.150.167:8080/users/' + current + "/" + f + b, {

    }, localStorage.getItem('token'),).then((response)=>{
        if (f=='liked-' && b == 'lectures')
            document.getElementById('otherProfile_last').innerHTML = MyLikeReviews.MyProfileContentF(response.data.data)
        else if (f=='liked-' && b == 'studies')
            document.getElementById('otherProfile_last').innerHTML = MyLikeStudies.MyProfileContentF(response.data.data)
        else if (f=='liked-' && b == 'roadmaps')
            document.getElementById('otherProfile_last').innerHTML = MyLikeRoadmaps.MyProfileContentF(response.data.data)
        else if (f=='' && b == 'reviews')
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
        axios.get('http://54.180.150.167:8080/users/' + parseInt(current.split("/")[6]), {

        }, localStorage.getItem('token'),).then((response)=>{
            document.getElementById('otherProfile_main').innerHTML = MyProfileContentF(response.data.data)
        }).catch((error) => {
            if (error == "Error: Request failed with status code 403")
                return;
            else {
                alert('오류가 발생했습니다.')
            }
        })
        $('#otherProfile_f').val('liked-'); $('#otherProfile_b').val('lectures');
        OtherProfileLastF(parseInt(current.split("/")[6]), $('#otherProfile_f').val(), $('#otherProfile_b').val());
        ColorF($('#otherProfile_f').val(), $('#otherProfile_b').val());
    });

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', height: '100%', background: 'rgb(240, 240, 240)' }}>
                <div class="myOtherList_modal1">
                    <div style={{ textAlign: 'center', }}>
                        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
                        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
                            비공개 처리된 사용자 입니다.
                        </div>
                        <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.myOtherList_modal1').hide(); navigate('/') }}>확인</button>
                    </div>
                </div>
                <div id="otherProfile_f" style={{ display: 'none', }}></div>
                <div id="otherProfile_b" style={{ display: 'none', }}></div>
                <div id='otherProfile_body2'>
                    <div id='otherProfile_top'></div>
                    <div id='otherProfile_top'></div>

                    <div id="otherProfile_main"></div>
                    <div id="otherProfile_center">
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div id='lectures' class="otherProfile_click" onClick={() => {
                                    if ($('#otherProfile_f').val() == '') {
                                        $('#otherProfile_b').val('reviews');
                                        OtherProfileLastF(parseInt(current.split("/")[6]), $('#otherProfile_f').val(), 'reviews'); 
                                        ColorF($('#otherProfile_f').val(), 'reviews')
                                    }
                                    else {
                                        $('#otherProfile_b').val('lectures');
                                        OtherProfileLastF(parseInt(current.split("/")[6]), $('#otherProfile_f').val(), 'lectures'); 
                                        ColorF($('#otherProfile_f').val(), 'lectures')
                                    }

                                }}>강의리뷰</div>
                                <div id='studies' class="otherProfile_click" onClick={() => {$('#otherProfile_b').val('studies'); OtherProfileLastF(parseInt(current.split("/")[6]), $('#otherProfile_f').val(), 'studies'); ColorF($('#otherProfile_f').val(), 'studies');}}>스터디</div>
                                <div id='roadmaps' class="otherProfile_click" onClick={() => {$('#otherProfile_b').val('roadmaps'); OtherProfileLastF(parseInt(current.split("/")[6]), $('#otherProfile_f').val(), 'roadmaps'); ColorF($('#otherProfile_f').val(), 'roadmaps')}}>로드맵</div>
                            </div>
                        </div></div>
                        <div style={{ width: '5px', height: '10px', }}></div>
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div id='liked' class="otherProfile_click" onClick={() => {
                                    $('#otherProfile_f').val('liked-'); 
                                    if ($('#otherProfile_b').val() == 'reviews')
                                        $('#otherProfile_b').val('lectures');
                                    OtherProfileLastF(parseInt(current.split("/")[6]), 'liked-', $('#otherProfile_b').val()); 
                                    ColorF('liked-', $('#otherProfile_b').val())}}>좋아요</div>
                                {/* <div class="otherProfile_click">|</div> */}
                                <div id='write' class="otherProfile_click" onClick={() => {
                                    $('#otherProfile_f').val(''); 
                                    if ($('#otherProfile_b').val() == 'lectures')
                                        $('#otherProfile_b').val('reviews');
                                    OtherProfileLastF(parseInt(current.split("/")[6]), '', $('#otherProfile_b').val()); 
                                    ColorF('', $('#otherProfile_b').val())}}>작성한</div>
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