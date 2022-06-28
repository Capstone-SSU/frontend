import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/StudiesList.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function CommentsUpdate2F(a) {
    if ($('#studiesList_commentsContent'+a).css("display") === "none"){
      $('#studiesList_commentsContent'+a).show()
      $('#studiesList_commentsContentUpdateInput'+a).hide()
      $('#studiesList_commentsContentUpdatebutton'+a).hide()
    }
    else{
      $('#studiesList_commentsContent'+a).hide()
      $('#studiesList_commentsContentUpdateInput'+a).show()
      $('#studiesList_commentsContentUpdatebutton'+a).show()
    }
}
function CommentsDeleteF(a, studyId, navigate) {
    axios.delete("http://54.180.150.167:8080/studies/"+ studyId + "/comments/" + a, {
    }, localStorage.getItem('token'),).then(()=>{
        navigate("/")
        navigate("/studies/" + studyId)
    }).catch((error) => { 
        alert('스터디 댓글삭제 실패')
    })
}
function CommentsReportF(a) {
    $('.studiesList_modal2').show()
    $('#studiesList_commentId').val(a)
}

function CommentsUpdateF(a, studyId, navigate) {
    if ($('#studiesList_commentsContentUpdateInput'+a).val() === '') {
      alert('빈 칸이 있습니다'); return;
    }
    axios.patch("http://54.180.150.167:8080/studies/"+ studyId + "/comments/" + a, {
        "content" : $('#studiesList_commentsContentUpdateInput'+a).val(),
    }, localStorage.getItem('token'),).then(()=>{
        navigate("/")
        navigate("/studies/" + studyId)
    }).catch((error) => { 
        alert('스터디 댓글수정 실패')
    })
}

function NestedCommentsF(a) {
    if ($('#studiesList_nestedCommnetsAdd2'+a).css("display") === "none"){
      $('#studiesList_nestedCommnetsAdd2'+a).show()
    }
    else
      $('#studiesList_nestedCommnetsAdd2'+a).hide()
  }
function NestedCommentsAddF(a, studyId, navigate) {
    if ($('#studiesList_nestedcommnetsAddInput' + a).val() === '') {
      alert('빈 칸이 있습니다'); return;
    }
    axios.post("http://54.180.150.167:8080/studies/"+ studyId + "/comments", {
        "commentContent" : $('#studiesList_nestedcommnetsAddInput' + a).val(),
        "commentClass" : 1,
        "commentParentId": a,
    }, localStorage.getItem('token'),).then(()=>{
        navigate("/")
        navigate("/studies/" + studyId)
    }).catch((error) => { 
        alert('스터디 대댓글추가 실패')
    })
}

function StudiesNestCommentsF (list, studyId, navigate) {
    const result1 = []; 
        for(var j = 0; j < list.length; j++) {
            var nsc = list[j].studyCommentId
            result1.push(
            <div id='studiesList_nestedComments'>
                <div id='studiesList_nestedCommentsBox1'>
                    <div id='studiesList_nestedCommentsProfill'><img src={list[j].commentWriter.userProfileImg}/></div>
                    <div id='studiesList_nestedCommentsWriteUsername'>{list[j].commentWriter.userNickname}</div>
                    {list[j].isThisUserCommentWriter ? <button id="studiesList_nestedcommentsDelete" onClick={()=>{CommentsDeleteF(nsc, studyId, navigate)}}>삭제</button> : <></>}
                    {!list[j].isThisUserCommentWriter ? <button id="studiesList_nestedcommentsReports" onClick={()=>{CommentsReportF(nsc)}}>신고</button>: <></>}
                </div>
                <div id='body_flex'>
                    <div id='studiesList_nestedCommentsContent'>{list[j].commentContent}</div>
                </div>
            </div>
            );
        }
    return result1;
};

function StudiesCommentsF (list, studyId, navigate) {
    const result1 = []; 
    for(var i = 0; i< list.length; i++) {
        var sc = list[i].studyCommentId;
        result1.push(
        <div id='studiesList_individe2'>
            <div id='studiesList_commentsBox1'> 
                <div id='studiesList_commentsProfill'><img src={list[i].commentWriter.userProfileImg}/></div>
                <div id='studiesList_commentsWriteUsername'>{list[i].commentWriter.userNickname}</div>
                <div id='studiesList_commentsBoxInner'>
                    <button id="studiesList_nestedCommentsAdd" onClick={()=>{NestedCommentsF(sc)}}>댓글</button><div id="studiesList_bar2"></div>
                    {list[i].isThisUserCommentWriter ? <div id='body_flex'><button id="studiesList_commentsUpdate" onClick={() => {CommentsUpdate2F(sc)}}>수정</button><div id="studiesList_bar2"></div></div> : <></>}
                    {list[i].isThisUserCommentWriter ? <button id="studiesList_commentsDelete" onClick={() => {CommentsDeleteF(sc, studyId, navigate)}}>삭제</button> : ""}
                    {!list[i].isThisUserCommentWriter ? <button id="studiesList_commentsReports" onClick={() => {CommentsReportF(sc)}}>신고</button>: ""}
                </div>
            </div>

            <div id='studiesList_nestedCommnetsUpdate2'>
                <div id='studiesList_commentsContent'>
                    <div id={'studiesList_commentsContent' + sc}>{list[i].commentContent}</div>
                </div>
                <input class='studiesList_commentsContentUpdateInput' id={'studiesList_commentsContentUpdateInput' + sc}/>
                <button class="studiesList_commentsContentUpdatebutton" id={"studiesList_commentsContentUpdatebutton" + sc}  onClick={()=>{CommentsUpdateF(sc, studyId, navigate)}}>수정</button>
            </div>

            <div id={'studiesList_nestedCommnetsAdd2' + sc}>
                <div id='body_flex'>
                    <div id='studiesList_nestedcommnetsAdd3'></div>
                    <div id='studiesList_nestedCommnetsAdd2'>
                        <input id={'studiesList_nestedcommnetsAddInput' + sc} placeholder='대댓글을 입력해주세요'/>
                        <button id="studiesList_nestedCommentsContentUpdatebutton" onClick={()=>{NestedCommentsAddF(sc, studyId, navigate)}}>등록</button>
                    </div>
                </div>
            </div>
            {StudiesNestCommentsF(list[i].nestedComments, studyId, navigate)}
        {/* // for(var j = 0; j < list[i].nestedComments.length; j++) {
        //     studiesList +=
        //     "<div id='studiesList_nestedComments'>" +
        //         "<div id='studiesList_nestedCommentsBox1'>" +
        //             "<div id='studiesList_nestedCommentsProfill'>" + list[i].nestedComments[j].commentWriter.userProfileImg + "</div>" +
        //             "<div id='studiesList_nestedCommentsWriteUsername'>" + list[i].nestedComments[j].commentWriter.userNickname + "</div>" +
        //             (list[i].nestedComments[j].isThisUserCommentWriter ? '<button id="studiesList_nestedcommentsDelete" onClick="NestedCommentsDeleteF('+list[i].nestedComments[j].studyCommentId+"," + studyId +')">삭제</button>' : "") +
        //             (!list[i].nestedComments[j].isThisUserCommentWriter ? '<button id="studiesList_nestedcommentsReports" onClick="CommentsReportF('+ list[i].nestedComments[j].studyCommentId + ')">신고</button>': "") +
        //         "</div>" +
        //         "<div id='body_flex'>" +
        //             "<div id='studiesList_nestedCommentsContent'>" + list[i].nestedComments[j].commentContent + "</div>" +
        //         "</div>" +
        //     "</div>"
        // } */}

        </div>
        );
    }
    return result1;
};

const StudiesElements = ({ list }) => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    return (
        <div key={list.roadmapId}>
            {StudiesCommentsF(list, parseInt(current.split("/")[6]), navigate)}
        </div>
    );
};

export default StudiesElements;