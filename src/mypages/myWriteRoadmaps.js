import React from "react";
import Mypage from '../pages/Mypage';
import '../mypages_css/myWriteRoadmaps.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function MyProfileContentF(list) {
    var mypage = ''

    for (var i = 0; i < list.length; i++) {
        mypage +=
        '<div>' +
            '<div>' + list[i].roadmapTitle + '</div>' +
        '</div>'
    }

    return mypage;
}

const MyWriteRoadmaps = () => {

    axios.get('http://54.180.150.167:8080/users/' + $('#header_login').val() + '/roadmaps', {
    }, localStorage.getItem('token')).then((response) => {
        console.log(response)
        document.getElementById('myWriteRoadmaps_main').innerHTML = MyProfileContentF(response.data.data)
    }).catch();

    return (
        <>
            <div id='body_flex'>
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