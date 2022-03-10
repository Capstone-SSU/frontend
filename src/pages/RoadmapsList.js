import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsList.css';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

function RoadmapsF(list) {
    console.log(list)
    let theme = document.querySelector(':root');
    theme.style.setProperty('--height', 380+(list.lectures.length-1)*400+'px');

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
        "<div id='body_center_name'>" +
            "나나나난 이것은 제목~" +
        "</div>" +
        "<div id='roadmapsList_likeButton'><button>좋아요</button></div>" +
        "<div id='body_flex'><div>"

        for (var j = 0; j < list.lectures.length; j++) {
            roadmaps +=
            "<div id='roadmapsList_box1'>" +
                "<div id='roadmapsList_blank'></div>" +
                "<div id='roadmapsList_circle'>"+ (j+1) +"</div>" +
                "<div id='roadmapsList_blank1'>" +
                    "<div id='roadmapsList_image'></div>" +
                    "<div id='roadmapsList_mainTitle'>" + list.lectures[j].lectureTitle + "</div>" +
                "</div>" +
                "<div id='roadmapsList_blank2'><div id='body_flex'>"
                    for (var k = 0; k < list.lectures[j].lectureHashtags.length; k++) {
                        roadmaps += 
                        "<div id ='roadmapsList_hashtag" + k + "'>" + list.lectures[j].lectureHashtags[k] + "</div>"
                    }
                roadmaps +=
                    "</div><div id='roadmapsList_title'>" + list.lectures[j].lectureReviewTitle + "</div>" +
                    "<hr/>" +
                    "<div id='roadmapsList_description'>" + list.lectures[j].lectureReviewContent + "</div>" +
                "</div>" +
            "</div>"
        }

        roadmaps +=
            "</div><div id='roadmapsList_rightBox'>" +
                "<div id='body_flex'>" +
                    "<div id='roadmapsList_profill'>" + list.roadmapWriter.userProfileImg + "</div>" +
                    "<div id='roadmapList_nickname'>" + list.roadmapWriter.userNickname + "</div>" +
                "</div>" +
                "<div id='roadmapList_content'>" + list.roadmapRecommendation + "</div>" +
            "</div>" +
        "</div>" +
        "<div id='body_flex'>" +
            "<div id='roadmapsList_peaple'></div>" +
            "<div id='roadmapsList_peaple1'>" +
                "추천대상 |" +
            "</div>" +
        "</div>" +
        "<div id='roadmapsList_updateButton'>" +
            "<button>수정하기</button>" +
        "</div>" +
    "</div>"

    return roadmaps;
}

const RoadmapsList = () => {
    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    useEffect(() => {
        if (localStorage.getItem('token')) {
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
        }
        axios.get('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[4]), {

        }, localStorage.getItem('token'),).then((response)=>{
            document.getElementById('roadmapsList_list').innerHTML = RoadmapsF(response.data.data)
            
        }).catch((error) => {
            console.log(error)
            alert('로그인 해주세요')
            navigate('/studies')
        })
    });
  return (
    <div id='body_main'>
        <div id='body_center_top'></div>
        <div id='roadmapsList_list'></div>

    </div>
  );
}

export default RoadmapsList;