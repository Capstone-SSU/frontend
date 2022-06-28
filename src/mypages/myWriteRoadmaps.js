import React from "react";
import Mypage from '../pages/Mypage';
import { useNavigate } from "react-router-dom";
import '../mypages_css/myWriteRoadmaps.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

export function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
        "<div id='body_flex'>" +
            "<div id='myProfile_first'>작성한" + "</div>" +
            "<div id='myProfile_second'>로드맵" + "</div>" +
        "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
        "<a href='/pickit/#/roadmaps/" + list[i].roadmapId + "'>" +
        "<div id='myLikeRoadmaps_boxBB'>" +
            "<div id='body_height'></div>" + 
            "<div id='myLikeRoadmaps_Box1' >"
    
            for (var j = 0; j < list[i].lectureThumbnails.length; j++) {
                mypage += 
                "<div><img id='roadmaps_lectureThumbnails' src='" + list[i].lectureThumbnails[j] + "'/></div>"
            }
    
            mypage += "</div>" +
            "<div id='body_height'></div>" + 
            "<div id='body_flex' >" +
                "<div id='myLikeRoadmaps_title'>" + list[i].roadmapTitle + 
                    (list[i].roadmapWriterCompany != null? "<div id='roadmaps_company'>" + list[i].roadmapWriterCompany + "</div>": "") + 
                "</div>" +
            "</div>" +
            // "<div id='body_flex'>" +
            // "<div id='roadmaps_nickname'>" + list[i].roadmapWriterNickname + "</div>" + 
            // "<div id='roadmaps_date'>" + list[i].roadmapCreatedDate.slice(0, 10)  + "</div>" +
            // '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].roadmapLikeCount + '</div>' +
            // "</div>" +
        "</div>" +
        "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyWriteRoadmaps = () => {
    var navigate = useNavigate();
    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response2) => {
        axios.get('http://54.180.150.167:8080/users/' + response2.data.data.userId + '/roadmaps', {
        }, localStorage.getItem('token')).then((response) => {
            document.getElementById('myWriteRoadmaps_main').innerHTML = MyProfileContentF(response.data.data)
        }).catch();
    }).catch(()=>{alert('오류가 발생했습니다.'); navigate('/signin');});

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    <div id="myWriteRoadmaps_main"></div>
                </div>
            </div>
        </>

    );
}

export default MyWriteRoadmaps;