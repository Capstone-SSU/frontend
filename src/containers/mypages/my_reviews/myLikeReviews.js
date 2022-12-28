import React, { useState, useEffect } from "react";
import Mypage from '../Mypage';
import { useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_reviews/myLikeReviews.css';

import axios from "axios";
import $ from 'jquery';
import MLR_Card from "../../../components/mypages/my_reviews/MLR_Card";
window.$ = $;

export function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
    "<div id='body_flex'>" +
        "<div id='myProfile_first'>좋아요" + "</div>" +
        "<div id='myProfile_second'>강의" + "</div>" +
    "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
        "<a href='/pickit/#/lectures/" + list[i].lectureId + "'>" +
        "<div id='myLikeReviews_boxB'>" +
            "<div id='body_flex'>" +
                "<div>" +
                    "<div><img id='myLikeReviews_img' src='" + list[i].thumbnailUrl + "'/></div>" +
                    '<form class="mb-3" name="myform" id="myform" method="post">' +
                        '<div id="body_flex"><fieldset id="myLikeReviews">'
                
                            for (var s = 0; s < Math.round(list[i].avgRate); s++)
                                mypage += '<input type="radio" name="" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                            for (var s = Math.round(list[i].avgRate); s < 5; s++)
                                mypage += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                        
                            mypage += 
                            '<input type="radio" name="reviewStar" />(' + Math.ceil(list[i].avgRate*10)/10 + ')</fieldset></div>' +
                    '</form>' +
                "</div>" +
                "<div>" + 
                    "<div id='body_flex' class='myLikeReviews_hashtag'>"
                        for (var s = 0; s < list[i].hashtags.length; s++)
                            mypage += "<div id='myLikeReviews_hashtag2'>#" + list[i].hashtags[s] + "</div>"
                    mypage += 
                    "</div>" +
                    "<div class='myLikeReviews_titleLN'>" + list[i].lectureTitle + "</div>" +
                    "<div id='body_flex' class='myLikeReviews_titleLN2'>" +
                        "<div>" + list[i].lecturer + "</div>&nbsp;&nbsp;|&nbsp;&nbsp;" +
                        "<div>" + list[i].siteName + "</div>" +
                    "</div>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyLikeReviews = ({ auth }) => {
    const [data, setData] = useState([]);
    var navigate = useNavigate();
    useEffect(() => {
        let isComponentMounted = true

        axios({
            url: '/api/likereviews',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            setData(res.data.data);
          }).catch((err)=>{
            console.log(err);
          })

        return () => {
            isComponentMounted = false
        }
    }, []);

  return (
    <>
        <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D'}}>
            <Mypage/>
            <div id='myProfile_body'>
                <div id='myProfile_top'></div>
                {/* <div id="myLikeReviews_main"></div> */}
                <MLR_Card getData={data} />
            </div>
        </div>
    </>

  );
}

export default MyLikeReviews;