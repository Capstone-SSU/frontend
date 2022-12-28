import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_reviews/myWriteReviews.css';

import axios from "axios";
import $ from 'jquery';

const MWR_Card = ({getData}) => {
    var navigate = useNavigate();

    return (
        <div id='myLikeReviews_boxA'>
            <div id='body_flex'>
                <div id='myProfile_first'>작성한</div>
                <div id='myProfile_second'>강의</div>
            </div>
            {getData.map((data, idx)=>{
                return (
                    <div key={idx}>
                        <Link to={'/lectures/'+data.lecture_id}>
                            <div id='myLikeReviews_boxB'>
                                <div id='body_flex'>
                                    <div>
                                        <img id='MWR_img' src={data.thumbnail} />
                                        <div className='myWriteReviews_titleLN'>
                                            {data.lecturetitle}
                                        </div>
                                    </div>
                                    <div>
                                        <div className='myWriteReviews_comment0'>
                                            <div className='myWriteReviews_comment'>
                                                {data.reviewtitle}
                                            </div>
                                        </div>
                                        <form className="mb-3" name="myform" id="myform" method="post">
                                            <fieldset className="myLikeReviews">
                                                <div id="body_flex">
                                                    {[0, 1, 2, 3, 4].map((d)=>{
                                                        return (
                                                            <div key={d}>
                                                                {d < Math.round(data.reviewrate)?
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
                                                    {data.reviewrate}
                                                </div>
                                            </fieldset>
                                            
                                        </form>
                                        <div className='myWriteReviews_comment0'>
                                            <div className='myWriteReviews_comment2'>
                                                {data.reviewcontent}
                                            </div>
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

export default MWR_Card;