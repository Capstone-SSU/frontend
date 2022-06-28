import React, { useEffect, useState } from "react";
import Mypage from '../pages/Mypage';
import { useNavigate } from "react-router-dom";
import MyWriteLecturesElements from "./myWriteLecturesElements";
import '../mypages_css/myWriteReviews.css';

import axios from "axios";
import $ from 'jquery';
window.$ = $;

function LectureF1() {
    var mypage = '';

    return mypage;
}

// export function MyProfileContentF(list) {
//     var mypage =
//     "<div id='myLikeReviews_boxA'>" +
//     "<div id='body_flex'>" +
//         "<div id='myProfile_first'>강의 요청 내역" + "</div>" +
//     "</div>"

//     mypage +=
//     "<div id='myLikeReviews_boxAAA'>등록 완료</div>"
//     for (var i = 0; i < list.length; i++) {
//         if (list[i].status == "완료") {
//         mypage +=
//         "<div id='myWriteLectures_box'>" +
//             "<div id='body_flex'>" +
//                 "<div>" +
//                     list[i].url +
//                 "</div>" +
//             "</div>" +
//         "</div>"
//         }
//     }
//     mypage +=
//     "<div id='myLikeReviews_boxAA'>등록 대기중</div>"
//     for (var i = 0; i < list.length; i++) {
//         if (list[i].status == "대기중") {
//         mypage +=
//         "<div id='myWriteLectures_box'>" +
//             "<div id='body_flex'>" +
//                 "<div>" +
//                     list[i].url +
//                 "</div>" +
//             "</div>" +
//         "</div>"
//         }
//     }
//     mypage +=
//     "<div id='myLikeReviews_boxAA'>등록 실패</div>"
//     for (var i = 0; i < list.length; i++) {
//         if (list[i].status == "잘못된 url") {
//         mypage +=
//         "<div id='myWriteLectures_box'>" +
//             "<div id='body_flex'>" +
//                 "<div>" +
//                     list[i].url +
//                 "</div>" +
//             "</div>" +
//         "</div>"
//         }
//     }

//     mypage +=
//     "</div>"

//     return mypage;
// }

const MyWriteLectures = () => {
    const [mylectures, setmyWriteLectures] = useState([]);

    var navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://54.180.150.167:8080/temp-login-success', {
        }, localStorage.getItem('token')).then((response2) => {
            axios.get('http://54.180.150.167:8080/users/' + response2.data.data.userId + '/requested-lectures', {
            }, localStorage.getItem('token')).then((response) => {
                setmyWriteLectures(response.data.data);
                // document.getElementById('myWriteLectures_main').innerHTML = MyProfileContentF(response.data.data)
            }).catch();
        }).catch(()=>{alert('오류가 발생했습니다.'); navigate('/signin');});
    }, []);

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', background: '#17173D' }}>
                <Mypage/>
                <div id='myProfile_body'>
                    <div id='myProfile_top'></div>
                    {/* <div id="myWriteLectures_main"></div> */}
                    <MyWriteLecturesElements list={mylectures}/>
                </div>
            </div>
        </>

    );
}

export default MyWriteLectures;