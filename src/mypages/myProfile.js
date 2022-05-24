import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myProfile.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage = ''

    $('#myProfile_nickname').val(list.userNickname)
    mypage +=
    "<div id='myProfile_boxA'>" +
        "<div id='myProfile_boxB'>" +
            "<div id='myProfile_profile'>" + "프로필" + "</div>" +
            "<div id='myProfile_image'><img src='" + list.userProfileImg + "'/></div>" +
            "<div>" + "프로필 사진" + "</div>" +
        "</div>" +
        "<div id='myProfile_boxC'>" +
            "<div id='myProfile_profileButton'>" +
                "<label class='myProfile_switch-button'>" +
                    "<input id='studies_togetherTrue' type='checkbox' onClick='myProfile_profileF()'/>" +
                    "<span class='myProfile_onoff-switch'></span>" +
                "</label>" +
                "<div id='myProfile_profileText'>&nbsp;&nbsp;프로필 공개</div>" +
            "</div>" +
            "<div id='myProfile_inputs'>" +
                "<div class='myProfile_input'>이메일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' disabled value='" + list.userEmail + "'/></div>" +
                "<div class='myProfile_input'>닉네임&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_nicknameInput' value='" + list.userNickname + "' onClick='myProfileNicknameInputF()'/><button id='myProfile_nicknameButton' onClick='myProfileNicknameF()'>중복 확인</button></div>" +
                "<div id='myProfile_nicknameT'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능한 닉네임 입니다</div>" + 
                "<div id='myProfile_nicknameF'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 불가능한 닉네임 입니다</div>" +
                (list.githubUrlName == null ? "<div class='myProfile_input'>깃허브&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_githubInput' value=''/></div>" : "<div class='myProfile_input'>깃허브&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' value='" + list.githubUrlName + "'/></div>") +
                "<div class='myProfile_input'>현재 비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_passwordInput' /></div>" +
                "<div class='myProfile_input'>새 비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_newpasswordInput'/></div>" +
                "<div class='myProfile_input'>새 비밀번호 확인&nbsp;<input id='myProfile_confirmpasswordInput'  onClick='myProfilePasswordInputF()'/><button id='myProfile_nicknameButton' onClick='myProfilePasswordF()'>중복 확인</button></div>" +
                "<div id='myProfile_passwordT'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 가능한 비밀번호 입니다</div>" + 
                "<div id='myProfile_passwordF'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사용 불가능한 비밀번호 입니다</div>" +
            "</div>" +
            "<div id='myProfile_profileButton'>" +
                "<div class='myProfile_input2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput2'/><button id='myProfile_nicknameButton2' onClick='myProfileF()'>저장</button>" +
            "</div>" +
        "</div>" +
    "</div>"
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
            <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
                <Mypage/>
                <div id='myProfile_nickname' style={{display: 'none'}}></div>
                <div id='myProfile_nicknameR' style={{display: 'none'}}></div>
                <div id='myProfile_passwordR' style={{display: 'none'}}></div>
                <div id='myProfile_body2'>
                    <div id='myProfile_top'></div>
                    <div id="myProfile_main"></div>
                </div>
            </div>
            <div id='header_login'></div>
        </>
    );
}

export default MyProfile;