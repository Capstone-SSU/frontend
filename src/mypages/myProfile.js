import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myProfile.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage = ''

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
                    "<input id='studies_togetherTrue' type='checkbox' />" +
                    "<span class='myProfile_onoff-switch'></span>" +
                "</label>" +
                "<div id='myProfile_profileText'>&nbsp;&nbsp;프로필 공개</div>" +
            "</div>" +
            "<div id='myProfile_inputs'>" +
                "<div class='myProfile_input'>이메일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' disabled value='" + list.userEmail + "'/></div>" +
                "<div class='myProfile_input'>닉네임&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' value='" + list.userNickname + "'/><button id='myProfile_nicknameButton'>중복 확인</button></div>" +
                "<div class='myProfile_input'>깃허브&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' value='" + "깃허브" + "'/></div>" +
                "<div class='myProfile_input'>현재 비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput' disabled /></div>" +
                "<div class='myProfile_input'>새 비밀번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput'/></div>" +
                "<div class='myProfile_input'>새 비밀번호 확인&nbsp;<input id='myProfile_titleInput'/><button id='myProfile_nicknameButton'>중복 확인</button></div>" +
            "</div>" +
            "<div id='myProfile_profileButton'>" +
                "<div class='myProfile_input2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input id='myProfile_titleInput2'/><button id='myProfile_nicknameButton2'>저장</button>" +
            "</div>" +
        "</div>" +
    "</div>"

    // <div style={{ width: '60%', margin: '0px 0px 20px 0px', textAlign: 'left', display: 'inline-block', fontSize: '22px', fontWeight: 'bolder', }}>강의 정보</div>
    // <div style={{ width: '60%', height: '360px', textAlign: 'center', display: 'inline-block', borderRadius: '10px', backgroundColor: 'white', }}>
    //   <div style={{ margin: '30px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>
    //     링크&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    //     <div style={{ width: '80%', display: 'flex', textAlign: 'left', }}>
    //       <input id='lecturesAdd_linkInput' onClick={() => {
    //         $('#lecturesAdd_linkT').hide()
    //         $('#lecturesAdd_linkF').hide()
    //         linkR = false
    //         $('#lecturesAdd_mainTitleInput').val('')
    //         $('#lecturesAdd_teacherInput').val('')
    //         $('#lecturesAdd_siteInput').val('')
    //         for (var i = 0; i < 3; i++) {
    //           $('#lecturesAdd_hashtagInput' + (i+1)).val('')
    //         }
    //       }}/>
    //       <div style={{ width: '14%', textAlign: 'right', }}><button style={{ width: '80px', margin: '0px 0px 0px 5px', color: 'white', fontSize: '15px', borderRadius: '10px', backgroundColor: '#17173D', }} onClick={() => {
    //         console.log($('#lecturesAdd_linkInput').val())
    //         axios.post('http://54.180.150.167:8080/lectures/url', {
    //           "lectureUrl" : $('#lecturesAdd_linkInput').val(),
    //         }).then((response)=>{
    //           if (response.data.message === "중복된 링크가 없습니다.") {
    //             $('#lecturesAdd_linkF').show()
    //             linkR = false
    //             $('#lecturesAdd_mainTitleInput').val('')
    //             $('#lecturesAdd_teacherInput').val('')
    //             $('#lecturesAdd_siteInput').val('')
    //             for (var i = 0; i < 3; i++) {
    //               $('#lecturesAdd_hashtagInput' + (i+1)).val('')
    //             }
    //           }
    //           else {
    //             $('#lecturesAdd_linkT').show()
    //             linkR = true
    //             $('#lecturesAdd_mainTitleInput').val(response.data.data.lectureTitle)
    //             $('#lecturesAdd_teacherInput').val(response.data.data.lecturer)
    //             $('#lecturesAdd_siteInput').val(response.data.data.siteName)
    //             for (var i = 0; i < response.data.data.hashtags.length; i++) {
    //               $('#lecturesAdd_hashtagInput' + (i+1)).val(response.data.data.hashtags[i])
    //             }
    //           }
    //         }).catch((error) => { alert('강의 링크 확인에 오류가 있습니다.') })
    //       }}>링크확인</button></div>
    //     </div>
    //   </div>
    //   <div style={{ width: '300px', height: '7px', padding: '0px 0px 0px 5px', }}>
    //     <div style={{ fontSize: '18px', fontWeight: 'bolder', display: 'flex', }}>
    //       <div style={{ width: '47%', }}></div>
    //       <div id='lecturesAdd_linkF' style={{ display: 'none', fontSize: '12px', color: 'red', }}>사용 불가능한 링크 입니다</div>
    //     </div>
    //     <div style={{ fontSize: '18px', fontWeight: 'bolder', display: 'flex', }}>
    //       <div style={{ width: '47%', }}></div>
    //       <div id='lecturesAdd_linkT' style={{ display: 'none', fontSize: '12px', color: 'blue', }}>사용 가능한 링크 입니다</div>
    //     </div>
    //   </div>
    //   <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_mainTitleInput' disabled/></div>
    //   <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>강의자&nbsp;&nbsp;&nbsp; <input id='lecturesAdd_teacherInput' disabled/></div>
    //   <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder' }}>사이트명 <input id='lecturesAdd_siteInput' disabled/></div>
    //   <div style={{ margin: '20px 0px 10px 0px', fontSize: '18px', fontWeight: 'bolder', display: 'flex', justifyContent: 'center', }}>해시태그&nbsp; <div style={{ width: '80%', textAlign: 'left', }}><input id='lecturesAdd_hashtagInput1' disabled/><input id='lecturesAdd_hashtagInput2' disabled/><input id='lecturesAdd_hashtagInput3' disabled/><input id='lecturesAdd_hashtagInput4' style={{display:'none'}}/></div></div>
    // </div>

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