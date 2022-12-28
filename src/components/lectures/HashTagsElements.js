import React, { useEffect } from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import $ from 'jquery';
import '../../styles/lectures/Lectures.css';

import like from '../../assets/like.png';
import StartFirst from '../../utils/StarFirst';
import StartLast from '../../utils/StarLast';

const HashTagsElements = ({ getData, searchAll, NumF }) => {
    // const LecturesHashtagsF = (hashtag) => {
    //     var hashTag2 = hashTag.replace(' ', ''); hashTag2 = hashTag2.replace('/', ''); hashTag2 = hashTag2.replace('#', ''); hashTag2 = hashTag2.replace(',', ''); hashTag2 = hashTag2.replace(',', ''); hashTag2 = hashTag2.replace('.', '');
    //     if ($('#' + hashTag2).val() === undefined)
    //       document.getElementById('lectures_hashtagSelection3').innerHTML += "<div id='" + hashTag2 + "' class='lectures_hashtag'>" + hashTag + "</div>"
    //     else 
    //       $('#' + hashTag2).remove()
    // }
    return (
        <>
        {getData.map((data, idx)=>{
            return (
                <div className='lectures_hashtagElements' key={idx}>
                    <input 
                        type="checkbox" 
                        name="hashtag" 
                        value={data.hashtag}
                        onChange={()=>{
                            for (let i = 0; i < searchAll.length; i++) {
                                if (searchAll[i] == data.hashtag) {
                                    searchAll.pop(i, i+1);
                                    NumF();
                                    return
                                }
                            }
                            searchAll[searchAll.length] = data.hashtag;
                            NumF();
                        }}
                        checked={searchAll.find(fdata=> fdata == data.hashtag) || false}
                    />
                    {data.hashtag}
                </div>
            );
        })}
        </>
    );
};

export default HashTagsElements;