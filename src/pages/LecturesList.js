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
    (false ? "<button class='lecturesList_master'>수정</button>": "") +
    (false ? "<button class='lecturesList_master'>삭제</button>": "") +
    "<div id='body_flex'>" +
        "<div id='lecturesList_boxB'><img id='lecturesList_img' src='" + list.thumbnailUrl + "'/></div>" +
        "<div id='lecturesList_boxC'>" + 
            "<div id='lecturesList_title'>" + list.lectureTitle + "</div>" +
            '<form class="mb-3" name="myform" id="myform" method="post">' +
                '<div id="body_flex"><fieldset  id="lecturesList_star" >'
        
                for (var s = 0; s < Math.round(list.avgRate); s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                for (var s = Math.round(list.avgRate); s < 5; s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                
                lectures += 
                '<input type="radio" name="reviewStar" />(' + list.avgRate + ')</fieldset></div>' +
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
var n5 = 0; var n4 = 0; var n3 = 0; var n2 = 0; var n1 = 0;
function LecturesList2F(list) {
    var lectures = ''
    lectures += 
    "<div id='lecturesList_boxA'>"

    for (var i = 0; i < list.length; i++) {
    lectures +=
        "<div id='lecturesList_boxReviewAA'>" +
            "<div id='lecturesList_titleReview'>" + list[i].commentTitle + "</div>" +
            "<div id='lecturesList_titleReports' onClick='ReviewReportsF(" + list[i].reviewId + ")'>신고</div>" +
            '<form class="mb-3" name="myform" id="myform" method="post">' +
                '<div id="body_flex"><fieldset >'
        
                for (var s = 0; s < Math.round(list[i].rate); s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                for (var s = Math.round(list[i].rate); s < 5; s++)
                lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                
                lectures += 
                '</fieldset></div>' +
            '</form>' +
            "<div id='body_flex'>" +
                "<div id='lecturesList_nicknameReview'>" + list[i].nickname + "</div>" +
                "<div id='lecturesList_dateReview'>" + list[i].createdDate.slice(0, 10) + "</div>" +
            "</div>" +
            "<div id='lecturesList_commentReview'>" + list[i].comment + "</div>" +
        "<hr id='lecturesList_hrReview'/></div>"
    }

    lectures +=
    "</div>"
    return lectures
}
function LecturesList3F(avgRate, reviewCnt) {
    var lectures = ''
    lectures +=
    "<div id='lecturesList_avgRate'>" + avgRate + "</div>" +
    "<div>" +
        '<form class="mb-3" name="myform" id="myform" method="post">' +
            '<div id="body_flex"><fieldset  id="lecturesList_starReview" >'

            for (var s = 0; s < Math.round(avgRate); s++)
            lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
            for (var s = Math.round(avgRate); s < 5; s++)
            lectures += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
            
            lectures += 
            '</fieldset></div>' +
        '</form>' +
    "</div>" +
    "<div id='lecturesList_reviewCnt'>" + reviewCnt + "개의 수강평</div>"
    return lectures
}
function LecturesList4F(list) {
    var lectures = ''
    lectures +=
    "<div id='lecturesList_num' class='lecturesList_numReview'>5점<div id='n5' class='lecturesList_numReviewBox'></div>" + "</div>" +
    "<div class='lecturesList_numReview'>4점<div id='n4' class='lecturesList_numReviewBox'></div>" + "</div>" +
    "<div class='lecturesList_numReview'>3점<div id='n3' class='lecturesList_numReviewBox'></div>" + "</div>" +
    "<div class='lecturesList_numReview'>2점<div id='n2' class='lecturesList_numReviewBox'></div>" + "</div>" +
    "<div class='lecturesList_numReview'>1점&nbsp;<div id='n1' class='lecturesList_numReviewBox'></div>" + "</div>"
    return lectures
}
function LecturesList5F(list) {
    var n5 = 0; var n4 = 0; var n3 = 0; var n2 = 0; var n1 = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].rate == 5) n5 += 1; else if (list[i].rate == 4) n4 += 1; else if (list[i].rate == 3) n3 += 1; else if (list[i].rate == 2) n2 += 1; else n1 += 1;
    }
    n5 = (n5/list.length)*100; n4 = (n4/list.length)*100; n3 = (n3/list.length)*100; n2 = (n2/list.length)*100; n1 =(n1/list.length)*100;
    return [n5, n4, n3, n2, n1]
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
            document.getElementById('lecturesList_box4').innerHTML = LecturesList3F(response.data.data.avgRate, response.data.data.reviewCnt)
            document.getElementById('lecturesList_box5').innerHTML = LecturesList4F(response.data.data.reviews)
            var starList = LecturesList5F(response.data.data.reviews)

            $('#n5').css('background', 'linear-gradient(90deg, #FCD53F ' + starList[0] + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-starList[0]) +'%)')
            $('#n4').css('background', 'linear-gradient(90deg, #FCD53F ' + starList[1] + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-starList[1]) +'%)')
            $('#n3').css('background', 'linear-gradient(90deg, #FCD53F ' + starList[2] + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-starList[2]) +'%)')
            $('#n2').css('background', 'linear-gradient(90deg, #FCD53F ' + starList[3] + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-starList[3]) +'%)')
            $('#n1').css('background', 'linear-gradient(90deg, #FCD53F ' + starList[4] + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-starList[4]) +'%)')

            if (!response.data.data.likeStatus) {
                document.getElementById('lecturesList_imgLike2').onclick = function () {
                    axios.post('http://54.180.150.167:8080/lectures/' + parseInt(current.split("/")[4]) + '/likes', {
                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/lectures/' + parseInt(current.split("/")[4]))
                    }).catch((error) => { 
                        $('.lecturesList_modal1').show()
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

    $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
    $('#reports1').prop("checked", true);
    return (
        <div id="body_main">
            <div id="body_center_top"></div>
            <div class="lecturesList_modal2">
                <div id='lecturesList_reviewId'></div>
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button class="modal_body studiesList_reportsButton" onClick={() => {
                        $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        axios.post('http://54.180.150.167:8080/reviews/' + parseInt(current.split("/")[4]) + '/reports', {
                            "additionalProp1": $('input[name="reports"]:checked').val()
                        }, localStorage.getItem('token'),).then(()=>{
                            $('.lecturesList_modal2').hide()
                        }).catch((error) => { 
                            alert('강의리뷰 글신고 실패')
                        })
                    }}>확인</button>
                    <button class="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.lecturesList_modal2').hide(); $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>
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

            <div id='lecturesList_boxA'>
                <div id="lecturesList_box3">
                    <div id="lecturesList_box4"></div>
                    <div id="lecturesList_box5"></div>
                </div>
                <hr style={{ borderWidth: '1px 0px 0px 0px', height: '1px', background: 'black', }}/>
            </div>

            <div id='lecturesList_boxA'>
                <button onClick={() => {
                    navigate('/lecturesReviewAdd/' + parseInt(current.split("/")[4]))
                }} style={{ margin: '20px 0px 0px 0px', float: 'right', fontSize: '18px', fontWeight: '600', color: 'white', borderRadius: '10px', background: '#17173D', }}>리뷰등록</button>
            </div>
            
            <div id="lecturesList_comments"></div>
            {/* <div style={{ width: '100%', height: '70px', }}></div> */}
        </div>
    );
}

export default LecturesList;