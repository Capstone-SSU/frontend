import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../pages_css/Lectures.css';

import like from '../like.png';
import likeFill from '../likeFill.png';

function boxsF(num, thumbnail) {
    const result = [];

    for (var j = 0; j < num; j++) {
        result.push(
            <div><img id='roadmaps_lectureThumbnails' src={thumbnail[j]}/></div>
        );
    }
    return result;
}

function RoadmapsF (roadmapId, roadmapTitle, roadmapWriterCompany, lectureThumbnails, lectureThumbnailsL, roadmapWriterNickname, roadmapCreatedDate, roadmapLikeCount, page) {
    const result1 = []; const result2 = []; const result3 = []; const result4 = [];
    const resultM = [];
    for (var i = 5*(page-1); i < 5*page; i++) {
        if (roadmapId.length === i) break
        result1.push(
        <Link to={"/roadmaps/"+roadmapId[i]}>
            <div id='roadmaps_individe1'>
            <div id='body_flex' >
                <div id='roadmaps_title'>
                    {roadmapTitle[i]}
                    {roadmapWriterCompany[i] != null ? <div id='roadmaps_company'>{roadmapWriterCompany[i]}</div> : <></> }
                </div>
            </div>
            <div id='body_height'></div>
            <div id='roadmaps_Box1' >
                {boxsF(lectureThumbnailsL[i], lectureThumbnails[i])}
            </div>
            <div id='body_height'></div>
            {/* // "<div id='body_flex'> */}
                <div id='roadmaps_nickname'>{roadmapWriterNickname[i]}</div>
                <div id='roadmaps_date'>{roadmapCreatedDate[i]}</div>
                <div id="studies_like"><img id="studies_like1" src={like}/>{roadmapLikeCount[i]}</div>
            {/* // "</div>" + */}
            </div><hr/>
       </Link>
        );
      }
    return result1;
  };

const RoadmapsElements = ({ list }) => {
    return (
        <div>
            {RoadmapsF(list[0], list[1], list[2], list[3], list[4], list[5], list[6], list[7], list[8])}
        </div>
    );
};

export default RoadmapsElements;