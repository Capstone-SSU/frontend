import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate, Router, Routes } from 'react-router-dom';
import '../pages_css/RoadmapsList.css';
import RoadmapsListElements from "./RoadmapsListElements";

import like from '../like.png';
import likeFill from '../likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapsF(list) {
    let theme = document.querySelector(':root');
    theme.style.setProperty('--height', 320+(list.lectures.length-1)*370+'px');

    var roadmaps = '';
    roadmaps += 
    "<div id='roadmapsList_main'>" +
        "<div id='roadmapsList_line'>" +
            "<div id='roadmapsList_line1'></div>" +
            "<div id='body_flex'>" +
                "<div id='roadmapsList_line3'></div>" +
                "<div id='roadmapsList_centerLine'></div>" +
            "</div>" +
            "<div id='body_flex'>" +
                "<div id='roadmapsList_line4'></div>" +
                "<div id='roadmapsList_line5'></div>" +
            "</div>" +
        "</div>" +
        "<div id='roadmapsList_title2'>" + list.roadmapTitle + "</div>" +
        "<div id='roadmapsList_likeButton'>" +
            "<div id='roadmapsList_boxLike1'></div>" +
            ( list.isThisUserRoadmapWriter ?
            '<div id="body_flex"><div id="studiesList_blank"></div><button id="studiesList_update">수정</button>' + '<div id="studiesList_bar"><div></div></div>' + '<button id="studiesList_delete">삭제</button></div>' : '') +
            "<div id='roadmapsList_boxLike2'></div>" +
            (list.isLikedByUser ? '<img id="roadmapsList_like1" src="' + likeFill + '"/>' : '<img id="roadmapsList_like1" src="' + like + '"/>') + 
            "<div><div id='studiesList_font2'></div><div id='studiesList_font'>" + list.likeCount + " </div></div></div>" +
        "<div id='body_flex'><div id='roadmapsList_box0'>"
        for (var j = 0; j < list.lectures.length; j++) {
            roadmaps +=
            "<div id='roadmapsList_box1'>" +
                "<div id='roadmapsList_blank'></div>" +
                "<div id='roadmapsList_circle'>"+ (j+1) +"</div>" +
                "<div id='roadmapsList_blank1'>" +
                    "<img id='roadmapsList_image' src='"+ list.lectures[j].thumbnailUrl + "'/>" +
                    "<div id='roadmapsList_mainTitle'>" + list.lectures[j].lectureTitle + "</div>" +
                "</div>" +
                "<div id='roadmapsList_blank2'><div id='roadmapsList_hashtagBox'>"
                    for (var k = 0; k < list.lectures[j].lectureHashtags.length; k++) {
                        roadmaps += 
                        "<div id ='roadmapsList_hashtag" + k + "'>" + list.lectures[j].lectureHashtags[k] + "</div>"
                    }
                roadmaps +=
                    "</div>" + 
                    "<div id='roadmapsList_title'>" + list.lectures[j].lectureReviewTitle + "</div>" +
                    "<hr/>" +
                    "<div id='roadmapsList_description'>" + list.lectures[j].lectureReviewContent + "</div>" +
                    "<div id='roadmapsList_review'>" + "전체 리뷰 보러가기&nbsp;>" + "</div>" +
                "</div>" +
            "</div>"
        }

        roadmaps +=
        "</div>" + 
            "<div id='roadmapsList_rightBox'>" +
                "<div id='body_flex'>" +
                    "<div id='roadmapsList_profill'><img id='roadmapsList_profill2' src='" + list.roadmapWriter.userProfileImg + "'/></div>" +
                    "<div id='roadmapList_nickname'>" + list.roadmapWriter.userNickname + "</div>" +
                "</div>" +
                "<div id='roadmapList_content'>" + list.roadmapRecommendation + "</div>" +
            "</div>" +
        "</div>" +
        "<div id='roadmapsList_updateBox'>" +
        "</div>" +
    "</div>"
}

const RoadmapsList = () => {
    const [roadmapslistcomments, setRoadmapsListComments] = useState([]);
    const [num1, setNum1] = useState([]);
    const [profile, setProfile] = useState([]);
    const [nickname, setNickname] = useState([]);
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        axios.get('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[6]), {

        }, localStorage.getItem('token'),).then((response)=>{
            RoadmapsF(response.data.data)
            setRoadmapsListComments(response.data.data)
            setNum1(response.data.data.lectures.length)
            setProfile(response.data.data.roadmapWriter.userProfileImg)
            setNickname(response.data.data.roadmapWriter.userNickname)

        }).catch((error) => {
            if (error == "Error: Request failed with status code 500"){
                alert("500 오류")
                navigate('/roadmaps')
            } else if ($('#header_login').val() === '') {
                alert('로그인 해주세요')
                navigate('/roadmaps')
            } else {
                alert('오류가 났습니다')
                navigate('/roadmaps')
            }
        })
    }, []);
  return (
    <div id='body_main'>
        <div id='body_center_top'></div>
        {/* <div id='roadmapsList_list'></div> */}
        <RoadmapsListElements list={[roadmapslistcomments, num1, profile, nickname]}/>
    </div>
  );
}

export default RoadmapsList;