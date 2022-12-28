import React, { useEffect, useState } from "react";
import Mypage from '../Mypage';
import { useNavigate } from "react-router-dom";
import MyWriteLecturesElements from "./myWriteLecturesElements";
import '../../../styles/mypages/my_reviews/myWriteReviews.css';

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

function MyWriteLectures() {
    const [data, setData] = useState([]);

    var navigate = useNavigate();
    
    useEffect(() => {
        let isComponentMounted = true
        axios({
            url: '/api/mylectures',
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
                //   setLectureCnt(res.data.lectureCnt);
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
                    {/* <div id="myWriteLectures_main"></div> */}
                    <MyWriteLecturesElements getData={data}/>
                </div>
            </div>
        </>

    );
}

export default MyWriteLectures;