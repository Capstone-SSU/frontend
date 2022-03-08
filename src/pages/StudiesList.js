import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../pages_css/StudiesList.css';
import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function StudiesListF(list) {
    var studiesList = '';
    studiesList +=
    "<div id='studiesList_individe1'>" +
        ( list.isThisUserPostWriter ?
        '<div id="body_flex"><div id="studiesList_blank"></div><button id="studiesList_update">수정</button>' + '<div id="studiesList_bar"><div></div></div>' + '<button id="studiesList_delete">삭제</button></div>' : '') +
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
                "<div id='body_flex'>" + 
                    (list.isLikedByUser ? '<img id="studiesList_like1" src="' + likeFill + '"/>' : '<img id="studiesList_like2" src="' + like + '"/>') + 
                    "<div><div id='studiesList_font2'></div><div id='studiesList_font'>" + list.likeCount + " |</div></div><button id='studiesList_reports'>신고하기</button></div>" +
            "</div><hr id='studiesList_hr'/>" +
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
            "<div id='body_flex'>" +
                "<div id='studiesList_commentsProfill'>" + list[i].commentWriter.userProfileImg + "</div>" +
                "<div id='studiesList_commentsWriteUsername'>" + list[i].commentWriter.userNickname + "</div>" +
                '<button id="studiesList_nestedcommentsAdd" onClick="NestedCommentsF('+list[i].studyCommentId+')">댓글</button><div id="studiesList_bar2"><div></div></div>' +
                (list[i].isThisCommentWriterPostWriter ? '<button id="studiesList_commentsUpdate" onClick="CommentsUpdate2F('+list[i].studyCommentId+"," + studyId +')">수정</button><div id="studiesList_bar2"><div></div></div>' : "<button></button>") +
                (list[i].isThisCommentWriterPostWriter ? '<button id="studiesList_commentsDelete" onClick="CommentsDeleteF('+list[i].studyCommentId+"," + studyId +')">삭제</button><div id="studiesList_bar2"><div></div></div>' : "<button></button>") +
                '<button id="studiesList_commentsReports" onClick="CommentsReportF('+list[i].studyCommentId+"," + studyId +')">신고</button>' +
            "</div>" +
            "<div id='body_flex'>" +
                "<div id='studiesList_commentsContent'><div id='studiesList_commentsContent" + list[i].studyCommentId + "'>" + list[i].commentContent + "</div></div>" +
                // "<div id='studiesList_UcommentsContent'>" +
                    "<input id='studiesList_commentsContentUpdateInput" + list[i].studyCommentId + "'/>" +
                    '<div id="studiesList_commentsContentUpdatebutton"><button  id="studiesList_commentsContentUpdatebutton' + list[i].studyCommentId + '"  onClick="CommentsUpdateF('+list[i].studyCommentId+"," + studyId +')">등록' + '</button></div>' +
                // "</div>" +
            "</div>" +

            "<div id='studiesList_nestedcommnetsAdd2" + list[i].studyCommentId + "'>" + 
                "<div id='body_flex'><div id='studiesList_nestedcommnetsAdd2_1'></div><div id='studiesList_nestedcommnetsAdd2'>" +
                    "<input id='studiesList_nestedcommnetsAddInput" + list[i].studyCommentId + "' placeholder='대댓글을 입력해주세요'/>" +
                    '<button id="studiesList_commentsNestedContentUpdatebutton" onClick="NestedCommentsAddF('+list[i].studyCommentId+"," + studyId +')">등록</button>' +
                "</div></div>" +
            "</div>"
           
        
        for(var j = 0; j< list[i].nestedComments.length; j++) {
            studiesList +=
            "<div id='studiesList_nestedComments'>" +
                "<div id='body_flex'>" +
                    // "<div id='a'>dd</div>" +
                    "<div id='body_flex'>" +
                        "<div id='studiesList_commentsProfill'>" + list[i].nestedComments[j].commentWriter.userProfileImg + "</div>" +
                        "<div id='studiesList_commentsWriteUsername'>" + list[i].nestedComments[j].commentWriter.userNickname + "</div>" +
                        '<button onClick="NestedCommentsReportF('+')">신고</button>' +
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
    $('#studiesList_commnetsAddInput').val('')
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

            document.getElementById('studiesList_reports').onclick = function () {
                var input = prompt('신고사유', '');
                axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + '/reports', {
                    "reportContent": input
                }, localStorage.getItem('token'),).then(()=>{
                    navigate('/studies/' + parseInt(current.split("/")[4]))
                }).catch((error) => { 
                    alert('스터디 글신고 실패')
                })
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
                for (var i = 0; i < response.data.data.studyComments.length; i++) {
                    $('#studiesList_nestedcommnetsAddInput' + response.data.data.studyComments[i].studyCommentId).val('')

                    $('#studiesList_UcommentsContent').hide()
                    $('#studiesList_UcommentsContentUpdateInput').hide()
                    $('#studiesList_UcommentsContentUpdatebutton').hide()

                    $('#studiesList_commentsContent1').hide()
                    $('#studiesList_nestedcommnetsAdd2' + response.data.data.studyComments[i].studyCommentId).hide()
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
    
    return (
        <div id="body_main">
            <div id="body_center_top"></div>

            <div style={{ width: '100%', height: '70px', }}></div>
            <div style={{ width: '100%', textAlign:'center', }}>

                <div style={{ width: '60%', height: 'auto', padding: '30px 50px 30px 50px', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <div id='body_flex'>
                    </div>
                    <div id="studiesList_list"></div>
                    <div id='studiesList_box3'>
                        <input id="studiesList_commnetsAddInput" placeholder='댓글을 입력해주세요'/>
                        <button id='studiesList_commentsAddButton' className='button' onClick={()=>{
                            axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[4]) + "/comments/", {
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