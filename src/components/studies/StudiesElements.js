import React from 'react';
import { Link, useNavigate, Router } from 'react-router-dom';
import '../../styles/studies/Studies.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

import axios from 'axios';
import $ from 'jquery';
window.$ = $;

const StudiesElements = ({ getData }) => {
    return (
        <div>
          {getData.map((data, idx)=>{
            return (
              <Link to={"/studies/"+ data.study_id} key={idx}> 
                <div id='studies_individe'>
                  <div className='studies_individeBox'>
                    {/* {getData.이미지} */}
                    <div className='studies_profile_box'>
                      <div id="studies_profill">
                        {data.profileimage === ""?
                          <></>:
                          <img id='studies_profill_img' src={data.profileimage} />
                        }
                      </div>
                      {/* <img id='studies_profill_img' src='' /> */}
                    </div>

                    <div id='studies_title'>{data.studytitle}</div>
                    <div id="studies_like">
                      <img id="studies_like1" src={like}/>
                      {data.likeCnt}
                    </div>
                  </div>
                  <div className='studies_individeBox'>
                    <div id='body_height'></div>
                    <div id='studies_together'>{data.recruitstate}</div>
                    <div id='studies_location'>{data.s_location}</div>
                    <div id='studies_hashtag'>{data.s_category}</div>
                    <div id='studies_date'>{data.studycreateddate}</div>
                    <div id='studies_date'>{data.nickname}</div>
                  </div>
                </div><hr/>
            </Link>
            );
          })}
        </div>
    );
};

export default StudiesElements;