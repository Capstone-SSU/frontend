import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/roadmaps/RoadmapsAdd.css';

import axios from 'axios';

const RoadmapsBox = ({ getData, lectureId, NumF }) => {
  useEffect(() => {
    lectureId.find((d)=>(
        d == 1
    ))&&console.log("a");
  }, []);

  return (
    <>
        {getData.map((data, idx)=>{
            return (
                <div 
                    key={idx}
                    onClick={()=>{
                        for (let i = 0; i < lectureId.length; i++) {
                            if (lectureId[i] == data.lecture_id) {
                                lectureId.pop(i, i+1);
                                NumF();
                                return;
                            }
                        }
                        lectureId[lectureId.length] = data.lecture_id
                        NumF();
                    }}>
                    <div 
                        id='roadmapsUpdate_box1'
                        style={{ 
                            background: lectureId.find((d)=>(
                                d == data.lecture_id
                            ))&&"rgb(219, 219, 219)", 
                        }}>
                        <div id='roadmapsUpdate_picture'>
                            <img id='roadmapsUpdate_picture2' src={data.thumbnail} />
                        </div>
                        <div id='roadmapsUpdate_box2'>
                            <div id='roadmapsUpdate_hashtagBox'>
                                {data.hashtags.map((data2, idx2)=>{
                                    return (
                                        <div id='roadmapsUpdate_hashtag' key={idx2}>{data2}</div>
                                    );
                                })}
                            </div>
                            <div id='roadmapsUpdate_title'>{data.lecturetitle}</div>
                        </div>
                    </div>
                </div>
            );
        })}
    </>
  );
}

export default RoadmapsBox;