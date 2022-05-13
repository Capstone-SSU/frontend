import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../pages_css/RoadmapsList.css';
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
        "<div id='body_center_name'>" + list.roadmapTitle + "</div>" +
        "<div id='roadmapsList_likeButton'>" +
            "<div id='roadmapsList_boxLike1'></div>" +
            ( list.isThisUserRoadmapWriter ?
            '<div id="body_flex"><div id="studiesList_blank"></div><button id="studiesList_update">수정</button>' + '<div id="studiesList_bar"><div></div></div>' + '<button id="studiesList_delete">삭제</button></div>' : '') +
            "<div id='roadmapsList_boxLike2'></div>" +
            (list.isLikedByUser ? '<img id="studiesList_like1" src="' + likeFill + '"/>' : '<img id="studiesList_like2" src="' + like + '"/>') + 
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
                    "<div id='roadmapsList_profill'>" + list.roadmapWriter.userProfileImg + "</div>" +
                    "<div id='roadmapList_nickname'>" + list.roadmapWriter.userNickname + "</div>" +
                "</div>" +
                "<div id='roadmapList_content'>" + list.roadmapRecommendation + "</div>" +
            "</div>" +
        "</div>" +
        "<div id='roadmapsList_updateBox'>" +
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

            if (response.data.data.isThisUserRoadmapWriter) {
                document.getElementById('studiesList_update').onclick = function () {
                    navigate('/roadmapsUpdate/' + parseInt(current.split("/")[4]))
                }
                document.getElementById('studiesList_delete').onclick = function () {
                    axios.delete('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[4]), {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/roadmaps')
                    }).catch((error) => { 
                        alert('로드맵 글삭제 실패')
                    })
                }
            }

            if (!response.data.data.isLikedByUser) {
                document.getElementById('studiesList_like2').onclick = function() {
                    axios.post('http://54.180.150.167:8080/roadmaps/' + parseInt(current.split("/")[4]) + '/likes', {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/roadmaps/' + parseInt(current.split("/")[4]))
                    }).catch((error) => { 
                        alert('로드맵 글좋아요 실패')
                    })
                }
            }
            
        }).catch((error) => {
            if ($('header_login').val() == '') {
                alert('로그인 해주세요')
                navigate('/roadmaps')
            } else {
                alert('오류가 났습니다')
            }
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