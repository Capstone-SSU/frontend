import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myProfile.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage = ''

    mypage +=
        "<div>" + "프로필 공개" + "</div>" +
        "<div>" + list.userProfileImg + "</div>" +
        "<div>" + list.userEmail + "</div>" +
        "<div>" + list.userNickname + "</div>" +
        "<div>" + "깃허브" + "</div>" +
        "<div>" + "현재 비밀번호" + "</div>" +
        "<div>" + "새 비밀번호" + "</div>" +
        "<div>" + "새 비밀번호 확인" + "</div>"

    return mypage;
}

const MyProfile = () => {

    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response) => {
        $('#header_login').val(response.data.data.userId)
        axios.get('http://54.180.150.167:8080/users/' + response.data.data.userId, {
        }, localStorage.getItem('token')).then((response2) => {
        console.log(response2)
        document.getElementById('myProfile_main').innerHTML = MyProfileContentF(response2.data.data)
        }).catch();
    }).catch();

    return (
        <>
            <div id='body_flex'>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    <div id="myProfile_main"></div>
                </div>
            </div>
            <div id='header_login'></div>
        </>
    );
}

export default MyProfile;