import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsList.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function hashtagsF(list) {
    const result = [];
    for (var k = 0; k < list.length; k++) {
        result.push(
            <div id ={'roadmapsList_hashtag' + k}>{list[k]}</div>
        );
    }
    return result;
}

function RoadmapsList2F (list, num1, navigate) {
    const result1 = [];
    for (var j = 0; j < num1; j++) {
        result1.push(
        <div id='roadmapsList_box1'>
            <div id='roadmapsList_blank'></div>
            <div id='roadmapsList_circle'>{(j+1)}</div>
            <div id='roadmapsList_blank1'>
                <img id='roadmapsList_image' src={list[j].thumbnailUrl}/>
                <div id='roadmapsList_mainTitle'>{list[j].lectureTitle}</div>
            </div>
            <div id='roadmapsList_blank2'>
                <div id='roadmapsList_hashtagBox'>
                    {hashtagsF(list[j].lectureHashtags)}
                </div>
                <div id='roadmapsList_title'>{list[j].lectureReviewTitle}</div>
                <hr/>
                <div id='roadmapsList_description'>{list[j].lectureReviewContent}</div>
                <Link id='roadmapsList_review' to={'/lectures/'+list[j].lectureId}>전체 리뷰 보러가기&nbsp;&gt;&nbsp;</Link>
            </div>
        </div>
        );
    }
    return result1;
};

function RoadmapsListF (list, num1, profile, nickname, id, navigate) {
    const result1 = [];
    // var pr = list.roadmapWriter.userProfileImg;
    result1.push(
    <div id='roadmapsList_main'>
        <div id='roadmapsList_line'>
            <div id='roadmapsList_line1'></div>
            <div id='body_flex'>
                <div id='roadmapsList_line3'></div>
                <div id='roadmapsList_centerLine'></div>
            </div>
            <div id='body_flex'>
                <div id='roadmapsList_line4'></div>
                <div id='roadmapsList_line5'></div>
            </div>
        </div>
        <div id='roadmapsList_title2'>{list.roadmapTitle}</div>
        <div id='roadmapsList_likeButton'>
            <div id='roadmapsList_boxLike1'></div>
            { list.isThisUserRoadmapWriter ?
            <div id="body_flex">
                <div id="studiesList_blank"></div>
                <button id="studiesList_update" onClick={()=>{navigate('/roadmapsUpdate/' + id)}}>수정</button>
                <div id="studiesList_bar">
                    <div></div>
                </div>
                <button id="studiesList_delete" onClick={()=>{
                    axios.delete('http://54.180.150.167:8080/roadmaps/' + id, {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/roadmaps')
                    }).catch((error) => { 
                        alert('로드맵 글삭제 실패')
                    })
                }}>삭제</button>
            </div> : <></>}
            <div id='roadmapsList_boxLike2'></div>
            {list.isLikedByUser ? <img id="roadmapsList_like1" src={likeFill} onClick={()=>{
                axios.post('http://54.180.150.167:8080/roadmaps/' + id + '/likes', {

                }, localStorage.getItem('token'),).then(()=>{
                    navigate('/')
                    navigate('/roadmaps/' + id)
                }).catch((error) => { 
                    alert('로드맵 글좋아요 수정 실패')
                })
            }}/> : <img id="roadmapsList_like1" src={like} onClick={()=>{
                axios.post('http://54.180.150.167:8080/roadmaps/' + id + '/likes', {

                }, localStorage.getItem('token'),).then(()=>{
                    navigate('/')
                    navigate('/roadmaps/' + id)
                }).catch((error) => { 
                    alert('로드맵 글좋아요 수정 실패')
                })
            }}/>}
            <div><div id='studiesList_font2'></div><div id='studiesList_font'>{list.likeCount}</div></div></div>
        <div id='body_flex'><div id='roadmapsList_box0'>
        {RoadmapsList2F(list.lectures, num1, navigate)}
        </div>
            <div id='roadmapsList_rightBox'>
                <div id='body_flex'>
                    <div id='roadmapsList_profill'><img id='roadmapsList_profill2' src={profile}/></div>
                    <div id='roadmapList_nickname' onClick={()=>{navigate('/otherprofile/' + list.roadmapWriter.userId)}}>{nickname}</div>
                </div>
                <div id='roadmapList_content'>{list.roadmapRecommendation}</div>
            </div>
        </div>
        <div id='roadmapsList_updateBox'>
        </div>
    </div>
    );
    return result1;
};

const RoadmapsListElements = ({ list }) => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    return (
        <div key={list[0].roadmapGroupId}>
            {RoadmapsListF(list[0], list[1], list[2], list[3], parseInt(current.split("/")[6]), navigate)}
        </div>
    );
};

export default RoadmapsListElements;