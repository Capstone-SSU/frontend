import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../../styles/roadmaps/RoadmapsList.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

import axios from 'axios';
import $, { data } from 'jquery';
import pathnameId from '../../utils/pathnameId';

const RoadmapsListElements = ({ session, auth, getData }) => {
    const DeleteF = () => {
        axios({
            url: '/api/roadmap/'+pathnameId(current)+'/delete',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            navigate('/');
            navigate('/roadmaps');
          })
         .catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/roadmaps')
            } else {
                alert('오류가 났습니다')
                navigate('/roadmaps')
            }
          })
    }

    const LikeCntF = () => {
        axios({
            url: '/api/roadmap/'+pathnameId(current)+'/like',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            navigate('/');
            navigate('/roadmaps/'+pathnameId(current));
            // setData(res.data.data);
            // setReviewData(res.data.datalist);
            // setAvgData(res.data.data.avgrate);

            // $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
          })
         .catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/roadmaps')
            } else {
                alert('오류가 났습니다')
                navigate('/roadmaps')
            }
          })
    }

    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));

    useEffect(()=>{
        console.log(getData);
    },[]);
    return (
        // <div>Hi</div>
        <div id='roadmapsList_main'>
            <div id='roadmapsList_line'>
                <div id='roadmapsList_line1'></div>
                <div id='body_flex'>
                    <div id='roadmapsList_line3'></div>
                    <div
                        id='roadmapsList_centerLine'
                        style={{
                            height: (380+360*(getData.lecturelist.length-1))+"px",
                        }}></div>
                </div>
                <div id='body_flex'>
                    <div id='roadmapsList_line4'></div>
                    <div id='roadmapsList_line5'></div>
                </div>
            </div>
            <div id='roadmapsList_title2'>{getData.roadmaptitle}</div>
            <div id='roadmapsList_likeButton'>
                <div id='roadmapsList_boxLike1'></div>
                {getData.nickname === auth.nickname ?
                    <div id="body_flex">
                        <div id="studiesList_blank"></div>
                        <button 
                            id="studiesList_update" 
                            onClick={()=>navigate('/roadmapsUpdate/'+pathnameId(current))}>
                            수정
                        </button>
                        <div id="studiesList_bar">
                            <div></div>
                        </div>
                        <button id="studiesList_delete" onClick={()=>DeleteF()}>삭제</button>
                    </div>: 
                <></>}
                <div id='roadmapsList_boxLike2'></div>
                {/* {list.isLikedByUser ? <img id="roadmapsList_like1" src={likeFill} onClick={()=>{
                    axios.post('http://54.180.150.167:8080/roadmaps/' + id + '/likes', {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/')
                        navigate('/roadmaps/' + id)
                    }).catch((error) => { 
                        alert('로드맵 글좋아요 수정 실패')
                    })
                }}/> : <img id="roadmapsList_like1" src={like} onClick={()=>{
                    axios.post('http://54.180.150.167:8080/roadmaps/' + id + '/likes', {

                    }, localStorage.getItem('token'),).then(()=>{
                        navigate('/')
                        navigate('/roadmaps/' + id)
                    }).catch((error) => { 
                        alert('로드맵 글좋아요 수정 실패')
                    })
                }}/>} */}
                <div>
                    <div id='studiesList_font2'></div>
                    <div 
                        id='studiesList_font' 
                        onClick={()=>{
                            if (getData.nickname != auth.nickname) LikeCntF()
                            else alert('자신의 글에는 좋아요를 할 수 없습니다')
                        }}>
                        {getData.likestatus?
                            <img src={likeFill} />:
                            <img src={like} />
                        }
                        {getData.likeCnt}
                    </div>
                </div>
            </div>
            <div id='body_flex'><div id='roadmapsList_box0'>
            {getData.lecturelist.map((data, idx)=>{
                return (
                    <div id='roadmapsList_box1' key={idx}>
                        <div id='roadmapsList_blank'></div>
                        <div id='roadmapsList_circle'>{(idx+1)}</div>
                        <div id='roadmapsList_blank1'>
                            <img id='roadmapsList_image' src={data.thumbnailurl}/>
                            <div id='roadmapsList_mainTitle'>{data.lecturetitle}</div>
                        </div>
                        <div id='roadmapsList_blank2'>
                            <div id='roadmapsList_hashtagBox'>
                                {data.hashtags.map((data2, idx2)=>{
                                    return (
                                        <div id ={'roadmapsList_hashtag' + idx2} key={idx2}>{data2}</div>                                        
                                    );
                                })}
                            </div>
                            <div id='roadmapsList_title'>{data.review.reviewtitle}</div>
                            <hr/>
                            <div id='roadmapsList_description'>{data.review.reviewcontent}</div>
                            <Link id='roadmapsList_review' to={'/lectures/'+data.lecture_id}>전체 리뷰 보러가기&nbsp;&gt;&nbsp;</Link>
                        </div>
                    </div>
                );
            })}

            </div>
                <div id='roadmapsList_rightBox'>
                    <div id='body_flex'>
                        <div id='roadmapsList_profill'>
                            <div id='roadmapsList_profill2'></div>
                            {/* <img id='roadmapsList_profill2' src='https://image.wconcept.co.kr/productimg/image/img0/52/300728752_VO48242.jpg'/> */}
                        </div>
                        <div id='roadmapList_nickname' onClick={()=>{navigate('/otherprofile/' + getData.nickname)}}>{getData.nickname}</div>
                    </div>
                    <div id='roadmapList_content'>{getData.roadmapcontent}</div>
                </div>
            </div>
            <div id='roadmapsList_updateBox'>
            </div>
        </div>
    );
};

export default RoadmapsListElements;