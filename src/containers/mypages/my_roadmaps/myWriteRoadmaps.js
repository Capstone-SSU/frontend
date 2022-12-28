import React, { useState, useEffect } from "react";
import Mypage from '../Mypage';
import { useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_roadmaps/myWriteRoadmaps.css';
import like from '../../../assets/like.png';

import axios from "axios";
import $ from 'jquery';
import MWRo_Card from "../../../components/mypages/my_roadmaps/MWRo_Card";

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
            "<div id='body_flex'>" +
            "<div id='roadmaps_nickname'>" + list[i].roadmapWriterNickname + "</div>" + 
            "<div id='roadmaps_date'>" + list[i].roadmapCreatedDate.slice(0, 10)  + "</div>" +
            '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].roadmapLikeCount + '</div>' +
            "</div>" +
        "</div>" +
        "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyWriteRoadmaps = ({ auth }) => {
    var navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        let isComponentMounted = true
        axios({
            url: '/api/myroadmaps/'+auth.nickname,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            if (res.data) {
                if (isComponentMounted) {
                    console.log(res);
                    setData(res.data.data);
                }
            }
          }).catch((err)=>{
            console.log(err);
          })
        return () => {
            isComponentMounted = false
        }
    }, []);

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    <div id="myWriteRoadmaps_main">
                        <MWRo_Card getData={data} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default MyWriteRoadmaps;