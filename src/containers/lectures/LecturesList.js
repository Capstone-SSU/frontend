import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import '../../styles/lectures/LecturesList.css';

import like from '../../assets/like.png';
import likeFill from '../../assets/likeFill.png';

import LecturesElements from "../../components/lectures/LecturesElements";
import pathnameId from "../../utils/pathnameId";

window.$ = $;


function LecturesList5F(list) {
    var n5 = 0; var n4 = 0; var n3 = 0; var n2 = 0; var n1 = 0;
    for (var i = 0; i < list.length; i++) {
        if (list[i].rate == 5) n5 += 1; else if (list[i].rate == 4) n4 += 1; else if (list[i].rate == 3) n3 += 1; else if (list[i].rate == 2) n2 += 1; else n1 += 1;
    }
    n5 = (n5/list.length)*100; n4 = (n4/list.length)*100; n3 = (n3/list.length)*100; n2 = (n2/list.length)*100; n1 =(n1/list.length)*100;
    return [n5, n4, n3, n2, n1]
}

const LecturesList = ({ session, auth }) => {
    const ReviewUpdateF = () => {

    }
    const ReviewDeleteF = () => {
        axios({
            url: '/api/reviews/delete',
            method: 'POST',
            data: {
                "lecture_id": pathnameId(current).toString(),
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : localStorage.jwToken,
            },
        }).then((res)=>{
            console.log(res);
            navigate('/');
            navigate('/lectures/'+pathnameId(current));
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const ReviewReportsF = () => {
        
    }
    
    const LikeCntF = () => {
        axios({
            url: '/api/lecture/'+pathnameId(current)+'/like',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization' : localStorage.jwToken,
            },
        }).then((res)=>{
            console.log(res);
            navigate('/');
            navigate('/lectures/'+pathnameId(current));
            setData(res.data.data);
            setReviewData(res.data.datalist);
            // setAvgData(res.data.data.avgrate);

            // $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
        })
        .catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/lectures')
            } else {
                alert('오류가 났습니다')
                navigate('/lectures')
            }
        })
    }
          
          
    const [data, setData] = useState({
        hashtags: [],
    });
    const [reviewData, setReviewData] = useState([]);
    const [reviewAll, setReviewAll] = useState(0);
    const [avgData, setAvgData] = useState(0);

    const navigate = useNavigate();
    var current = ''
    current += String(decodeURI(window.location.href));
    
    useEffect(() => {
        let r = [0, 0, 0, 0, 0];
        let all = 0;
        let isComponentMounted = true;
        axios({
            url: '/api/lecture/detail/'+pathnameId(current)+'/reviews/0',
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization' : localStorage.jwToken,
            },
        }).then((res)=>{
            console.log(res);
            if (res.data) {
                if (isComponentMounted) {
                    setData(res.data.data);
                    let rData = res.data.data.reviewFive;
                    for (let i = 0; i < rData.length; i++) {
                        r[rData[i].reviewrate-1] = rData[i].count;
                    }
                    all = r.reduce(function add(sum, currValue) {
                        return sum + currValue;
                    });
                    setReviewAll(all);

                    setReviewData(res.data.datalist);
                    setAvgData(res.data.data.reviewAvg);
                }
            }

            $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);

            $('#n5').css('background', 'linear-gradient(90deg, #FCD53F ' + r[4]/all*100 + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-r[4])/all*100 +'%)')
            $('#n4').css('background', 'linear-gradient(90deg, #FCD53F ' + r[3]/all*100 + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-r[3])/all*100 +'%)')
            $('#n3').css('background', 'linear-gradient(90deg, #FCD53F ' + r[2]/all*100 + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-r[2])/all*100 +'%)')
            $('#n2').css('background', 'linear-gradient(90deg, #FCD53F ' + r[1]/all*100 + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-r[1])/all*100 +'%)')
            $('#n1').css('background', 'linear-gradient(90deg, #FCD53F ' + r[0]/all*100 + '%, rgb(210, 210, 210) 0%, rgb(210, 210, 210) ' + (100-r[0])/all*100 +'%)')
        }).catch((err)=>{
            console.log(err);
            if (!session) {
                alert('로그인 해주세요')
                navigate('/lectures')
            } else {
                alert('오류가 났습니다')
                navigate('/lectures')
            }
        })

        return () => {
            isComponentMounted = false;
        }
    }, []);


    $('#reports1').prop("checked", true);
    return (
        <div id="body_main">
            {$('#header_login').val() != 3 ? <div id="body_center_top"></div> : <div style={{ height: '35px', }}></div> }
            <div className="lecturesList_modal2">
                <div id='lecturesList_reviewId'></div>
                <div style={{ width: '100%', height: '70px', lineHeight: '70px', fontSize: '25px', fontWeight: '600', }}>신고 사유 선택</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports1" value="불건전한 만남 및 대화" /> 불건전한 만남 및 대화</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports2" value="상업적 광고 및 판매" /> 상업적 광고 및 판매</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports3" value="낚시 및 도배" /> 낚시 및 도배</div>
                <div className="studiesList_reportsRadio"><input type="radio" name="reports" id="reports4" value="욕설 및 비하" /> 욕설 및 비하</div>
                <div style={{ height: '70px', lineHeight: '60px', }}>
                    <button className="modal_body studiesList_reportsButton" onClick={() => {
                        console.log('http://54.180.150.167:8080/reviews/' + $('#lecturesList_reviewId').val() + '/reports')
                        axios.post('http://54.180.150.167:8080/reviews/' + $('#lecturesList_reviewId').val() + '/reports', {
                            "reportContent": $('input[name="reports"]:checked').val()
                        }, localStorage.getItem('token'),).then(()=>{
                            alert('강의리뷰 글신고 성공')
                            $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        }).catch((error) => { 
                            if (error == 'Error: Request failed with status code 409') 
                                alert('이미 신고한 강의리뷰입니다')
                            else
                                alert('강의리뷰 글신고 실패')
                            $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true);
                        })
                        $('.lecturesList_modal2').hide()
                    }}>확인</button>
                    <button className="studiesList_reportsButton" style={{ color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => { $('.lecturesList_modal2').hide(); $("input:radio[name='reports']:radio[value='불건전한 만남 및 대화']").prop('checked', true); }}>취소</button>
                </div>
            </div>
            <div className="lecturesList_modal1">
                <div style={{ width: '100%', height: '130px', lineHeight: '180px', fontSize: '25px', fontWeight: '600', }}>
                    더 많은 리뷰를 보려면 강의리뷰를
                </div>
                <div style={{ width: '100%', height: '80px', lineHeight: '0px', fontSize: '25px', fontWeight: '600', }}>
                    남겨주세요!
                </div>
                <button className="modal_body studiesList_reportsButton" style={{ width: '140px', }} onClick={() => {
                    navigate('/lecturesReviewAdd/' + parseInt(current.split("/")[6]))
                    $('.lecturesList_modal1').hide()
                }}>확인</button>
                <button className="studiesList_reportsButton" style={{ width: '140px', color: '#17173D', background: 'rgb(219, 219, 219)', }} onClick={() => {
                    navigate('/lectures')
                    $('.lecturesList_modal1').hide()
                }}>취소</button>
            </div>

            <div style={{ width: '100%', height: '70px', }}></div>
            <div id='lecturesList_masterButtonUD'>
                {$('#header_login').val() == 3 ? <button className='lecturesList_master' onClick={() => {
                    axios.patch('http://54.180.150.167:8080/lectures/' + parseInt(current.split("/")[6]), {
                    }, localStorage.getItem('token'),).then((response)=>{
                        navigate("/lectures/" + parseInt(current.split("/")[6]))
                    }).catch((error) => { alert('강의 수정 실패') })
                }}>수정</button>: <></>}
                {$('#header_login').val() == 3 ? <button className='lecturesList_master' onClick={() => {
                    axios.delete('http://54.180.150.167:8080/lectures/' + parseInt(current.split("/")[6]), {
                    }, localStorage.getItem('token'),).then((response)=>{
                        navigate("/lectures/" + parseInt(current.split("/")[6]))
                    }).catch((error) => { alert('강의 삭제 실패') })
                }}>삭제</button> : <></>}
            </div>
            <div
                id="lecturesList_list"
                style={{ width: '100%', height: 'auto', padding: '30px 0px', color: 'white', backgroundColor: '#17173D' }}>
                <div id='lecturesList_boxA'>
                    <div id='lecturesList_boxAA'>
                        <div id='body_flex'>
                            <div className='lectureList_img_box'>
                                {data.thumbnailurl === "" || data.thumbnailurl === null || data.thumbnailurl === undefined?
                                    <div id='lecturesList_boxB'></div>:
                                    <img id='lecturesList_img' src={data.thumbnailurl} />
                                }
                            </div>
                            <div id='lecturesList_boxC'> 
                                <div id='lecturesList_title'>{data.lecturetitle}</div>
                                <form className="mb-3" name="myform" id="myform" method="post">
                                    <fieldset className="lecturesList_star">
                                        <div id="body_flex">
                                            {[0, 1, 2, 3, 4].map((d)=>{
                                                return (
                                                    <div key={d}>
                                                        {d < Math.round(data.reviewAvg)?
                                                            <>
                                                                <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                <label htmlFor="rate' + s + '">⭐</label>
                                                            </>:
                                                            <>
                                                                <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                <label className="reviewStar" htmlFor="rate1">⭐</label>
                                                            </>
                                                        }
                                                    </div>
                                                );
                                            })}

                                            <input type="radio" name="reviewStar" />
                                            {data.reviewAvg}
                                        </div>
                                    </fieldset>
                                    
                                </form>
                                <div id='lecturesList_lecturer'>{data.lecturer}</div>
                                <div id='lecturesList_site'>{data.sitename}</div>
                                <div id='body_flex' className='lecturesList_hashtag'>
                                    {data.hashtags.map((d, idx)=>{
                                        return (
                                            <div id='lecturesList_hashtag2' key={idx}>{d}</div>
                                        );
                                    })}
                                </div>
                                <div id='lecturesList_like2'>{data.likeCnt}</div>
                                <div 
                                    id='lecturesList_like'
                                    onClick={()=> LikeCntF()}>
                                    {data.likestatus? 
                                        <img id='lecturesList_imgLike' src={likeFill} /> : 
                                        <img id='lecturesList_imgLike' src={like} />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='lecturesList_boxA'>
                <div id="lecturesList_box3">
                    <div id="lecturesList_box4"> 
                        <div id='lecturesList_avgRate'>{data.reviewAvg}</div>
                        <div>
                            <form className="mb-3" name="myform" id="myform" method="post">
                                <fieldset  id="lecturesList_starReview" >
                                    <div id="body_flex">
                                        {[0, 1, 2, 3, 4].map((d, idx)=>{
                                            return (
                                                <div key={idx}>
                                                    {d < Math.round(data.reviewAvg)?
                                                        <>
                                                            <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                            <label htmlFor="rate' + s + '">⭐</label>
                                                        </>:
                                                        <>
                                                            <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                            <label className="reviewStar" htmlFor="rate1">⭐</label>
                                                        </>
                                                    }
                                                </div>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                            </form>
                        </div>
                        <div id='lecturesList_reviewCnt'>{reviewAll}개의 수강평</div>
                    </div>

                    <div id="lecturesList_box5">
                        <div id='lecturesList_num' className='lecturesList_numReview'>
                            5점
                            <div id='n5' className='lecturesList_numReviewBox'></div>
                        </div>
                        <div className='lecturesList_numReview'>
                            4점
                            <div id='n4' className='lecturesList_numReviewBox'></div>
                        </div>
                        <div className='lecturesList_numReview'>
                            3점<div id='n3' className='lecturesList_numReviewBox'></div>
                        </div>
                        <div className='lecturesList_numReview'>
                            2점<div id='n2' className='lecturesList_numReviewBox'></div>
                        </div>
                        <div className='lecturesList_numReview'>
                            1점&nbsp;<div id='n1' className='lecturesList_numReviewBox'></div>
                        </div>
                    </div>
                </div>
                <hr style={{ borderWidth: '1px 0px 0px 0px', height: '1px', background: 'black', }}/>
            </div>

            <div id='lecturesList_boxA'>
                <button onClick={() => {
                    navigate('/lecturesReviewAdd/' + parseInt(current.split("/")[6]))
                }} style={{ margin: '20px 0px 0px 0px', float: 'right', fontSize: '18px', fontWeight: '600', color: 'white', borderRadius: '10px', background: '#17173D', }}>리뷰등록</button>
            </div>
            
            <div id="lecturesList_comments">
                <div id='lecturesList_boxA'>
                    {reviewData.map((d, idx)=>{
                        return (
                            <div id='lecturesList_boxReviewAA' key={idx}>
                                <div id='lecturesList_titleReview'>{d.reviewtitle}</div>
                                <div id='lecturesList_titleReports'>
                                    {d.nickname === auth.nickname ? 
                                        <div id="body_flex">
                                            <div id="lecturesList_reviewUpdate" onClick={()=>navigate('/lecturesReviewUpdate/'+pathnameId(current))}>수정</div>
                                            <div id="lecturesList_bar2"></div>
                                            <div id="lecturesList_reviewDelete" onClick={ReviewDeleteF}>삭제</div>
                                        </div>: 
                                    <></>}
                                    {!d.nickname === auth.nickname ? 
                                        <div id='' onClick={ReviewReportsF(" + list[i].reviewId + ")}>신고</div>: 
                                    <></>}
                                </div>
                                <form className="mb-3" name="myform" id="myform" method="post">
                                    <fieldset>
                                        <div id="body_flex">
                                            {[0, 1, 2, 3, 4].map((d2, idx2)=>{
                                                return (
                                                    <div key={idx2}>
                                                        {d2 < Math.round(d.reviewrate)? 
                                                            <>
                                                                <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                <label htmlFor="rate' + s + '">⭐</label>
                                                            </>:
                                                            <>
                                                                <input type="radio" name="reviewStar" value="' + s + '" id="rate' + s + '" />
                                                                <label className="reviewStar" htmlFor="rate1">⭐</label>
                                                            </>
                                                        }
                                                    </div>
                                                );
                                            })}
                                            {d.reviewrate}
                                        </div>
                                    </fieldset>
                                </form>
                                <div id='body_flex'>
                                    <div id='lecturesList_nicknameReview'>{d.nickname}</div>
                                    <div id='lecturesList_dateReview'>{d.createddate.slice(0, 10)}</div>
                                </div>
                                <div id='lecturesList_commentReview'>{d.reviewcontent}</div>
                                <hr id='lecturesList_hrReview'/>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default LecturesList;