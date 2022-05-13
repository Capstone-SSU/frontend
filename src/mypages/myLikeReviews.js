import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myLikeReviews.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage =
    "<div id='myLikeReviews_boxA'>" +
    "<div id='body_flex'>" +
        "<div id='myProfile_first'>좋아요" + "</div>" +
        "<div id='myProfile_second'>강의리뷰" + "</div>" +
    "</div>"

    for (var i = 0; i < list.length; i++) {
        mypage +=
        "<div id='myLikeReviews_boxB'>" +
            "<div id='body_flex'>" +
                "<div>" +
                    "<div><img id='myLikeReviews_img' src='" + list[i].thumbnailUrl + "'/></div>" +
                    '<form class="mb-3" name="myform" id="myform" method="post">' +
                        '<div id="body_flex"><fieldset id="myLikeReviews">'
                
                            for (var s = 0; s < Math.round(list[i].avgRate); s++)
                                mypage += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label for="rate' + s + '">⭐</label>'
                            for (var s = Math.round(list[i].avgRate); s < 5; s++)
                                mypage += '<input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" /><label class="reviewStar" for="rate1">⭐</label>'
                        
                            mypage += 
                            '<input type="radio" name="reviewStar" />(' + list[i].avgRate + ')</fieldset></div>' +
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
        "</div>"
    }

    mypage +=
    "</div>"

    return mypage;
}

const MyLikeReviews = () => {
    axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/liked-lectures', {
    }, localStorage.getItem('token')).then((response) => {
        console.log(response)
        document.getElementById('myLikeReviews_main').innerHTML = MyProfileContentF(response.data.data)
    }).catch();

  return (
    <>
        <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D'}}>
            <Mypage/>
            <div id='myProfile_body'>
                <div id='myProfile_top'></div>
                <div id="myLikeReviews_main"></div>
            </div>
        </div>
    </>

  );
}

export default MyLikeReviews;