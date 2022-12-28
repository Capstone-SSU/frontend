import React, { useEffect } from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../../styles/lectures/Lectures.css';

import like from '../../assets/like.png';
import StartFirst from '../../utils/StarFirst';
import StartLast from '../../utils/StarLast';

const LecturesElements = ({ getData }) => {

    return (
        <>
        {getData.map((data, idx)=>{
            return (
                <Link id='lectures_individe' to={'/lectures/' + data.lecture_id} key={idx}>
                    <div>
                        <div id='lectures_imageBox'>
                            <div id='lectures_likeBox'></div>
                            <img className='lectures_img' src={like}/>
                            <div className='lectures_img'>{data.likeCnt}</div>
                        </div>
                        {data.thumbnailurl === "" || data.thumbnailurl == null || data.thumbnailurl == undefined?
                            <div id='lectures_box'></div>:
                            <img id='lectures_box' src={data.thumbnailurl} />
                            // <img id='lectures_box' src='https://image.wconcept.co.kr/productimg/image/img0/52/300728752_VO48242.jpg' />
                        }
                        <div id='lectures_title'>{data.lecturetitle}</div>
                        <div className='lectures_starsBox'>
                            <div className='lectures_avgRate'>
                                <div id='body_flex' className='lectures_starsBox'>
                                    <div className='lectures_avgRate'>{StartFirst(data.reviewAvg)}</div>
                                    <div id="grayStars" className="lectures_avgRate">{StartLast(data.reviewAvg)}</div>
                                    <div className="lectures_avgRate">{data.reviewAvg}</div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })}
        </>
    );
};

export default LecturesElements;