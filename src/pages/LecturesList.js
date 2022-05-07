import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/LecturesList.css';
import tempImg from '../mainCoding.png';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

//남색 부분 디자인
function LecturesListF(list) {
    var lectures = ''
    lectures +=
    "<div id='lecturesList_boxA'>" +
    "<div id='lecturesList_boxAA'>" +
    "<div id='body_flex'>" +
        "<div id='lecturesList_boxB'><img id='lecturesList_img' src='" + list.thumbnailUrl + "'/></div>" +
        "<div id='lecturesList_boxC'>" + 
            "<div id='lecturesList_title'>" + list.lectureTitle + "</div>" +
            '<form class="mb-3" name="myform" id="myform" method="post">' +
                '<div id="body_flex"><fieldset  id="lecturesList_star" >'
        
                for (var s = 0; s < Math.round(list.reviewCnt); s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                for (var s = Math.round(list.reviewCnt); s < 5; s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                
                lectures += 
                '<input type="radio" name="reviewStar" />(' + Math.round(list.reviewCnt) + ')</fieldset></div>' +
            '</form>' +
            "<div id='lecturesList_lecturer'>" + list.lecturer + "</div>" +
            "<div id='lecturesList_site'>" + list.siteName + "</div>" +
            "<div id='body_flex' class='lecturesList_hashtag'>"
                for (var s = 0; s < list.hashtags.length; s++)
                    lectures += "<div id='lecturesList_hashtag2'>#" + list.hashtags[s] + "</div>"
    lectures += 
            "</div><div id='lecturesList_like2'>" + list.likeCnt + "</div><div id='lecturesList_like'>" +
            ( list.likeStatus? "<img id='lecturesList_imgLike1' src='" + likeFill + "'/>" : "<img id='lecturesList_imgLike2' src='" + like + "'/>" ) +
            "</div>" +

        "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
    
    return lectures
}
//흰색 부분 디자인
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
            console.log(response)
            document.getElementById('lecturesList_list').innerHTML = LecturesListF(response.data.data)
            document.getElementById('lecturesList_comments').innerHTML = LecturesList2F(response.data.data.reviews)

            if (!response.data.data.likeStatus) {
                document.getElementById('lecturesList_imgLike2').onclick = function () {
                    axios.post('http://54.180.150.167:8080/lectures/' + parseInt(current.split("/")[4]) + '/likes', {
                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/lectures/' + parseInt(current.split("/")[4]))
                    }).catch((error) => { 
                        alert('강의 글좋아요 실패')
                    })
                }
            }

        }).catch((error) => {
            if ($('#header_login').val() === '') {
                alert('로그인 해주세요')
                navigate('/lectures')
            } else {
                $('.lecturesList_modal1').show()
            }
        })
    });

    return (
        <div id="body_main">
            <div id="body_center_top"></div>
            <div class="lecturesList_modal1">
                <div style={{ width: '100%', height: '130px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}>
                    더 많은 리뷰를 보려면 강의리뷰를
                </div>
                <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
                    남겨주세요!
                </div>
                <button class="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => {
                    navigate('/lecturesReviewAdd/' + parseInt(current.split("/")[4]))
                    $('.lecturesList_modal1').hide()
                }}>확인</button>
                <button class="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => {
                    navigate('/lectures')
                    $('.lecturesList_modal1').hide()
                }}>취소</button>
            </div>

            <div style={{ width: '100%', height: '70px', }}></div>
            <div id="lecturesList_list" style={{ width: '100%', height: 'auto', padding: '30px 0px', color: 'white', backgroundColor: '#17173D' }}></div>

            <div>
                <button onClick={() => {
                    navigate('/lecturesReviewAdd/' + parseInt(current.split("/")[4]))
                }}>리뷰등록</button>
            </div>

            <div id='lecturesList_box3'>
                <input id="lecturesList_commnetsAddInput" placeholder='댓글을 입력해주세요'/>
            </div>

            <div id="lecturesList_comments"></div>
            <div style={{ width: '100%', height: '70px', }}></div>
        </div>
    );
}

export default LecturesList;