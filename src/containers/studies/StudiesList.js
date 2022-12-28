import '../../styles/studies/StudiesList.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';
import pathnameId from "../../utils/pathnameId";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const StudiesList = ({ session, auth, }) => {
    const ReportF = () => {}

    const DeleteF = () => {
        axios({
            url: '/api/study/'+pathnameId(current)+'/delete',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            navigate('/studies');
          })
         .catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/studies')
            } else {
                alert('오류가 났습니다')
                navigate('/studies')
            }
          })
    }

    const LikeCntF = () => {
        axios({
            url: '/api/study/'+pathnameId(current)+'/like',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            navigate('/');
            navigate('/studies/'+pathnameId(current));
            // setData(res.data.data);
            // setReviewData(res.data.datalist);
            // setAvgData(res.data.data.avgrate);

            // $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
          })
         .catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/studies')
            } else {
                alert('오류가 났습니다')
                navigate('/studies')
            }
          })
    }

    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    $('#studiesList_commnetsAddInput').val('')
    $('#reports1').prop("checked", true);
    
    function StudiesListCommentsF(list, studyId) {
        var studiesList = '';
        for(var i = 0; i< list.length; i++) {
            studiesList +=
            "<div id='studiesList_individe2'>" +
                "<div id='studiesList_commentsBox1'>" +   
                    "<div id='studiesList_commentsProfill'><img src='" + list[i].commentWriter.userProfileImg + "'/></div>" +
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
                studiesList +=
                "<div id='studiesList_nestedComments'>" +
                    "<div id='studiesList_nestedCommentsBox1'>" +
                        "<div id='studiesList_nestedCommentsProfill'><img src='" + list[i].nestedComments[j].commentWriter.userProfileImg + "'/></div>" +
                        "<div id='studiesList_nestedCommentsWriteUsername'>" + list[i].nestedComments[j].commentWriter.userNickname + "</div>" +
                        (list[i].nestedComments[j].isThisUserCommentWriter ? '<button id="studiesList_nestedcommentsDelete" onClick="CommentsDeleteF('+list[i].nestedComments[j].studyCommentId+"," + studyId +')">삭제</button>' : "") +
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

    const [data, setData] = useState({});
    useEffect(() => {
        axios({
            url: '/api/studies/detail/'+pathnameId(current),
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            setData(res.data.data);
            // document.getElementById('lecturesList_box4').innerHTML = LecturesList3F(res.data.data.avgrate, 0)

            // $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
          })
         .catch((err)=>{
            // console.log(err);
            // if (session) {
            //     alert('로그인 해주세요')
            //     navigate('/studies')
            // } else {
            //     alert('오류가 났습니다')
            //     navigate('/studies')
            // }
          })
    }, []);
    
    return (
        <div id="body_main">
            <div className="studiesList_modal1">
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button className="modal_body studiesList_reportsButton" onClick={() => {
                        axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[6]) + '/reports', {
                            "reportContent": $('input[name="reports"]:checked').val()
                        }, localStorage.getItem('token'),).then(()=>{
                            alert('스터디 글신고 성공')
                            $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        }).catch((error) => { 
                            alert('스터디 글신고 실패')
                            $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        })
                        $('.studiesList_modal1').hide()
                    }}>확인</button>
                    <button className="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.studiesList_modal1').hide(); $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>

            <div className="studiesList_modal2">
                <div id='studiesList_commentId' style={{ display:'none', }}></div>
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports2" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports2" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports2" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports2" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button className="modal_body studiesList_reportsButton" onClick={() => {
                        // axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[6]) + '/comments/' + $('#studiesList_commentId').val() + '/reports', {
                        //     "reportContent": $('input[name="reports2"]:checked').val()
                        // }, localStorage.getItem('token'),).then(()=>{
                        //     alert('스터디 댓글신고 성공')
                        //     $("input:radio[name='reports2']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        // }).catch((error) => { 
                        //     alert('스터디 댓글신고 실패')
                        //     $("input:radio[name='reports2']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        // })
                        // $('.studiesList_modal2').hide()
                    }}>확인</button>
                    <button className="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.studiesList_modal2').hide(); $("input:radio[name='reports2']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>

            <div id="body_center_top"></div>
            <div style={{ width: '100%', height: '70px', }}></div>
            <div style={{ width: '100%', textAlign:'center', }}>

                <div style={{ width: '60%', height: 'auto', padding: '30px 50px 30px 50px', display: 'inline-block', borderRadius: '10px', backgroundColor: 'rgb(240, 240, 240)' }}>
                    <div id='body_flex'>
                    </div>
                    <div id="studiesList_list">
                        <div id='studiesList_individe1'>
                            {data.nickname === auth.nickname ?
                                <div id="body_flex">
                                    <div id="studiesList_blank"></div>
                                    <button 
                                        id="studiesList_update"
                                        onClick={()=>navigate('/studiesUpdate/'+pathnameId(current))}>
                                        수정
                                    </button>
                                    <div id="studiesList_bar">
                                        <div></div>
                                    </div>
                                    <button 
                                        id="studiesList_delete"
                                        onClick={()=>DeleteF()}>
                                        삭제
                                    </button>
                                </div>: 
                            <></>}
                            <div id='studiesList_title'>{data.studytitle}안녕하세요</div>
                            <div 
                                id='studiesList_writeUsername'
                                onClick={()=>{
                                    if (!(auth.nickname === data.nickname))
                                        navigate('/otherprofile/'+data.nickname)
                                }}> {/* nickname */}
                                {data.nickname}
                            </div>
                            <div id='studiesList_img_flex'>
                                {data.profileimage === ""?
                                    <></>:
                                    <img id='studies_profill_img' src={data.profileimage} />
                                }
                            </div>
                            <div id='studiesList_top'>
                                {data.nickname === auth.nickname ?
                                    <div 
                                        id='studiesList_together'
                                        onClick={()=>{
                                            let recruitFront = (data.recruitstate == "모집중"? "모집완료": "모집중");
                                            axios({
                                                url: '/api/study/'+pathnameId(current)+'/recruit',
                                                method: 'POST',
                                                data: {
                                                    recruitstate: recruitFront
                                                },
                                                headers: {
                                                  'Content-Type': 'application/x-www-form-urlencoded',
                                                  // 'Authorization' : localStorage.jwToken,
                                                },
                                              }).then((res)=>{
                                                console.log(res);
                                                navigate('/')
                                                navigate('/studies/' + parseInt(current.split("/")[6]))
                                              })
                                             .catch((err)=>{
                                                console.log(err);
                                              })
                                        }}>
                                        {data.recruitstate}모집중
                                    </div> : 
                                    <div id='studiesList_together'>{data.recruitstate}모집완료</div>
                                }
                                <div id='studiesList_like'>현재 {data.likeCnt}2명이 관심을 가지고 있습니다.</div>
                    
                            </div>
    
                            <div id='studiesList_box'>
                                <div id='studiesList_box1'>
                                    <div id='studiesList_boxOuter'>
                                        <div id='studiesList_boxInner'>지역</div>
                                        <div id='studiesList_boxInner'>카테고리</div>
                                        <div id='studiesList_boxInner'>모집인원</div>
                                        <div id='studiesList_boxInner'>작성 일시</div>
                                    </div>
                                </div>
                                <div id='studiesList_box2'>
                                    <div id='studiesList_boxOuter'>
                                        <div id='studiesList_boxInner'>{data.s_location}서울</div>
                                        <div id='studiesList_boxInner'>{data.s_category}코딩테스트</div>
                                        <div id='studiesList_boxInner'>2~6 명</div>
                                        {/* {data.minrequirement + "~" + data.maxrequirement} */}
                                        <div id='studiesList_boxInner'>{data.studycreateddate}2022.11.26</div>
                                    </div>
                                </div>
                                <div 
                                    id='studiesList_box3'
                                    onClick={()=>{
                                        if (data.nickname != auth.nickname) LikeCntF()
                                        else alert('자신의 글에는 좋아요를 할 수 없습니다')
                                    }}>
                                    {data.likestatus ? 
                                        <img id="studiesList_like1" src={likeFill}/>:
                                        <img id="studiesList_like1" src={like}/>
                                    }
                                    <div id="studiesList_font">{data.likeCnt}2</div>
                                    {data.nickname === auth.nickname ? 
                                        <></>: 
                                        <button id='studiesList_reports' onClick={ReportF(null)}>신고하기</button>
                                    }
                                </div>
                                <hr id='studiesList_hr'/>
                                <div><div id='studiesList_content'>{data.studycontent}안녕하세요, 같이 공부할 사람을 구하고 있습니다</div></div>
                            </div>
                            <div id='body_height'></div>
                    
                        </div>
                    </div>
                    {/* <StudiesListElements list={studieslist}/> */}
                    <div id='studiesList_commentsAdd'>
                        <input id="studiesList_commnetsAddInput" placeholder='댓글을 입력해주세요'/>
                        <button className='button' style={{ width: 'auto', margin: '0px 25px 0px 0px', fontSize: '16px', display: 'flex', float: 'right', }} onClick={()=>{
                            if ($('#studiesList_commnetsAddInput').val() === '') {
                                alert('빈 칸은 안됩니다'); return;
                            }
                            axios.post('http://54.180.150.167:8080/studies/' + parseInt(current.split("/")[6]) + "/comments", {
                                "commentClass": 0,
                                "commentContent": $('#studiesList_commnetsAddInput').val(),
                                "commentParentId": 0,
                            }, localStorage.getItem('token'),).then((response)=>{
                                navigate('/')
                                navigate('/studies/' + parseInt(current.split("/")[6]))
                            }).catch((error) => { 
                                alert('스터디 댓글추가 실패')
                            })
                        }}>등록</button>
                    </div>
                    <div id="studiesList_comments"></div>
                    {/* <StudiesListElements list={studieslistcomments}/> */}
                </div>
            </div>
            <div style={{ width: '100%', height: '70px', }}></div>
            {/* <button onClick={() => {

            }}>임시삭제</button> */}
        </div>
    );
}

export default StudiesList;