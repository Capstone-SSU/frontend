import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_reviews/myWriteReviews.css';

import axios from "axios";
import $ from 'jquery';

const MWS_Card = ({getData, auth}) => {
    var navigate = useNavigate();

    return (
        <div id='myLikeReviews_boxA'>
            <div id='body_flex'>
                <div id='myProfile_first'>작성한</div>
                <div id='myProfile_second'>스터디</div>
            </div>

            {getData.map((data, idx)=>{
                return (
                    <div key={idx}>
                        <Link to={'/studies/'+data.study_id}>
                            <div id='studies_individe'>
                                <div className='studies_individeBox'>
                                    <div className='studies_image_box'>
                                        {data.profileimage === ""?
                                            <></>:
                                            <img id='studies_profill_img' src={data.profileimage} />
                                        }
                                    </div>
                                    <div id='studies_title'>{data.studytitle}</div>
                                </div>
                                <div className='studies_individeBox'>
                                    <div id='body_height'></div> 
                                    <div id='studies_together'>{data.recruitstate}</div> 
                                    <div id='studies_location'>{data.s_location}</div>
                                    <div id='studies_hashtag'>{data.s_category}</div>
                                    <div id='studies_date'>{data.createddate}</div>
                                    <div id='studies_date'>{data.nickname}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}

        </div>

    );
}

export default MWS_Card;