import React from "react";
import '../pages_css/LecturesDetail.css';
import tempImage from '../mainCoding.png';

function LecturesDetail() {
    return (
        <div className="body_main">
            <div className="lecture_info_box">
                <div className="lecture_info_image">
                    <img src={tempImage} id="lectureInfoImage"></img>
                </div>
                <div className="lecture_info_text">
                    <LectureInfoText></LectureInfoText>
                </div>
            </div>
            <div className="lecture_star_box">
                <div className="lecture_star_left">

                </div>
                <div className="lecture_star_right">

                </div>
            </div>
            <hr></hr>
            <div className="lecture_review_box">
                <LectureReview></LectureReview>
            </div>
        </div>
    );
}

const LectureInfoText = () => {
    return (
        <div>
            <h1 id="lectureTitle">강의제목강의제목 이ㅇ러ㅏ어라어나아걸 어떻게 가져오지 으앙sssss</h1>
            <p id="stars">★★★★★(5.0)</p>
            <p><b>강사이름</b></p>
            <p><b>어디강의인지</b></p>
            <div className="hashtag_box">
                <LectureInfoHashtag hashtag="모바일앱개발"></LectureInfoHashtag>
            </div>
        </div>

    );
}

const LectureInfoHashtag = (props) => {
    return (
        <p>#{props.hashtag}</p>
    );
}

const LectureReview = () => {
    return (
        <div className="lecture_review_detail">
            <p><b>재미있는 강의에요 오호호</b></p>
            <p>⭐️⭐️⭐️⭐️⭐️</p>
            <div>
                <p>작성자닉네임</p>
                <p>작성날짜</p>
            </div>
            <p>강의 리뷰에요 강의를 들어야해요 재미있는 강의였어요 새우도 맛있고 연어도 맛있어요 요즘은 포케가 또 맛이있네요</p>
        </div>
    );
}

export default LecturesDetail;