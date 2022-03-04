import React, { useEffect } from "react";
import '../pages_css/StudiesList.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function StudiesListF(list) {
    var studiesList = '';
  
    studiesList +=
    "<div id='studiesList_individe1'>" +
        "<div>" + list.isThisUserPostWriter + "</div>" +
        "<div id='body_flex' >" +
            "<div id='studiesList_title'>" + list.studyTitle + "</div>" +
            "<div id='studiesList_profill'>" + list.studyPostWriter.userProfileImg + "</div>" +
            "<div id='studiesList_writeUsername'>" + list.studyPostWriter.userNickname + "</div>" +
        "</div>" +
        "<div id='studiesList_top'>" +
            "<div id='body_flex' >" +
                "<div id='studiesList_together'>" + list.studyRecruitState + "</div>" +
                "<div id='studiesList_like'>현재 " + list.likeCount + "명이 관심을 가지고 있습니다.</div>" +
            "</div>" +
        "</div>" +

        "<div id='studiesList_box'>" +
            "<div id='body_flex'>" +
                "<div>" +
                    "<div id='studiesList_box1'>지역</div>" +
                    "<div id='studiesList_box1'>카테고리</div>" +
                    "<div id='studiesList_box1'>모집인원</div>" +
                    "<div id='studiesList_box1'>작성 일시</div>" +
                "</div>" +
                "<div>" +
                    "<div id='studiesList_box2'>" + list.studyLocation + "</div>" +
                    "<div id='studiesList_box2'>" + list.studyCategoryName + "</div>" +
                    "<div id='studiesList_box2'>" + list.studyMinReq + "~" + list.studyMaxReq + " 명</div>" +
                    "<div id='studiesList_box2'>" + list.studyCreatedDate.slice(0, 10) + "</div>" +
                "</div>" +
                "<div>" + list.isLikedByUser + list.likeCount + " | 신고하기</div>" +
            "</div><hr id='studiesList_hr'/>" +
            "<div><div id='studiesList_content'>" + list.studyContent + "</div></div>" +
        "</div>" +
        "<div id='body_height'></div>" +
        "<div id='studiesList_box3'>" +
            "<input placeholder='댓글을 입력해주세요'/>" +
            "<button className='button'/>등록" +
        "</div>" +

    "</div>"
  
    return studiesList;
}

function StudiesListCommentsF(list) {
    var studiesList = '';
    for(var i = 0; i< list.length; i++) {
        studiesList +=
        "<div id='studiesList_individe2'>" +
            "<div id='body_flex'>" +
                "<div id='studiesList_commentsProfill'>" + list[i].commentWriter.userProfileImg + "</div>" +
                "<div id='studiesList_commentsWriteUsername'>" + list[i].commentWriter.userNickname + "</div>" +
            "</div>" +
            "<div id='body_flex'>" +
                "<div id='studiesList_commentsContent'>" + list[i].commentContent + "</div>" +
            "</div>"
        

        for(var j = 0; j< list[i].nestedComments.length; j++) {
            studiesList +=
            "<div id='studiesList_nestedComments'>" +
                "<div id='body_flex'>" +
                    // "<div id='a'>dd</div>" +
                    "<div id='body_flex'>" +
                        "<div id='studiesList_commentsProfill'>" + list[i].nestedComments[j].commentWriter.userProfileImg + "</div>" +
                        "<div id='studiesList_commentsWriteUsername'>" + list[i].nestedComments[j].commentWriter.userNickname + "</div>" +
                    "</div>" +
                "</div>" +
                "<div id='body_flex'>" +
                    "<div id='studiesList_commentsContent'>" + list[i].nestedComments[j].commentContent + "</div>" +
                "</div>" +
            "</div>"
        }

        studiesList += "</div>"
    }
  
    return studiesList;
}

const StudiesList = () => {
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {

        }, localStorage.getItem('token'),).then((response)=>{
            const element = document.getElementById('studiesList_list')
            element.innerHTML = StudiesListF(response.data.data)
            const element2 = document.getElementById('studiesList_comments')
            element2.innerHTML = StudiesListCommentsF(response.data.data.studyComments)
        }).catch((error) => { alert('스터디 페이지에 오류가 있습니다.') })
    });
    
    return (
        <div id="body_main">
            <div id="body_center_top"></div>

            <div style={{ width: '100%', height: '70px', }}></div>
            <div style={{ width: '100%', textAlign:'center', }}>

                <div style={{ width: '60%', height: 'auto', padding: '30px 50px 30px 50px', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <div id="studiesList_list"></div>
                    <div id="studiesList_comments"></div>
                </div>

            </div>
            <div style={{ width: '100%', height: '70px', }}></div>
        </div>
    );
}

export default StudiesList;