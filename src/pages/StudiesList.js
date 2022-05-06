import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../pages_css/StudiesList.css';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function StudiesListF(list) {
    console.log(list)
    var studiesList = '';
    studiesList +=
    "<div id='studiesList_individe1'>" +
        ( list.isThisUserPostWriter ?
        '<div id="body_flex"><div id="studiesList_blank"></div><button id="studiesList_update">수정</button>' + '<div id="studiesList_bar"><div></div></div>' + '<button id="studiesList_delete">삭제</button></div>' : '') +
        "<div id='studiesList_title'>" + list.studyTitle + "</div>" +
        "<div id='studiesList_writeUsername'>" + list.studyPostWriter.userNickname + "</div>" +
        "<img id='studiesList_profill' src='" + list.studyPostWriter.userProfileImg + "'/>" +
        "<div id='studiesList_top'>" +
            "<div id='studiesList_together'>" + list.studyRecruitState + "</div>" +
            "<div id='studiesList_like'>현재 " + list.likeCount + "명이 관심을 가지고 있습니다.</div>" +

        "</div>" +

        "<div id='studiesList_box'>" +
            "<div id='studiesList_box1'>" +
                "<div id='studiesList_boxOuter'>" +
                    "<div id='studiesList_boxInner'>지역</div>" +
                    "<div id='studiesList_boxInner'>카테고리</div>" +
                    "<div id='studiesList_boxInner'>모집인원</div>" +
                    "<div id='studiesList_boxInner'>작성 일시</div>" +
                "</div>" +
            "</div>" +
            "<div id='studiesList_box2'>" +
                "<div id='studiesList_boxOuter'>" +
                    "<div id='studiesList_boxInner'>" + list.studyLocation + "</div>" +
                    "<div id='studiesList_boxInner'>" + list.studyCategoryName + "</div>" +
                    "<div id='studiesList_boxInner'>" + list.studyMinReq + "~" + list.studyMaxReq + " 명</div>" +
                    "<div id='studiesList_boxInner'>" + list.studyCreatedDate.slice(0, 10) + "</div>" +
                "</div>" +
            "</div>" +
            "<div id='studiesList_box3'>" + 
                (list.isLikedByUser ? '<img id="studiesList_like1" src="' + likeFill + '"/>' : '<img id="studiesList_like2" src="' + like + '"/>') + 
                "<div id='studiesList_font'>" + list.likeCount + " |</div><button id='studiesList_reports' onClick='ReportF(" + null + ")'>신고하기</button>" +
            "</div>" +
            "<hr id='studiesList_hr'/>" +
            "<div><div id='studiesList_content'>" + list.studyContent + "</div></div>" +
        "</div>" +
        "<div id='body_height'></div>" +

    "</div>"
  
    return studiesList;
}

function StudiesListCommentsF(list, studyId) {
    var studiesList = '';
    for(var i = 0; i< list.length; i++) {
        studiesList +=
        "<div id='studiesList_individe2'>" +
            "<div id='studiesList_commentsBox1'>" +   
                "<div id='studiesList_commentsProfill'>" + list[i].commentWriter.userProfileImg + "</div>" +
                "<div id='studiesList_commentsWriteUsername'>" + list[i].commentWriter.userNickname + "</div>" +
                // <div id="studiesList_bar2"><div>
                "<div id='studiesList_commentsBoxInner'>" +
                    '<button id="studiesList_nestedCommentsAdd" onClick="NestedCommentsF('+list[i].studyCommentId+')">댓글</button><div id="studiesList_bar2"></div>' +
                    (list[i].isThisUserCommentWriter ? '<button id="studiesList_commentsUpdate" onClick="CommentsUpdate2F('+list[i].studyCommentId+"," + studyId +')">수정</button><div id="studiesList_bar2"></div>' : "") +
                    (list[i].isThisUserCommentWriter ? '<button id="studiesList_commentsDelete" onClick="CommentsDeleteF('+list[i].studyCommentId+"," + studyId +')">삭제</button>' : "") +
                    (!list[i].isThisUserCommentWriter ? '<button id="studiesList_commentsReports" onClick="CommentsReportF('+list[i].studyCommentId +')">신고</button>': "") +
                "</div>" +
            "</div>" +

            "<div id='studiesList_nestedCommnetsUpdate2'>" +
                "<div id='studiesList_commentsContent'><div id='studiesList_commentsContent" + list[i].studyCommentId + "'>" + list[i].commentContent + "</div></div>" +
                "<input class='studiesList_commentsContentUpdateInput' id='studiesList_commentsContentUpdateInput" + list[i].studyCommentId + "'/>" +
                '<button class="studiesList_commentsContentUpdatebutton" id="studiesList_commentsContentUpdatebutton' + list[i].studyCommentId + '"  onClick="CommentsUpdateF('+list[i].studyCommentId+"," + studyId +')">수정' + '</button>' +
            "</div>" +

            "<div id='studiesList_nestedCommnetsAdd2" + list[i].studyCommentId + "'>" + 
                "<div id='body_flex'><div id='studiesList_nestedcommnetsAdd3'></div><div id='studiesList_nestedCommnetsAdd2'>" +
                    "<input id='studiesList_nestedcommnetsAddInput" + list[i].studyCommentId + "' placeholder='대댓글을 입력해주세요'/>" +
                    '<button id="studiesList_nestedCommentsContentUpdatebutton" onClick="NestedCommentsAddF('+list[i].studyCommentId+"," + studyId +')">등록</button>' +
                "</div></div>" +
            "</div>"
        
        for(var j = 0; j < list[i].nestedComments.length; j++) {
            console.log(list[i].nestedComments[j])
            studiesList +=
            "<div id='studiesList_nestedComments'>" +
                "<div id='studiesList_nestedCommentsBox1'>" +
                    "<div id='studiesList_nestedCommentsProfill'>" + list[i].nestedComments[j].commentWriter.userProfileImg + "</div>" +
                    "<div id='studiesList_nestedCommentsWriteUsername'>" + list[i].nestedComments[j].commentWriter.userNickname + "</div>" +
                    (list[i].nestedComments[j].isThisUserCommentWriter ? '<button id="studiesList_nestedcommentsDelete" onClick="NestedCommentsDeleteF('+list[i].nestedComments[j].studyCommentId+"," + studyId +')">삭제</button>' : "") +
                    (!list[i].nestedComments[j].isThisUserCommentWriter ? '<button id="studiesList_nestedcommentsReports" onClick="CommentsReportF('+ list[i].nestedComments[j].studyCommentId + ')">신고</button>': "") +
                "</div>" +
                "<div id='body_flex'>" +
                    "<div id='studiesList_nestedCommentsContent'>" + list[i].nestedComments[j].commentContent + "</div>" +
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
            element.innerHTML = StudiesListF(response.data.data)
            const element2 = document.getElementById('studiesList_comments')
            element2.innerHTML = StudiesListCommentsF(response.data.data.studyComments, parseInt(current.split("/")[4]))

            if (response.data.data.isThisUserPostWriter) {
                document.getElementById('studiesList_update').onclick = function () {
                    navigate('/studiesUpdate/' + parseInt(current.split("/")[4]))
                }

                document.getElementById('studiesList_delete').onclick = function () {
                    axios.delete('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]), {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/studies')
                    }).catch((error) => { 
                    alert('스터디 글삭제 실패')
                    })
                }
            }

            if (!response.data.data.isLikedByUser) {
                document.getElementById('studiesList_like2').onclick = function () {
                    axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + '/likes', {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/studies/' + parseInt(current.split("/")[4]))
                    }).catch((error) => { 
                        alert('스터디 글좋아요 실패')
                    })
                }
            }


            if (response.data.data.studyComments != []) {
                // $('#studiesList_commentsContentUpdateInput').hide()
                // $('#studiesList_commentsContentUpdatebutton').hide()
                for (var i = 0; i < response.data.data.studyComments.length; i++) {
                    $('#studiesList_nestedcommnetsAddInput' + response.data.data.studyComments[i].studyCommentId).val('')

                    // $('#studiesList_commentsContent1').hide()
                    $('#studiesList_nestedCommnetsAdd2' + response.data.data.studyComments[i].studyCommentId).hide()
                    
                    $('#studiesList_commentsContentUpdateInput' + response.data.data.studyComments[i].studyCommentId).hide()
                    $('#studiesList_commentsContentUpdateInput' + response.data.data.studyComments[i].studyCommentId).val(response.data.data.studyComments[i].commentContent)
                    $('#studiesList_commentsContentUpdatebutton' + response.data.data.studyComments[i].studyCommentId).hide()
                }
            }
            
        }).catch((error) => {
            console.log(error)
            alert('로그인 해주세요')
            navigate('/studies')
        })
    });

    $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
    $('#studiesList_commnetsAddInput').val('')
    $('#reports1').prop("checked", true);
    
    return (
        <div id="body_main">
            <div class="studiesList_modal1">
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button class="modal_body studiesList_reportsButton" onClick={() => {
                        $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + '/reports', {
                            "additionalProp1": $('input[name="reports"]:checked').val()
                        }, localStorage.getItem('token'),).then(()=>{
                            $('.studiesList_modal1').hide()
                        }).catch((error) => { 
                            alert('스터디 글신고 실패')
                        })
                    }}>확인</button>
                    <button class="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.studiesList_modal1').hide(); $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>

            <div class="studiesList_modal2">
                <div id='studiesList_commentId' style={{ display:'none', }}></div>
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div class="studiesList_reportsRadio"><input type="radio" name="reports" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button class="modal_body studiesList_reportsButton" onClick={() => {
                        $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + '/comments/' + $('#studiesList_commentId').val() + '/reports', {
                            "additionalProp1": $('input[name="reports"]:checked').val()
                        }, localStorage.getItem('token'),).then(()=>{
                            $('.studiesList_modal2').hide()
                        }).catch((error) => { 
                            alert('스터디 글신고 실패')
                        })
                    }}>확인</button>
                    <button class="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.studiesList_modal2').hide(); $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>

            <div id="body_center_top"></div>
            <div style={{ width: '100%', height: '70px', }}></div>
            <div style={{ width: '100%', textAlign:'center', }}>

                <div style={{ width: '60%', height: 'auto', padding: '30px 50px 30px 50px', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <div id='body_flex'>
                    </div>
                    <div id="studiesList_list"></div>
                    <div id='studiesList_commentsAdd'>
                        <input id="studiesList_commnetsAddInput" placeholder='댓글을 입력해주세요'/>
                        <button className='button' style={{ width: 'auto', margin: '0px 25px 0px 0px', fontSize: '16px', display: 'flex', float: 'right', }} onClick={()=>{
                            if ($('#studiesList_commnetsAddInput').val() === '') {
                                alert('빈 칸은 안됩니다'); return;
                            }
                            axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + "/comments", {
                                "commentClass": 0,
                                "commentContent": $('#studiesList_commnetsAddInput').val(),
                                "commentParentId": 0,
                            }, localStorage.getItem('token'),).then((response)=>{
                                navigate('/studies/' + parseInt(current.split("/")[4]))
                            }).catch((error) => { 
                                alert('스터디 댓글추가 실패')
                            })
                        }}>등록</button>
                    </div>
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