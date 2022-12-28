import '../../styles/mypages/otherProfile.css';

import * as MyLikeReviews from './my_reviews/myLikeReviews.js';
import * as MyLikeRoadmaps from './my_roadmaps/myLikeRoadmaps.js';
import * as MyLikeStudies from './my_studies/myLikeStudies.js';
import * as MyWriteReviews from './my_reviews/myWriteReviews.js';
import * as MyWriteRoadmaps from './my_roadmaps/myWriteRoadmaps.js';
import * as MyWriteStudies from './my_studies/myWriteStudies.js';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import $ from 'jquery';
import pathnameId from '../../utils/pathnameId';
import pathnameIdFive from '../../utils/pathnameIdFive';
import MLR_Card from '../../components/mypages/my_reviews/MLR_Card';
import MWR_Card from '../../components/mypages/my_reviews/MWR_Card';
import MWS_Card from '../../components/mypages/my_studies/MWS_Card';
import MWRo_Card from '../../components/mypages/my_roadmaps/MWRo_Card';
import MLS_Card from '../../components/mypages/my_studies/MLS_Card';
import MLRo_Card from '../../components/mypages/my_roadmaps/MLRo_Card';
window.$ = $;

function ColorF(f, b) {
    if (b == 'reviews') {
        $('#lectures').css('background', '#17173D')
        $('#lectures').css('color', 'white')
        $('#studies').css('background', 'white')
        $('#studies').css('color', '#17173D')
        $('#roadmaps').css('background', 'white')
        $('#roadmaps').css('color', '#17173D')
    } else if(b == 'studies') {
        $('#studies').css('background', '#17173D')
        $('#studies').css('color', 'white')
        $('#lectures').css('background', 'white')
        $('#lectures').css('color', '#17173D')
        $('#roadmaps').css('background', 'white')
        $('#roadmaps').css('color', '#17173D')
    } else {
        $('#roadmaps').css('background', '#17173D')
        $('#roadmaps').css('color', 'white')
        $('#studies').css('background', 'white')
        $('#studies').css('color', '#17173D')
        $('#lectures').css('background', 'white')
        $('#lectures').css('color', '#17173D')
    }

    if (f == 'like') {
        $('#liked').css('background', '#17173D')
        $('#liked').css('color', 'white')
        $('#write').css('background', 'white')
        $('#write').css('color', '#17173D')
    } else {
        $('#write').css('background', '#17173D')
        $('#write').css('color', 'white')
        $('#liked').css('background', 'white')
        $('#liked').css('color', '#17173D')
    }
}

const OtherProfile = ({ session }) => {
    const OtherProfileLastF = (current, f, b) => {
        //볼 수 있게 허락하는 함수
        // axios.get('http://54.180.150.167:8080/users/' + current, {
    
        // }, localStorage.getItem('token'),).then((response)=>{
        // }).catch((error) => {
        //     $('.myOtherList_modal1').show()
        // })
    
        axios({
            url: '/api/'+f+b+"/"+nickname,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            console.log(res);
            datalist = res.data.data;
            setDataList(datalist);
          })
         .catch((err)=>{
            console.log(err);
          })
    }

    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));

    const [data, setData] = useState({});
    let [datalist, setDataList] = useState([]);
    const [nickname, setNickname] = useState(current.split('/')[6]);
    useEffect(() => {
        let isComponentMounted = true;
        axios({
            url: '/api/otherprofile/'+nickname,
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
          }).then((res)=>{
            if (res.data) {
                if (isComponentMounted) {
                    console.log(res);
                    setData(res.data.data);
                }
            }
          }).catch((err)=>{
            console.log(err);
            if (session) {
                alert('로그인 해주세요')
                navigate('/studies')
            } else {
                alert('오류가 났습니다')
                navigate('/studies')
            }
          })
        $('#otherProfile_f').val('like'); $('#otherProfile_b').val('reviews');
        OtherProfileLastF(nickname, $('#otherProfile_f').val(), $('#otherProfile_b').val());
        ColorF($('#otherProfile_f').val(), $('#otherProfile_b').val());

        return () => {
            isComponentMounted = false;
        }
    }, []);

    return (
        <>
            <div id='body_flex' style={{ minWidth: '1176px', height: '100%', background: 'rgb(240, 240, 240)' }}>
                <div className="myOtherList_modal1">
                    <div style={{ textAlign: 'center', }}>
                        <div style={{ width: '100%', height: '100px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}></div>
                        <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
                            비공개 처리된 사용자 입니다.
                        </div>
                        <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => { $('.myOtherList_modal1').hide(); navigate('/') }}>확인</button>
                    </div>
                </div>
                <div id="otherProfile_f" style={{ display: 'none', }}></div>
                <div id="otherProfile_b" style={{ display: 'none', }}></div>
                <div id='otherProfile_body2'>
                    <div id='otherProfile_top'></div>
                    <div id='otherProfile_top'></div>

                    <div id="otherProfile_main">
                        <div id='otherProfile_boxAA'>
                            <div id='otherProfile_boxA'>
                                <div id='otherProfile_boxB'>
                                    <div id='otherProfile_profile'></div>
                                    <div id='otherProfile_image'>
                                    {data.profileimage === ""?
                                        <></>: 
                                        <img id='otherProfile_img' src={data.profileimage} />
                                    }
                                    </div>
                                    {/* <img id='otherProfile_image' src='" + list.userProfileImg + "'/> */}
                                </div>
                                <div id='myProfile_boxC'>
                                    <div id='myProfile_inputs'>
                                        <div className='myProfile_input'>
                                            nickname
                                            <div className='otherProfile_title'>
                                                {data.nickname}
                                            </div>
                                        </div>
                                        <div className='myProfile_input'>
                                            github
                                            {data.githuburl === ""?
                                                <div className='otherProfile_title'>
                                                    등록된 깃허브 링크가 없음
                                                </div>: 
                                                <div 
                                                    className='otherProfile_title'
                                                    onClick={()=>document.location.href = data.githuburl}>
                                                    {data.githuburl}
                                                </div>
                                            }
                                        </div>
                                        <div className='myProfile_input'>
                                            company
                                            {data.company === ""?
                                                <div className='otherProfile_title'>
                                                    등록된 회사가 없음
                                                </div>: 
                                                <div className='otherProfile_title'>
                                                    {data.company}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="otherProfile_center">
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div id='lectures' className="otherProfile_click" onClick={() => {
                                    if ($('#otherProfile_f').val() == 'my') {
                                        $('#otherProfile_b').val('reviews');
                                        OtherProfileLastF(nickname, $('#otherProfile_f').val(), 'reviews'); 
                                        ColorF($('#otherProfile_f').val(), 'reviews')
                                    }
                                    else {
                                        $('#otherProfile_b').val('reviews');
                                        OtherProfileLastF(nickname, $('#otherProfile_f').val(), 'reviews'); 
                                        ColorF($('#otherProfile_f').val(), 'reviews')
                                    }

                                }}>강의리뷰</div>
                                <div id='studies' className="otherProfile_click" onClick={() => {$('#otherProfile_b').val('studies'); OtherProfileLastF(nickname, $('#otherProfile_f').val(), 'studies'); ColorF($('#otherProfile_f').val(), 'studies');}}>스터디</div>
                                <div id='roadmaps' className="otherProfile_click" onClick={() => {$('#otherProfile_b').val('roadmaps'); OtherProfileLastF(nickname, $('#otherProfile_f').val(), 'roadmaps'); ColorF($('#otherProfile_f').val(), 'roadmaps')}}>로드맵</div>
                            </div>
                        </div></div>
                        <div style={{ width: '5px', height: '10px', }}></div>
                        <div><div style={{ display: 'inline-block', }}>
                            <div id='body_flex'>
                                <div id='liked' className="otherProfile_click" onClick={() => {
                                    $('#otherProfile_f').val('like'); 
                                    if ($('#otherProfile_b').val() == 'reviews')
                                        $('#otherProfile_b').val('reviews');
                                    OtherProfileLastF(nickname, 'like', $('#otherProfile_b').val()); 
                                    ColorF('like', $('#otherProfile_b').val())}}>좋아요</div>
                                {/* <div class="otherProfile_click">|</div> */}
                                <div id='write' className="otherProfile_click" onClick={() => {
                                    $('#otherProfile_f').val('my'); 
                                    if ($('#otherProfile_b').val() == 'reviews')
                                        $('#otherProfile_b').val('reviews');
                                    OtherProfileLastF(nickname, 'my', $('#otherProfile_b').val()); 
                                    ColorF('my', $('#otherProfile_b').val())}}>작성한</div>
                            </div>
                        </div></div>
                    </div>
                    <div id="otherProfile_last">
                        {$('#otherProfile_f').val() === 'my'?
                            ($('#otherProfile_b').val() === 'reviews'?
                                <MWR_Card getData={datalist} />:
                                ($('#otherProfile_b').val() === 'studies'?
                                    <MWS_Card getData={datalist} />:
                                    <MWRo_Card getData={datalist} />
                                )
                            ):
                            ($('#otherProfile_b').val() === 'reviews'?
                                <MLR_Card getData={datalist} />:
                                ($('#otherProfile_b').val() === 'studies'?
                                    <MLS_Card getData={datalist} />:
                                    <MLRo_Card getData={datalist} />
                                )
                            )
                        }

                    </div>
                    <div id='otherProfile_top'></div>
                </div>
            </div>
            <div id='header_login'></div>
        </>
    );
}

export default OtherProfile;