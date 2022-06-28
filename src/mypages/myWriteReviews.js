import React from "react";
import Mypage from '../pages/Mypage';
import { useNavigate } from "react-router-dom";
import '../mypages_css/myWriteReviews.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

export function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
    "<div id='body_flex'>" +
        "<div id='myProfile_first'>작성한" + "</div>" +
        "<div id='myProfile_second'>강의" + "</div>" +
    "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
        "<a href='/pickit/#/lectures/" + list[i].lectureId + "'>" +
        "<div id='myLikeReviews_boxB'>" +
            "<div id='body_flex'>" +
                "<div>" +
                    "<div><img id='myLikeReviews_img' src='" + list[i].thumbnailUrl + "'/></div>" +
                    "<div class='myWriteReviews_titleLN'>" + list[i].lectureTitle + "</div>" +
                "</div>" +
                "<div>" 
                    mypage += 
                    "<div class='myWriteReviews_comment0'><div class='myWriteReviews_comment'>" + list[i].commentTitle + "</div></div>" +
                    '<form class="mb-3" name="myform" id="myform" method="post">' +
                        '<div id="body_flex"><fieldset id="myLikeReviews">'
                
                            for (var s = 0; s < Math.round(list[i].avgRate); s++)
                                mypage += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                            for (var s = Math.round(list[i].avgRate); s < 5; s++)
                                mypage += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                        
                            mypage += 
                            '<input type="radio" name="reviewStar" />(' + Math.ceil(list[i].avgRate*10)/10 + ')</fieldset></div>' +
                    '</form>' +
                    "<div class='myWriteReviews_comment0'><div class='myWriteReviews_comment2'>" + list[i].comment + "</div></div>" +
                "</div>" +
            "</div>" +
        "</div>" +
        "</a>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyWriteReviews = () => {
    var navigate = useNavigate();
    axios.get('http://54.180.150.167:8080/temp-login-success', {
    }, localStorage.getItem('token')).then((response2) => {
        axios.get('http://54.180.150.167:8080/users/' + response2.data.data.userId + '/reviews', {
        }, localStorage.getItem('token')).then((response) => {
            document.getElementById('myWriteReviews_main').innerHTML = MyProfileContentF(response.data.data)
        }).catch();
    }).catch(()=>{alert('오류가 발생했습니다.'); navigate('/signin');});

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    <div id="myWriteReviews_main"></div>
                </div>
            </div>
        </>

    );
}

export default MyWriteReviews;