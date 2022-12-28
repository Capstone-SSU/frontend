import '../../../styles/mypages/my_studies/myLikeStudies.css';

import Mypage from '../Mypage';

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';
import MLS_Card from '../../../components/mypages/my_studies/MLS_Card';
window.$ = $;

export function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
        "<div id='body_flex'>" +
            "<div id='myProfile_first'>좋아요" + "</div>" +
            "<div id='myProfile_second'>스터디" + "</div>" +
        "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
            "<a href='/pickit/#/studies/" + list[i].studyPostId + "'>" +
            "<div id='studies_individe'>" +
                "<div class='studies_individeBox'>" +
                    "<img id='studies_profill' src='" + list[i].profileImage + "'/>" +
                    "<div id='studies_title'>" + list[i].studyTitle + "</div>" +
                    // '<div id="studies_like"><img id="studies_like1" src="' + like + '"/>' + list[i].studyLikeCount + '</div>' +
                "</div>" +
                "<div class='studies_individeBox'>" +
                    "<div id='body_height'></div>" + 
                    "<div id='studies_together'>" + list[i].studyRecruitState + "</div>" + 
                    "<div id='studies_location'>" + list[i].studyLocation + "</div>" +
                    "<div id='studies_hashtag'>" + list[i].studyCategoryName + "</div>" +
                    "<div id='studies_date'>" + list[i].studyCreatedDate.slice(0, 10) + "</div>" +
                    "<div id='studies_date'>" + list[i].nickname + "</div>" +
                "</div>" +
            "</div>" +
            "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyLikeStudies = ({ auth }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    useEffect(() => {
        let isComponentMounted = true
        axios({
            url: '/api/likestudies/'+auth.nickname,
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
                    <div id="myLikeStudies_main">
                        <MLS_Card getData={data} auth={auth} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default MyLikeStudies;