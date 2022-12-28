import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_reviews/myWriteReviews.css';

import axios from "axios";
import $ from 'jquery';

const MLR_Card = ({getData}) => {
    var navigate = useNavigate();

    return (
        <div id='myLikeReviews_boxA'>
            <div id='body_flex'>
                <div id='myProfile_first'>좋아요</div>
                <div id='myProfile_second'>강의</div>
            </div>
            {getData.map((data, idx)=>{
                return (
                    <div key={idx}>
                        <Link to={'/lectures/'+data.lecture_id}>
                            <div id='myLikeReviews_boxB'>
                                <div id='body_flex'>
                                    <div>
                                        <img id='MLR_img' src={data.thumbnailurl} />
                                        <form className="mb-3" name="myform" id="myform" method="post">
                                            <fieldset className="myLikeReviews">
                                                <div id="body_flex">
                                                    {[0, 1, 2, 3, 4].map((d)=>{
                                                        return (
                                                            <div key={d}>
                                                                {d < Math.round(data.reviewAvg)?
                                                                    <>
                                                                        <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                        <label htmlFor="rate' + s + '">⭐</label>
                                                                    </>:
                                                                    <>
                                                                        <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                        <label className="reviewStar" htmlFor="rate1">⭐</label>
                                                                    </>
                                                                }
                                                            </div>
                                                        );
                                                    })}

                                                    <input type="radio" name="reviewStar" />
                                                    {data.reviewAvg}
                                                </div>
                                            </fieldset>
                                            
                                        </form>
                                    </div>
                                    <div> 
                                        <div id='body_flex' className='myLikeReviews_hashtag'>
                                            {data.hashtags.map((data2, idx)=>{
                                                return (
                                                    <div id='lecturesList_hashtag2' key={idx}>{data2}</div>
                                                );
                                            })}
                                        </div>
                                        <div className='myLikeReviews_titleLN'>{data.lecturetitle}</div>
                                        <div id='body_flex' className='myLikeReviews_titleLN2'>
                                            <div>{data.lecturer}</div>&nbsp;&nbsp;|&nbsp;&nbsp;
                                            <div>{data.sitename}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
    
        </div>

    );
}

export default MLR_Card;