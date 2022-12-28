import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../../styles/lectures/Lectures.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

function boxsF(num, thumbnail) {
    const result = [];
    for (var j = 0; j < num; j++) {
        result.push(
            <div className='roadmaps_lectureThumbnails_box' key={j}>
                <img id='roadmaps_lectureThumbnails' src={thumbnail} />
            </div>
        );
    }
    return result;
}

const RoadmapsElements = ({ getData }) => {
    return (
        <div>
            {getData.map((data, idx)=>{
                return (
                    <Link to={"/roadmaps/"+data.roadmap_id} key={idx}>
                        <div id='roadmaps_individe1'>
                            <div id='body_flex' >
                                <div id='roadmaps_title'>
                                    {data.roadmaptitle}
                                </div>
                            </div>
                            <div id='body_height'></div>
                            <div id='roadmaps_Box1' >
                                {data.thumbnailurl.map((data2, idx2)=>{
                                    return (
                                        <div key={idx2} className='roadmaps_lectureThumbnails_box'>
                                            <img id='roadmaps_lectureThumbnails' src={data2} />
                                        </div>
                                    );
                                })}
                                {/* {boxsF(data.thumbnailurl.length, data.thumbnailurl)} */}
                            </div>
                            <div id='body_height'></div>
                                <div id='roadmaps_nickname'>{data.nickname}</div>
                                <div id='roadmaps_date'>{data.createddate}</div>
                                <div id="studies_like">
                                    <img id="studies_like1" src={like}/>
                                    {data.likeCnt}
                                </div>
                        </div>
                        <hr/>
                    </Link>
                );
            })}
        </div>
    );
};

export default RoadmapsElements;