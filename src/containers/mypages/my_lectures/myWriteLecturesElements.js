import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../../../styles/mypages/my_reviews/myWriteReviews.css';

import like from '../../../assets/like.png';
import likeFill from '../../../assets/likeFill.png';
import MyWriteLectures from './myWriteLectures';

const MyWriteLecturesElements = ({ getData }) => {
    var navigate = useNavigate();
    return (
        <>
            <div id='myLikeReviews_boxA'>
                <div id='body_flex'>
                    <div id='myProfile_first'>강의 요청 내역</div>
                </div>
                <div id='myLikeReviews_boxAAA'>등록 완료</div>
                {getData.map((data, idx)=>{
                    return (
                        <div key={idx}>
                            {data.state > 0&&
                                <Link to={'/lectures/'+data.state}>
                                    <div id='myWriteLectures_box'>
                                        <div id='body_flex'>
                                            <div>
                                                {data.siteurl}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            }
                        </div>
                    );
                })}
                <div id='myLikeReviews_boxAA'>등록 대기중</div>
                {getData.map((data, idx)=>{
                    return (
                        <div key={idx}>
                            {data.state === 0&&
                                <div id='myWriteLectures_box'>
                                    <div id='body_flex'>
                                        <div>
                                            {data.siteurl}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    );
                })}
                <div id='myLikeReviews_boxAA'>등록 실패</div>
                {getData.map((data, idx)=>{
                    return (
                        <div key={idx}>
                            {data.state === -1&&
                                <div id='myWriteLectures_box'>
                                    <div id='body_flex'>
                                        <div>
                                            {data.siteurl}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default MyWriteLecturesElements;