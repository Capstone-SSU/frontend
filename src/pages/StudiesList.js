import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../pages_css/StudiesList.css';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

// console.log(parseInt(current.split("/")[4]))
// axios.delete('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {

// }, localStorage.getItem('token'),).then(()=>{
// navigate('/studies')
// }).catch((error) => { 
// alert('스터디 글삭제 실패')
// })

function DeleteF() {
    console.log("delete");
}

function Button(write) {
    return (
        <div id="body_flex">
            { write ? 
            <button id="studiesList_button">수정하기</button>:<button id="studiesList_button" onClick={DeleteF}>삭제하기</button>}
        </div>
        // '<div id="body_flex">' + 
        //     '<button id="studiesList_button">수정하기</button>' +
        //     '<button id="studiesList_button" onClick="' + DeleteF + '">삭제하기</button>' +
        // '</div>'
    );
}

function StudiesListF(list, studyId) {
    // Button(list.isThisUserPostWriter)
    var studiesList = '';
    studiesList +=
    "<div id='studiesList_individe1'>" + Button() +
        ( list.isThisUserPostWriter ?
        '<div id="body_flex"><button id="studiesList_button">수정하기</button><button id="studiesList_button" onClick="' + DeleteF + '">삭제하기</button></div>' : '') +
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
                "<div>" + 
                (list.isLikedByUser ? '<img src="' + likeFill + '"/>' : '<img src="' + like + '"/>') + 
                list.likeCount + " | <button>신고하기</button></div>" +
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
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {

        }, localStorage.getItem('token'),).then((response)=>{
            const element = document.getElementById('studiesList_list')
            element.innerHTML = StudiesListF(response.data.data, parseInt(current.split("/")[4]))
            const element2 = document.getElementById('studiesList_comments')
            element2.innerHTML = StudiesListCommentsF(response.data.data.studyComments)
        }).catch((error) => { 
            navigate('/signin')
        })
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
            {/* <button onClick={() => {

            }}>임시삭제</button> */}
        </div>
    );
}

export default StudiesList;