import React, { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Mypage from './Mypage';
import '../../styles/mypages/myProfile.css';

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
            "<div id='myProfile_image'><img id='myProfile_image' src='" + list.userProfileImg + "'/></div>" +
            // "<div  onClick='myProfileImageF()'>" + "프로필 사진" + "</div>" +
            "<div id='myProfile_profile2'><input type='file' id='myProfile_profileinput'/></div>" +
            "<button id='logout' onClick='LogoutF()'>로그아웃</button>" +
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
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("a");
    },[]);
    // axios.get('http://54.180.150.167:8080/temp-login-success', {
    // }, localStorage.getItem('token')).then((response2) => {
    //     axios.get('http://54.180.150.167:8080/users/' + response2.data.data.userId, {
    //     }, localStorage.getItem('token')).then((response) => {
    //         document.getElementById('myProfile_main').innerHTML = MyProfileContentF(response.data.data)
    //         if (response.data.data.publicProfileStatus == true) {
    //             $("input:checkbox[id='studies_togetherTrue']").prop('checked', true);
    //         }
    //     }).catch();
    // }).catch(()=>{alert('오류가 발생했습니다.'); navigate('/signin');});

    return (
        
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
        
    );
}

export default MyProfile;