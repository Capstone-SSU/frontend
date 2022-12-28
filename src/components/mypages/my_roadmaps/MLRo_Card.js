import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/mypages/my_reviews/myWriteReviews.css';
import like from '../../../assets/like.png';

import axios from "axios";
import $ from 'jquery';

const MLRo_Card = ({getData, auth}) => {
    var navigate = useNavigate();

    return (
        <div id='myLikeReviews_boxA'>
            <div id='body_flex'>
                <div id='myProfile_first'>좋아요</div>
                <div id='myProfile_second'>로드맵</div>
            </div>

            {getData.map((data, idx)=>{
                return (
                    <div key={idx}>
                        <Link to={'/roadmaps/'+data.roadmap_id}>
                            <div id='myLikeRoadmaps_boxB'>
                                <div id='body_flex' >
                                    <div id='myLikeRoadmaps_title'>
                                        {data.roadmaptitle}
                                        {/* (list[i].roadmapWriterCompany != null ? "<div id='roadmaps_company'>" + list[i].roadmapWriterCompany + "</div>" : "") +  */}
                                    </div>
                                </div>
                                <div id='body_height'></div> 
                                <div id='myLikeRoadmaps_Box1' >
                                    {data.thumbnailurl.map((data2, idx2)=> {
                                        return (
                                            <div key={idx2}>
                                                <img id='roadmaps_lectureThumbnails' src={data2} />
                                            </div>
                                        );
                                    })}
                        
                                </div>
                                <div id='body_height'></div> 
                                <div id='body_flex'>
                                    <div id='roadmaps_nickname'>{data.nickname}</div> 
                                    <div id='roadmaps_date'>{data.createddate}</div>
                                    <div id="studies_like"><img id="studies_like1" src={like} />{data.likeCnt}</div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}

        </div>

    );
}

export default MLRo_Card;