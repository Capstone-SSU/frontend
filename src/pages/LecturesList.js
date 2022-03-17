import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/Lectures.css';
import tempImg from '../mainCoding.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

//남색 부분 디자인
function LecturesListF(list) {
    console.log(list)
    var lectures = ''
    lectures +=
    "<div>사진:" + list.lectureUrl + "</div>" +
    "<div>제목:" + list.lectureTitle + "</div>" +
    "<div>별점:" + list.reviewCnt + "</div>" +
    "<div>작가:" + list.lecturer + "</div>" +
    "<div>사이트:" + list.siteName + "</div>" +
    "<div>해시태그:" + list.hashtags + "</div>" +
    "<div>좋아요:" + list.likeCnt + "</div>"
    
    return lectures
}
//남색 부분 디자인
function LecturesList2F(list) {
    var lectures = ''

    for (var i = 0; i < list.length; i++) {
    lectures +=
    "<div id='body_flex'>" +
        i +"<div>리뷰제목:" + list[i].commentTitle + "</div>" +
        "<div>리뷰내용:" + list[i].comment + "</div>" +
        "<div>별점:" + list[i].rate + "</div>" +
        "<div>닉네임:" + list[i].nickname + "</div>" +
        "<div>시간:" + list[i].createdDate + "</div>" +
    "</div>"
    }
    
    return lectures
}

const LecturesList = () => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/lectures/' + parseInt(current.split("/")[4]), {

        }, localStorage.getItem('token'),).then((response)=>{
            document.getElementById('lecturesList_list').innerHTML = LecturesListF(response.data.data)
            document.getElementById('lecturesList_comments').innerHTML = LecturesList2F(response.data.data.reviews)
        }).catch((error) => {
            console.log(error)
            alert('로그인 해주세요')
            navigate('/lectures')
        })
    });

    return (
        <div id="body_main">
            <div id="body_center_top"></div>

            <div style={{ width: '100%', height: '70px', }}></div>
            <div style={{ width: '100%', textAlign:'center', }}>

                <div style={{ width: '60%', height: 'auto', padding: '30px 50px 30px 50px', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <div id='body_flex'>
                    </div>
                    <div id="lecturesList_list"></div>
                    <div id='lecturesList_box3'>
                        <input id="lecturesList_commnetsAddInput" placeholder='댓글을 입력해주세요'/>
                    </div>
                    <div id="lecturesList_comments"></div>
                </div>
            </div>
            <div style={{ width: '100%', height: '70px', }}></div>
            {/* <button onClick={() => {

            }}>임시삭제</button> */}
        </div>
    );
}

export default LecturesList;