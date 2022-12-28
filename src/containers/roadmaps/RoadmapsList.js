import '../../styles/roadmaps/RoadmapsList.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

import RoadmapsListElements from "../../components/roadmaps/RoadmapsListElements";
import pathnameId from "../../utils/pathnameId";
import pathnameIdFive from "../../utils/pathnameIdFive";

import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { Link, useNavigate, Router, Routes } from 'react-router-dom';
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
            "<div><div id='studiesList_font2'></div><div id='studiesList_font'>" + list.likeCnt + " </div></div></div>" +
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

const RoadmapsList = ({ session, auth, }) => {
    const [data, setData] = useState({});

    const [roadmaps, setRoadmaps] = useState({
        lecturelist: [{
            review: {},
            hashtags: [],
        }],
    });

    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        axios({
            url: '/api/roadmaps/detail/'+pathnameId(current),
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            setRoadmaps(res.data.data);
          })
         .catch((err)=>{
            console.log(err);
            if (session) {
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
        <RoadmapsListElements session={session} auth={auth} getData={roadmaps} />
    </div>
  );
}

export default RoadmapsList;